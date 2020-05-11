<template>
  <div class="register">
    <Header :isshow="true">注册</Header>
    <div class="content">
      <!-- 上传头像 -->
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <!--  -->
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
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm2.checkPass"
            autocomplete="off"
            class="reginput"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import { getLoginData } from "../model/loginData"; // ajax方法导入

export default {
  name: "register",
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
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      imageUrl: '',
      ruleForm2: {
        pass: "",
        checkPass: "",
        username: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        username: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  methods: {
    async submitForm(formName) {
      if (
        this.ruleForm2.username &&
        this.ruleForm2.pass &&
        this.ruleForm2.checkPass
      ) {
        let loginData = await getLoginData({
          userImg: this.imageUrl,
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

    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    
  }
};
</script>

<style scoped lang="less">
.content {
  padding-top: 1rem;
  width: 100%;
}
.reginput {
  width: 80%;
}
.btn{
  margin-top:0.6rem;
}

// 头像
  .avatar-uploader{
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
    display: block;
    width: 2rem;
    height: 2rem;
    margin:0 auto;
    margin-bottom: 1rem;
  }
  .avatar-uploader-icon {
    font-size: 0.4rem;
    color: #8c939d;
    display: block;
    width: 2rem;
    height: 2rem;
    line-height: 1.78rem;
    text-align: center;
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
  }
  .avatar {
    width: 1.5rem;
    height: 1.5rem;
    display: block;
    margin-left:1rem;
    border-radius: 50%;
  }
</style>