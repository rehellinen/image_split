<template lang="pug">
  div
    div.title
      p 上传图片
    input(type="file" @change="uploadImage")
</template>

<script>
import axios from 'axios'

const requestUrl = 'http://127.0.0.1:9528/image'

export default {
  methods: {
    async uploadImage (event) {
      const file = event.target.files[0]

      let formData = new FormData()
      formData.append('image', file, 'test.jpg')
      formData.append('action', 'jpg')
      try{
        const res = await axios({
          url: requestUrl,
          method: 'post',
          data: formData,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
.title
  background-color: #e0e0e0
  height: 40px
  display: flex
  align-items: center
  p
    margin-left: 7%
    color: #9e9e9e
    font-weight: bold
</style>
