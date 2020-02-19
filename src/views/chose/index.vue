<template>
  <div class="login-container">
    <div class="login-box">
      <img src="../../assets/images/logo.png" alt />
      请选择园区:
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" autofocus @click="next">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: [{
        value: '选项1',
        label: 'A园区'
      }, {
        value: '选项2',
        label: 'B园区'
      }, {
        value: '选项3',
        label: 'C园区'
      }],
      value: ''
    }
  },
  methods: {
    next () {
      if (this.value === '') {
        alert('请选择园区')
        return false
      } else {
        this.$router.push('/')
      }
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
    height: 325px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: transparent;
    border: none;
    text-align: center;
    color: #fff;
    img {
      display: block;
      width: 200px;
      margin: 10px auto;
    }
  }
}
</style>
