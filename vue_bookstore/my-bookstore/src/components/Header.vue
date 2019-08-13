<template>
  <div class="header">
    <slot></slot>
    <i class="iconfont icon-fanhui"
       v-if="isshow"
       @click="goback"></i>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    isshow: {
      back: true
    }
  },
  props: ['isshow'],
  methods: {
    goback () {
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.header {
  overflow: hidden;
  position: fixed;
  top: 0px;
  left: 0px;
  height: 40px;
  width: 100%;
  background: lightblue;
  font-size: 20px;
  text-align: center;
  z-index: 100;
  padding-top:8px; 
}
.icon-fanhui {
  position: absolute;
  left:0;
  top:9px;
}
</style>
