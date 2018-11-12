/**
 *  ProcessData.js
 *  Create By rehellinen
 *  Create On 2018/11/11 19:33
 */

export class ProcessData {
  constructor (arrayBuffer) {
    this.buffer = arrayBuffer
    console.log(this.buffer.byteLength)
  }

  process () {
    const remainder = this.buffer.byteLength % 4
    const arrayData = new Float32Array(this.buffer, 0, (this.buffer.byteLength - remainder) / 4)
    // console.log(arrayData)
  }
}
