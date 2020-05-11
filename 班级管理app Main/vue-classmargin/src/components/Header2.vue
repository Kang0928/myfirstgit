<template>
  <div class="header">
      <div class="tle">
          <slot name="left"></slot>
      </div>
      <div class="cio">
          <slot name="right"></slot>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Header2',
  props: {
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
.header {
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  height: 0.9rem;
  width: 100%;
  margin: 0 auto;
  background:#fff;
  font-size: 0.35rem;
  color:#666;
  padding-top:0.1rem;
  z-index:100;
  .tle{
    float: left;
    padding-left:4%;
  }
  .cio{
    float: right;
    padding-right: 4%;
  }
}
</style>
