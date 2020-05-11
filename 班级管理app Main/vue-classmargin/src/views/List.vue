<template>
  <div class="list">
    <Header :isshow="false">通讯录</Header>
    <div class="content">
      <div class="division"></div>
      <mt-navbar v-model="selected">
        <mt-tab-item id="myteam">我的团队</mt-tab-item>
        <mt-tab-item id="myfriends">我的好友</mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="myteam">
            <!-- <div class="everyTeam">
              <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1382758313,3545874162&fm=26&gp=0.jpg" alt=""
                   class="everyTeam_left">
              <div class="everyTeam_right">
                <div class="right_teamName">第一个团队</div>
                <div class="right_teamId">id:1020</div>
              </div>
            </div> -->
            <div class="everyTeam" v-for="(myteamData,index) in myteamData.data" :key="index" v-if="everyTeamishow">
              <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1382758313,3545874162&fm=26&gp=0.jpg" alt=""
                   class="everyTeam_left">
              <div class="everyTeam_right">
                <div class="right_teamName">{{myteamData.teamName}}</div>
                <div class="right_teamId">team id: {{myteamData.teamId}}</div>
              </div>
               <div class="everyTeam_rightR"
                    v-if="+myteamData.teamFounderId == +userData.userId">
                <button @click="goSendingNotice(myteamData.teamId,myteamData.teamName)">发布通知</button>
              </div>
            </div>
            <div class="tips" v-if="!everyTeamishow">
              <div>你还没有加入任何团队,</div>
              <div>
                <span>快去</span>
                <span style="color:rgba(83, 158, 255, 0.959);"
                @click="goCreateTeam"> 创建团队 </span>
                <span>或</span>
                <span style="color:rgba(83, 158, 255, 0.959);"
                @click="goJoinTeam"> 加入团队 </span>
                <span>吧!</span>
              </div>
            </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="myfriends">
          <div class="everyTeam" v-for="(myFriendsData,index) in myFriendsData.data" :key="index" v-if="everyFriendsishow">
              <img src="../assets/notlogin.jpg" alt=""
                   class="everyTeam_left">
              <div class="everyTeam_right">
                <div class="right_teamName">{{myFriendsData.name}}</div>
                <div class="right_teamId">id: {{myFriendsData.id}}</div>
              </div>
            </div>
            <div class="tips" v-if="!everyFriendsishow">
              <div>你还没有添加好友,</div>
              <div>
                <span>快去</span>
                <span style="color:rgba(83, 158, 255, 0.959);"> 添加好友 </span>
                <span>吧!</span>
              </div>
            </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import { getMyteamData, getMyFriendsData } from "../model/loginData";

export default {
  name: "list",
  components: {
    Header
  },
  async created() {
    this.$store.state.showBottomNav = true;
    this.userData.userId = JSON.parse(localStorage.getItem("isLogin")).data.id; // 获取user的id信息 为创建团队做准备
    this.myteamData = await getMyteamData(this.userData.userId); // 通过用户id找到该用户所在的团队信息
    this.myFriendsData = await getMyFriendsData(this.userData.userId); // 通过用户id找到该用户的好友信息
    if(this.myteamData.code == 1){
      this.everyTeamishow = false;
    }
    if(this.myFriendsData.code == 1){
      this.everyFriendsishow = false;
    }
  },
  data() {
    return {
      selected: "myteam", // 默认展示myteam选项卡,
      everyTeamishow:true,
      everyFriendsishow:true,
      userData:{
        userId:''  
      },
      myteamData:{}, //获取团队信息
      myFriendsData:{}, //获取好友信息
    };
  },
  methods: {
    goCreateTeam () {
      this.$router.push('/CreateTeam')
    },
    goJoinTeam () {
      this.$router.push('/JoinTeam')
    },
    goSendingNotice(teamId,teamName){
      this.$router.push({ name:'SendingNotice' ,query:{teamId:teamId,teamName:teamName}});
    }
  }
};
</script>

<style>
.mint-tab-item-label{
  font-size:0.28rem!important;
  color:#666;
}
</style>
<style lang="less" scoped>
.content{
    position: relative;
    top: 0.8rem;
    margin-bottom: 1.3rem!important;
    width: 100%;
    .division {
      width: 100%;
      height: 0.15rem;
      background-color: rgb(243, 238, 238);
      margin:0 auto;
    }
    .everyTeam{
      width:100%;
      height:1rem;
      overflow: hidden;
      margin-top:0.3rem;
      padding-left:0.3rem;
      .everyTeam_left{
        float:left;
        display: block;
        width:1rem;
        height:1rem;
        border-radius: 50%;
      }
      .everyTeam_right{
        float:left;
        padding-left:0.3rem;
        .right_teamName{
          font-size: 0.29rem;
          padding-top:0.1rem;
          color: #660;
        }
        .right_teamId{
          font-size: 0.25rem;
          padding-top:0.1rem;
          color: #666;
        }
      }
      .everyTeam_rightR{
        float: right;
        padding-right:1rem;
        padding-top:0.3rem;
        button{
          width:1.2rem;
          text-align: center;
          margin:0 auto;
          background:#fff;
	        border-radius: 8%;
	        color: #666; 
          font-size: 0.26rem;
          border:1px solid #666;
        }
      }
    }
    .tips{
      width:100%;
      text-align:center;
      padding-top:30%;
      margin:auto;
      color:#666;
      font-size: 0.27rem;
    }
}
</style>