<template>
  <div class="login">
    <Header :isshow="true">登录</Header>
      <div class="login_main">
        <img src="../assets/pig.png" 
             class="pigImg" alt="" srcset="">
      <el-form
        :model="ruleForm2"
        status-icon
        :rules="rules2"
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model.number="ruleForm2.username" class="reginput"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" autocomplete="off" class="reginput"></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
      <u class="register"
         @click="goRegister">没有账户?快来注册</u>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import { getLogin } from "../model/loginData"; // ajax方法导入

export default {
  name: 'login',
  components: {
    Header
  },
  created() {
            this.$store.state.showBottomNav = false
    },
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      imageUrl: '',
      ruleForm2: {
        pass: "",
        username: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  methods: {
    async submitForm(formName) {
      if (
        this.ruleForm2.username &&
        this.ruleForm2.pass 
      ) {
        let loginData = await getLogin({
          userName: this.ruleForm2.username,
          userPassword: this.ruleForm2.pass
        });
        this.$store.commit("changeOsLogin", loginData);
        localStorage.setItem("isLogin", JSON.stringify(loginData));
        if (JSON.parse(localStorage.getItem("isLogin")).code == "0") {
          this.$message({
            message: loginData.msg,
            type: "success"
          });
          this.$router.push("/user");
        } else {
          this.$message({
            message: loginData.msg,
            type: "warning"
          });
        }
      } else {
        this.$message({
          message: "请输入用户名和密码",
          type: "warning"
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goRegister () {
      this.$router.push('/register')
  }
  }
}
</script>

<style lang="less">
.login{
  position: relative;
  top: 0.8rem;
  margin-bottom: 1.3rem!important;
  width: 100%;
  height:100%;
  .login_main {
  width: 100%;
  margin-top:1.5rem;
  .pigImg{
    width:1.5rem;
    height:1rem;
    display: block;
    margin:0 auto;
    padding-bottom:0.8rem;
  }
  .reginput {
    width: 80%;
  }
  .btn{
    margin-top:0.6rem;
    margin-left:0.5rem;
  }
  .register{
    display: block;
    color:#666;
    font-size: 0.3rem;
    text-align: center;
  }
}
}

</style>