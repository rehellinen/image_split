<template lang="pug">
  div.title
    p {{title}}
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  .title
    background-color: #e0e0e0
    height: 35px
    display: flex
    align-items: center
    p
      margin-left: 7%
      color: #9e9e9e
      font-weight: bold
      font-size: 11px
</style>
