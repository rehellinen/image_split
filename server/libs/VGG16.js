/**
 *  VGG16.js
 *  Create By rehellinen
 *  Create On 2018/11/26 10:55
 */
import * as tf from '@tensorflow/tfjs'

export class VGG16 {
  constructor (pixels, width = 224, height = 224) {
    this.clusters = pixels
    this.width = width
    this.height = height
  }

  process () {

  }

  defineModel () {
    this.model = tf.sequential()
    this.addConvolution(3, 64, 'relu', {
      inputShape: [this.width, this.height, 3]
    })
    this.addPooling()
  }

  addConvolution (kernelSize, filters, activation = 'relu', otherConf) {
    let config = Object.assign({}, otherConf, {
      kernelSize,
      filters,
      activation
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
