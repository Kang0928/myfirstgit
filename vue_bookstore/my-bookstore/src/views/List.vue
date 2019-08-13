<template>
  <div class="list">
      <Header :isshow="true">列表</Header>
      <div class="container">
        <ul>
          <router-link v-for="(book, index) in listBooks"
                       tag="li"
                       :to="{name: 'xiangqing', params: {id: book.bookId}}"
                       :key="index">
            <img :src="book.bookCover" alt="">
            <h4>{{book.bookName}}</h4>
            <p>{{book.bookInfo}}</p>
            <p>{{book.bookPrice}}</p>
            <button class="btn" @click.stop="remove(book.bookId)">删除</button>
            <button class="btn" @click.stop="collect(book)">收藏</button>
          </router-link>
        </ul>
      </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import { getListBook, removeListBook, collectbook } from '../model/getData' 

export default {
  name: 'list',
  data () {
    return {
      listBooks: {}
    }
  },
  async created () {
    this.listBooks = await getListBook()
  },
  components: {
    Header
  },
  methods: {
    async remove (bookid) {
      this.listBooks = await removeListBook(bookid)
    },
    async collect (book) {
      let isSuccess = await collectbook (book)
      if(isSuccess.code === 0){
        alert(isSuccess.msg)
      }else{
        alert(isSuccess.msg)
      }
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