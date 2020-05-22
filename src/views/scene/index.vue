<template>
<div class="container">
  <div class="fertilizerData">
    <div class="ferChose">
      <el-select v-model="reqParams.fertilizerId" @change="ferchange">
        <el-option v-for="item in ferList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </div>
    <div class="list">
      <div class="bgline">
        <div class="icons">
          <div>PH</div>
          <div></div>
        </div>
        <div class="content">{{fertilizerData.ph}}</div>
      </div>
      <div class="bgline">
        <div class="icons">
          <div>EC</div>
          <div>μs/cm</div>
        </div>
        <div class="content">{{fertilizerData.ec}}</div>
      </div>
      <div class="bgline">
        <div class="icons">
          <div>流量</div>
          <div>m³/H</div>
        </div>
        <div class="content">{{fertilizerData.real_time_flow}}</div>
      </div>
      <div class="bgline">
        <div class="icons">
          <div>累计流量</div>
          <div></div>
        </div>
        <div class="content">{{fertilizerData.total_volume}}</div>
      </div>
      <div class="bgline">
        <div class="icons">
          <div>液位</div>
          <div>cm</div>
        </div>
        <div class="content">{{fertilizerData.liquid_level}}</div>
      </div>
      <div class="bgline">
        <div class="icons">
          <div>压力</div>
          <div>kg/cm²</div>
        </div>
        <div class="content">{{fertilizerData.pressure}}</div>
      </div>
    </div>
  </div>
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
      <el-button :class="[valve.onCheck === 0?'noActive':'isActive']" circle type="warning">
        <!-- [valve.status === 0? 'dcf-icon' : 'dfc-block'] -->
        <i :class="[valve.isOnline === 0? 'offline' : (valve.status === 0? 'dcf-off' : 'dcf-on')]"></i>
      </el-button>
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
      imgUrl: 'http://47.104.128.108:10010/image/avatar/',
      areaUrl: '',
      // 悬停阀坐标显示的数据
      showValve: {
        valveName: '',
        status: ''
      },
      // 施肥机id和列表
      reqParams: {
        fertilizerId: ''
      },
      ferList: [],
      fertilizerData: {}
    }
  },
  created () {
    const projectId = JSON.parse(window.sessionStorage.getItem('projectId'))
    this.proID.id = projectId
  },
  mounted () {
    this.getProject().then(res => {
      this.getSituation()
      this.getfertilizer()
        .then(res => {
          this.getRealtime()
        })
    })
  },
  methods: {
    // 项目下施肥机id和列表
    async getfertilizer () {
      const projectId = {
        projectId: this.proID.id
      }
      const res = await this.$http.post('fertilizer/api/fertilizer/queryByProjectId', projectId)
      this.ferList = res.data.data
      this.reqParams.fertilizerId = this.ferList[0].id
    },
    // 获取实时数据
    async getRealtime () {
      const columns = []
      const conditions = ["fertilizer_id='" + this.reqParams.fertilizerId + "'", "date_format(datetime,'%Y-%m-%d')='" + this.$moment(new Date()).format('YYYY-MM-DD') + "'", 'minute(datetime)%10=0']
      // " + this.$moment(new Date()).format('YYYY-MM-DD') + "
      const sorts = ['datetime desc']
      const params = {
        columns: columns,
        conditions: conditions,
        sorts: sorts
      }
      // 数据展示
      const res = await this.$http.post('fertilizer/api/data/queryByQueryVo', params)

      if (res.data.data.length === 0) {
        this.$message.error('此施肥机无数据！')
      } else {
        this.fertilizerData = res.data.data.pop()
      }
    },
    // 通过园区获取现场
    async getProject () {
      const { data: { data } } = await this.$login.post('sso/api/project/queryById', this.proID)
      this.areaUrl = this.imgUrl + data.situationUrl
    },
    // 后台的回显数据
    async getSituation () {
      this.marks = []
      this.Vavles = []
      const proId = {
        id: this.proID.id
      }
      const { data: { data } } = await this.$http.post('fertilizer/api/situation/querySituationByPid', proId)
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
      if (valve.isOnline === 0) {
        this.showValve.status = '离线'
      } else {
        if (valve.status === 0) {
          this.showValve.status = '关闭'
        } else if (valve.status === 1) {
          this.showValve.status = '开启'
        }
      }
    },
    leave () {
      this.seen = false
    },
    ferchange () {
      this.fertilizerData = {}
      this.getRealtime()
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  .fertilizerData {
    width: 1660px;
    height: 70px;
    border: 1px solid rgba(156, 167, 170, 0.863);
    margin-bottom: 15px;
    border-radius: 8px;
    background: linear-gradient(to right, #213b53, transparent);
    .ferChose {
      float: left;
      width: 260px;
      height: 70px;
      line-height: 66px;
      margin-left: 50px;
    }
    .list {
      float: left;
      .bgline {
        float: left;
        text-align: center;
        line-height: 46px;
        border: 1px solid #65859f;
        border-radius: 6px;
        margin: 10px 20px 0 0;
        .icons {
          width: 80px;
          height: 46px;
          border-radius: 5px;
          border-right: 1px solid #65859f;
          float: left;
          background-color: #364c5f;
          div:first-child {
            line-height: 26px;
            height: 26px;
          }
          div:last-child {
            color: #ccc;
            font-size: 14px;
            line-height: 20px;
            height: 20px;
          }
        }
        .content {
          width: 100px;
          height: 46px;
          border-radius: 5px;
          float: left;
          background-color: #000;
        }
      }
    }
  }
  .sence {
    position: relative;
    width: 1660px;
    height: 780px;
    // background: url(../../assets/images/sence.jpg) center / cover no-repeat;
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
        background: url('../../assets/icon/sfj-icon2.png') no-repeat;
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
      .noActive {
        background-color: #fff;
        padding: 6px;
      }
      .isActive {
        background-color: #fff;
        border: 3px solid #15d393;
        // border-color: rgb(95, 233, 15);
        // border-color: #15d393;
      }
      .offline {
        display: block;
        width: 28px;
        height: 28px;
        background: url('../../assets/icon/dcf-icon.png')no-repeat;
        background-size: 28px 28px;
      }
      .dcf-off {
        display: block;
        width: 28px;
        height: 28px;
        background: url('../../assets/icon/dcf-off.png')no-repeat;
        background-size: 28px 28px;
      }
      .dcf-on {
        display: block;
        width: 28px;
        height: 28px;
        background: url('../../assets/icon/dcf-on.png')no-repeat;
        background-size: 28px 28px;
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
}
</style>
