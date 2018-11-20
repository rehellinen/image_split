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
    const seeds = this.generateSeeds()
    // 初始化信息
    this.generateInfo()
    // 迭代合并
    seeds.forEach((item, index) => {
      const range = this.getRange(item)
      const pixels = this.generateAround(range)
      const center = this.lab[item.x + item.y * this.width]

      pixels.forEach(i => {
        const similarity = this.compare(center, i)
        this.changeInfo(i, similarity, index)
      })
    })
    return this.lab
  }

  generateAround (range) {
    let pixels = []
    for (let i = range.up; i <= range.down; i++) {
      let oneLine = this.lab.slice(i*this.width + range.left, i*this.width + range.right)
      oneLine.forEach(item => pixels.push(item))
    }
    return pixels
  }

  getRange (pixel) {
    return {
      left: (pixel.x - this.side * 2) < 0 ? 0 : Math.round(pixel.x - this.side * 2),
      right: (pixel.x + this.side * 2) > this.width ? this.width : Math.round(pixel.x + this.side * 2),
      up: (pixel.y - this.side * 2) < 0 ? 0 : Math.round(pixel.y - this.side * 2),
      down: (pixel.y + this.side * 2) > this.height ? this.height : Math.round(pixel.y + this.side * 2),
    }
  }

  changeInfo (pixel, similarity, category) {
    if (similarity < pixel[5]) {
      pixel[5] = similarity
      pixel[6] = category
    }
  }

  generateInfo () {
    this.lab.forEach(item => {
      item.push(99999, -1)
    })
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
  generateSeeds (totalCount = 36) {
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
