<template>
  <div class="classes">
    <Header :isshow="false">工作台</Header>
    <div class="contenta">
      <div class="division"></div>
      <mt-navbar v-model="selected">
        <mt-tab-item id="allNotice">全部通知</mt-tab-item>
        <mt-tab-item id="notComplete">
          <span>未完成&nbsp;</span>
          
          <mt-badge type="error" size="small" v-if="Ncompleted">{{Ncompleted}}</mt-badge>
        </mt-tab-item>
        <mt-tab-item id="complete">已完成</mt-tab-item>
      </mt-navbar>
      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="allNotice">
          <div class="noticeBox" v-for="(thisNotice,index) in noticeAll" :key="index">
            <div class="noticebox">
              <div class="noticebox_jiazi">
                <img src="../assets/jiazi.png" alt srcset />
              </div>
              <div class="noticebox_top">
                <span class="noticebox_teamName">团队昵称&nbsp;:&nbsp;</span>
                <span class="noticebox_teamName" style="color:black;">{{thisNotice.teamName}}</span>
                <span class="noticebox_time">{{thisNotice.thisTime}}</span>
              </div>
              <div  class="noticebox_contant">
                <div class="noticebox_contantB">通知内容&nbsp;:&nbsp;</div>
              <div class="noticebox_contantA">{{thisNotice.textContent}}</div>
              </div>
              <div class="noticebox_bottom">
                <span class="noticebox_endTime">截止时间&nbsp;:&nbsp;</span>
                <span class="noticebox_endTime"  style="color:black;">{{thisNotice.deadLine}}</span>
                <div
                :class="{'noticebox_isHave':thisNotice.isReceived,'noticebox_notHave':!thisNotice.isReceived}"
                  v-if="thisNotice.isReceipt=='true'"
                  @click="ChangeIsReceived(thisNotice.isReceived,thisNotice.noticeId,thisNotice.teamId,index)"
                >
                  <i class="el-icon-star-off"></i>
                  <span>{{thisNotice.isReceived?'已收到':'收到'}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="tips" v-if="!noticeBoxishow1">
            <div>暂无通知</div>
          </div>
          <div class="tips" v-if="!noticeBoxishow2">
            <div>你还没有加入任何团队,</div>
            <div>
              <span>快去</span>
              <span style="color:rgba(83, 158, 255, 0.959);" @click="goCreateTeam">创建团队</span>
              <span>或</span>
              <span style="color:rgba(83, 158, 255, 0.959);" @click="goJoinTeam">加入团队</span>
              <span>吧!</span>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="notComplete">
            <div v-for="(thisNotice,index) in noticeAll" :key="index"
               v-if="isNotComplete(thisNotice.notCompleted)">
            <div class="noticeBox" >
            <div class="noticebox">
              <div class="noticebox_top">
                <span class="noticebox_teamName">团队昵称&nbsp;:&nbsp;</span>
                <span class="noticebox_teamName" style="color:black;">{{thisNotice.teamName}}</span>
                <span class="noticebox_time">{{thisNotice.thisTime}}</span>
              </div>
              <div  class="noticebox_contant">
                <div class="noticebox_contantB">通知内容&nbsp;:&nbsp;</div>
              <div class="noticebox_contantA">{{thisNotice.textContent}}</div>
              </div>
              <div class="noticebox_bottom">
                <span class="noticebox_endTime">截止时间&nbsp;:&nbsp;</span>
                <span class="noticebox_endTime" style="color:black;">{{thisNotice.deadLine}}</span>
                <div class="noticebox_isHave" style="color:red;"
                @click="ChangeNotCompeted(thisNotice.noticeId,thisNotice.teamId,index)"
                >
                  <i class="el-icon-success"></i>
                  <span>&nbsp;完成</span>
                </div>
                <div class="noticebox_isHave" style="margin-right:0.3rem;"
                     @click="releaseComment(thisNotice.teamId,thisNotice.noticeId,index)">
                  <span>评论</span>
                </div>
              </div>
            </div>
          </div>
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item 
            :title="'完成情况 '+thisNotice.completed.length+'/'+thisNotice.teamMembersId.length" name="1">
            <div v-if="thisNotice.completed.length">
              <span>id为 : </span>
            <span  v-for="(thisUser,index3) in thisNotice.completed" :key="index3">{{thisUser+' '}}</span>
            <span>已完成</span>
            </div>
              <div v-if="!thisNotice.completed.length">
                <span>暂无人完成</span>
              </div>
            </el-collapse-item>
            <el-collapse-item :title="'评论 '+thisNotice.comment.length+'条'" name="2">
              <div class="everyComment" 
                   v-for="(thisComment,index2) in thisNotice.comment" :key="index2">
                <span class="everyComment_left">{{thisComment.userName}}&nbsp;:&nbsp;</span>
                <span class="everyComment_right">{{thisComment.commentValue}}</span>
              </div>
            </el-collapse-item>
          </el-collapse>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="complete">
                    <div v-for="(thisNotice,index) in noticeAll" :key="index"
               v-if="isComplete(thisNotice.completed)">
            <div class="noticeBox" >
            <div class="noticebox">
              <div class="noticebox_top">
                <span class="noticebox_teamName">团队昵称&nbsp;:&nbsp;</span>
                <span class="noticebox_teamName" style="color:black;">{{thisNotice.teamName}}</span>
                <span class="noticebox_time">{{thisNotice.thisTime}}</span>
              </div>
              <div  class="noticebox_contant">
                <div class="noticebox_contantB">通知内容&nbsp;:&nbsp;</div>
              <div class="noticebox_contantA">{{thisNotice.textContent}}</div>
              </div>
              <div class="noticebox_bottom">
                <span class="noticebox_endTime">截止时间&nbsp;:&nbsp;</span>
                <span class="noticebox_endTime" style="color:black;">{{thisNotice.deadLine}}</span>
                <div class="noticebox_isHave" >
                  <i class="el-icon-success"></i>
                </div>
                <div class="noticebox_isHave" style="margin-right:0.3rem;"
                     @click="releaseComment(thisNotice.teamId,thisNotice.noticeId,index)">
                  <span>评论</span>
                </div>
              </div>
            </div>
          </div>
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item 
            :title="'完成情况 '+thisNotice.completed.length+'/'+thisNotice.teamMembersId.length" name="1">
            <div v-if="thisNotice.completed.length">
              <span>id为 : </span>
            <span  v-for="(thisUser,index3) in thisNotice.completed" :key="index3">{{thisUser+' '}}</span>
            <span>已完成</span>
            </div>
              <div v-if="!thisNotice.completed.length">
                <span>暂无人完成</span>
              </div>
            </el-collapse-item>
            <el-collapse-item :title="'评论 '+thisNotice.comment.length+'条'" name="2">
              <div class="everyComment" 
                   v-for="(thisComment,index2) in thisNotice.comment" :key="index2">
                <span class="everyComment_left">{{thisComment.userName}}&nbsp;:&nbsp;</span>
                <span class="everyComment_right">{{thisComment.commentValue}}</span>
              </div>
            </el-collapse-item>
          </el-collapse>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import { getNoticeData, changeIsReceived, changeComment ,ChangeNotCompeted} from "../model/loginData";
import { MessageBox } from 'mint-ui'

export default {
  name: "classes",
  components: {
    Header
  },
  async created() {
    this.$store.state.showBottomNav = true;
    this.userData.userId = JSON.parse(localStorage.getItem("isLogin")).data.id; // 获取user的id信息 为创建团队做准备
    let noticeAll = await getNoticeData(this.userData.userId);
    if (noticeAll.code) {
      // 当返回值为 1 或 2 时
      if (noticeAll.code == 1) {
        this.noticeBoxishow1 = false;
      }
      if (noticeAll.code == 2) {
        this.noticeBoxishow2 = false;
      }
    } else {
      // 当返回值为 0 时
      this.noticeAll = noticeAll.data.sort((a, b) => {
        return +b.sortTime - +a.sortTime;
      }); /* 从大到小 */
    }
    console.log(this.noticeAll);
    // 计算未完成的数量
    let that=this;
    this.noticeAll.forEach(function(item,index,noticeAll){
        item.notCompleted.forEach(function(item1,index1,noticeAll1){
          if(+item1 === +that.userData.userId){
            that.Ncompleted++;
          }
        })
    })
    console.log("未完成:"+this.Ncompleted);
  },
  data() {
    return {
      userData: {
        userId: ""
      },
      selected: "allNotice", // 默认展示allNotice选项卡,
      noticeBoxishow1: true,
      noticeBoxishow2: true,
      noticeAll: {}, // 获取到的通知信息
      activeName: "",
      Ncompleted:0
    };
  },
  methods: {
    goCreateTeam() {
      this.$router.push("/CreateTeam");
    },
    goJoinTeam() {
      this.$router.push("/JoinTeam");
    },
    async ChangeIsReceived(isReceived, noticeId, teamId, index) {
      // 参数分别为:是否收到 通知id 团队id 本页面通知信息的索引
      // 先判断isReceived此时是true false
      if (!isReceived) {
        this.noticeAll[index].isReceived = true;
        this.noticeAll[index].notCompleted.push(this.userData.userId);
        // console.log(isReceived,noticeId,teamId,index);
        let returnV = await changeIsReceived({
          teamId: teamId,
          noticeId: noticeId,
          userId: this.userData.userId
        });
        console.log(returnV);
        this.getNcompleted();
      }
    },
    isNotComplete(notCompletedArry){ // 判断 未完成 页面有哪些信息
      let a = notCompletedArry.find(item => +item === +this.userData.userId);
      return a;
    },
    async releaseComment(teamId,noticeId,index){
      // 参数分别为:团队id 通知id 本页面通知信息的索引
      let that = this;
      MessageBox.prompt('请输入你的评论').then(({ value, action }) => {
        (async function(teamId,noticeId,userId,value,userName){
          let returnV = await changeComment({
          teamId: teamId,
          noticeId: noticeId,
          userId:userId,
          userName:userName,
          commentValue:value
        });
        console.log(returnV);
        that.noticeAll[index].comment = returnV.data;
          })(teamId,noticeId,this.userData.userId,value,JSON.parse(localStorage.getItem("isLogin")).data.name);
      });
    },
    getNcompleted(){
      // 计算未完成的数量
      this.Ncompleted=0;
    let that=this;
    this.noticeAll.forEach(function(item,index,noticeAll){
        item.notCompleted.forEach(function(item1,index1,noticeAll1){
          if(+item1 === +that.userData.userId){
            that.Ncompleted++;
          }
          
        })
    })
    console.log("未完成:"+this.Ncompleted);
    },
    async ChangeNotCompeted(noticeId,teamId,index){
      // 参数分别为:通知id 团队id 该通知的索引
      // 将未完成里的userId删除 向完成里添加userId
        let Inx = this.noticeAll[index].notCompleted.findIndex(item=>+item === +this.userData.userId);
        this.noticeAll[index].notCompleted.splice(Inx,1);
        this.noticeAll[index].completed.push(+this.userData.userId);
      // 同步信息到数据库
        let returnV = await ChangeNotCompeted({
          teamId: teamId,
          noticeId: noticeId,
          userId: this.userData.userId
        });
        console.log(returnV);
        console.log(this.noticeAll);
        this.getNcompleted();
    },
    isComplete(CompletedArry){ // 判断 未完成 页面有哪些信息
      let a = CompletedArry.find(item => +item === +this.userData.userId);
      return a;
    },
  }
};
</script>

<style>
html, body {
    margin: auto;
    height: 100%;
}
.classes{
  height:100%;
  background:rgb(243, 238, 238);
}
.mint-tab-item-label {
  font-size: 0.28rem !important;
  color: #666 !important;
}
.el-collapse {
  width: 91%;
  margin: 0 auto;
}
.el-collapse-item__header {
  height: 0.6rem !important;
  color: rgb(156, 155, 155)!important;
  padding-left:0.2rem;
}
</style>
<style lang="less" scoped>

.contenta {
  min-height:100%;
  position: relative;
  top: 0.8rem;
  margin-bottom: 1.3rem !important;
  width: 100%;
  .division {
    width: 100%;
    height: 0.15rem;
    background-color: rgb(243, 238, 238);
    margin: 0 auto;
  }
  .noticeBox {
    width: 100%;
    height: 3rem;
    position: relative;
    overflow: hidden;
    background:rgb(243, 238, 238);
    .noticebox {
      position: absolute;
      box-sizing: border-box;
      padding: 0.2rem;
      right: 0;
      left: 0;
      bottom: 0;
      margin: auto;
      width: 92%;
      height: 2.6rem;
      border: 2px solid rgb(243, 238, 238);
      border-radius: 3%;
      box-shadow: 0px 0px 20px rgb(243, 238, 238);
      color: rgb(156, 155, 155);
      font-size: 0.28rem;
      background: #ffffff;
      .noticebox_jiazi {
        position: absolute;
        top: -0.3rem;
        left: -0.1rem;
        width: 1.2rem;
        height: 0.7rem;
        img{
          width:50%;
          height:50%;
        }
      }
      .noticebox_top {
        overflow: hidden;
        .noticebox_teamName {
          float: left;
        }
        .noticebox_time {
          float: right;
        }
      }
      .noticebox_contant{
        width:100%;
        overflow: hidden;
        height: 1.3rem;
        border-top: 0.5px solid rgb(243, 238, 238);
        .noticebox_contantB{
        float: left;
        // background: blueviolet;
        width: 21.5%;
        height: 1.3rem;
      }
      .noticebox_contantA {
        float: left;
        width: 78.5%;
        height: 1.3rem;
        overflow: auto;
        word-break: break-all;
        font-size: 0.3rem;
        color:black;
        // background: blanchedalmond;
      }
      }
      
      .noticebox_bottom {
        overflow: hidden;
        .noticebox_endTime {
          float: left;
        }
        .noticebox_isHave {
          border: 1px solid rgb(243, 238, 238);
          border-radius: 9%;
          float: right;
          width: 1.2rem;
          text-align: center;
          margin: 0 auto;
          color:rgb(156, 155, 155);
          background:#fff;
        }
        .noticebox_notHave{
          border: 1px solid rgba(83, 158, 255, 0.959);
          border-radius: 9%;
          float: right;
          width: 1.2rem;
          text-align: center;
          margin: 0 auto;
          color:#fff;
          background: rgba(83, 158, 255, 0.959);
        }
      }
    }
  }
  .tips {
    width: 100%;
    text-align: center;
    padding-top: 30%;
    margin: auto;
    color: #666;
    font-size: 0.27rem;
  }
}
</style>