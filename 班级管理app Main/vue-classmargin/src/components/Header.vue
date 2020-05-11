<template>
  <div class="header">
    <svg class="icon icontwo back" 
          aria-hidden="true"
          v-if="isshow"
          @click="goback">
            <use xlink:href="#icon-fanhui"></use>
         </svg>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    isshow: false
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
  top: 0;
  left: 0;
  height:0.6rem;
  width: 100%;
  background-color:#fff;
  font-size: 0.27rem;
  text-align: center;
  color: #727171;
  z-index: 100;
  padding-top:0.2rem; 
  .back{
    float: left;
    padding-left:0.04rem;
    padding-top:0.04rem;
  }
}
</style>
