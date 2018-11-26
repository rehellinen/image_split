<template lang="pug">
  div.container
    subtitle(title="上传照片")
    div.upload
      input(type="file" @change="uploadImage")
      div.upload-button
        p 点击上传
      div.upload-status
        p 状态：{{status}}
    show(:imageUrl="imageUrl" :data="data" v-show="status === '已完成'")
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
      data: {}
    }
  },
  methods: {
    async uploadImage (event) {
      this.status = '处理中'
      const file = event.target.files[0]
      // 获取上传图片的URL
      const fr = new FileReader()
      fr.onloadend = (e) => this.imageUrl = e.target.result
      fr.readAsDataURL(file)
      // 图片上传至服务器
      let formData = new FormData()
      formData.append('image', file, 'test.jpg')
      const {data} = await axios({
        url: requestUrl,
        method: 'post',
        data: formData,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      this.status = '已完成'
      this.data = data.data
    },
  },
  components: {
    Subtitle,
    Show
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  .container
    display: flex
    flex-direction: column
    width: 100%
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
