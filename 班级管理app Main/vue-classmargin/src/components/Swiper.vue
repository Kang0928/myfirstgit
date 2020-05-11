<template>
  <swiper :options="swiperOptions" >
    <swiper-slide v-for="(item,index) in sliders" :key="index">
      <img :src="item" />
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <!--这个是轮播图上的小点点-->
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "Swiper",
  data() {
    return {
      swiperOptions: {
        loop: false,
        autoplay: {
          delay: 2500,
          disableOnInteraction: true // 当用户用手滑动轮播图停止自动轮播
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  },
  props: ["sliders"],
  components: {
    swiper,
    swiperSlide
  }
};
</script>

<style scoped>
.img {
  width: 100%;
}
</style>
