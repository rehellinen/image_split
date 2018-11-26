/**
 *  ProcessImage.js
 *  Create By rehellinen
 *  Create On 2018/11/13 11:04
 */
import {Superpixel} from "./Superpixel"
const {createCanvas, loadImage} = require('canvas')
/**
 * 预处理（使用superpixel对图像进行预分割）
 */
export class PreProcess {
  constructor(path) {
    this.path = path
  }

  async get () {
    const time1 = new Date().getTime()
    // 获取图片每个像素的RGB
    const rgb = await this.getRgb()
    // RGB转LAB
    const lab = this.rgb2lab(rgb)
    // 调用superpixel进行分割
    const splitRes = new Superpixel(lab, this.width, this.height, 30).split()
    // 生成边框信息
    const time2 = new Date().getTime()
    console.log(time2 - time1)
    return {
      width: this.width,
      height: this.height,
      border: this.getBorder(splitRes.res),
      center: splitRes.center,
      pixels: splitRes.res
    }
  }

  // 通过canvas获取图片的RGB
  async getRgb () {
    const res = await loadImage(this.path)
    const canvas = createCanvas(res.width, res.height)
    const ctx = canvas.getContext('2d')
    const rgb = []

    this.width = res.width
    this.height = res.height

    ctx.drawImage(res, 0, 0);
    const data = ctx.getImageData(0, 0, res.width, res.height).data

    for (let i = 0; i < data.length; i += 4) {
      rgb.push([data[i], data[i+1], data[i+2]])
    }

    return rgb;
  }

  getBorder (splitRes) {
    const border = []
    for (let i = 2; i < splitRes.length - 2; i++) {
      if (splitRes[i][6] === -1) {
        continue
      }
      if (splitRes[i][6] !== splitRes[i - 1][6]
        && splitRes[i][6] === splitRes[i + 1][6]
      ) {
        border.push([splitRes[i][3], splitRes[i][4]])
      }

      if (i > this.width && i < splitRes.length - this.width) {
        if (splitRes[i][6] !== splitRes[i - this.width][6]
          && splitRes[i][6] === splitRes[i + this.width][6]
        ) {
          border.push([splitRes[i][3], splitRes[i][4]])
        }
      }
    }
    return border
  }

  // RGB转LAB
  rgb2lab (rgb) {
    let lab = []
    let x = 1
    let y = 1

    rgb.forEach(item => {
      const L = (item[0] * 13933 + item[1] * 46871 + item[2] * 4732) / Math.pow(2, 16)
      const a = (item[0] * 14503 - item[1] * 22218 + item[2] * 7714) / Math.pow(2, 24) + 128
      const b = (item[0] * 12773 + item[1] * 39695 - item[2] * 52468) / Math.pow(2, 24) + 128
      if (x > this.width) {
        x = 1
        y++
      }
      lab.push([L, a, b, x, y])
      x++
    })
    return lab
  }
}
