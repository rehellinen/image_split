<template lang="pug">
  div.container
    div.title
      p 上传图片
    div.upload
      img.uploadImage(:src="imageUrl" v-if="imageUrl")
      input(type="file" @change="uploadImage")
</template>

<script>
import axios from 'axios'

const requestUrl = 'http://127.0.0.1:9528/image'

export default {
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

      const res = await axios({
        url: requestUrl,
        method: 'post',
        data: formData,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      console.log(res)
    },
    showImage (file) {
      const fr = new FileReader()
      fr.onloadend = (e) => this.imageUrl = e.target.result
      fr.readAsDataURL(file)
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
      width: 300px
      height: 300px
</style>
