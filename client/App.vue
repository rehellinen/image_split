<template lang="pug">
  div.wrap
    top-title
    upload
    show
</template>

<script>
import Upload from './components/Upload'
import TopTitle from './components/Title'
import Show from './components/Show'

export default {
  components: {
    Upload,
    TopTitle,
    Show
  }
}
</script>

<style>
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
</style>
