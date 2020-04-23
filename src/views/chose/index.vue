<template>
  <div class="chose-container">
      <!-- <img src="../../assets/images/logo.png" alt /> -->
    <div class="chose-box">
      <vue-scroll :ops="ops" style="width:100%;height:100%">
        <div class="list" v-for="item in options" :key="item.id">
          <div class="name">{{item.name}}</div>
          <div class="descr">{{item.descr}}</div>
          <div class="btn">
            <el-button type="primary" @click="pushIn(item)">进入</el-button>
          </div>
        </div>
      </vue-scroll>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 滚动条
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          keepShow: true
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false, // 是否只有滚动的时候才显示滚动条
          background: '#F5F5F5', // 滚动条颜色
          opacity: 0.5, // 滚动条透明度
          'overflow-x': 'hidden'
        }
      },
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
      console.log(this.options)
    },
    pushIn (item) {
      window.sessionStorage.setItem('projectId', JSON.stringify(item.id))
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
.chose-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  // cover 铺面容器 多余的裁剪   contain 在容器内容完全显示图片
  // 背景图定位 / 背景图尺寸
  background: url(../../assets/images/demo-1-bg.jpg) no-repeat center / cover;

  .chose-box {
    width: 1000px;
    height: 660px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 20px 14px 20px 22px;
    overflow: hidden;
    .chose {
      margin: 0 0 50px 0;
    }
    .list {
      width: 99%;
      height: 100px;
      margin-bottom: 25px;
      background-color: rgba(255, 255, 255, 1);
      border-radius: 10px;
      border: 2px solid transparent;
      .name {
        display: inline-block;
        width: 250px;
        font-weight: 800;
        padding-left: 50px;
        height: 100px;
        line-height: 100px;
        font-size: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .descr {
        display: inline-block;
        width: 450px;
        height: 100px;
        line-height: 100px;
        padding-left: 50px;
        font-size: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .btn {
        display: inline-block;
        width: 250px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .list:hover {
      background-color: rgba(227, 245, 246, 0.9);
      border: 2px solid rgb(128, 194, 238);
      box-shadow: 0px 0px 10px rgb(128, 194, 238) inset;
    }
  }
}
</style>
