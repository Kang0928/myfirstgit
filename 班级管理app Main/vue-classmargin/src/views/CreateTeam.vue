<template>
  <div class="CreateTeam">
    <Header :isshow="true">创建团队</Header>
    <div class="CreateTeamBox">
      <el-form
        :model="CreateTeamData"
        :rules="rules"
        ref="CreateTeamData"
        label-width="2rem"
        class="demo-CreateTeamData"
      >
        <el-form-item label="团队昵称" prop="name" class="ct_box1" >
          <el-input v-model="CreateTeamData.name" class="box1_inp"  placeholder="请输入团队昵称"></el-input>
        </el-form-item>
        <el-form-item label="团队类型" prop="type" class="ct_box1">
          <el-select v-model="CreateTeamData.type" placeholder="请选择团队类型" class="box1_inp">
            <el-option label="教育团队" value="education"></el-option>
            <el-option label="企业团队" value="enterprise"></el-option>
            <el-option label="其他团队" value="OtherClassification"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="ct_box2">
          <el-button type="primary" @click="submitForm('CreateTeamData')" class="box2_btn1">立即创建</el-button>
          <el-button @click="resetForm('CreateTeamData')" class="box2_btn2">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import { getCTData } from "../model/loginData"; // ajax方法导入

export default {
  name: "CreateTeam",
  components: {
    Header
  },
  created() {
    this.$store.state.showBottomNav = false;
    this.userData.userId = JSON.parse(localStorage.getItem("isLogin")).data.id; // 获取user的id信息 为创建团队做准备
  },
  data() {
    return {
      CreateTeamData: {
        name: "",
        type: ""
      },
      userData:{
        userId:''  
      },
      rules: {
        name: [
          { required: true, message: "请输入团队昵称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择团队类型", trigger: "change" }
        ]
      }
    };
  },
  methods: {
     submitForm(formName) {
      this.$refs[formName].validate(valid => {
        const that = this; // 下面要用到的this指向性错误 提前定义一下
        if (valid) {
          (async function(CreateTeamData,userData){
            let toTeamData = await getCTData({
              teamName: CreateTeamData.name,
              teamType: CreateTeamData.type,
              teamFounderId:userData.userId
            });
            if(toTeamData.code == 0){
               that.$message({
                message: toTeamData.msg,
                type: 'success'
                });
              that.$router.push("/list"); // 成功后跳转到团队页面
            }else{
              that.$message.error(toTeamData.msg);
            }
          })(this.CreateTeamData,this.userData);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style>
.el-input__inner{
        border:none!important;
}
</style>
<style lang="less" scoped>
.CreateTeamBox {
  position: absolute;
  box-sizing: border-box;
  top: 0.8rem;
  width: 100%;
  height: 100%;
  background-color: #F1F1F1;
  padding-top: 0.8rem;
  .ct_box1{
    background:#fff;
    .box1_inp{
        width:5rem;
    }
  }
  .ct_box2{
      padding-top: 0.4rem;
      width: 100%;
    .box2_btn1{
        width:2rem;
    }
    .box2_btn2{
        width:1.5rem;
    }
  }
}
</style>