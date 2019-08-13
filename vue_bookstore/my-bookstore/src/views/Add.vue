<template>
  <div class="add">
      <Header :isshow="true">添加</Header>
      <div class="container">
        <ul>
          <li>
            <label>书名</label>
            <input type="text" v-model="book.bookName" />
          </li>
          <li>
            <label>信息</label>
            <input type="text" v-model="book.bookInfo" />
          </li>
          <li>
            <label>价格</label>
            <input type="text" v-model="book.bookPrice" />
          </li>
          <li>
            <label>封面</label>
            <input type="text" v-model="book.bookCover" />
          </li>
        </ul>
        <button @click="fn">添加</button>
      </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import { addnewBook } from '../model/getData' 

export default {
  name: 'add',
  data () {
    return {
      book:{
        bookName:"",
        bookInfo:"",
        bookPrice:"",
        bookCover:""
      }
    }
  },
  components: {
    Header
  },
  methods: {
    fn(){
      addnewBook(this.book)
    }
  }
}
</script>