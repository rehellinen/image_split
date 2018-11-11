<template lang="pug">
  div.wrap
    top-title
    div.container.main-container
      upload
</template>

<script>
import Upload from './components/Upload'
import TopTitle from './components/Title'
export default {
  components: {
    Upload,
    TopTitle
  }
}
</script>

<style rel="stylesheet/sass">
  @import "./assets/css/reset.css";
.wrap{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: dimgray;
  background-color: #f5f5f5;
  min-height: 100vh;
  }
.container {
  width: 100%;
}
</style>
