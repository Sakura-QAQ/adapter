<template>
  <el-container class="home-container">
    <el-aside class="my-aside" :width="collapse?'64px':'220px'">
      <div class="logo" :class="{close:collapse}"></div>
      <el-menu
        router
        style="border-right:none"
        :default-active="$route.path"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="collapse"
        :collapse-transition="false"
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">实时数据</span>
        </el-menu-item>
        <el-menu-item index="/irrigation">
          <i class="el-icon-edit-outline"></i>
          <span slot="title">灌溉策略</span>
        </el-menu-item>
        <el-submenu index="/fertilizer">
          <template slot="title">
            <i class="el-icon-s-flag"></i>
            <span slot="title">施肥策略</span>
          </template>
          <el-menu-item-group title="管理">
            <el-menu-item index="/Crop-Cycle" style="padding-left: 64px;">作物周期管理</el-menu-item>
            <el-menu-item index="/passageway" style="padding-left: 64px;">通道管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="配方">
            <el-menu-item index="/formula" style="padding-left: 64px;">配方管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/soil">
          <i class="el-icon-tickets"></i>
          <span slot="title">配方绑定</span>
        </el-menu-item>
        <el-menu-item index="/weather">
          <i class="el-icon-s-opportunity"></i>
          <span slot="title">历史数据</span>
        </el-menu-item>
        <el-menu-item index="/statistic">
          <i class="el-icon-s-data"></i>
          <span slot="title">数据统计</span>
        </el-menu-item>
        <el-menu-item index="/scene">
          <i class="el-icon-connection"></i>
          <span slot="title">现场实况</span>
        </el-menu-item>
        <el-menu-item index="/daily">
          <i class="el-icon-postcard"></i>
          <span slot="title">系统日志</span>
        </el-menu-item>
      </el-menu>
      <div class="logo-5g" v-show="logo_bottom"></div>
    </el-aside>
    <el-container>
      <el-header class="my-header">
        <span class="el-icon-s-fold" @click="toggleMenu()"></span>
        <el-form class="area" :model="reqParams">
          <el-form-item label="切换园区：">
            <el-select v-model="reqParams.projectId" @change="areaTab">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-dropdown style="float:right;color:#fff" @command="handleCommand">
          <span class="el-dropdown-link">
            <img style="vertical-align:middle" width="30" height="30" :src="avatar" alt />
            <b style="vertical-align:middle;padding-left:5px">{{userName}}</b>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item icon="el-icon-setting" command="setting">个人设置</el-dropdown-item> -->
            <el-dropdown-item icon="el-icon-lock" command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class="text">{{company}}</span>
        <!-- <span class="text">{{currentTime}}</span> -->
        <span class="hT">水肥一体化集群施肥机</span>
      </el-header>
      <el-main>
        <!-- 二级路由显示的位置 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  inject: ['reload'],
  data () {
    return {
      options: [],
      reqParams: {
        projectId: null
      },
      collapse: false,
      avatar: '',
      name: '',
      userName: '',
      company: '',
      timer: '',
      currentTime: new Date(),
      logo_bottom: true
    }
  },
  created () {
    const projectId = JSON.parse(window.sessionStorage.getItem('projectId'))
    this.reqParams.projectId = projectId
  },
  mounted () {
    this.getUer()
    this.getProject()
  },
  methods: {
    async getUer () {
      const { data: { data } } = await this.$login.post('/sso/api/getUser')
      this.company = data.company
      this.userName = data.name
    },
    async getProject () {
      const res = await this.$login.post('sso/api/getLoginInfo')
      this.options = res.data.data.projectList
    },
    toggleMenu () {
      this.collapse = !this.collapse
      if (this.logo_bottom) {
        this.logo_bottom = false
      } else {
        this.logo_bottom = true
      }
    },
    logout () {
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    },
    handleCommand (command) {
      this[command]()
    },
    areaTab () {
      window.sessionStorage.setItem('projectId', JSON.stringify(this.reqParams.projectId))
      this.reload()
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .my-aside {
    position: relative;
    background: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: url(../../assets/images/logo.png) no-repeat center / 140px
        auto;
    }
    .logo-5g {
      position: absolute;
      bottom: 8%;
      left: 20%;
      width: 120px;
      height: 120px;
      background: url(../../assets/images/5G.png) no-repeat;
      background-size: 120px 120px;
    }
    .close {
      background-image: url(../../assets/images/logo_min.png);
      background-size: 36px auto;
    }
    /deep/ .el-menu {
      margin-top: 15px;
      padding-left: 10px;
      .el-submenu {
        .el-submenu__title {
          font-weight: 800;
          font-size: 18px;
          span {
            padding-left: 10px;
            letter-spacing: 2px;
          }
        }
        .el-menu-item-group {
          .el-menu-item-group__title {
            font-size: 16px;
            padding-left: 60px !important;
          }
        }
      }

      .el-menu-item {
        font-size: 18px;
        font-weight: 800;
        span {
          padding-left: 10px;
          letter-spacing: 2px;
        }
      }
    }
  }
  .my-header {
    border-bottom: 1px solid #ffde00;
    height: 80px !important;
    line-height: 80px;
    background-color: #002033;
    /deep/ .el-icon-s-fold {
      font-size: 26px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
      padding-right: 20px;
      float: right;
    }
    .area {
      display: inline-block;
      margin-left: 55px;
      /deep/ .el-form-item {
        margin-bottom: 0;
        .el-form-item__label {
          padding: 22px 0 0 0;
          color: #fff;
          font-size: 16px;
        }
        .el-form-item__content {
          display: inline-block;
        }
        .el-input__inner {
          width: 150px;
          height: 35px;
          border: none;
          background-color: #2a3b49;
          border-radius: 0;
          color: #fff;
        }
        .el-date-editor.el-input,
        .el-date-editor {
          width: 155px;
        }
        .el-input__icon {
          line-height: 35px;
        }
        .el-radio__label {
          color: #97b1c9;
        }
      }
    }
    .hT {
      position: absolute;
      top: 0;
      left: 45%;
      font-weight: 800;
      font-size: 40px;
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
      color: #fafafa;
      letter-spacing: 5px;
      text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135;
    }
  }
}
</style>
