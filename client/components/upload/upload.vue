<template lang="pug">
  div.container
    // 状态栏
    div.status
      p 状态：{{status}}

    // 点击上传
    div.upload
      input(type="file" @change="processImage")
      div.upload-button
        p 点击上传

    // 图片展示
    div.canvas-container(v-show="imageUrl")
      canvas(id="upload" ref="upload" :width="300" :height="300")
      show(:imageUrl="imageUrl" :data="data" v-show="status === '已完成'")

    // 选择框
    div.checkbox(v-show="status === '等待标记'")
      div.con
        div(@click="changeColor('front')")
          div.check
          p 前景
        div(@click="changeColor('back')")
          div.no-check
          p 背景

    // 提交
    div.upload(v-show="status === '等待标记'")
      div.upload-button(@click="uploadImage")
        p 提交
</template>

<script>
import Show from '../show/show'
import {Http} from "../../utils/Http"

const http = new Http()

export default {
  data () {
    return {
      imageUrl: '',
      status: '等待上传',
      canvasWidth: 300,
      canvasHeight: 300,
      data: {},
      color: 'aqua'
    }
  },
  methods: {
    async processImage (event) {
      this.status = '等待标记'
      this.image = event.target.files[0]
      // 获取上传图片的URL
      const fr = new FileReader()
      fr.readAsDataURL(this.image)
      fr.onloadend = (e) => {
        this.imageUrl = e.target.result
        // canvas展示图片
        this.showByCanvas()
      }
    },
    showByCanvas () {
      const that = this
      const canvas = this.$refs.upload
      const ctx = canvas.getContext('2d')
      // 清空canvas
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      // 载入原图
      const img = new Image()
      img.src = this.imageUrl
      img.onload = function () {
        ctx.drawImage(this, 0, 0, that.canvasWidth, that.canvasHeight)
      }
      // 标记功能
      canvas.onmousedown = function (e) {
        canvas.onmousemove = function(event) {
          ctx.fillStyle = that.color
          ctx.fillRect(event.offsetX-2, event.offsetY-2, 4, 4)
        }
        canvas.onmouseup = () => {
          canvas.onmousemove = null
          canvas.onmouseup = null
        }
      }
    },
    async uploadImage () {
      this.status = '处理中'
      this.data = await http.submitImage(this.image)
      this.status = '已完成'
    },
    changeColor (type) {
      this.color = type === 'front' ? 'aqua' : 'blanchedalmond'
    }
  },
  components: {
    Show
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~sass/base"
  .container
    display: flex
    flex-direction: column
    width: 100%

  /** status **/
  .status
    background-color: $main-bg-color
    height: 45px
    display: flex
    align-items: center
    justify-content: center
    width: 170px
    border-radius: 5px
    margin: 10px 0
    p
      font-weight: bold
      font-size: $normal-font-size
  /** status **/

  /** upload button **/
  .upload
    position: relative
    display: flex
    align-items: center
    height: 40px
    input
      position: absolute
      left: 0
      top: 0
      opacity: 0
      -ms-filter: 'alpha(opacity=0)'
      height: 40px
    .upload-button
      display: flex
      justify-content: center
      align-items: center
      font-size: $small-font-size
      color: white
      border-radius: 5px
      background-color: $theme-color
      padding: 10px 0
      width: 100px
      letter-spacing: 1px
      height: 15px
  /** upload button **/

  /** show photo **/
  .canvas-container
    display: flex
    justify-content: space-between
    align-items: center
    padding: 40px 0 25px 0
  /** show photo **/

  /** checkbox **/
  .checkbox
    display: flex
    justify-content: center
    width: 300px
    margin-bottom: 40px
    .con
      width: 50%
      display: flex
      justify-content: space-between
      div
        display: flex
        p
          margin-left: 10px
      .check
        width: 20px
        height: 20px
        background-color: aqua
      .no-check
        width: 20px
        height: 20px
        background-color: blanchedalmond
  /** checkbox **/
</style>
