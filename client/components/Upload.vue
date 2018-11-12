<template lang="pug">
  div
    div.title
      p 上传图片
    input(type="file" @change="uploadImage")
</template>

<script>
import {ProcessData} from "../utils/ProcessData"
import {MnistData} from "../utils/data"

export default {
  async created () {
    let data = new MnistData()
    await data.load()
  },
  methods: {
    uploadImage (event) {
      this.file = event.target.files[0]

      const reader = new FileReader()
      reader.readAsArrayBuffer(this.file)
      reader.onload = function (e) {
        (new ProcessData(this.result)).process()
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
