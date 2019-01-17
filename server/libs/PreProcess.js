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
    const time2 = new Date().getTime()
    console.log(`总耗时：${time2 - time1}ms`)
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
    let labArr = []
    let x = 1
    let y = 1

    const rgb2xyx = (r, g, b) => {
      const gamma = (val) => {
        val /= 255
        return val>0.0404 ? Math.pow((val+0.055)/1.055, 2.4) : val/12.92
      }

      const x = 0.4124 * gamma(r) + 0.3576 * gamma(g) + 0.1805 * gamma(b)
      const y = 0.2126 * gamma(r) + 0.7152 * gamma(g) + 0.0722 * gamma(b)
      const z = 0.0193 * gamma(r) + 0.1192 * gamma(g) + 0.9505 * gamma(b)
      return [x, y, z]
    }

    const xyz2lab = (x, y, z) => {
      const Xn = 0.9504
      const Yn = 1
      const Zn = 1.0888
      const f = val => {
        return val > 0.008856 ? Math.pow(val, 1/3) : (7.787 * val + 0.1379)
      }

      const L = 116 * f(y/Yn) - 16
      const a = 500 * (f(x/Xn) - f(y/Yn))
      const b = 200 * (f(y/Yn) - f(z/Zn))

      return [L, a, b]
    }

    rgb.forEach(item => {
      const xyz = rgb2xyx(item[0], item[1], item[2])
      const lab = xyz2lab(xyz[0], xyz[1], xyz[2])
      if (x > this.width) {
        x = 1
        y++
      }
      labArr.push([lab[0], lab[1], lab[2], x, y])
      x++
    })
    return labArr
  }
}
