<template>
  <div class="login-container">
    <el-card class="login-box">
      <img src="../../assets/images/logo.png" alt />
      <!-- 登录表单 -->
      <el-form ref="loginForm" :status-icon="true" :model="loginForm" :rules="loginRules">
        <el-form-item prop="name">
          <el-input v-model="loginForm.name" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button style="width:48%" type="primary" @click="login">登 录</el-button>
          <el-button style="width:48%" type="primary" plain @click="registe">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        name: '',
        password: ''
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
      // 对整个表单进行校验
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          // 发promise对象请求
          try {
          // 拿到登录的结果
            const res = await this.$http.post('/sso/api/login', this.loginForm)
            console.log(res.data)
            if (res.data.code === 100 && res.data.msg === '用户不存在') {
              this.$message.error('用户不存在')
              return false
            } else if (res.data.code === 100 && res.data.msg === '密码不正确') {
              this.$message.error('密码错误')
              return false
            } else if (res.data.data === 200) {
              // 跳路由
              this.$router.push('/chose')
              // 存数据
              window.sessionStorage.setItem('admin', JSON.stringify(res.data.data))
            }
          } catch (err) {
            this.$message.error('服务器异常')
            // console.log(err)
          }
        }
      })
    },
    registe () {
      this.$router.push('/registe')
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
    width: 400px;
    // height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: transparent;
    border: none;
    img {
      display: block;
      width: 200px;
      margin: 10px auto;
    }
  }
}
</style>
