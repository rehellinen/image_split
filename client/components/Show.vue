<template lang="pug">
  div.container
    subtitle(title="分割结果")
    div.canvas
      canvas(id="canvas" ref="canvas" :width="canvasWidth" :height="canvasHeight")
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
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      canvasWidth: 500,
      canvasHeight: 400
    }
  },
  watch: {
    data (newValue) {
      this.init()
      this.show()
    }
  },
  methods: {
    init () {
      const canvas = this.$refs.canvas
      this.ctx = canvas.getContext('2d')
      this.widthScale = this.canvasWidth/this.data.width
      this.heightScale = this.canvasHeight/this.data.height
      // 清空canvas
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    },
    show () {
      const that = this
      const img = new Image()
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
        let newX = Math.floor(this.widthScale * item[0])
        let newY = Math.floor(this.heightScale * item[1])
        this.ctx.fillRect(newX, newY, 1, 1)
      })
    },
    drawCenter (ctx) {
      this.ctx.fillStyle = '#00ff00'
      this.data.center.forEach(item => {
        let newX = Math.floor(this.widthScale * item.x)
        let newY = Math.floor(this.heightScale * item.y)
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
