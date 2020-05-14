<template>
  <div class="container">
    <div class="chartData" v-if="flagAll">
      <!-- 实时数据 -->
      <div class="chart_1" v-if="flagMin">
        <div class="topCard">
          <span>实时数据</span>
          <el-select v-model="reqParams.fertilizerId" placeholder="选择施肥机" @change="ferchange">
            <el-option v-for="item in fertilizer" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="leftCard">
          <vue-scroll :ops="ops" style="width:100%;height:100%">
            <div class="bgfont">
              <div class="bgline">
                <div class="icons">PH</div>
                <div class="content">{{Realtime.ph}}</div>
              </div>
              <div class="bgline">
                <div class="icons">
                  <span>EC</span>
                  <span>μs/cm</span>
                </div>
                <div class="content">{{Realtime.ec}}</div>
              </div>
              <div class="bgline">
                <div class="icons">
                  <span>流量</span>
                  <span>m3/H</span>
                </div>
                <div class="content">{{Realtime.real_time_flow}}</div>
              </div>
              <div class="bgline">
                <div class="icons">
                  <span>累计流量</span>
                  <span>L</span>
                </div>
                <div class="content">{{Realtime.total_volume}}</div>
              </div>
              <div class="bgline">
                <div class="icons">
                  <span>液位</span>
                  <span>cm</span>
                </div>
                <div class="content">{{Realtime.liquid_level}}</div>
              </div>
              <div class="bgline">
                <div class="icons">
                  <span>压力</span>
                  <span>kg/cm2</span>
                </div>
                <div class="content">{{Realtime.pressure}}</div>
              </div>
            </div>
          </vue-scroll>
        </div>
        <linegraph class="bargraph" :id="'bargraph_1'" :data="option1"></linegraph>
        <div class="btn" @click="realtimeBtn"></div>
      </div>
      <!-- 气象站 -->
      <div class="chart_2" v-if="flagMin">
        <div class="topCard">
          气象站
        </div>
        <div class="leftCard">
          <vue-scroll :ops="ops1" style="width:100%;height:100%">
            <div class="bgfont">
              <div class="bgline" v-for="(item, index) in weatherlist" :key="index">
                <div class="icons">
                  <span>{{item.name}}</span>
                  <span>{{item.unitName}}</span>
                </div>
                <div class="content">{{item.value}}</div>
              </div>
            </div>
          </vue-scroll>
        </div>
        <linegraph class="bargraph" :id="'bargraph_2'" :data="option2"></linegraph>
        <div class="btn" @click="sceneBtn"></div>
      </div>
      <!-- 土壤墒情 -->
      <div class="chart_3" v-if="flagMin">
        <div class="topCard">
          <span>土壤墒情</span>
          <el-select v-model="soilId.id" placeholder="墒情列表">
            <el-option v-for="item in soilList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="leftCard">
          <vue-scroll :ops="ops2" style="width:100%;height:100%">
            <div class="bgfont">
              <div class="bgline" v-for="(item, index) in soilData" :key="index">
                <div class="icons">
                  <span>{{item.name}}</span>
                  <span>{{item.unitName}}</span>
                </div>
                <div class="content">{{item.value}}</div>
              </div>
            </div>
          </vue-scroll>
        </div>
        <linegraph class="bargraph" :id="'bargraph_3'" :data="option3"></linegraph>
        <div class="btn" @click="soilBtn"></div>
      </div>
      <!-- 天气预报 -->
      <div class="weather" v-if="flagMin">
        <div class="topCard">
          天气预报
        </div>
        <div class="header">
          <div class="pos">北京</div>
          <div class="gengxin">刚刚更新</div>
        </div>
        <div class="sunshine">
          <div class="sun-img">
            <img src="../../assets/images/cond-a-00d.png" alt="">
          </div>
          <div class="cound">
            <div>晴</div>
            <div>21°</div>
          </div>
        </div>
        <div class="hold">优</div>
        <div class="math">
          <div class="data">
            <span>东南风</span>
            <span>3级</span>
          </div>
          <div class="data">
            <span>降雨量</span>
            <span>0</span>
          </div>
        </div>
        <div class="math1">
          <div class="data">
            <span>湿度值</span>
            <span>8%</span>
          </div>
          <div class="data">
            <span>大气压</span>
            <span>1014kpa</span>
          </div>
        </div>
        <div class="pos-table">
          <div class="fr">
            <div>05.06</div>
            <div class="icons"></div>
            <div class="data">16°/25°</div>
          </div>
          <div class="fr">
            <div>05.07</div>
            <div class="icons"></div>
            <div class="data">17°/24°</div>
          </div>
          <div class="fr">
            <div>05.08</div>
            <div class="icons"></div>
            <div class="data">16°/24°</div>
          </div>
          <div class="fr">
            <div>05.09</div>
            <div class="icons"></div>
            <div class="data">16°/25°</div>
          </div>
          <div class="fr">
            <div>05.10</div>
            <div class="icons"></div>
            <div class="data">16°/22°</div>
          </div>
        </div>
      </div>
    </div>
    <div class="chart1_big" v-if="flagbig_1">
      <!-- 实时数据 -->
      <div class="topCard">
        实时数据
      </div>
      <div class="leftCard">
        <vue-scroll :ops="ops" style="width:100%;height:100%">
          <div class="bgfont">
            <div class="bgline">
              <div class="icons">PH</div>
              <div class="content">{{Realtime.ph}}</div>
            </div>
            <div class="bgline">
              <div class="icons">
                <span>EC</span>
                <span>μs/cm</span>
              </div>
              <div class="content">{{Realtime.ec}}</div>
            </div>
            <div class="bgline">
              <div class="icons">
                  <span>流量</span>
                  <span>m3/H</span>
              </div>
              <div class="content">{{Realtime.real_time_flow}}</div>
            </div>
            <div class="bgline">
              <div class="icons">
                  <span>累计流量</span>
                  <span>L</span>
              </div>
              <div class="content">{{Realtime.total_volume}}</div>
            </div>
            <div class="bgline">
              <div class="icons">
                  <span>液位</span>
                  <span>cm</span>
              </div>
              <div class="content">{{Realtime.liquid_level}}</div>
            </div>
            <div class="bgline">
              <div class="icons">
                  <span>压力</span>
                  <span>kg/cm2</span>
              </div>
              <div class="content">{{Realtime.pressure}}</div>
            </div>
          </div>
        </vue-scroll>
      </div>
      <linegraph class="bargraph" :id="'bargraph1_big'" :data="option1"></linegraph>
      <div class="btn" @click="realtimeBtn_small"></div>
    </div>
    <div class="chart2_big" v-if="flagbig_2">
      <div class="topCard">
        气象站
      </div>
      <div class="leftCard">
        <vue-scroll :ops="ops1_big" style="width:100%;height:100%">
          <div class="bgfont">
            <div class="bgline" v-for="(item, index) in weatherlist" :key="index">
              <div class="icons">
                <span>{{item.name}}</span>
                <span>{{item.unitName}}</span>
              </div>
              <div class="content">{{item.value}}</div>
            </div>
          </div>
        </vue-scroll>
      </div>
      <linegraph class="bargraph" :id="'bargraph2_big'" :data="option2"></linegraph>
      <div class="btn" @click="sceneBtn_small"></div>
    </div>
    <div class="chart3_big" v-if="flagbig_3">
      <div class="topCard">
        土壤墒情
      </div>
      <div class="leftCard">
        <vue-scroll :ops="ops2_big" style="width:100%;height:100%">
          <div class="bgfont">
            <div class="bgline" v-for="(item, index) in soilData" :key="index">
              <div class="icons">
                <span>{{item.name}}</span>
                <span>{{item.unitName}}</span>
              </div>
              <div class="content">{{item.value}}</div>
            </div>
          </div>
        </vue-scroll>
      </div>
      <linegraph class="bargraph" :id="'bargraph3_big'" :data="option3"></linegraph>
      <div class="btn" @click="soilBtn_small"></div>
    </div>
  </div>
</template>

<script>
import linegraph from '@/components/linegraph.vue'

export default {
  data () {
    return {
      // 默认的实时数据
      Realtime: {
        datetime: 0,
        fertilizer_id: '',
        // 累计流量
        total_volume: 0,
        // 实时流量
        real_time_flow: 0,
        ph: 0,
        // 液位
        liquid_level: 0,
        // 压力
        pressure: 0,
        ec: 0,
        status: 0
      },
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
      ops1: {
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
      ops1_big: {
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
      ops2: {
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
      ops2_big: {
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
      // 项目id
      request: {
        projectId: ''
      },
      // 施肥机id
      reqParams: {
        fertilizerId: ''
      },
      // 土壤网关id
      soilID: {
        gatewayId: ''
      },
      // 气象网关id
      weatherID: {
        gatewayId: ''
      },
      // 所有类别
      typeList: [],
      // 土壤列表
      soilList: [],
      // 默认土壤id
      soilId: {
        id: ''
      },
      // 土壤数据
      soilData: [],
      // 气象列表
      weatherlist: [],
      titles: [],
      fertilizer: [],
      flagAll: true,
      flagMin: true,
      flagbig_1: false,
      flagbig_2: false,
      flagbig_3: false,
      option1: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          left: 'center',
          data: ['PH', 'EC', '流量', '累计流量', '液位', '压力'],
          top: 5,
          z: 10
        },
        xAxis: {
          type: 'category',
          data: []
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '8%',
          containLabel: false
        },
        dataZoom: [{
          type: 'inside'
        }],
        yAxis: [
          {
            show: false,
            type: 'value'
          },
          {
            show: false,
            type: 'value'
          },
          {
            show: false,
            type: 'value'
          },
          {
            show: false,
            type: 'value'
          },
          {
            show: false,
            type: 'value'
          },
          {
            show: false,
            type: 'value'
          }
        ],
        series: [
          {
            name: 'PH',
            type: 'line',
            data: [],
            showSymbol: true,
            yAxisIndex: 0,
            symbolSize: 5
          },
          {
            name: 'EC',
            type: 'line',
            data: [],
            showSymbol: true,
            yAxisIndex: 1,
            symbolSize: 5
          },
          {
            name: '流量',
            type: 'line',
            data: [],
            showSymbol: true,
            yAxisIndex: 2,
            symbolSize: 5
          },
          {
            name: '累计流量',
            type: 'line',
            data: [],
            showSymbol: true,
            yAxisIndex: 3,
            symbolSize: 5
          },
          {
            name: '液位',
            type: 'line',
            data: [],
            showSymbol: true,
            yAxisIndex: 4,
            symbolSize: 5
          },
          {
            name: '压力',
            type: 'line',
            data: [],
            showSymbol: true,
            yAxisIndex: 5,
            symbolSize: 5
          }
        ]
      },
      option2: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          left: 'center',
          data: [],
          top: 5,
          z: 10
        },
        xAxis: {
          type: 'category',
          data: []
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '8%',
          containLabel: false
        },
        dataZoom: [{
          type: 'inside'
        }],
        yAxis: [
          {
            show: false,
            type: 'value'
          }
        ],
        series: [
          // {
          //   name: 'PH',
          //   type: 'line',
          //   data: [],
          //   showSymbol: true,
          //   yAxisIndex: 0,
          //   symbolSize: 5
          // }
        ]
      },
      option3: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          left: 'center',
          data: [],
          top: 5,
          z: 10
        },
        xAxis: {
          type: 'category',
          data: []
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '8%',
          containLabel: false
        },
        dataZoom: [{
          type: 'inside'
        }],
        yAxis: [
          {
            show: false,
            type: 'value'
          }
        ],
        series: [
          // {
          //   name: 'PH',
          //   type: 'line',
          //   data: [],
          //   showSymbol: true,
          //   yAxisIndex: 0,
          //   symbolSize: 5
          // }
        ]
      }
    }
  },
  created () {
    const projectId = JSON.parse(window.sessionStorage.getItem('projectId'))
    this.request.projectId = projectId
  },
  mounted () {
    // 施肥机数据
    this.getfertilizer().then(res => {
      this.getRealtime()
    })
    // 气象和土壤
    this.getgatewayId().then(res => {
      // 获取类别
      this.queryAlltype().then(res => {
        // 气象采集器获得传感器
        this.querySensor().then(res => {
          this.getScene()
        })
        // 土壤墒情
        this.getsoilsensor().then(res => {
          this.getsoildata()
        })
      })
    })
  },
  methods: {
    realtimeBtn () {
      this.flagAll = false
      this.flagbig_1 = true
    },
    realtimeBtn_small () {
      this.flagAll = true
      this.flagbig_1 = false
    },
    sceneBtn () {
      this.flagAll = false
      this.flagbig_2 = true
    },
    sceneBtn_small () {
      this.flagAll = true
      this.flagbig_2 = false
    },
    soilBtn () {
      this.flagAll = false
      this.flagbig_3 = true
    },
    soilBtn_small () {
      this.flagAll = true
      this.flagbig_3 = false
    },
    // 施肥机id
    async getfertilizer () {
      const res = await this.$http.post('fertilizer/api/fertilizer/queryByProjectId', this.request)
      this.fertilizer = res.data.data
      this.reqParams.fertilizerId = this.fertilizer[0].id
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
        this.Realtime = {}
        this.option1.xAxis.data = []
        this.option1.series[0].data = []
        this.option1.series[1].data = []
        this.option1.series[2].data = []
        this.option1.series[3].data = []
        this.option1.series[4].data = []
        this.option1.series[5].data = []
        return false
      } else {
        this.Realtime = res.data.data[0]
        // 曲线
        var time = []
        var PH = []
        var totalVolume = []
        var realTimeFlow = []
        var liquidLevel = []
        var pressure = []
        var EC = []
        for (let i = 0; i < res.data.data.length; i++) {
          const element = res.data.data[i]

          // 时间
          time.unshift(this.$moment(element.datetime).format('HH:mm'))
          // ph
          PH.unshift(element.ph)
          // 累计流量
          totalVolume.unshift(element.total_volume)
          // 实时流量
          realTimeFlow.unshift(element.real_time_flow)
          // 液位
          liquidLevel.unshift(element.liquid_level)
          // 压力
          pressure.unshift(element.pressure)
          // EC
          EC.unshift(element.ec)
        }

        this.option1.xAxis.data = time
        this.option1.series[0].data = PH
        this.option1.series[1].data = EC
        this.option1.series[2].data = realTimeFlow
        this.option1.series[3].data = totalVolume
        this.option1.series[4].data = liquidLevel
        this.option1.series[5].data = pressure
      }
    },
    // 获取所有类别
    async queryAlltype () {
      const { data: { data } } = await this.$sensor.post('http://192.168.1.254:10040/sensor/api/type/queryAll')
      this.typeList = data
    },
    // 获取气象站或土壤
    async getgatewayId () {
      const { data: { data } } = await this.$sensor.post('sensor/api/gateway/queryByProject', this.request)
      for (let i = 0; i < data.length; i++) {
        const element = data[i]
        if (element.type === 2) {
          this.weatherID.gatewayId = element.id
        } else {
          this.soilList.push(element)
        }
      }
      this.soilId.id = this.soilList[0].id
    },
    // 通过气象网关id获取传感器
    async querySensor () {
      const { data: { data } } = await this.$sensor.post('sensor/api/data/queryByGateway', this.weatherID)
      for (let i = 0; i < data.length; i++) {
        const sensorlist = data[i]
        for (let j = 0; j < this.typeList.length; j++) {
          const typeList = this.typeList[j]
          if (sensorlist.typeId === typeList.id) {
            sensorlist.unitName = typeList.unit
            sensorlist.typeName = typeList.name
            this.weatherlist.push(sensorlist)
          }
        }
      }
    },
    // 通过气象传感器ID获取气象数据
    async getScene () {
      const weatherlist = this.weatherlist
      for (let i = 0; i < weatherlist.length; i++) {
        // =====================
        const element = weatherlist[i]
        this.option2.legend.data.push(element.name)
        const yAxis = {
          show: false,
          type: 'value'
        }
        this.option2.yAxis.push(yAxis)
        const series = {
          name: element.name,
          type: 'line',
          data: [],
          showSymbol: true,
          yAxisIndex: i,
          symbolSize: 5
        }
        this.option2.series.push(series)
        // ======================
        const params = {
          columns: [],
          conditions: ["sensor_id='" + element.id + "'", "date_time<'2020-05-09'", 'minute(date_time)%10=0'],
          sorts: []
        }
        const { data: { data } } = await this.$sensor.post('sensor/api/data/queryByQueryVo', params)
        const val = []
        const time = []
        for (let k = 0; k < data.length; k++) {
          const res = data[k]
          val.push(res.value)
          time.push(this.$moment(res.dateTime).format('HH:mm'))
        }
        this.option2.series[i].data = val
        this.option2.xAxis.data = time
      }
    },
    // 获取土壤墒情网关
    async getsoilsensor () {
      const ID = {
        gatewayId: this.soilId.id
      }
      const { data: { data } } = await this.$sensor.post('sensor/api/data/queryByGateway', ID)
      for (let i = 0; i < data.length; i++) {
        const sensorlist = data[i]
        for (let j = 0; j < this.typeList.length; j++) {
          const typeList = this.typeList[j]
          if (sensorlist.typeId === typeList.id) {
            sensorlist.unitName = typeList.unit
            sensorlist.typeName = typeList.name
            this.soilData.push(sensorlist)
          }
        }
      }
    },
    // 土壤数据展示
    async getsoildata () {
      // 遍历土壤墒情网关
      const soilData = this.soilData
      for (let i = 0; i < soilData.length; i++) {
        // =====================
        const element = soilData[i]
        this.option3.legend.data.push(element.name)
        const yAxis = {
          show: false,
          type: 'value'
        }
        this.option3.yAxis.push(yAxis)
        const series = {
          name: element.name,
          type: 'line',
          data: [],
          showSymbol: true,
          yAxisIndex: i,
          symbolSize: 5
        }
        this.option3.series.push(series)
        // ======================
        const params = {
          columns: [],
          conditions: ["sensor_id='" + element.id + "'", "date_time>'2020-05-09'", 'minute(date_time)%10=0'],
          sorts: []
        }
        const { data: { data } } = await this.$sensor.post('sensor/api/data/queryByQueryVo', params)
        const val = []
        const time = []
        for (let k = 0; k < data.length; k++) {
          const res = data[k]
          val.push(res.value)
          time.push(this.$moment(res.dateTime).format('HH:mm'))
        }
        this.option3.series[i].data = val
        this.option3.xAxis.data = time
      }
    },
    // 施肥机切换
    ferchange () {
      this.getRealtime()
    }
  },
  components: {
    linegraph
  }
}
</script>

<style lang="less" scoped>
.container {
  .top-position {
    /deep/ .el-input__inner {
      width: 150px;
      height: 36px;
      border: none;
      background-color: rgba(100, 87, 87, 0.3);
      border-radius: 0;
      color: #fff;
    }
    /deep/ .el-date-editor.el-input,
    .el-date-editor {
      width: 155px;
    }
    /deep/ .el-input__icon {
      line-height: 35px;
    }
    /deep/ .el-radio__label {
      color: #97b1c9;
    }
    /deep/ .el-form-item__label {
      color: #fff;
    }
  }
  .chartData {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;

    > div:nth-child(1) {
      margin-bottom: 30px;
    }
    > div:nth-child(2) {
      margin-bottom: 30px;
    }
    > div {
      .bgfont {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        .bgline {
          text-align: center;
          line-height: 46px;
          border: 1px solid RGB(101,133,159);
          border-radius: 6px;
          margin-top: 12px;

          .icons {
            width: 80px;
            height: 46px;
            border-radius: 5px;
            border-right: 1px solid RGB(101,133,159);
            float: left;
            background-color: RGB(54,76,95);
            span:first-child {
              line-height: 26px;
              height: 26px;
              display: block;
            }
            span:last-child {
              color: #ccc;
              font-size: 14px;
              line-height: 20px;
              height: 20px;
              display: block;
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
      /deep/ .el-select {
        position: absolute;
        top: -1px;
        left: 10px;
        // left: 0;
        .el-input__inner {
          width: 162px;
          height: 38px;
          border: none;
          border-radius: none;
          background-color: rgba(77, 83, 95, 0.712);
          border-radius: 0;
          color: #fff;
        }
      }
    }
    .chart_1 {
      position: relative;
      width: 800px;
      height: 415px;

      .topCard {
        float: left;
        width: 800px;
        height: 40px;
        background-color: #000;
        text-align: center;
        line-height: 40px;
        color: #fff;
        font-size: 18px;
        font-weight: 800;
      }
      .leftCard {
        float: left;
        width: 200px;
        height: 380px;
        background-color: rgba(64,64,64,0.5);
      }
      .bargraph {
        float: left;
        width: 600px;
        height: 380px;
      }
      .btn {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 30px;
        height: 30px;
        cursor: pointer;
        background: url(../../assets/images/8.png) no-repeat;
        background-size: 30px 30px;
      }
    }
    .chart_2 {
      position: relative;
      width: 800px;
      height: 415px;

      .topCard {
        float: left;
        width: 800px;
        height: 40px;
        background-color: #000;
        text-align: center;
        line-height: 40px;
        color: #fff;
        font-size: 18px;
        font-weight: 800;
      }
      .leftCard {
        float: left;
        width: 200px;
        height: 380px;
        background-color: rgba(64,64,64,0.5);
      }
      .bargraph {
        float: left;
        width: 600px;
        height: 380px;
      }
      .btn {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 30px;
        height: 30px;
        cursor: pointer;
        background: url(../../assets/images/8.png) no-repeat;
        background-size: 30px 30px;
      }
    }
    .chart_3 {
      position: relative;
      width: 800px;
      height: 415px;

      .topCard {
        float: left;
        width: 800px;
        height: 40px;
        background-color: #000;
        text-align: center;
        line-height: 40px;
        color: #fff;
        font-size: 18px;
        font-weight: 800;
      }
      .leftCard {
        float: left;
        width: 200px;
        height: 380px;
        background-color: rgba(64,64,64,0.5);
      }
      .bargraph {
        float: left;
        width: 600px;
        height: 380px;
      }
      .btn {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 30px;
        height: 30px;
        cursor: pointer;
        background: url(../../assets/images/8.png) no-repeat;
        background-size: 30px 30px;
      }
    }
    .weather {
      width: 800px;
      height: 420px;
      background-color:  rgba(41,52,65,1);
      position: relative;
      .topCard {
        float: left;
        width: 800px;
        height: 40px;
        background-color: #000;
        text-align: center;
        line-height: 40px;
        color: #fff;
        font-size: 18px;
        font-weight: 800;
      }
      .header {
        height: 3.75rem;
        .pos {
          display: block;
          height: 3.75rem;
          line-height: 3.75rem;
          float: left;
          width: 58.333333%;
          overflow: hidden;
          font-size: 1.75rem;
          padding-left: 20px;
        }
        .gengxin {
          text-align: right;
          padding-right: 1.875rem ;
          float: left;
          height: 3.75rem;
          line-height: 3.75rem;
          width: 41.666666%;
        }
      }
      .sunshine {
        height: 5.625rem;
        .sun-img {
          float: left;
          margin-left: .625rem;
        }
        .cound {
          width: 2.75rem;
          float: left;
          margin-left: 30px;
          text-align: center;

          div:last-child {
            width: 3.125rem;
            font-size: 2.125rem;
          }
        }
      }
      .hold {
        width: 100%;
        float: left;
        color: green;
        font-weight: 800;
        font-size: 1.75rem;
        margin-left: 1.25rem;
      }
      .math {
        width: 100%;
        float: left;
        height: 2.125rem;
        margin-top: .625rem;

        .data {
          float: left;
          span {
            margin: 0 20px;
          }
        }
      }
      .math1 {
        float: left;
        height: 2.125rem;
        margin-top: .625rem;

        .data {
          float: left;
          span {
            margin: 0 20px;
          }
        }
      }
      .pos-table {
        position: absolute;
        top: 8.5rem;
        right: 2.125rem;
        .fr {
          height: 3.125rem;
          div {
            float: left;
            margin-right: 3.125rem;
            font-size: 1.8rem;
          }
          .icons {
            width: 40px;
            height: 40px;
            background: url(../../assets/images/cond-a-01d.png) no-repeat;
            background-size: 40px 40px;
          }
        }
      }
    }
  }
  .chart1_big {
    position: relative;
    width: 100%;
    height: 100%;

    .topCard {
      float: left;
      width: 100%;
      height: 60px;
      background-color: #000;
      text-align: center;
      line-height: 60px;
      color: #fff;
      font-size: 26px;
      font-weight: 800;
    }
    .leftCard {
      float: left;
      width: 19%;
      height: 740px;
      background-color: rgba(64,64,64,0.5);
      .bgfont {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        .bgline {
          width: 88%;
          text-align: center;
          line-height: 80px;
          border: 1px solid RGB(101,133,159);
          border-radius: 6px;
          margin-top: 12px;

          .icons {
            width: 42%;
            height: 80px;
            border-radius: 5px;
            font-size: 1.45rem;
            border-right: 1px solid RGB(101,133,159);
            float: left;
            font-weight: 800;
            background-color: RGB(54,76,95);
            span:first-child {
              height: 44px;
              line-height: 44px;
              display: block;
            }
            span:last-child {
              color: #ccc;
              font-size: 1.3rem;
              line-height: 36px;
              height: 36px;
              display: block;
            }
          }
          .content {
            width: 58%;
            height: 80px;
            border-radius: 5px;
            font-size: 1.3rem;
            float: left;
            background-color: #000;
          }
        }
      }
    }
    .bargraph {
      float: left;
      width: 81%;
      height: 740px;
    }
    .btn {
      position: absolute;
      top: 5px;
      right: 5px;
      width: 50px;
      height: 50px;
      cursor: pointer;
      background: url(../../assets/images/8.png) no-repeat;
      background-size: 50px 50px;
    }
  }
  .chart2_big {
    position: relative;
    width: 100%;
    height: 100%;

    .topCard {
      float: left;
      width: 100%;
      height: 60px;
      background-color: #000;
      text-align: center;
      line-height: 60px;
      color: #fff;
      font-size: 26px;
      font-weight: 800;
    }
    .leftCard {
      float: left;
      width: 19%;
      height: 740px;
      background-color: rgba(64,64,64,0.5);
      .bgfont {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        .bgline {
          width: 88%;
          text-align: center;
          line-height: 80px;
          border: 1px solid RGB(101,133,159);
          border-radius: 6px;
          margin-top: 12px;

          .icons {
            width: 42%;
            height: 80px;
            border-radius: 5px;
            font-size: 1.45rem;
            border-right: 1px solid RGB(101,133,159);
            float: left;
            font-weight: 800;
            background-color: RGB(54,76,95);
            span:first-child {
              height: 44px;
              line-height: 44px;
              display: block;
            }
            span:last-child {
              color: #ccc;
              font-size: 1.3rem;
              line-height: 36px;
              height: 36px;
              display: block;
            }
          }
          .content {
            width: 58%;
            height: 80px;
            border-radius: 5px;
            font-size: 1.3rem;
            float: left;
            background-color: #000;
          }
        }
      }
    }
    .bargraph {
      float: left;
      width: 81%;
      height: 740px;
    }
    .btn {
      position: absolute;
      top: 5px;
      right: 5px;
      width: 50px;
      height: 50px;
      cursor: pointer;
      background: url(../../assets/images/8.png) no-repeat;
      background-size: 50px 50px;
    }
  }
  .chart3_big {
    position: relative;
    width: 100%;
    height: 100%;

    .topCard {
      float: left;
      width: 100%;
      height: 60px;
      background-color: #000;
      text-align: center;
      line-height: 60px;
      color: #fff;
      font-size: 26px;
      font-weight: 800;
    }
    .leftCard {
      float: left;
      width: 19%;
      height: 740px;
      background-color: rgba(64,64,64,0.5);
      .bgfont {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        .bgline {
          width: 88%;
          text-align: center;
          line-height: 80px;
          border: 1px solid RGB(101,133,159);
          border-radius: 6px;
          margin-top: 12px;

          .icons {
            width: 42%;
            height: 80px;
            border-radius: 5px;
            font-size: 1.45rem;
            border-right: 1px solid RGB(101,133,159);
            float: left;
            font-weight: 800;
            background-color: RGB(54,76,95);
            span:first-child {
              height: 44px;
              line-height: 44px;
              display: block;
            }
            span:last-child {
              color: #ccc;
              font-size: 1.3rem;
              line-height: 36px;
              height: 36px;
              display: block;
            }
          }
          .content {
            width: 58%;
            height: 80px;
            border-radius: 5px;
            font-size: 1.3rem;
            float: left;
            background-color: #000;
          }
        }
      }
    }
    .bargraph {
      float: left;
      width: 81%;
      height: 740px;
    }
    .btn {
      position: absolute;
      top: 5px;
      right: 5px;
      width: 50px;
      height: 50px;
      cursor: pointer;
      background: url(../../assets/images/8.png) no-repeat;
      background-size: 50px 50px;
    }
  }

  // 滚动条位置
  /deep/.__bar-is-vertical {
    right: -1px !important;
  }
  // 隐藏横向滚动条
  /deep/.__bar-is-horizontal {
    display: none !important;
  }
}
</style>
