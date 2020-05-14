<template>
  <div class="registe-container">
    <!-- 注册表单 -->
    <el-card class="registe-box">

      <div>
        <p style="color:#fff;font-size:32px;margin:30px 0;">欢迎注册施肥机账号</p>
        <p style="color:#fff;margin-bottom:20px;">已有账号？<el-link type="info" href="#/login" style="color:#ccc;font-size:18px;"> 立即登录</el-link></p>
      </div>

      <el-form
        :model="RegForm"
        status-icon
        :rules="Regrules"
        ref="RegForm"
        label-width="120px"
        class="demo-RegForm"
      >
        <el-form-item label="账号" prop="name">
          <el-input v-model="RegForm.name" placeholder="账号为字母和数字组合,首位为字母,长度8-16位" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="RegForm.password" show-password autocomplete="off" placeholder = "密码长度8到20位,包含字母和数字,区分大小写"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="RegForm.email" placeholder = "例:123456@qq.com"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="telephone">
          <el-input v-model="RegForm.telephone" placeholder = "必须为11位纯数字"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="RegForm.realname" placeholder = "例:张三"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="RegForm.nickname" placeholder = "例:兰陵王"></el-input>
        </el-form-item>
        <el-form-item label="公司" prop="company">
          <el-input v-model="RegForm.company" placeholder = "例:蓝海科技"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm('RegForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <img src="../../assets/images/logo.png" alt />
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      RegForm: {
        name: '',
        password: '',
        email: '',
        telephone: '',
        real_name: '',
        nick_name: '',
        company: ''
      },
      Regrules: {
        name: [
          { required: true, message: '请填写账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请填写邮箱', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请填写手机号', trigger: 'blur' }
        ],
        realname: [
          { required: true, message: '请填写真实姓名', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请填写昵称', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请填写公司', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.RegForm.validate(async valid => {
        if (valid) {
          // 发promise对象请求
          try {
            // 拿到注册结果
            const res = await this.$login.post('sso/api/user/signup', this.RegForm)
            if (res.data.code === 100) {
              this.$message.error(res.data.msg)
            } else if (res.data.code === 200) {
              this.$message({
                message: '注册成功！',
                type: 'success'
              })
              this.$router.push('/login')
            }
          } catch (err) {
            this.$message.error(err)
          }
        }
      })
    },
    resetForm (RegForm) {
      this.$refs[RegForm].resetFields()
    }
  }
}
</script>

<style scoped lang='less'>
.registe-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  // cover 铺面容器 多余的裁剪   contain 在容器内容完全显示图片
  // 背景图定位 / 背景图尺寸
  background: url(../../assets/images/demo-1-bg.jpg) no-repeat center / cover;

  .registe-box {
    width: 600px;
    height: 750px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    // background-color: rgba(155, 140, 140, 0.6);
    background-color: rgba(6,17,47,.6);
    border: none;
    text-align: center;
    color: #fff;

    /deep/ .el-form-item__content {
      width: 350px;

      .el-input {
        width: 350px;
      }
    }

    /deep/ .el-form-item__label {
      color: #fff;
      font-size: 16px;
    }

    img {
      display: block;
      width: 200px;
      margin: 10px auto;
    }
  }
}
</style>
