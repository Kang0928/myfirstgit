<template>
  <div class="user">
    <div class="container">
      <div class="user_header">
       <div class="user-back">
         <img src="../assets/user-back.jpg"  alt="" srcset="" >
       </div>
       <div class="user_login">
         <img :src="userImg" 
              class="user-touxiang" alt="" srcset=""
              @click="goLogin" >
         <div class="user-name" v-text="userName"></div>
       </div>
     </div>
      <div class="user-list">
        <div class="listbox">
          <svg class="icon iconone" aria-hidden="true">
            <use xlink:href="#icon-wode-copy"></use>
         </svg>
         <span>个人资料</span>
         <svg class="icon icontwo" aria-hidden="true">
            <use xlink:href="#icon-youjian"></use>
         </svg>
        </div>
        <div  class="listbox">
          <svg class="icon iconone" aria-hidden="true">
            <use xlink:href="#icon-guanyu"></use>
         </svg>
         <span>关于班级</span>
         <svg class="icon icontwo" aria-hidden="true">
            <use xlink:href="#icon-youjian"></use>
         </svg>
        </div>
        <div class="listbox">
          <svg class="icon iconone" aria-hidden="true">
            <use xlink:href="#icon-banji"></use>
         </svg>
         <span>账户与安全</span>
         <svg class="icon icontwo" aria-hidden="true">
            <use xlink:href="#icon-youjian"></use>
         </svg>
        </div>
        <div class="listbox" @click="outLogin">
          <svg class="icon iconone" aria-hidden="true">
            <use xlink:href="#icon-set-copy"></use>
         </svg>
         <span>退出登录</span>
         <svg class="icon icontwo" aria-hidden="true">
            <use xlink:href="#icon-youjian"></use>
         </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default {
  name: 'user',
  created() {
    this.$store.state.showBottomNav = true;
    let token = JSON.parse(localStorage.getItem('isLogin'));
    if(token.code === 0){
      this.userName = token.data.name;
      if(token.data.imageUrl){
      this.userImg = require(token.data.imageUrl)
    }
    }
  },
  components: {

  },
  data() {
    return {
      userImg: require('../assets/notlogin.jpg'),
      userName: "你好,请登录"
    }
  },
  methods: {
    goLogin () {
      this.$router.push('/login')
  },
    outLogin () {
      MessageBox.confirm('您确定要退出登陆吗?').then(action => {
      localStorage.setItem('isLogin', JSON.stringify({ 'code': 1 }));
        this.userImg= require('../assets/notlogin.jpg');
        this.userName= "你好,请登录";
        this.$message({
          type: 'success',
          message: '退出登录成功!'
        });
});
    }
}
}
</script>

<style lang="less">
// .el-message-box{
//   width:200px!important;
// }
.container{
  margin-bottom: 1.3rem;
  width: 100%;
  .user_header {
    width: 100%;
    height:4.2rem;
  .user-back{
    height:2.8rem;
    width: 100%;
    img{
      width:100%;
      height:100%;
    }
  }
 .user_login{
  position: absolute;
  left:50%;
  height: 2.3rem;
  width: 90%;
  transform:translate(-50%,-50%);
  background: white;
  z-index: 1000;
  border-radius: 3%;
  box-shadow: 0px 0px 10px 15px rgba(227, 228, 229, 0.418);
  .user-touxiang{
    display:block;
    border-radius: 50%;
    height:1rem;
    width:1rem;
    margin:0.3rem auto;
    overflow: hidden;
  }
  .user-name{
    text-align: center;
    color:#666;
    font-size: 0.3rem;
  }
}
}
.user-list{
  width: 92%;
  margin:0 auto;
  .listbox{
    height: 0.4rem;
    padding:0.25rem 0;
    font-size: 0.3rem;
    color:#666;
    overflow: hidden;
    .iconone{
      font-size: 0.4rem;
      float:left;
      padding-right:0.3rem;
    }
    .icontwo{
      font-size: 0.4rem;
      float:right;
    }
  }
}
}
</style>
