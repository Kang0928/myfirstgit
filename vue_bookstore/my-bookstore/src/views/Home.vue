<template>
  <div class="home">
      <Header>首页</Header>
      <Swiper :sliders='slidesAry' class="lunbotu"></Swiper>
      <div class="container">
        <h1>热门图书</h1>
        <ul>
          <li v-for="(book, index) in hotBooks" :key="index">
            <img :src="book.bookCover" alt="">
            <b>{{book.bookName}}</b>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Swiper from '../components/Swiper.vue' // 导入轮播图组件
import { getSliders, getHotBook } from '../model/getData' 

export default {
  name: 'home',
  data () {
      return {
          slidesAry:[],
          hotBooks:{}
      }
  },
  async created () {
      this.slidesAry = await getSliders()
      this.hotBooks = await getHotBook()
  },
  components: {
    Header,
    Swiper
  }
}
</script>

<style lang="less" scoped>
.home{
    .lunbotu{
        display: block;
        margin-top:40px;
        width: 100%;
        img{
            width: 100%;
        }
    }
    .container{
        margin-bottom: 50px;
        box-sizing: border-box;
        overflow-x: hidden;
        li{
        list-style: none;
        }
        h1 {
            margin:10px 0px;
            padding-left: 30px;
        }
        li {
            float: left;
            width: 50%;
            margin: 5px 5px;
            img {
                display: block;
            }
        }
    }
}
</style>