<template>
<div class="container">
  <div class="sence" :style="{backgroundImage: 'url(' + areaUrl + ')'}">
    <div :class="{'ferz': true, 'active':index===num}" v-for="(item, index) in marks" :key="index" :style="{top: item.top + 'px', left: item.left + 'px'}" @click="showData(item, index)">
      <div class="sfjImg"></div>
      <div class="showData">
        <div class="ferzName">{{item.name}}</div>
        <div class="status">
          <div :class="[item.isOnline === 0? 'gray' : (item.status === 1? 'green' : 'none')]"></div>
        </div>
      </div>
      <div class="jt-icon"></div>
    </div>
    <div class="valve" v-for="valve in Vavles" :key="valve.id" :style="{top: valve.top + 'px', left: valve.left + 'px'}" @mouseenter="enter(valve)" @mouseleave="leave">
      <el-button :class="[valve.onCheck === 0?'noActive':'isActive']" icon="el-icon-set-up" circle type="warning"></el-button>
    </div>
    <div class="hover_con" v-show="seen" :style="positionStyle">
      <div class="dcfTip">阀名: {{showValve.valveName}}</div>
      <div class="status">状态: {{showValve.status}}</div>
      <div class="r-jt"></div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      proID: {
        id: null
      },
      num: null,
      chose1: true,
      chose2: false,
      chose3: false,
      marks: [],
      Vavles: [],
      seen: false,
      positionStyle: { top: 0, left: 0 },
      // 背景图路径
      imgUrl: 'http://192.168.1.254:10010/image/avatar/',
      areaUrl: '',
      // 悬停阀坐标显示的数据
      showValve: {
        valveName: '',
        status: ''
      }
    }
  },
  created () {
    this.getProject().then(res => {
      this.getSituation()
    })
    const projectId = JSON.parse(window.sessionStorage.getItem('projectId'))
    this.proID.id = projectId
  },
  methods: {
    // 通过园区获取现场
    async getProject () {
      const { data: { data } } = await this.$http.post('http://192.168.1.202:10010/sso/api/project/queryById', this.proID)
      this.areaUrl = this.imgUrl + data.situationUrl
    },
    // 后台的回显数据
    async getSituation () {
      this.marks = []
      this.Vavles = []
      const proId = {
        id: this.proID.id
      }
      const { data: { data } } = await this.$http.post('http://192.168.1.202:10010/sso/api/project/querySituationByPid', proId)
      if (data.length !== 0) {
        for (let i = 0; i < data.length; i++) {
          const element = data[i]
          if (element.type === 0) {
            element.isChecked = 0
            this.marks.push(element)
          } else {
            element.onCheck = 0
            this.Vavles.push(element)
          }
        }
      } else {
        this.$message.warning('此园区未添加施肥机')
      }
    },
    showData (item, index) {
      for (let i = 0; i < this.Vavles.length; i++) {
        const element = this.Vavles[i]
        if (item.fertilizerId === element.fertilizerId) {
          element.onCheck = 1
        } else {
          element.onCheck = 0
        }
      }
      this.num = index
    },
    enter (valve) {
      this.positionStyle = { top: valve.top + (-80) + 'px', left: valve.left - (-30) + 'px' }
      this.seen = true
      this.showValve.valveName = valve.name
      if (valve.status === 0) {
        this.showValve.status = '关闭'
      } else if (valve.status === 1) {
        this.showValve.status = '开启'
      }
    },
    leave () {
      this.seen = false
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  .sence {
    position: relative;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 1660px;
    height: 780px;
    background: url(../../assets/images/sence.jpg) center / cover no-repeat;
    .ferz {
      position: relative;
      position: absolute;
      width: 150px;
      padding: 5px 5px;
      border-radius: 10px;
      background-color: rgba(97, 91, 91, 0.9);
      border: 2px solid #000;
      cursor: pointer;

      .sfjImg {
        float: left;
        width: 60px;
        height: 60px;
        background: url('../../assets/icon/sfj-icon.png') no-repeat;
        background-size: 60px 60px;
      }
      .showData {
        float: left;
        .ferzName {
          width: 75px;
          font-weight: 800;
          text-align: center;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        .status {
          height: 39px;
          padding: 4.5px;
          div {
            margin: 0 auto;
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
          .gray {
            background-color: #ccc;
          }
          .green {
            background-color: rgb(95, 233, 15);
          }
          .none {
            background-color: red;
          }
        }
      }
      .jt-icon {
        position: absolute;
        left: 30px;
        bottom: -30px;
        width: 30px;
        height: 30px;
        background: url('../../assets/icon/jt-icon.png') no-repeat;
        background-size: 30px 30px;
      }
    }
    .valve {
      position: absolute;
      width: 40px;
      height: 40px;

      .isActive {
        background-color:rgb(84, 216, 8);
        border-color: rgb(95, 233, 15);
      }
    }
    .active {
      box-shadow: 0px 0px 10px greenyellow inset;
      border:2px solid greenyellow;
    }
    .hover_con {
      position: relative;
      position: absolute;
      width: 150px;
      height: 70px;
      background-color: rgba(97, 91, 91, 0.9);
      border: 1px solid #000;
      border-radius: 10px;
      padding: 10px;

      .dcfTip {
        text-align: center;
      }
      .status {
        text-align: center;
      }
      .r-jt {
        position: absolute;
        left: 20px;
        bottom: -24px;
        width: 24px;
        height: 24px;
        background: url('../../assets/icon/jt-icon_r.png') no-repeat;
        background-size: 24px 24px;
      }
    }
  }
  .bg1 {
    width: 1660px;
    height: 780px;
    background: url(../../assets/images/jlh.jpg) center / cover no-repeat;
  }
  .bg2 {
    width: 1660px;
    height: 780px;
    background: url(../../assets/images/ws.png) center / cover no-repeat;
  }
  .bg3 {
    width: 1660px;
    height: 780px;
    background: url(../../assets/images/lyyh.png) center / cover no-repeat;
  }
}
</style>
