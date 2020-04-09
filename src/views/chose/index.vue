<template>
  <div class="login-container">
      <!-- <img src="../../assets/images/logo.png" alt /> -->
    <div class="login-box">
      <!-- 项目列表 -->
      <el-table
        :show-header="false"
        :data="options"
        style="width: 100%">
        <el-table-column
          prop="name"
          width="250">
        </el-table-column>
        <el-table-column
          prop="descr"
          width="350">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="pushIn(scope.$index, scope.row)">进入</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: [],
      projectID: '',
      activeName: '1'
    }
  },
  created () {
    this.getlogin()
  },
  methods: {
    async getlogin () {
      const res = await this.$http.post('http://192.168.1.202:10010/sso/api/getLoginInfo')
      this.options = res.data.data.projectList
      // console.log(this.options)
    },
    pushIn (index, row) {
      window.sessionStorage.setItem('projectId', JSON.stringify(row.id))
      this.$router.push('/')
    },
    next () {
      if (this.value === '') {
        alert('请选择项目')
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
    width: 800px;
    height: 400px;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    // background-color: transparent;
    text-align: center;
    color: #fff;

    .chose {
      margin: 0 0 50px 0;
    }
    // img {
    //   display: block;
    //   width: 200px;
    //   margin: 10px auto;
    // }
    // /deep/ .el-table::before {
    //   height: 0;
    // }

    // /deep/ .el-table {
    //   margin: 10px 0;
    //   background-color: transparent;
    //   th {
    //     border: 0;
    //     background-color: transparent;
    //   }
    //   tr {
    //     border: 0;
    //     background-color: transparent;
    //   }
    //   td {
    //     border: none;
    //     background-color: transparent;
    //   }
    // }
  }
}
</style>
