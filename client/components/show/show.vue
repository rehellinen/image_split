<template lang="pug">
  div.container
    div.canvas
      canvas(id="canvas" ref="canvas" :width="canvasWidth" :height="canvasHeight")
</template>

<script>

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
      canvasWidth: 300,
      canvasHeight: 300
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
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  .container
    display: flex
    justify-content: flex-end
    .canvas
      display: flex
      justify-content: flex-end
</style>
