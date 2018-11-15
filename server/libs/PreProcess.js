/**
 *  ProcessImage.js
 *  Create By rehellinen
 *  Create On 2018/11/13 11:04
 */
import Jimp from 'jimp'
import {Superpixel} from "./Superpixel"
import R from 'ramda'

/**
 * 预处理（使用superpixel对图像进行预分割）
 */
export class PreProcess {
  constructor(path) {
    this.path = path
  }

  async get () {
    const time1 = new Date().getTime()
    // 初始化一些属性
    await this.init()
    // 获取图片每个像素的RGB
    const rgb = this.getRGB()
    // RGB转LAB
    const lab = this.toLAB(rgb)
    const time2 = new Date().getTime()
    // 调用superpixel进行分割
    const res = new Superpixel(lab, this.width, this.height).split()
  }

  toLAB (rgb) {
    let lab = []
    let index = 0
    const Xn = 0.95047
    const Yn = 1.0
    const Zn = 1.08883

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        const L = (rgb[0][index] * 13933 + rgb[1][index] * 46871 + rgb[2][index] * 4732) / Math.pow(2, 16)
        const a = (rgb[0][index] * 14503 - rgb[1][index] * 22218 + rgb[2][index] * 7714) / Math.pow(2, 24) + 128
        const b = (rgb[0][index] * 12773 + rgb[1][index] * 39695 - rgb[2][index] * 52468) / Math.pow(2, 24) + 128

        let value = [L, a, b, j, i]
        lab.push(value)
        index++
      }
    }
    return lab
  }

  async init () {
    const image = await Jimp.read(this.path)
    this.image = image
    this.width = image.bitmap.width
    this.height = image.bitmap.height
  }

  getRGB () {
    let red = []
    let green = []
    let blue = []

    this.image.scan(0, 0, this.width, this.height, function (x, y, idx) {
      red.push(this.bitmap.data[idx + 0])
      green.push(this.bitmap.data[idx + 1])
      blue.push(this.bitmap.data[idx + 2])
    })

    return [
      red, green, blue
    ]
  }
}
