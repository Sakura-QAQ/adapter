<template>
  <div class="login-container">
    <!-- <img src="../../assets/images/cover.png" alt=""> -->
    <el-card class="login-box">
      <p>欢迎登陆智能施肥机管理系统</p>
      <!-- 登录表单 -->
      <el-form ref="loginForm" :status-icon="true" :model="loginForm" :rules="loginRules">
        <el-form-item prop="name">
          <el-input v-model="loginForm.name" placeholder="请输入账号/手机号/邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button style="width:48%" type="primary" @click="login" :loading="loading">登 录</el-button>
          <el-button style="width:48%" type="primary" plain @click="registe">注册</el-button>
        </el-form-item>
      </el-form>
      <img src="../../assets/images/logo.png" alt />
      <div class="lt"></div>
      <div class="lb"></div>
      <div class="rt"></div>
      <div class="rb"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      loginForm: {
        name: '13145217573',
        password: 'a123456789'
      },
      loginRules: {
        name: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    login () {
      // loading
      this.loading = true
      // 对整个表单进行校验
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          // 发promise对象请求
          try {
          // 拿到登录的结果
            const res = await this.$http.post('http://192.168.1.202:10010/sso/api/login', this.loginForm)
            // console.log(res.data)
            if (res.data.code === 100 && res.data.msg === '用户不存在') {
              this.$message.error('用户不存在')
              return false
            } else if (res.data.code === 100 && res.data.msg === '密码不正确') {
              this.$message.error('密码错误')
              return false
            } else if (res.data.code === 200) {
              // 存数据
              window.sessionStorage.setItem('token', JSON.stringify(res.data.data))
              // 跳路由
              this.$router.push('/chose')
            }
          } catch (err) {
            this.$message.error('网络异常')
            // console.log(err)
            if (err) {
              this.loading = false
            }
          }
        }
      })
    },
    async registe () {
      await this.$router.push('/registe')
    }
  }
}
</script>

<style scoped lang='less'>
.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  // cover 铺面容器 多余的裁剪   contain 在容器内容完全显示图片
  // 背景图定位 / 背景图尺寸
  background: url(../../assets/images/demo-1-bg.jpg) no-repeat center / cover;
  .login-box {
    width: 600px;
    height: 450px;
    position: relative;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(6,17,47,.7);
    border: none;
    img {
      display: block;
      width: 200px;
      margin: 10px auto;
    }
    /deep/ .el-icon-loading {
      color: #fff;
      font-size: 14px;
    }
    p {
      color: #fff;
      font-size: 32px;
      text-align: center;
      margin: 20px 0;
      font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }
    .rt {
      z-index: 100;
      position: absolute;
      right: 0px;
      top: 0px;
      width: 40px;
      height: 40px;
      border-top: 2px solid #fff;
      border-right: 2px solid #fff;
    }
    .rb {
      z-index: 100;
      position: absolute;
      bottom: 0px;
      right: 0px;
      width: 40px;
      height: 40px;
      border-bottom: 2px solid #fff;
      border-right: 2px solid #fff;
    }
    .lt {
      z-index: 100;
      position: absolute;
      left: 0px;
      top: 0px;
      width: 40px;
      height: 40px;
      border-left: 2px solid #fff;
      border-top: 2px solid #fff;
    }
    .lb {
      z-index: 100;
      position: absolute;
      left: 0px;
      bottom: 0px;
      width: 40px;
      height: 40px;
      border-left: 2px solid #fff;
      border-bottom: 2px solid #fff;
    }
  }
  .cover {
    // background: url('../../assets/images/cover.png') no-repeat center / cover;
    position: absolute;
    right: 0;
    top: 0;
    img {
      width: 800px;
      height: 300px;
    }
  }
}
</style>
