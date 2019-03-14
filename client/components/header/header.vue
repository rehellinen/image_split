<template lang="pug">
  div.container
    // 上方LOGO
    div.header
      div
        div.main-icon
          .block
        span.yellow rehe
        span.black llinen


    // TITLE
    div.sub-header
      p.name 交互式图像分割
</template>

<script>
  export default {
  }
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~sass/base"

  /** header icon **/
  .main-icon
    display: inline-block
    width: 15px
    height: 15px
    transform: rotate(90deg)
    background-color: $theme-color
    margin-right: 15px
    .block
      background-color: white
      width: 10px
      height: 10px
  span
    font-weight: bold
    color: $theme-color
    font-size: $vast-font-size
    letter-spacing: 2px
    .black
      color: $normal-font-color
  /** header icon **/


  .container
    display: flex
    flex-direction: column
    width: 100%
    .header
      display: flex
      align-items: center
      height: 105px
      padding: 0 10%
    .sub-header
      padding: 0 10%
      height: 70px
      background-color: $theme-color
      display: flex
      align-items: center
      justify-content: space-between
      .name
        font-size: $big-font-size
        font-weight: bold
        letter-spacing: 1px
        color: white
  .de
</style>
