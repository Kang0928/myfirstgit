<template>
  <div class="JoinTeam">
    <Header :isshow="true">加入团队</Header>
    <div class="JoinTeamBox">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="2rem"
        class="demo-ruleForm"
      >
        <el-form-item label="团队id" prop="teamId" class="jt_box1">
          <el-input v-model.number="ruleForm.teamId" class="box1_inp" placeholder="请输入团队id"></el-input>
        </el-form-item>
        <el-form-item class="jt_box2">
          <el-button type="primary" @click="submitForm('ruleForm')" class="box2_btn1" icon="el-icon-search">搜索</el-button>
          <el-button @click="resetForm('ruleForm')" class="box2_btn2">重置</el-button>
        </el-form-item>
      </el-form>
      <el-card class="box-card" v-if="isshow">
        <!-- <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div> -->
        <div>为您搜到 :</div>
        <div>{{'团队ID : '+getTeamData.teamId}}</div>
        <div>{{'团队昵称 : '+getTeamData.teamName}}</div>
        <div>{{'团队类型 : '+getTeamData.teamType}}</div>
      </el-card>
      <el-row v-if="isshow">
        <el-button type="primary" class="joinBtn" @click="joinTeamFn()">加入团队</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import { searchTeam,joinTeam } from "../model/loginData"; // ajax方法导入

export default {
  name: "JoinTeam",
  components: {
    Header
  },
  created() {
    this.$store.state.showBottomNav = false;
    this.userData.userId = JSON.parse(localStorage.getItem("isLogin")).data.id; // 获取user的id信息 为加入团队做准备
  },
  data() {
    return {
      isshow:false,
      ruleForm: {
        teamId: ""
      },
      userData: {
        userId: ""
      },
      getTeamData: {
        teamId: "",
        teamName: "",
        teamType: ""
      },
      rules: {
        teamId: [
          { required: true, message: "请输入团队id", trigger: "blur" },
          {
            type: "number",
            min: 1,
            max: 9999,
            message: "必须为1-9999数字值",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        const that = this; // 下面要用到的this指向性错误 提前定义一下
        if (valid) {
          (async function(ruleForm) {
            let searchTeamData = await searchTeam({
              searchId: ruleForm.teamId
            });
            if (searchTeamData.code == 0) {
              console.log(searchTeamData);
              that.getTeamData.teamId = searchTeamData.data.teamId;
              that.getTeamData.teamName = searchTeamData.data.teamName;
              // 对应一下团队类型
              switch(searchTeamData.data.teamType){
                case 'education':
                that.getTeamData.teamType = '教育团队';
                break;
                case 'enterprise':
                that.getTeamData.teamType = '企业团队';
                break;
                case 'OtherClassification':
                that.getTeamData.teamType = '其他团队';
                break;
                default :
                that.getTeamData.teamType = searchTeamData.data.teamType;
              }
              that.isshow = true;
              // that.$router.push("/classes"); // 成功后跳转到团队页面
            } else {
              that.$message.error(searchTeamData.msg);
            }
          })(this.ruleForm);
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async joinTeamFn(){
      let JoinTeamData = await joinTeam({
              joinTeamId: this.getTeamData.teamId,
              userId:this.userData.userId
            });
            console.log(JoinTeamData);
      if(JoinTeamData.code == 0){
         this.$message({
          message: '已成功加入该团队',
          type: 'success'
        });
        this.$router.push("/list"); // 成功后跳转到团队页面
      }else{
         this.$message.error(JoinTeamData.msg);
      }
    }
  }
};
</script>
<style>
.el-input__inner {
  border: none !important;
}
</style>
<style lang="less" scoped>
.JoinTeamBox {
  position: absolute;
  box-sizing: border-box;
  top: 0.8rem;
  width: 100%;
  height: 100%;
  background-color: #f1f1f1;
  padding-top: 0.8rem;
  .jt_box1 {
    background: #fff;
    .box1_inp {
      width: 5rem;
    }
  }
  .jt_box2 {
    padding-top: 0.4rem;
    width: 100%;
    .box2_btn1 {
      width: 2rem;
    }
    .box2_btn2 {
      width: 1.5rem;
    }
  }
   .box-card {
    width: 100%;
  }
  .joinBtn{
    margin-top:0.7rem;
    margin-left:37%;
  }
}
</style>