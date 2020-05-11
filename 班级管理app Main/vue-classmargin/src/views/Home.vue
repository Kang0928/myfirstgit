<template>
  <div class="home">
    <Header2>
      <div slot="left">kk管理app</div>
      <div slot="right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wode1" />
        </svg>
      </div>
    </Header2>
    <div class="content">
      <div class="lunbotu">
        <Swiper :sliders="slidesAry" class="lunbotu"></Swiper>
      </div>
      <div class="fourBox">
        <div class="haveR FBox">
          <div class="fBox">
            <svg class="icon iconone" aria-hidden="true">
              <use xlink:href="#icon-meishi1" />
            </svg>
          </div>
          <div class="subheading">活动</div>
        </div>
        <div class="haveR FBox">
          <div class="fBox">
            <svg class="icon iconone" aria-hidden="true">
              <use xlink:href="#icon-xiuxianyule" />
            </svg>
          </div>
          <div class="subheading">栏目</div>
        </div>
        <div class="haveR FBox">
          <div class="fBox">
            <svg class="icon iconone" aria-hidden="true">
              <use xlink:href="#icon-meishi" />
            </svg>
          </div>
          <div class="subheading">报告</div>
        </div>
        <div class="haveR FBox">
          <div class="fBox">
            <svg class="icon iconone" aria-hidden="true">
              <use xlink:href="#icon-xiuxian" />
            </svg>
          </div>
          <div class="subheading">排行</div>
        </div>
        <div class="one_Box FBox">
          <div class="fBox">
            <svg class="icon iconone" aria-hidden="true">
              <use xlink:href="#icon-meishi1" />
            </svg>
          </div>
          <div class="subheading">活动</div>
        </div>
      </div>
      <div class="division"></div>
      <div class="hotspot">
        <div class="tle_home">
          <div class="tleh_left">实时热点</div>
          <div class="tleh_right">...</div>
        </div>
        <div class="home_newsBox">
          <!-- 左右滑动新闻块 -->
          <div class="news_fu">
            <!-- <div class="news_zi">
              <div class="zi_img">
                <img src="..\assets\logo.png" alt srcset />
              </div>
              <p>[假如重回校园]会有一个不一样的结局吗。</p>
            </div> -->
            <div class="news_zi" v-for="(newsH,index) in newsH"
                                 :key="index">
              <div class="zi_img">
                <img :src="newsH.newsImg" alt="" />
              </div>
              <p>{{newsH.newTle}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="division"></div>
      <div class="recommend" v-if="risshow">
        <div class="tle_home">
          <div class="tleh_left">为你推荐</div>
          <i class="tleh_right el-icon-close" @click="rnotshow()"></i>
        </div>
        <div class="recommend_src">
          <img src="..\assets\homeader.jpg" alt srcset />
        </div>
      </div>
      <div class="division" v-if="risshow"></div>
      <div class="recommend">
        <div class="tle_home">
          <div class="tleh_left">猜你喜欢</div>
          <i class="tleh_right"></i>
        </div>
        <div class="recommend_src">
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584695703805&di=42923f2627775d5813987fec41052e07&imgtype=0&src=http%3A%2F%2Fjoysoccer.cn%2Fhome%2F6%2F1%2Fis4hne%2Fresource%2F2018%2F07%2F03%2F5b3b307225cc1.jpg" alt srcset />
        </div>
      </div>
      <div class="division"></div>
      <div class="explain">
        <div class="tle_home">
          <div class="tleh_left">管理说明手册</div>
          <!-- <div class="tleh_right">...</div> -->
        </div>
        <div class="explainBox">
          <img src="..\assets\homeend.jpg" alt srcset />
          <div class="explainBox_exp">立即查看</div>
        </div>
      </div>
      <div class="division div_end"></div>
    </div>
  </div>
</template>

<script>
import Header2 from "../components/Header2.vue";
import Swiper from "../components/Swiper.vue"; // 导入轮播图组件
import { getSliders, getnewsH } from "../model/loginData";

export default {
  name: "home",
  data() {
    return {
      slidesAry: [],
      news: [],
      newsH: {}, //实时热点信息
      risshow: true, // 广告栏是否真实
    };
  },
  async created() {
    this.$store.state.showBottomNav = true;
    this.slidesAry = await getSliders();
    this.newsH = await getnewsH();
  },
  components: {
    Header2,
    Swiper
  },
  methods: {
    rnotshow(){
      this.risshow = false;
    }
  }
};
</script>

<style lang="less">
.content {
  position: relative;
  top: 1rem;
  margin-bottom: 1.3rem !important;
  width: 100%;
  .lunbotu {
    width: 96%;
    height: 3rem;
    margin: 0 auto;
    border-radius: 0.15rem;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .fourBox {
    width: 92%;
    height: 1.4rem;
    margin: 0 auto;
    overflow: hidden;
    padding-top: 0.3rem;
    .FBox {
      width: 0.9rem;
      height: 100%;
      float: left;
      overflow: hidden;
      .fBox {
        width: 0.9rem;
        height: 0.9rem;
        border-radius: 50%;
        text-align: center;
        font-size: 0.6rem;
        background: rgba(83, 158, 255, 0.959);
      }
      .subheading {
        margin-top: 0.2rem;
        font-size: 0.25rem;
        color: #727171;
        text-align: center;
        padding-left: 0.09rem;
      }
    }
    .haveR {
      margin-right: 0.6rem;
    }
    .FBox:hover {
      opacity: 0.5;
    }
  }
  .division {
    width: 100%;
    height: 0.15rem;
    background-color: rgb(243, 238, 238);
    margin: 0.3rem 0;
  }
  .div_end {
    margin-bottom: 0;
  }
  .hotspot {
    width: 92%;
    height: 3.1rem;
    margin: 0 auto;
    .home_newsBox {
      overflow: hidden;
      width: 100%;
      height: 2.6rem;
      .news_fu::-webkit-scrollbar {
        display: none;
      }
      .news_fu {
        width: 100%;
        height: 100%;
        overflow-x: scroll;
        white-space: nowrap;
        .news_zi {
          width: 2rem;
          height: 100%;
          // background: bisque;
          // border: 1px red solid;
          display: inline-block;
          margin-right: 0.2rem;
          vertical-align: top;
          white-space: normal;
          text-overflow: ellipsis;
          overflow: hidden;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          p {
            width: 100%;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
            -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
            -webkit-line-clamp: 2; /** 显示的行数 **/
            overflow: hidden; /** 隐藏超出的内容 **/
          }
          .zi_img {
            height: 1.7rem;
            width: 100%;
            margin-bottom: 0.1rem;
            img {
              width: 100%;
              height: 100%;
              display: block;
            }
            // .zi_title{
            //   // background: blueviolet;
            //   // width:100%;
            //   // height:0.5rem;
            //   // overflow: hidden;
            //   // word-wrap: break-word;
            //   // word-break: break-all;
            //   // text-overflow: ellipsis;
            //   // -webkit-box-orient:vertical;
            //   // -webkit-line-clamp:2!important;
            // }
          }
        }
      }
    }
  }
  .recommend {
    width: 92%;
    height: 1.9rem;
    margin: 0 auto;
    // border:1px solid green;
    .recommend_src {
      width: 100%;
      height: 1.5rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .explain {
    width: 92%;
    height: 4.2rem;
    margin: 0 auto;
    .explainBox {
      height: 3.6rem;
      width: 100%;
      img {
        height: 3rem;
        width: 100%;
      }
      .explainBox_exp {
        box-sizing: border-box;
        padding-top: 0.2rem;
        text-align: center;
        height: 0.4rem;
        width: 100%;
        font-size: 0.26rem;
        color: rgba(83, 158, 255, 0.959);
        font-weight: 600;
      }
    }
  }
  .tle_home {
    height: 0.5rem;
    font-size: 0.26rem;
    color: #727171;
    box-sizing: border-box;
    overflow: hidden;
    .tleh_left {
      float: left;
    }
    .tleh_right {
      float: right;
    }
  }
}
</style>