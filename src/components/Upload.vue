<template lang="pug">
  div
    div.title
      p 上传图片
    input(type="file" @change="uploadImage")
</template>

<script>
export default {
  methods: {
    uploadImage (event) {
      this.file = event.target.files[0]
      let that = this

      const reader = new FileReader()
      reader.readAsArrayBuffer(this.file)
      reader.onload = function (e) {
        that.image = this.result
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
