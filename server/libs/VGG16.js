/**
 *  VGG16.js
 *  Create By rehellinen
 *  Create On 2018/11/26 10:55
 */
import * as tf from '@tensorflow/tfjs'
import {resolve} from 'path'

const r = path => resolve(__dirname, path)

export class VGG16 {
  constructor (pixels, width = 224, height = 224) {
    this.pixels = pixels
    this.width = width
    this.height = height
  }

  async process () {
    const data = this.processData()
    this.defineModel()
    const res = await this.train(data)
    return res
  }

  async train (data) {
    // const res = await this.model.save(r('../model/'))
    console.log(tf.tensor4d(data))
    this.model.predict(tf.tensor4d(data))
  }

  processData () {
    let newData = []
    let yIndex = 0
    for (let i = 0; i < this.pixels.length; i++) {
      if (i % this.width === 0 && i >= this.width) {
        yIndex++
      }
      if (!Array.isArray(newData[yIndex])) newData[yIndex] = []
      newData[yIndex].push(this.pixels[i])
    }
    return newData
  }

  defineModel () {
    this.model = tf.sequential()
    // 1
    this.addConvolution(3, 64, {
      inputShape: [this.width, this.height, 3]
    })
    this.addConvolution(3, 64)
    this.addPooling(2, 2)
    // 2
    this.addConvolution(3, 128)
    this.addConvolution(3, 128)
    this.addPooling(2, 2)
    // 3
    this.addConvolution(3, 256)
    this.addConvolution(3, 256)
    this.addConvolution(3, 256)
    this.addPooling(2, 2)
    // 4
    this.addConvolution(3, 512)
    this.addConvolution(3, 512)
    this.addConvolution(3, 512)
    this.addPooling(2, 2)
    // 5
    this.addConvolution(3, 512)
    this.addConvolution(3, 512)
    this.addConvolution(3, 512)
    this.addPooling(2, 2)

    this.model.add(tf.layers.flatten())
    this.addDense(4096)
    this.model.add(tf.layers.dropout({ rate: 0.5 }))
    this.addDense(4096)
    this.model.add(tf.layers.dropout({ rate: 0.5 }))
    this.addDense(1000, 'softmax')
  }

  addDense (units, activation = 'relu') {
    this.model.add(tf.layers.dense({
      units,
      activation
    }))
  }

  addConvolution (kernelSize, filters, otherConf, activation = 'relu', padding = "same") {
    let config = Object.assign({}, otherConf, {
      kernelSize,
      filters,
      activation,
      padding
    })
    this.model.add(tf.layers.conv2d(config))
  }

  addPooling (poolSize, strides) {
    this.model.add(tf.layers.maxPooling2d({
      poolSize,
      strides
    }))
  }
}
