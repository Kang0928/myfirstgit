<template>
  <div class="collect">
      <Header :isshow="true">收藏</Header>
      <div class="container">
        <ul>
          <li v-for="(book, index) in book"
                       :key="index">
            <img :src="book.bookCover" alt="">
            <h4>{{book.bookName}}</h4>
            <p>{{book.bookInfo}}</p>
            <p>{{book.bookPrice}}</p>
            <button class="btn" @click.stop="remove(book.bookId)">删除</button>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import { getcollectbooks, delcollectbooks } from '../model/getData' 

export default {
  name: 'collect',
  data () {
    return {
      book:{}
    }
  },
  components: {
    Header
  },
  async created () {
    this.book = await getcollectbooks()
  },
  methods: {
    async remove(bookId){
      this.book = await delcollectbooks(bookId)
    }
  }
}
</script>

<style scoped lang="less">
  .container {
    margin-left:0px;
    margin-bottom: 50px;
    li {
      padding: 10px;
      overflow: hidden;
      img {
        float: left;
        width: 160px;
      }
        .btn {
          border: none;
          border-radius: 5px;
          width: 60px;
          height: 30px;
          color: #fff;
          font-size: 18px;
          background: red;
        }
    }
  }
</style>