/**
 *  superpixel.js
 *  Create By rehellinen
 *  Create On 2018/11/12 11:09
 */
export class Superpixel {
  constructor (lab, width, height) {
    this.lab = lab
    this.width = width
    this.height = height
  }

  split () {
    // 生成初始种子
    const seeds = this._generateSeeds()
    // 迭代合并
    const splitRes = []
    let count = 0

    // while (count < this.width * this.height) {
      seeds.forEach(item => {
        const middle = Math.floor(item[0] + item[1] * this.width)
        this.compare(this.lab[middle], this.lab[middle + 1])
      })
    //   count++
    // }
  }

  // 判断两个像素的相似度
  compare (pixelOne, pixelTwo) {
    const color = Math.pow(
      Math.pow(pixelOne[0] - pixelTwo[0], 2) +
      Math.pow(pixelOne[1] - pixelTwo[1], 2) +
      Math.pow(pixelOne[2] - pixelTwo[2], 2)
      , 1/2)
    const space = Math.pow(
      Math.pow(pixelOne[3] - pixelTwo[3], 2) +
      Math.pow(pixelOne[4] - pixelTwo[4], 2)
    , 1/2)

    const S = Math.pow((this.width * this.height) / this.totalCount, 1/2)
    const m = 10
    return Math.pow(
      Math.pow(color, 2) +
      Math.pow(space / S * m, 2)
      , 1 / 2)
  }
  // 生成超像素的初始种子
  _generateSeeds () {
    let pixels = []
    const widthCount = 8
    const heightCount = 6
    const perWidth = this.width / widthCount
    const perHeight = this.height / heightCount
    this.totalCount = widthCount * heightCount

    for (let i = 0; i < widthCount; i++) {
      for (let j = 0; j < heightCount; j++) {
        pixels.push([perWidth * (i + 1/2), perHeight * (j + 1/2)])
      }
    }

    return pixels
  }
}
