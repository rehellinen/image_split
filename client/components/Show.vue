<template lang="pug">
  div.container
    subtitle(title="分割结果")
    div.canvas
      canvas(id="canvas" ref="canvas" width="500" height="400")
</template>

<script>
import Subtitle from './Subtitle'

export default {
  props: {
    imageUrl: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    data (newValue) {
      this.show()
    }
  },
  methods: {
    show () {
      const canvas = this.$refs.canvas
      this.ctx = canvas.getContext('2d')
      this.canvasWidth = canvas.width
      this.canvasHeight = canvas.height
      // 清空canvas
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      // 显示
      const img = new Image()
      const that = this
      img.src = this.imageUrl
      img.onload = function () {
        // 载入原图
        that.ctx.drawImage(this, 0, 0, that.canvasWidth, that.canvasHeight)
        // 画边框
        that.drawBorder()
        // 画像素块的中心
        that.drawCenter()
      }
    },
    drawBorder () {
      this.ctx.fillStyle = '#fff'
      this.data.border.forEach(item => {
        let newX = Math.floor(this.canvasWidth/this.data.width * item[0])
        let newY = Math.floor(this.canvasHeight/this.data.height * item[1])
        this.ctx.fillRect(newX, newY, 1, 1)
      })
    },
    drawCenter (ctx) {
      this.ctx.fillStyle = '#00ff00'
      this.data.center.forEach(item => {
        let newX = Math.floor(this.canvasWidth/this.data.width * item.x)
        let newY = Math.floor(this.canvasHeight/this.data.height * item.y)
        this.ctx.fillRect(newX-2, newY-2, 4, 4)
      })
    }
  },
  components: {
    Subtitle
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  .container
    display: flex
    flex-direction: column
    width: 100%
    .canvas
      width: 100%
      display: flex
      justify-content: center
    canvas
      margin-top: 10px
</style>
