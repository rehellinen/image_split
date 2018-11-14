/**
 *  ProcessImage.js
 *  Create By rehellinen
 *  Create On 2018/11/13 11:04
 */
const Jimp = require('jimp')

export class ProcessImage {
  constructor(image) {
    this.image = image
  }

  async getRGB () {
    const lenna = await Jimp.read(this.image)

    let red = []
    let green = []
    let blue = []
    let count = 0
    let index = 0

    lenna.scan(0, 0, lenna.bitmap.width, lenna.bitmap.height, function (x, y, idx) {
      if (count % lenna.bitmap.width === 0 && count >= lenna.bitmap.width) {
        index ++
      }

      if (!red[index]) red[index] = []
      if (!green[index]) green[index] = []
      if (!blue[index]) blue[index] = []

      red[index].push(this.bitmap.data[idx + 0])
      green[index].push(this.bitmap.data[idx + 1])
      blue[index].push(this.bitmap.data[idx + 2])
      count ++
    })

    return [
      red, green, blue
    ]
  }
}
