export namespace Base64 {
  export function toBlob(base64: string): Blob {
    const tmp = base64.split(',')
    let data = null
    try {
      data = atob(tmp[1])
    } catch (error) {
      console.warn(error)
      return null
    }
    const mime = tmp[0].split(':')[1].split(';')[0]
    if (mime.length < 1) return null
    const arr = new Uint8Array(data.length)
    for (let i = 0; i < data.length; i += 1) {
      arr[i] = data.charCodeAt(i)
    }
    const blob = new Blob([arr], { type: mime })
    return blob
  }

  export function toBase64Async(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        resolve(reader.result as string)
      }
      reader.onerror = () => {
        reject()
      }
      reader.onabort = () => {
        reject()
      }
      reader.readAsDataURL(blob)
    })
  }
}
