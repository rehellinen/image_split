<template lang="pug">
  div.container
    div.title
      p 上传图片
    div.upload
      img.uploadImage(:src="imageUrl" v-if="imageUrl")
      input(type="file" @change="uploadImage")
    div.canvas
      canvas(id="canvas" ref="canvas" width="500" height="400")
</template>

<script>
import axios from 'axios'

const requestUrl = '/api/image'

export default {
  async created () {
    const {data} = await axios({
      url: '/api/test',
      method: 'get'
    })
    this.showBorder(data.data)
  },
  data () {
    return {
      imageUrl: '',
      imageStyle: ''
    }
  },
  methods: {
    async uploadImage (event) {
      const file = event.target.files[0]

      // 显示上传的图片
      this.showImage(file)

      let formData = new FormData()
      formData.append('image', file, 'test.jpg')

      const {data} = await axios({
        url: requestUrl,
        method: 'post',
        data: formData,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      this.showBorder(data.data)
    },
    showImage (file) {
      const fr = new FileReader()
      fr.onloadend = (e) => this.imageUrl = e.target.result
      fr.readAsDataURL(file)
    },
    showBorder (data) {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#0000ff'

      data.border.forEach(item => {
        let newX = Math.floor(500/data.width * item[0])
        let newY = Math.floor(500/data.height * item[1])
        ctx.fillRect(newX, newY, 1, 1)
      })

      ctx.fillStyle = '#00ff00'
      console.log(data.center)
      data.center.forEach(item => {
        let newX = Math.floor(500/data.width * item.x)
        let newY = Math.floor(500/data.height * item.y)
        ctx.fillRect(newX-3, newY-3, 6, 6)
      })
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  .container
    display: flex
    flex-direction: column
    width: 100%
  .title
    background-color: #e0e0e0
    height: 40px
    display: flex
    align-items: center
    p
      margin-left: 7%
      color: #9e9e9e
      font-weight: bold
  .upload
    display: flex
    .uploadImage
      width: 500px
      height: 500px
</style>
