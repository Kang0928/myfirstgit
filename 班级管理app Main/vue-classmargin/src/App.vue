<template>
  <div id="app">
    <Tab></Tab>
    <router-view />
  </div>
</template>

<script>
import Tab from './components/Tab.vue'

export default {
  name: 'App',
  components: {
    Tab
  }
}
</script>

<style scoped>
  html{
    font-size: 100px;
  }
  * {
    margin: 0;
    padding: 0;
  }
  html,body,#app{
  height: 100%;
}
</style>