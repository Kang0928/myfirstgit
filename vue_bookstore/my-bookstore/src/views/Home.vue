<template>
  <div class="home">
    <Header>首页</Header>
    <div class="content">
      <swiper :sliders='slidesAry'></swiper>
      <div class="container">
        <h2>热门图书</h2>
        <ul>
          <li v-for="(book,index) in hotBooks" :key="index">
            <img :src="book.bookCover" alt="" srcset="">
            <b>{{book.bookName}}</b>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Swiper from '../components/Swiper.vue'
import { getSliders, getHotBook } from '../model/home.js' // 导入请求轮播图的方法

export default {
  name: 'home',
  data () {
    return {
      slidesAry: [],
      hotBooks: []
    }
  },
  async created () {
    this.slidesAry = await getSliders(),
    this.hotBooks = await getHotBook()
  },
  components: {
    Header,
    Swiper
  }
}
</script>

<style scoped lang="less">
.content{
  width: 100%;
}
</style>

