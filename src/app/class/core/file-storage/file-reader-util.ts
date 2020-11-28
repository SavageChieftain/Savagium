// eslint-disable-next-line import/extensions
import * as WordArray from 'crypto-js/lib-typedarrays.js'
// eslint-disable-next-line import/extensions
import * as SHA256 from 'crypto-js/sha256.js'

export namespace FileReaderUtil {
  const calcSHA256Callback = (arrayBuffer: ArrayBuffer): string => {
    const wordArray = WordArray.create(arrayBuffer)
    return SHA256(<any>wordArray).toString()
  }

  const calcSHA256AsyncCallback = async (blob: Blob): Promise<string> => {
    return calcSHA256Callback(await FileReaderUtil.readAsArrayBufferAsync(blob))
  }

  export function readAsArrayBufferAsync(blob: Blob): Promise<ArrayBuffer> {
    return new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        resolve(reader.result as ArrayBuffer)
      }
      reader.onabort = (e) => {
        reject(e)
      }
      reader.onerror = (e) => {
        reject(e)
      }
      reader.readAsArrayBuffer(blob)
    })
  }

  export function readAsTextAsync(blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        resolve(reader.result as string)
      }
      reader.onabort = (e) => {
        reject(e)
      }
      reader.onerror = (e) => {
        reject(e)
      }
      reader.readAsText(blob)
    })
  }

  export async function calcSHA256Async(arrayBuffer: ArrayBuffer): Promise<string>
  export async function calcSHA256Async(blob: Blob): Promise<string>
  export async function calcSHA256Async(arg: any): Promise<string> {
    if (arg instanceof Blob) {
      return calcSHA256AsyncCallback(arg)
    }
    return calcSHA256Callback(arg)
  }
}
