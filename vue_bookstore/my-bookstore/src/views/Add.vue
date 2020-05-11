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
        <button @click="fn" class="btn">添加</button>
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
      this.$router.push('/list')
    }
  }
}
</script>

<style lang="less" scoped>
.container{
    margin-top:60px;
    li{
        list-style: none;
        margin:20px 0px;
        font-size: 20px;
        font-weight: bold;
        input{
        margin:10px 0px;
        display: block;
        width: 260px;
        height: 35px;
        font-size: 20px;
        padding:0px 15px;
        }
    }
    .btn {
      margin-left:40px;
      border: none;
      border-radius: 8px;
      display: block;
      width: 260px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 20px;
      color: #fff;
      background: red;
    }
}
</style>