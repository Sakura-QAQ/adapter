<template>
  <el-container class="home-container">
    <el-aside class="my-aside" :width="collapse?'64px':'200px'">
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
        <el-menu-item index="/weather">
          <i class="el-icon-s-opportunity"></i>
          <span slot="title">气象站</span>
        </el-menu-item>
        <el-menu-item index="/soil">
          <i class="el-icon-tickets"></i>
          <span slot="title">土壤墒情</span>
        </el-menu-item>
        <el-menu-item index="/irrigation">
          <i class="el-icon-edit-outline"></i>
          <span slot="title">灌溉策略</span>
        </el-menu-item>
        <!-- <el-menu-item index="/fertilizer">
          <i class="el-icon-s-flag"></i>
          <span slot="title">施肥策略</span>
        </el-menu-item> -->
        <el-submenu index="/fertilizer">
          <template slot="title">
            <i class="el-icon-s-flag"></i>
            <span slot="title" style="font-size: 16px">施肥策略</span>
          </template>
          <el-menu-item-group title="管理">
            <el-menu-item index="/crop" style="text-align:center;">作物管理</el-menu-item>
            <el-menu-item index="/cycle" style="text-align:center;">周期管理</el-menu-item>
            <el-menu-item index="/passageway" style="text-align:center;">通道管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="配方">
            <!-- <el-menu-item index="/details" style="text-align:center;">施肥配方</el-menu-item> -->
            <el-menu-item index="/formula" style="text-align:center;">配方管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/statistic">
          <i class="el-icon-s-data"></i>
          <span slot="title">数据统计</span>
        </el-menu-item>
        <el-menu-item index="/scene">
          <i class="el-icon-connection"></i>
          <span slot="title">现场实况</span>
        </el-menu-item>
        <el-menu-item index="/try">
          <i class="el-icon-connection"></i>
          <span slot="title">测试页</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="my-header">
        <span class="el-icon-s-fold" @click="toggleMenu()"></span>
        <span class="text">北京蓝洋益海科技有限公司</span>
        <el-dropdown style="float:right;color:#fff">
          <span class="el-dropdown-link">
            <img style="vertical-align:middle" width="30" height="30" :src="avatar" alt />
            <b style="vertical-align:middle;padding-left:5px">admin</b>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-lock" command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
  data () {
    return {
      collapse: false,
      avatar: '',
      name: ''
    }
  },
  methods: {
    toggleMenu () {
      this.collapse = !this.collapse
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
    background: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: url(../../assets/images/logo.png) no-repeat center / 140px
        auto;
    }
    .close {
      background-image: url(../../assets/images/logo_min.png);
      background-size: 36px auto;
    }
    /deep/ .el-menu-item-group__title {
      font-size: 14px;
    }
  }
  .my-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .el-icon-s-fold {
      font-size: 26px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
      padding-left: 10px;
    }
  }
}
</style>
