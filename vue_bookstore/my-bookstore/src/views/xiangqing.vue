<template>
  <div class="xiangqing">
      <Header :isshow="true">详情信息</Header>
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
        </ul>
        <button @click="fn">确认修改</button>
      </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import { xiangqingbook, editbook } from '../model/getData' 

export default {
  name: 'xiangqing',
  data () {
      return {
          book:{}
      }
  },
  async created () {
      this.book = await xiangqingbook(this.$route.params.id)
  },
  components: {
    Header
  },
  methods: {
     async fn (bookid) {
      let isSuccess = await editbook(this.book)
      if(isSuccess.code === 0){
        alert(isSuccess.msg)
      }else{
        alert(isSuccess.msg)
      }
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
        display: block;
        width: 260px;
        height: 35px;
        font-size: 20px;
        padding-left: 15px;
        }
    }
    .btn {
      margin-left: 20px;
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