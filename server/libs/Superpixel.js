/**
 *  superpixel.js
 *  Create By rehellinen
 *  Create On 2018/11/12 11:09
 */
const square = value => Math.pow(value, 2)
const rooting = value => Math.pow(value, 1/2)


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
    const res = {}
    seeds.forEach((item, index) => {
      const range = this.getRange(item)
      const pixels = this.generateAround(range)
      const center = this.lab[item.x + item.y * this.width]
      pixels.forEach(i => {
        const similarity = this.compare(center, i)
        this.changeInfo(i, similarity, index)
      })
    })
    let newCenters
    // 更新质点位置
    for (let i = 0; i < 5; i++) {
      newCenters = this.updateCenters()
      newCenters.forEach((item, index) => {
        const range = this.getRange(item)
        const pixels = this.generateAround(range)
        const center = this.lab[item.x + item.y * this.width]
        pixels.forEach(i => {
          const similarity = this.compare(center, i)
          this.changeInfo(i, similarity, index)
        })
      })
    }

    // 合并孤立点
    this.mergeIsolatedPoint()
    return {
      center: newCenters,
      res: this.lab
    }
  }

  updateCenters () {
    const center = []

    this.lab.forEach(item => {
      if (item[6] === -1) return
      if (center[item[6]] === undefined) center[item[6]] = {x: 0, y: 0, count: 0}
      center[item[6]].x += item[3]
      center[item[6]].y += item[4]
      center[item[6]].count ++
    })

    for (let key in center) {
      center[key].x = Math.floor(center[key].x / center[key].count)
      center[key].y = Math.floor(center[key].y / center[key].count)
    }
    return center
  }

  mergeIsolatedPoint () {
    const res = this.lab
    for (let i = 1; i < res.length - 1; i++) {
      if (res[i]!==res[i-1] && res[i]!==res[i+1] && res[i-1]===res[i+1]) {
        res[i] = res[i-1]
      }
    }
  }

  generateAround (range) {
    let pixels = []
    for (let i = range.up; i <= range.down; i++) {
      let oneLine = this.lab.slice((i-1)*this.width + range.left, (i-1)*this.width + range.right)
      pixels.push(...oneLine)
    }
    return pixels
  }

  getRange (pixel) {
    return {
      left: (pixel.x - this.side * 2) < 1 ? 1 : Math.round(pixel.x - this.side * 2),
      right: (pixel.x + this.side * 2) > this.width ? this.width : Math.round(pixel.x + this.side * 2),
      up: (pixel.y - this.side * 2) < 1 ? 1 : Math.round(pixel.y - this.side * 2),
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
    const m = 20
    const S = rooting((this.width * this.height) / this.totalCount)

    const color = rooting(
      square(pixelOne[0] - pixelTwo[0]) +
      square(pixelOne[1] - pixelTwo[1]) +
      square(pixelOne[2] - pixelTwo[2]))

    const space = rooting(
      square(pixelOne[3] - pixelTwo[3]) +
      square(pixelOne[4] - pixelTwo[4]))

    return rooting(
      square(color) +
      square(space / S * m))
  }

  // 生成超像素的初始种子
  generateSeeds (totalCount = 250) {
    const pixels = []
    this.totalCount = totalCount
    this.side = rooting((this.width * this.height) / totalCount)

    for (let i = this.side; i < this.width - 1/2 * this.side; i += this.side) {
      for (let j = this.side; j < this.height - 1/2 * this.side; j += this.side) {
        pixels.push({x: Math.floor(i), y: Math.floor(j)})
      }
    }

    return pixels
  }
}
