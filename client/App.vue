<template lang="pug">
  div.wrap
    my-header
    upload
</template>

<script>
import Upload from './components/Upload'
import MyHeader from './components/header/header'

export default {
  components: {
    MyHeader,
    Upload
  }
}
</script>

<style lang="sass" rel="stylesheet/sass">
  @import "~sass/reset"
  @import "~sass/base"

  .wrap
    display: flex
    flex-direction: column
    align-items: center
    width: 100%
    min-height: 100vh
    padding-bottom: 10px
    color: $normal-font-color
    font-size: $normal-font-size
    background-color: $background-color
</style>
