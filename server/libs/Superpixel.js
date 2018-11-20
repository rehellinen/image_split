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
    // 初始化信息
    this._generateInfo()
    // 迭代合并
    seeds.forEach((item, index) => {
      for (let i = 1; i <= this.side * 2; i++) {
        for (let j = 1; j <= this.side * 2; j++) {
          const center = this.lab[item.x + item.y * this.width]

          if (item.x + i < this.width && item.y + j < this.height) {
            const pixel = this.lab[item.x+i + (item.y+j) * this.width]
            const similarity = this.compare(center, pixel)
            this.changeInfo(item.x + i, item.y + j, similarity, index)
          }

          if (item.x + i < this.width && item.y - j > 0) {
            const pixel = this.lab[item.x+i + (item.y-j) * this.width]
            const similarity = this.compare(center, pixel)
            this.changeInfo(item.x + i, item.y-j, similarity, index)
          }

          if (item.x - i > 0 && item.y - j > 0) {
            const pixel = this.lab[item.x-i + (item.y-j) * this.width]
            const similarity = this.compare(center, pixel)
            this.changeInfo(item.x-i, item.y-j, similarity, index)
          }

          if (item.x - i > 0 && item.y + j < this.height) {
            const pixel = this.lab[item.x-i + (item.y+j) * this.width]
            const similarity = this.compare(center, pixel)
            this.changeInfo(item.x-i, item.y+j, similarity, index)
          }
        }
      }
    })

    return this.info
  }

  changeInfo (x, y, similarity, category) {
    let pixelInfo = this.info[`${x}-${y}`]
    if (similarity < pixelInfo.distance) {
      pixelInfo.distance = similarity
      pixelInfo.category = category
    }
  }

  _generateInfo () {
    let info = {}
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        info[`${i}-${j}`] = {distance: 99999, category: -1}
      }
    }
    this.info = info
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
  _generateSeeds (totalCount = 50) {
    const pixels = []
    this.totalCount = totalCount
    this.side = Math.pow((this.width * this.height) / totalCount, 1/2)

    for (let i = this.side; i < this.width; i += this.side) {
      for (let j = this.side; j < this.height; j += this.side) {
        pixels.push({x: Math.floor(i), y: Math.floor(j)})
      }
    }

    return pixels
  }
}
