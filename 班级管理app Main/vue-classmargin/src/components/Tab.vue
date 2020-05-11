<template>
    <div class="footer"  v-if="$store.state.showBottomNav">
        <router-link to="/home">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shouye"></use>
            </svg>
            <span>首页</span>
        </router-link>
        <router-link to="/classes">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bangong"></use>
            </svg>
            <span>团队</span>
        </router-link>
        <router-link to="">
           <!-- 点击加号 -->
         <el-popover
    placement="top"
    trigger="click"
    class="addBtn"
    visible-arrow="false"
    >
    <div class="addDrop-down"> 
              <div class="addDrop_box" @click="goCreateTeam">
                <div class="addbox_left">
                  <svg aria-hidden="true" class="icon_2">
                    <use xlink:href="#icon-bangong"></use>
                  </svg>
                </div>
                <div class="addbox_right">创建团队</div>
              </div>
              <div class="addDrop_box"  style="padding-top:0.2rem;"
                   @click="goJoinTeam">
                <div class="addbox_left">
                  <svg aria-hidden="true" class="icon_2">
                    <use xlink:href="#icon-bangong"></use>
                  </svg>
                </div>
                <div class="addbox_right">加入团队</div>
              </div>
              <div class="addDrop_box" style="padding-top:0.2rem;">
                <div class="addbox_left">
                  <svg aria-hidden="true" class="icon_2">
                    <use xlink:href="#icon-bangong"></use>
                  </svg>
                </div>
                <div class="addbox_right">扫一扫</div>
              </div>
            </div>
    <el-button slot="reference" class="addbtn">
      <svg class="icon" aria-hidden="true">
       <use xlink:href="#icon-iconjia1"></use>
     </svg></el-button>
    </el-popover>
        </router-link>
        <router-link to="/list">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-tuandui"></use>
            </svg>
            <span>通讯录</span>
        </router-link>
        <router-link to="/user">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-wode1"></use>
            </svg>
            <span>我的</span>
        </router-link>
    </div>
</template>

<script>
export default {
  name: 'Tab',
  data () {
    return {
      
    }
  },
  methods: {
    goCreateTeam () {
      this.$router.push('/CreateTeam')
    },
    goJoinTeam () {
      this.$router.push('/JoinTeam')
    }
  }
}
</script>
<style> 
      .addDrop-down{
      height:1.9rem;
      }
      .addDrop_box{
        overflow: hidden;
        width:80%;
        height:0.5rem;
        margin:auto;
      }
        .addbox_left{
          float: left;
          width:0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background:rgba(219, 234, 255, 0.76);
          position: relative;
        }
          .addbox_left .icon_2{
            position: absolute;
            left:0;
            right:0;
            top:0;
            bottom:0;
            width:0.3rem;
            height:0.3rem;
            margin:auto;
            font-size:0.3rem;
            /* color:rgba(83, 158, 255, 0.959); */
          }
        .addbox_right{
          float: right;
          width:1.2rem;
          color:#666;
          font-size: 0.26rem;
          padding-top:0.05rem;
        }
</style>
<style lang="less">
.footer {
    width: 100%;
    height:1.3rem;
    position: fixed;
    left:0;
    bottom: 0px;
    background: #fff;
    display: flex;
    z-index:1000;
    a {
        padding-top:0.2rem;
        display: flex;
        flex-direction: column;
        flex: 1;
        align-items: center;
        font-size: 14px;
        text-decoration:none;
        color: #666;
    }
    .icon {
        font-size: 26px;
    }
    .router-link-active {
        color:rgba(83, 158, 255, 0.959);
    }
    .addBtn{
        position: absolute;
        top:-0.5rem;
        text-align: center;
        border-radius: 50%;
        .addbtn{
        border:5px solid #FFF;
        width:1.3rem;
        height: 1.3rem;
        border-radius: 50%;
        background: rgb(83, 157, 255);
        text-align: center;
        color:#fff;
        .icon{
          position: absolute;
          left:0;
          right:0;
          top:0;
          bottom:0;
          margin:auto;
          font-size: 0.5rem;
        }
        }
    }
}
</style>