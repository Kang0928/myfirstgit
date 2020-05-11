<template>
  <div class="SendingNotice">
    <Header :isshow="true">发布通知</Header>
    <div class="SendingNoticeBox">
      <!-- 文本输入框 -->
      <el-input
        type="textarea"
        :autosize="{ minRows: 7, maxRows: 7}"
        placeholder="请输入内容,最多可输入1000字"
        v-model="textContent"
        maxlength="1000"
      ></el-input>
      <div class="division"></div>
      <!-- 截止日期选择器 -->
      <div class="deadline" @click="openPicker()">
        <span class="deadline_tle">任务截止时间&nbsp;:&nbsp;</span>
        <i class="el-icon-date"></i>
        <span>&nbsp;</span>
        <span class="deadline_time">{{pickerValue||'请选择日期时间'}}</span>
      </div>
      <mt-datetime-picker
        ref="picker"
        type="datetime"
        v-model="pickerValue"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="handleConfirm(pickerValue)"
      ></mt-datetime-picker>
      <!-- 回执选项 -->
      <div class="Receipt">
        <span class="Receipt_tle">需要成员发送电子回执</span>
        <mt-switch v-model="isReceipt" class="Receipt_btn"></mt-switch>
      </div>
      <!-- 发送按钮 -->
      <div class="SendingNotice_Btn">
        <div>在{{teamName}}团队中</div>
        <mt-button type="primary" size="large" @click="SendingNotice_Btn_btn()">发送通知</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import { getNewNotice } from "../model/loginData"; // ajax方法导入

export default {
  name: "SendingNotice",
  components: {
    Header
  },
  created() {
    this.$store.state.showBottomNav = false;
    this.userData.userId = JSON.parse(localStorage.getItem("isLogin")).data.id; // 获取user的id信息 为创建团队做准备
    this.teamName = this.$route.query.teamName;
  },
  data() {
    return {
      userData: {
        userId: ""
      },
      textContent: "", // 文本内容
      pickerF: "", //发布日期时间
      pickerValue: "", //截止日期时间
      pickerValue2: "", //截止日期时间(系统)
      jishu:0, 
      isReceipt: false, //是否回执
      teamName: "该" //团队昵称
    };
  },
  methods: {
    openPicker() {
      this.$refs.picker.open();
    },
    handleConfirm(pickerValue) {
      this.pickerValue2 = pickerValue;
      this.parseTime(pickerValue);
      this.jishu++;
    },
    parseTime(d) {
      const newDate =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds();
      this.pickerValue = newDate;
      return newDate;
    },
    async SendingNotice_Btn_btn() {
      // 发送通知(保存一下发布时间)
      var myDate = new Date();
      this.pickerF = myDate.toLocaleDateString() + myDate.toLocaleTimeString();
      //*获取当前时间 2020/3/22下午7:12:00 → 2018-09-11 13:50:52 *
      let newa = this.pickerF.replace(/(\/)/g, function() {
        return "-";
      });
      if (/上午/.test(newa)) {
        // 有上午
        newa = newa.replace(/[\u4e00-\u9fa5]+/, function() {
          return " ";
        });
      } else {
        // 有下午
        newa = newa.replace(/[\u4e00-\u9fa5]+/, function() {
          return " ";
        });
        let c = +/(\d+):/.exec(newa)[1] + 12;
        newa = newa.replace(/(\d+):/, function() {
          return c + ":";
        });
      }
      this.pickerF = newa;
      console.log(this.pickerF);

      let newNotice = await getNewNotice({
        teamId:this.$route.query.teamId,
        textContent: this.textContent,
        thisTime:this.pickerF,
        deadLine:this.jishu?this.pickerValue:'未标注',
        isReceipt: this.isReceipt,
      });
      if (newNotice.code == 0) {
        this.$message({
          message: newNotice.msg,
          type: "success"
        });
        this.$router.push("/classes"); // 成功后跳转到团队页面
      } else {
        this.$message.error(newNotice.msg);
      }
    }
  }
};
</script>

<style>
.el-textarea__inner {
  border-radius: 0px;
  border: 0px !important;
}
</style>
<style lang="less" scoped>
.SendingNoticeBox {
  border-top: 1px solid rgb(243, 238, 238);
  position: absolute;
  box-sizing: border-box;
  top: 0.8rem;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  .division {
    width: 100%;
    height: 0.15rem;
    background-color: rgb(243, 238, 238);
    margin: 0 auto;
  }
  .deadline {
    width: 100%;
    height: 1rem;
    border-bottom: 1px solid rgb(243, 238, 238);
    font-size: 0.28rem;
    color: #666;
    box-sizing: border-box;
    padding-left: 0.3rem;
    padding-top: 0.3rem;
  }
  .Receipt {
    width: 100%;
    height: 1rem;
    border-bottom: 1px solid rgb(243, 238, 238);
    font-size: 0.28rem;
    color: #666;
    box-sizing: border-box;
    padding-left: 0.3rem;
    overflow: hidden;
    .Receipt_tle {
      float: left;
      padding-top: 0.3rem;
    }
    .Receipt_btn {
      float: right;
      padding-top: 0.2rem;
      padding-right: 0.5rem;
    }
  }
  .SendingNotice_Btn {
    width: 100%;
    height: 3rem;
    font-size: 0.28rem;
    color: rgba(83, 158, 255, 0.959);
    text-align: center;
    margin: 0 auto;
    box-sizing: border-box;
    padding-top: 1rem;
  }
}
</style>