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
    const time1 = (new Date().getTime())
    const data = this.processData()
    this.defineModel()
    this.addOptimizer()
    const res = await this.train(data)
    const time2 = (new Date().getTime())
    console.log(time2 - time1)
    return res
  }

  predict () {
    const data = this.processData()
    data.forEach(item => {})
  }

  async train (data) {
    const output = this.model.predict(tf.tensor4d([data]))
    const prediction = Array.from(output.argMax(1).dataSync())
    console.log(prediction)
    return prediction
  }

  addOptimizer () {
    const LEARNING_RATE = 0.15
    const optimizer = tf.train.sgd(LEARNING_RATE)
    this.model.compile({
      optimizer: optimizer,
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy'],
    })
  }

  processData () {
    let newData = []
    this.pixels.forEach(item => {
      if (item[6] === -1) return
      if (!Array.isArray(newData[item[6]])) newData[item[6]] = []
      newData[item[6]].push(item)
    })
    return newData
  }

  defineModel () {
    this.model = tf.sequential()
    // 1
    this.addConvolution(3, 64, {
      inputShape: [this.height, this.width, 3],
      data_format: 'channels_last'
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
