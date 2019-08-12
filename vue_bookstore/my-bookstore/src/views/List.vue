<template>
  <div>
    <Header :isshow="true">列表页</Header>
    <div class="content">
      <ul class="container">
        <router-link v-for="(item,index) in allBooks"
                     :key="index"
                     tag="li"
                     :to="{name: 'detail', params: {id: item.bookId}}">
          <img :src="item.bookCover" alt="">
          <div class="right">
            <h4>{{item.bookName}}</h4>
            <p>{{item.bookInfo}}</p>
            <p></p>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
// import { getAllBooks, deleteBook, collectBook } from '../model/list'

export default {
  name: 'list',
  data () {
    return {
      allBooks: []
    }
  },
  components: {
    Header
  }
}
</script>
