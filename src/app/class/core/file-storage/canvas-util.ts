export namespace CanvasUtil {
  /**
   * https://github.com/viliusle/Hermite-resize
   * Hermite resize - fast image resize/resample using Hermite filter. 1 cpu version!
   *
   * @param {HtmlElement} canvas
   * @param {int} width
   * @param {int} height
   * @param {boolean} resize_canvas if true, canvas will be resized. Optional.
   */
  export function resize(
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    resize_canvas?: boolean,
  ) {
    const widthSource = canvas.width
    const heightSource = canvas.height
    const localWidth = Math.round(width)
    const localHeight = Math.round(height)

    const ratioW = widthSource / localWidth
    const ratioH = heightSource / localHeight
    const ratioWHalf = Math.ceil(ratioW / 2)
    const ratioHHalf = Math.ceil(ratioH / 2)

    const ctx = canvas.getContext('2d')
    const img = ctx.getImageData(0, 0, widthSource, heightSource)
    const img2 = ctx.createImageData(localWidth, localHeight)
    const { data } = img
    const data2 = img2.data

    for (let j = 0; j < localHeight; j += 1) {
      for (let i = 0; i < localWidth; i += 1) {
        const x2 = (i + j * localWidth) * 4
        let weight = 0
        let weights = 0
        let weightsAlpha = 0
        let gxR = 0
        let gxG = 0
        let gxB = 0
        let gxA = 0
        const centerY = (j + 0.5) * ratioH
        const yyStart = Math.floor(j * ratioH)
        const yyStop = Math.ceil((j + 1) * ratioH)
        for (let yy = yyStart; yy < yyStop; yy += 1) {
          const dy = Math.abs(centerY - (yy + 0.5)) / ratioHHalf
          const centerX = (i + 0.5) * ratioW
          const w0 = dy * dy // pre-calc part of w
          const xxStart = Math.floor(i * ratioW)
          const xxStop = Math.ceil((i + 1) * ratioW)
          for (let xx = xxStart; xx < xxStop; xx += 1) {
            const dx = Math.abs(centerX - (xx + 0.5)) / ratioWHalf
            const w = Math.sqrt(w0 + dx * dx)
            if (w >= 1) {
              // pixel too far
              // eslint-disable-next-line no-continue
              continue
            }
            // hermite filter
            weight = 2 * w * w * w - 3 * w * w + 1
            const posX = 4 * (xx + yy * widthSource)
            // alpha
            gxA += weight * data[posX + 3]
            weightsAlpha += weight
            // colors
            if (data[posX + 3] < 255) weight = (weight * data[posX + 3]) / 250
            gxR += weight * data[posX]
            gxG += weight * data[posX + 1]
            gxB += weight * data[posX + 2]
            weights += weight
          }
        }
        data2[x2] = gxR / weights
        data2[x2 + 1] = gxG / weights
        data2[x2 + 2] = gxB / weights
        data2[x2 + 3] = gxA / weightsAlpha
      }
    }
    // clear and resize canvas
    if (resize_canvas === true) {
      canvas.width = localWidth
      canvas.height = localHeight
    } else {
      ctx.clearRect(0, 0, widthSource, heightSource)
    }

    // draw
    ctx.putImageData(img2, 0, 0)
  }
}
