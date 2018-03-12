import { PeerContext } from './peer-context';
import { Connection, ConnectionCallback } from './connection';
/*
import 'skyway-peerjs/dist/peer.min.js'
import { } from 'skyway';
*/
import { } from 'node';
import * as MessagePack from 'msgpack-lite';
import * as JSZip from 'jszip/dist/jszip.min.js';

// @types/skywayを使用すると@types/webrtcが定義エラーになるので代替定義
declare var Peer;
declare module PeerJs {
  export type Peer = any;
  export type DataConnection = any;
}

interface DataContainer {
  data: any;
  peers: string[];
  isRelay: boolean;
  isCompression?: boolean;
}

export class SkyWayConnection implements Connection {
  get peerId(): string { return this.peerContext ? this.peerContext.fullstring : '???'; }

  private _peerIds: string[] = [];
  get peerIds(): string[] { return this._peerIds }

  peerContext: PeerContext;
  readonly peerContexts: PeerContext[] = [];
  readonly callback: ConnectionCallback = new ConnectionCallback();

  private key: string = '';
  private peer: PeerJs.Peer;
  private connections: PeerJs.DataConnection[] = [];

  private listAllPeersCache: string[] = [];
  private httpRequestInterval: number = performance.now() + 500;

  private queue: Promise<any> = Promise.resolve();

  open(peerId: string)
  open(peerId: string, roomId: string, roomName: string, password: string)
  open(...args: any[]) {
    console.log('open', args);
    if (args.length === 0) {
      this.peerContext = PeerContext.create(PeerContext.generateId());
    } else if (args.length === 1) {
      this.peerContext = PeerContext.create(args[0]);
    } else {
      this.peerContext = PeerContext.create(args[0], args[1], args[2], args[3]);
    }
    this.openPeer();
  }

  close() {
    if (this.peer) this.peer.destroy();
    this.disconnectAll();
    this.peer = null;
    this.peerContext = null;
  }

  connect(peerId: string): boolean {
    if (!this.shouldConnect(peerId)) return false;

    let conn: PeerJs.DataConnection = this.peer.connect(peerId, {
      label: this.peerId,
      reliable: true,
      metadata: { sendFrom: this.peerId }
    });

    this.openDataConnection(conn);
    return true;
  }

  private shouldConnect(peerId: string): boolean {
    if (!this.peer || !this.peerId) {
      console.log('connect() is Fail. IDが割り振られるまで待てや');
      return false;
    }

    if (this.peerId === peerId) {
      console.log('connect() is Fail. ' + peerId + ' is me.');
      return false;
    }

    if (this.findDataConnection(peerId)) {
      console.log('connect() is Fail. <' + peerId + '> is already connecting.');
      return false;
    }

    if (peerId && peerId.length && peerId !== this.peerId) return true;
    return false;
  }

  disconnect(peerId: string): boolean {
    let conn = this.findDataConnection(peerId)
    if (!conn) return false;
    this.closeDataConnection(conn);
    return true;
  }

  disconnectAll() {
    console.log('<closeAllDataConnection()>');
    for (let conn of this.connections.concat()) {
      this.closeDataConnection(conn);
    }
  }

  send(data: any, sendTo?: string) {
    if (this.connections.length < 1) return;
    let container: DataContainer = {
      data: MessagePack.encode(data),
      peers: this._peerIds.concat(),
      isRelay: false
    }

    this.queue = this.queue.then(() => new Promise(async (resolve, reject) => {
      if (3 * 1024 < container.data.length) {
        container.isCompression = true;
        container.data = await this.compressAsync(container.data);
      }
      if (sendTo) {
        this.sendUnicast(container, sendTo);
      } else {
        this.sendBroadcast(container);
      }
      return resolve();
    }));
  }

  private sendUnicast(container: DataContainer, sendTo: string) {
    container.isRelay = false;
    let conn = this.findDataConnection(sendTo);
    if (conn && conn.open) conn.send(container);
  }

  private sendBroadcast(container: DataContainer) {
    container.isRelay = true;
    for (let conn of this.connections) {
      if (conn.open) conn.send(container);
    }
  }

  private onData(conn: PeerJs.DataConnection, container: DataContainer) {
    if (container.isRelay) this.onRelay(container);
    if (this.callback.onData) {
      this.queue = this.queue.then(() => new Promise(async (resolve, reject) => {
        let data: Uint8Array;
        if (container.isCompression) {
          data = await this.decompressAsync(container.data);
        } else {
          data = new Uint8Array(container.data);
        }
        this.callback.onData(conn.peer, MessagePack.decode(data));
        return resolve();
      }));
    }
  }

  private onRelay(container: DataContainer) {
    let others: string[] = container.peers;
    let peerIds: string[] = this._peerIds.concat();//this.peers.concat();

    if (!others || others.length < 1) return;
    // 自分の知らないPeerが含まれている
    let unknownPeers = [];
    let knownPeers = [];
    for (let other of others) {
      let isUnknown = true;
      let length = peerIds.length;
      for (let i = 0; i < length; i++) {
        if (other === peerIds[i]) {
          isUnknown = false;
          knownPeers.push(peerIds.splice(i, 1));
          break;
        }
      }
      if (isUnknown) {
        if (this.peerId !== other && this.findDataConnection(other) === null) {
          unknownPeers.push(other);
        }
      }
    }

    if (unknownPeers.length) {
      if (this.callback.onDetectUnknownPeers) this.callback.onDetectUnknownPeers(unknownPeers);
    }

    if (peerIds.length < 1) return;

    // 送信宛先に含まれていないPeerを知っている
    for (let peerId of peerIds) {
      let conn = this.findDataConnection(peerId);
      if (conn) {
        container.peers.push(peerId)
      }
    }
    for (let peerId of peerIds) {
      let conn = this.findDataConnection(peerId);
      if (conn) {
        if (conn.open) {
          console.log('<' + peerId + '> is 転送しなきゃ・・・ ', container);
          conn.send(container);
        }
      }
    }
  }

  private add(conn: PeerJs.DataConnection): boolean {
    let existConn = this.findDataConnection(conn.peer);
    if (existConn !== null) {
      console.log('add() is Fail. ' + conn.peer + ' is already connecting.');
      if (existConn !== conn) {
        if (existConn.metadata.sendFrom < conn.metadata.sendFrom) {
          this.closeDataConnection(conn);
        } else {
          this.closeDataConnection(existConn);
          this.add(conn);
          return true;
        }
      }
      return false;
    }
    this.connections.push(conn);
    this.peerContexts.push(new PeerContext(conn.peer));
    console.log('<add()> Peer:' + conn.peer + ' length:' + this.connections.length);
    return true;
  }

  setApiKey(key: string) {
    if (this.key !== key) console.log('Key Change');
    this.key = key;
  }

  listAllPeers(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      if (!this.peer) return resolve([]);
      let now = performance.now();
      if (now < this.httpRequestInterval) {
        console.warn('httpRequestInterval... ' + (this.httpRequestInterval - now));
        resolve(this.listAllPeersCache.concat());
        return;
      }
      this.httpRequestInterval = now + 6000;
      this.peer.listAllPeers((list) => {
        this.listAllPeersCache = list.concat();
        resolve(list);
      });
    });
  }

  private openPeer() {
    if (this.peer) {
      console.warn('It is already opened.');
      this.close();
    }
    let peer = new Peer(this.peerContext.fullstring, { key: this.key });// SkyWay
    peer.on('open', id => {
      console.log('My peer ID is: ' + id);
      if (!this.peerContext || this.peerContext.fullstring !== id) {
        this.peerContext = new PeerContext(id);
      }
      this.peerContext.isOpen = true;
      console.log('My peer Context', this.peerContext);
      if (this.callback.onOpen) this.callback.onOpen(this.peerId);
    });

    peer.on('connection', conn => {
      this.openDataConnection(conn);
    });

    peer.on('error', err => {
      console.log('<' + this.peerId + '> ' + err);
      console.error(err);
      if (err.toString() === 'Error: Lost connection to server.') {
        if (this.callback.onClose) this.callback.onClose(this.peerId);
      } else if (-1 < err.toString().indexOf('Error: Could not connect to peer ')) {
        let peer = err.toString().substring('Error: Could not connect to peer '.length);
        this.disconnect(peer);
      }
    });
    this.peer = peer;
  }

  private openDataConnection(conn: PeerJs.DataConnection) {
    if (this.add(conn) === false) return;

    let sendFrom: string = conn.label;
    if (this.callback.willOpen) this.callback.willOpen(conn.peer, sendFrom);

    let index = this.connections.indexOf(conn);
    let context: PeerContext = null;
    if (0 <= index) context = this.peerContexts[index];

    let timeout: NodeJS.Timer = setTimeout(() => {
      if (this.callback.onTimeout) this.callback.onTimeout(conn.peer);
      this.closeDataConnection(conn);
      if (this.callback.onClose) this.callback.onClose(conn.peer);
    }, 15000);

    conn.on('data', data => {
      this.onData(conn, data);
    });
    conn.on('open', () => {
      if (timeout !== null) clearTimeout(timeout);
      timeout = null;
      if (context) context.isOpen = true;
      this.update();
      if (this.callback.onOpen) this.callback.onOpen(conn.peer);
    });
    conn.on('close', () => {
      if (timeout !== null) clearTimeout(timeout);
      timeout = null;
      this.closeDataConnection(conn);
      if (this.callback.onClose) this.callback.onClose(conn.peer);
    });
    conn.on('error', err => {
      if (timeout !== null) clearTimeout(timeout);
      timeout = null;
      this.closeDataConnection(conn);
      if (this.callback.onError) this.callback.onError(conn.peer, err);
    });
  }

  private closeDataConnection(conn: PeerJs.DataConnection) {
    conn.close();
    let index = this.connections.indexOf(conn);
    if (0 <= index) {
      console.log(conn.peer + ' is えんいー' + 'index:' + index + ' length:' + this.connections.length);
      this.connections.splice(index, 1);
      this.peerContexts.splice(index, 1);
    }
    console.log('<close()> Peer:' + conn.peer + ' length:' + this.connections.length + ':' + this.peerContexts.length);
    this.update();
  }

  private findDataConnection(peerId: string): PeerJs.DataConnection {
    for (let conn of this.connections) {
      if (conn.peer === peerId) {
        return conn;
      }
    }
    return null;
  }

  private update(): string[] {
    let peers: string[] = [];
    for (let conn of this.connections) {
      if (conn.open) peers.push(conn.peer);
    }
    peers.push(this.peerId);
    peers.sort(function (a, b) {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });

    this._peerIds = peers;

    console.log('<update()>', peers);
    return peers;
  }

  private async compressAsync(data: Buffer): Promise<Uint8Array> {
    let files: File[] = [];
    files.push(new File([data], 'data.pack', { type: 'application/octet-stream' }));

    let zip = new JSZip();
    let length = files.length;
    for (let i = 0; i < length; i++) {
      let file = files[i]
      zip.file(file.name, file);
    }

    let uint8array: Uint8Array = await zip.generateAsync({
      type: 'uint8array',
      compression: 'DEFLATE',
      compressionOptions: {
        level: 2
      }
    });

    console.log('compress...' + data.length + ' -> ' + uint8array.length + '(' + (uint8array.length / data.length) + ')');
    return uint8array;
  }

  private async decompressAsync(data: Buffer | ArrayBuffer | Uint8Array): Promise<Uint8Array> {
    let zip = new JSZip();
    try {
      zip = await zip.loadAsync(data);
    } catch (reason) {
      console.warn(reason);
      return null;
    }
    let uint8array: Uint8Array = await new Promise<Uint8Array>(
      async (resolve, reject) => {
        zip.forEach(async (relativePath, zipEntry) => {
          try {
            uint8array = await zipEntry.async('uint8array');
            resolve(uint8array);
            console.log('decompress...', uint8array);
          } catch (reason) {
            console.warn(reason);
          }
        });
      });
    return uint8array;
  }
}