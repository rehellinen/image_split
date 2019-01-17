<template lang="pug">
  div.container
    subtitle(title="上传照片")
    div.upload
      input(type="file" @change="processImage")
      div.upload-button
        p 点击上传
      div.upload-status
        p 状态：{{status}}
    div.canvas-container
      canvas(id="upload" ref="upload" :width="300" :height="300")
    show(:imageUrl="imageUrl" :data="data" v-show="status === '已完成'")
    div.checkbox
      div.con
        div
          div.check
          p 前景
        div
          div.no-check
          p 背景
</template>

<script>
import axios from 'axios'
import Subtitle from './Subtitle'
import Show from './Show'

const requestUrl = '/api/image'

export default {
  data () {
    return {
      imageUrl: '',
      status: '未上传',
      canvasWidth: 300,
      canvasHeight: 300,
      data: {}
    }
  },
  methods: {
    async processImage (event) {
      this.status = '处理中'
      const image = event.target.files[0]
      // 获取上传图片的URL
      const fr = new FileReader()
      fr.readAsDataURL(image)
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

      const img = new Image()
      img.src = this.imageUrl
      img.onload = function () {
        // 载入原图
        ctx.drawImage(this, 0, 0, that.canvasWidth, that.canvasHeight)
      }
    },
    async uploadImage (image) {
      let formData = new FormData()
      formData.append('image', image, 'test.jpg')
      const {data} = await axios({
        url: requestUrl,
        method: 'post',
        data: formData,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      this.status = '已完成'
      this.data = data.data
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
    justify-content: center
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
    .upload-status
      margin-left: 10%
</style>
