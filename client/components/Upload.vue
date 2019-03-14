<template lang="pug">
  div.container
    subtitle(:title="status")
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
import axios from 'axios'
import Subtitle from './Subtitle'
import Show from './Show'
import {Http} from "../utils/Http"

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
    Subtitle,
    Show
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  .checkbox
    display: flex
    justify-content: center
    width: 100%
    margin-top: 15px
    margin-bottom: 15px
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
  .container
    display: flex
    flex-direction: column
    width: 100%
  .canvas-container
    display: flex
    justify-content: space-around
    align-items: center
  .upload
    position: relative
    display: flex
    align-items: center
    margin: 10px 10px
    height: 40px
    input
      position: absolute
      left: 0
      top: 0
      opacity: 0
      -ms-filter: 'alpha(opacity=0)'
      height: 40px
    .upload-button
      border-radius: 5px
      background-color: #738ffe
      color: white
      padding: 5px 0
      font-size: 10px
      width: 80px
      letter-spacing: 1px
      height: 15px
      display: flex
      justify-content: center
      align-items: center
</style>
