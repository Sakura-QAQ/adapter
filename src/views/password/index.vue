<template>
  <div class="registe-container">
    <!-- 注册表单 -->
    <el-card class="registe-box">

      <div>
        <p style="color:#fff;font-size:32px;margin:30px 0;">密码找回</p>
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
          <el-input v-model="RegForm.name" placeholder="输入曾用账号" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input type="password" v-model="RegForm.password" show-password autocomplete="off" placeholder = "输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="RegForm.email" placeholder = "输入曾用邮箱"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="telephone">
          <el-input v-model="RegForm.telephone" placeholder = "输入曾用手机号"></el-input>
        </el-form-item>
        <el-form-item label="公司" prop="company">
          <el-input v-model="RegForm.company" placeholder = "输入曾用公司名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <!-- <el-button @click="resetForm('RegForm')">重置</el-button> -->
          <el-button @click="returnLogin">返回</el-button>
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
            const res = await this.$login.post('sso/api/user/changePassword', this.RegForm)
            if (res.data.code === 100) {
              this.$message.error(res.data.msg)
            } else if (res.data.code === 200) {
              this.$message({
                message: '修改成功！',
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
    returnLogin () {
      this.$router.push('/login')
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
    height: 600px;
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
