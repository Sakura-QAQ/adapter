<template>
  <div class="container">
    <div class="top-position">
      <el-form :model="areaId">
        <el-form-item label="选择温室：">
          <el-select v-model="areaId.id">
            <el-option v-for="item in area" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="ferz">
        <span>当前施肥机:</span>
        <span>{{ferName}}</span>
      </div>
      <div class="data">
      <span>日期选择：</span>
        <el-date-picker
          v-model="daterange"
          type="daterange"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <input type="button" class="submit" value="确定" @click="sending">
    </div>
    <div class="chartData" v-if="flagAll">
      <!-- 实时数据 -->
      <div class="chart_1" v-if="flagMin">
        <div class="topCard"  @click="tableFer" style="cursor:pointer;">
          施肥机数据
        </div>
        <div class="swimBtn" @mouseenter="enterItem" @mouseleave="leaveItem">
          <span>电磁阀</span>
        </div>
        <!-- leaveItem -->
        <div class="hiddenCard" v-show="hiddenCard" @mouseenter="enterItem"
        @mouseleave="leaveItem">
          <el-radio-group class="checkFl" v-model="checkboxGroup" @change="changebox">
            <template v-for="(item, index) in fergroup">
              <el-radio-button :label="index + 1" :key="index" v-show="index < 24" >
                <div class="valve_num">{{Vals[item - 1]}}</div>
              </el-radio-button>
            </template>
          </el-radio-group>
          <div class="posBtn">
            <input type="button" class="submit" value="确定" @click="checkvals">
          </div>
        </div>
        <linegraph class="bargraph" :id="'bargraph_1'" :data="option1"></linegraph>
        <a class="share" :href="fertilizerUrl + fertilizerId.id + '&start=' + daterange[0] + '&end=' + daterange[1]"></a>
        <div class="btn" @click="realtimeBtn"></div>
      </div>
      <!-- 气象站 -->
      <div class="chart_2" v-if="flagMin">
        <div class="topCard"  @click="tableWeather" style="cursor:pointer;">
          气象站
        </div>
        <linegraph class="bargraph" :id="'bargraph_2'" :data="option2"></linegraph>
        <a class="share" :href="gatewayUrl + weatherID.gatewayId + '&start=' + daterange[0] + '&end=' + daterange[1]"></a>
        <div class="btn" @click="sceneBtn"></div>
      </div>
      <!-- 土壤墒情 -->
      <div class="chart_3" v-if="flagMin">
        <div class="topCard" @click="tableSoil" style="cursor:pointer;">
          土壤墒情
        </div>
        <div class="ChoseGateWay">
          <el-select v-model="soilId.id" placeholder="墒情列表" @change="soilChange">
            <el-option v-for="item in soilList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        <linegraph class="bargraph" :id="'bargraph_3'" :data="option3"></linegraph>
        <a class="share" :href="gatewayUrl + soilId.id + '&start=' + daterange[0] + '&end=' + daterange[1]"></a>
        <div class="btn" @click="soilBtn"></div>
      </div>
      <!-- 历史数据表 -->
      <div class="historytable" v-if="flagMin">
        <div class="topCard">
          历史数据表
        </div>
        <!-- 施肥机-->
        <el-table :data="tableConfig.tableData" v-show="flagtable1" height="380" :row-style="{height:'40px'}" :cell-style="{padding:'0px'}">
          <el-table-column :label="val" v-for="(val, i) in tableConfig.columns" :key="i" min-width="130" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">{{tableConfig.tableData[scope.$index][i]}}</template>
          </el-table-column>
        </el-table>
        <!-- 气象站 -->
        <el-table :data="tableConfig2.tableData" v-show="flagtable2" height="380" :row-style="{height:'40px'}" :cell-style="{padding:'0px'}">
          <el-table-column :label="val" v-for="(val, i) in tableConfig2.columns" :key="i" min-width="130" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">{{tableConfig2.tableData[scope.$index][i]}}</template>
          </el-table-column>
        </el-table>
        <!-- 土壤 -->
        <el-table :data="tableConfig3.tableData" v-show="flagtable3" height="380" :row-style="{height:'40px'}" :cell-style="{padding:'0px'}">
          <el-table-column :label="item" v-for="(item, i) in tableConfig3.columns" :key="i" align="center" min-width="130" :show-overflow-tooltip="true">
            <template slot-scope="scope">{{tableConfig3.tableData[scope.$index][i]}}</template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="chart1_big" v-if="flagbig_1">
      <!-- 实时数据 -->
      <div class="topCard">
        施肥机数据
      </div>
      <div class="swimBtn" @mouseenter="enterItem" @mouseleave="leaveItem">
        <span>电磁阀</span>
      </div>
      <!-- leaveItem -->
      <div class="hiddenCard" v-show="hiddenCard" @mouseenter="enterItem"
      @mouseleave="leaveItem">
        <el-radio-group class="checkFl" v-model="checkboxGroup" @change="changebox">
          <template v-for="(item, index) in fergroup">
            <el-radio-button :label="index + 1" :key="index" v-show="index < 24" >
              <div class="valve_num">{{Vals[item - 1]}}</div>
            </el-radio-button>
          </template>
        </el-radio-group>
        <div class="posBtn">
          <input type="button" class="submit" value="确定" @click="checkvals">
        </div>
      </div>
      <linegraph class="bargraph" :id="'bargraph1_big'" :data="option1"></linegraph>
      <div class="btn" @click="realtimeBtn_small"></div>
    </div>
    <div class="chart2_big" v-if="flagbig_2">
      <div class="topCard">
        气象站
      </div>
      <linegraph class="bargraph" :id="'bargraph2_big'" :data="option2"></linegraph>
      <div class="btn" @click="sceneBtn_small"></div>
    </div>
    <div class="chart3_big" v-if="flagbig_3">
      <div class="topCard">
        土壤墒情
      </div>
      <div class="ChoseGateWay">
        <el-select v-model="soilId.id" placeholder="墒情列表">
          <el-option v-for="item in soilList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
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
      // 下载excel路径
      fertilizerUrl: 'http://47.104.128.108:10020/fertilizer/api/data/queryByQueryVoDown?fertilizer_id=',
      gatewayUrl: 'http://47.104.128.108:10040/sensor/api/data/queryByQueryVoDown?gatewayId=',
      // 施肥机数据
      tableConfig: {
        tableData: [
        ],
        columns: []
      },
      // 气象站数据
      tableConfig2: {
        tableData: [
        ],
        columns: []
      },
      // 土壤墒情
      tableConfig3: {
        tableData: [
        ],
        columns: [
        ]
      },
      flagtable1: true,
      flagtable2: false,
      flagtable3: false,
      // 电磁阀显示隐藏
      hiddenCard: false,
      hiddenCard1: false,
      // 起始结束时间
      daterange: [],
      // 日期快捷键
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      // 项目id
      request: {
        projectId: ''
      },
      // 园区下拉框数据
      areaId: {
        id: ''
      },
      area: [],
      // 传感器类别列表
      typeList: [],
      // 气象网关id
      weatherID: {
        gatewayId: ''
      },
      // 土壤网关id
      soilId: {
        id: ''
      },
      // 土壤采集器和传感器列表
      soilList: [],
      soilData: [],
      // 气象传感器
      weatherlist: [],
      // 施肥机id
      fertilizerId: {
        id: ''
      },
      // 施肥机名称
      ferName: '',
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
      },
      // 电磁阀
      checkboxGroup: [],
      // 对应阀号
      fergroup: [],
      Vals: [],
      // 选择的阀号
      checkvalve: []
    }
  },
  created () {
    const projectId = JSON.parse(window.sessionStorage.getItem('projectId'))
    this.request.projectId = projectId
  },
  mounted () {
    this.getareas().then(res => {
      this.getfertilizerID().then(res => {
        this.getferList()
        this.getvalves()
      })
    })
    this.getgatewayId().then(res => {
      // 气象
      this.queryAlltype().then(res => {
        this.querySensor()
      })
      // 土壤
      this.getsoilsensor()
    })
  },
  methods: {
    cellStyle ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        // 指定列号
        return 'asdf'
      }
      // else {
      //   return 'padding:0'
      // }
    },
    // 点击标题切换表格
    tableFer () {
      this.flagtable1 = true
      this.flagtable2 = false
      this.flagtable3 = false
    },
    tableWeather () {
      this.flagtable1 = false
      this.flagtable2 = true
      this.flagtable3 = false
    },
    tableSoil () {
      this.flagtable1 = false
      this.flagtable2 = false
      this.flagtable3 = true
    },
    // 电磁阀按钮进入
    enterItem () {
      this.hiddenCard = true
    },
    // 电磁阀按钮离开
    leaveItem () {
      this.hiddenCard = false
    },
    choseHouse () {
    },
    // 实时数据放大缩小
    realtimeBtn () {
      this.flagAll = false
      this.flagbig_1 = true
    },
    realtimeBtn_small () {
      this.flagAll = true
      this.flagbig_1 = false
    },
    // 气象数据放大缩小
    sceneBtn () {
      this.flagAll = false
      this.flagbig_2 = true
    },
    sceneBtn_small () {
      this.flagAll = true
      this.flagbig_2 = false
    },
    // 土壤数据放大缩小
    soilBtn () {
      this.flagAll = false
      this.flagbig_3 = true
    },
    soilBtn_small () {
      this.flagAll = true
      this.flagbig_3 = false
    },
    async getareas () {
      // 获取园区第一条数据
      const { data: { data } } = await this.$http.post('fertilizer/api/area/queryByProjectId', this.request)
      this.area = data
      this.areaId.id = this.area[0].id
    },
    // 获取当前温室的施肥机ID
    async getfertilizerID () {
      const { data: { data } } = await this.$http.post('fertilizer/api/area/queryById', this.areaId)
      this.fergroup = data.fertilizerValves.split(',')
      this.fertilizerId.id = data.fertilizerId
    },
    // 获取施肥机对应阀
    async getvalves () {
      const { data: { data } } = await this.$http.post('fertilizer/api/fertilizer/queryValveAlias', this.fertilizerId)
      this.Vals = data.split(',')
    },
    // 通过施肥机id查列表
    async getferList () {
      const { data: { data } } = await this.$http.post('fertilizer/api/fertilizer/queryById', this.fertilizerId)
      this.ferName = data.name
    },
    // 获取气象站采集器和土壤传感器列表
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
      // 土壤采集器
      this.soilId.id = this.soilList[0].id
    },
    // 获取所有类别
    async queryAlltype () {
      const { data: { data } } = await this.$sensor.post('sensor/api/type/queryAll')
      this.typeList = data
    },
    // 通过气象采集器获得气象传感器
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
    // 获取气象数据
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
          conditions: ["sensor_id='" + element.id + "'", "date_format(date_time,'%Y-%m-%d')>='" + this.daterange[0] + "'", "date_format(date_time,'%Y-%m-%d')<='" + this.daterange[1] + "'", 'minute(date_time)%10=0'],
          sorts: []
        }
        const { data: { data } } = await this.$sensor.post('sensor/api/data/queryByQueryVo', params)
        const val = []
        const time = []
        for (let k = 0; k < data.length; k++) {
          const res = data[k]
          val.push(res.value)
          time.push(this.$moment(res.dateTime).format('YYYY-MM-DD HH:mm'))
        }
        this.option2.series[i].data = val
        this.option2.xAxis.data = time
        const obj = {
          gatewayId: this.weatherID.gatewayId,
          start: this.daterange[0],
          end: this.daterange[1]
        }
        const res = await this.$sensor.post('sensor/api/data/queryByHis', obj)
        this.tableConfig2.columns = res.data.data.hisHeadList
        this.tableConfig2.tableData = res.data.data.hisDataList
      }
    },
    // 获取土壤墒情网关
    async getsoilsensor () {
      this.soilData = []
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
      this.option3.legend.data = []
      this.tableConfig3.columns = []
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
          conditions: ["sensor_id='" + element.id + "'", "date_format(date_time,'%Y-%m-%d')>='" + this.daterange[0] + "'", "date_format(date_time,'%Y-%m-%d')<='" + this.daterange[1] + "'", 'minute(date_time)%10=0'],
          sorts: []
        }
        const { data: { data } } = await this.$sensor.post('sensor/api/data/queryByQueryVo', params)
        const val = []
        const time = []
        for (let k = 0; k < data.length; k++) {
          const res = data[k]
          val.push(res.value)
          time.push(this.$moment(res.dateTime).format('YYYY-MM-DD HH:mm'))
        }
        this.option3.series[i].data = val
        this.option3.xAxis.data = time
      }
      this.table_head = this.option3.legend.data
      // 获取表格数据
      const params = {
        gatewayId: this.soilId.id,
        start: this.daterange[0],
        end: this.daterange[1]
      }
      const { data: { data } } = await this.$sensor.post('sensor/api/data/queryByHis', params)
      this.tableConfig3.columns = data.hisHeadList
      this.tableConfig3.tableData = data.hisDataList
    },
    // 发送查询请求
    async sending () {
      this.tableConfig.tableData = []
      // this.tableConfig.columns = []
      // 施肥机的数据
      const columns = []
      const conditions = ["fertilizer_id='" + this.fertilizerId.id + "'", "date_format(datetime,'%Y-%m-%d')>='" + this.daterange[0] + "'", "date_format(datetime,'%Y-%m-%d')<='" + this.daterange[1] + "'", 'minute(datetime)%10=0']
      // " + this.$moment(new Date()).format('YYYY-MM-DD') + "
      const sorts = ['datetime desc']
      const params = {
        columns: columns,
        conditions: conditions,
        sorts: sorts
      }
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
          time.unshift(this.$moment(element.datetime).format('YYYY-MM-DD HH:mm'))
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
        // 表格
        for (let i = 0; i < time.length; i++) {
          const arr = [
            time[i], PH[i], EC[i], realTimeFlow[i], totalVolume[i], liquidLevel[i], pressure[i]
          ]
          this.tableConfig.tableData.push(arr)
        }
        this.tableConfig.columns = ['日期', 'PH', 'EC(μs/cm)', '流量(m³/H)', '累计流量(L)', '液位(cm)', '压力(kg/㎡)']
      }
      // 气象站的数据
      this.getScene()
      // 土壤墒情的数据
      this.getsoildata()
    },
    // 电磁阀变化事件
    changebox () {
      let a = [this.checkboxGroup]
      let b = this.fergroup
      this.checkvalve = b.filter((_, index) => a.includes(index + 1))
    },
    // 阀号过滤
    async checkvals () {
      const req = {
        start: this.daterange[0],
        end: this.daterange[1],
        fertilizerId: this.fertilizerId.id,
        valvenumber: this.checkvalve[0]
      }
      const { data: { data } } = await this.$http.post('fertilizer/api/data/queryByQueryVoAndValve', req)
      this.tableConfig.tableData = []
      if (this.checkboxGroup.length === 0) {
        this.$message.error('请选择阀')
        return false
      } else {
        if (data.length === 0) {
          this.$message.error('此时间段无灌溉数据！')
          this.Realtime = {}
          this.option1.xAxis.data = []
          this.option1.series[0].data = []
          this.option1.series[1].data = []
          this.option1.series[2].data = []
          this.option1.series[3].data = []
          this.option1.series[4].data = []
          this.option1.series[5].data = []
          this.hiddenCard = false
          return false
        } else {
        // 曲线
          var time = []
          var PH = []
          var totalVolume = []
          var realTimeFlow = []
          var liquidLevel = []
          var pressure = []
          var EC = []
          for (let i = 0; i < data.length; i++) {
            const element = data[i]
            // 时间
            time.push(this.$moment(element.datetime).format('YYYY-MM-DD HH:mm'))
            // ph
            PH.push(element.ph)
            // 累计流量
            totalVolume.push(element.totalVolume)
            // 实时流量
            realTimeFlow.push(element.realTimeFlow)
            // 液位
            liquidLevel.push(element.liquidLevel)
            // 压力
            pressure.push(element.pressure)
            // EC
            EC.push(element.ec)
          }
          this.option1.xAxis.data = time
          this.option1.series[0].data = PH
          this.option1.series[1].data = EC
          this.option1.series[2].data = realTimeFlow
          this.option1.series[3].data = totalVolume
          this.option1.series[4].data = liquidLevel
          this.option1.series[5].data = pressure
          // 表格
          for (let i = 0; i < time.length; i++) {
            const arr = [
              time[i], PH[i], EC[i], realTimeFlow[i], totalVolume[i], liquidLevel[i], pressure[i]
            ]
            this.tableConfig.tableData.push(arr)
          }
          this.tableConfig.columns = ['日期', 'PH', 'EC(μs/cm)', '流量(m³/H)', '累计流量(L)', '液位(cm)', '压力(kg/㎡)']
          this.hiddenCard = false
        }
      }
    },
    // 土壤切换
    soilChange () {
      this.getsoilsensor().then(res => {
        this.getsoildata()
      })
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
    /deep/ .el-form {
      display: inline-block;
      .el-form-item__content {
        width: 280px;
      }
      .el-input__inner {
        width: 150px;
        height: 36px;
        border: none;
        background-color: rgba(87, 82, 73, 0.3);
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
      .el-form-item__label {
        color: #fff;
      }
    }
    .ferz {
      display: inline-block;
      margin-right: 18px;
      span {
        display: inline-block;
      }
      // span:first-child {
      //   width: 90px;
      // }
      // span:last-child {
      //   width: 90px;
      // }
    }
    .data {
      display: inline-block;
      /deep/ .el-date-editor {
        background-color: #2a3b49;
        border:1px solid rgba(100, 87, 87, 0.377);
        .el-range-input {
          color: #fff;
        }
        .el-range-separator {
          width: 8%;
          color: #fff;
        }
      }
    }
    .submit {
      float: none;
      margin: 0 0 2px 15px;
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
          margin-top: 12px;

          .icons {
            width: 120px;
            height: 46px;
            border-radius: 5px;
            border: 1px solid RGB(101,133,159);
            float: left;
            background-color: RGB(54,76,95);
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
      .swimBtn {
        z-index: 166;
        width: 60px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #fff;
        position: absolute;
        top: 48px;
        left: 10px;
      }
      .hiddenCard {
        z-index: 188;
        position: relative;
        position: absolute;
        top: 45px;
        left: 70px;
        width: 90%;
        height: 370px;
        padding: 20px;
        border-radius: 10px;
        background-color: rgba(85, 92, 98, 0.9);
        /deep/ .el-radio-group {
          display: inline-block;
          background: transparent;

          .el-radio-button__inner {
            width: 80px;
            border: 1px solid #6989a5;
            border-radius: 5px;
            background: transparent;
            color: #6989a5;
            margin: 0 0 8px 8px;
            padding: 0 0;

            .valve_num {
              width:80px;
              height:35px;
              line-height: 35px;
              text-align: center;
              background:transparent;
            }
          }
          .is-active {
            .el-radio-button__inner {
              background: #ccc;
              border: 1px solid transparent;
            }
          }
        }
        .posBtn {
          position: absolute;
          right: 20px;
          bottom: 20px;
        }
      }
      .bargraph {
        float: left;
        width: 100%;
        height: 380px;
      }
      .share {
        position: absolute;
        top: 5px;
        right: 45px;
        width: 30px;
        height: 30px;
        cursor: pointer;
        background: url(../../assets/images/l-007.png) no-repeat;
        background-size: 30px 30px;
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
      .bargraph {
        float: left;
        width: 100%;
        height: 380px;
      }
      .share {
        position: absolute;
        top: 5px;
        right: 45px;
        width: 30px;
        height: 30px;
        cursor: pointer;
        background: url(../../assets/images/l-007.png) no-repeat;
        background-size: 30px 30px;
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
      .ChoseGateWay {
        position: absolute;
          top: 0;
          left: 0;
        /deep/ .el-select {
          // position: absolute;

          // left: 0;
          .el-input__inner {
            width: 162px;
            height: 40px;
            border: none;
            border-radius: none;
            background-color: rgba(77, 83, 95, 0.712);
            border-radius: 0;
            color: #fff;
          }
        }
      }
      .swimBtn {
        z-index: 166;
        width: 60px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #fff;
        position: absolute;
        top: 48px;
        left: 10px;
      }
      .bargraph {
        float: left;
        width: 100%;
        height: 380px;
      }
      .share {
        position: absolute;
        top: 5px;
        right: 45px;
        width: 30px;
        height: 30px;
        cursor: pointer;
        background: url(../../assets/images/l-007.png) no-repeat;
        background-size: 30px 30px;
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
    .historytable {
      width: 800px;
      height: 420px;
      background-color:  rgba(41,52,65);
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
      .pager {
        width: 100%;
        position: absolute;
        bottom: 8px;
        left: 0;
        text-align: center;

        /deep/ .v-page-goto-input {
          color: #000;
          // height: 336px !important;
          // height: 297px !important;
          // overflow-x: scroll;
          // overflow-y: hidden;
        }
      }
      /deep/ .el-table::before {
        height: 0;
      }
      /deep/ .el-table {
        margin: 0 auto;
        background-color: transparent;
        color: #fff;
        th {
          border: 0;
          background-color: rgba(41,52,65);
        }
        tr {
          border: 0;
          background-color: transparent;
        }
        tr:nth-child(odd) {
          background-color: rgba(85, 92, 98, 0.9);
        }
        tr:nth-child(even) {
          background-color: rgba(41,52,65);
        }
        tr:hover > td {
          background-color: transparent;
        }
        td {
          border: none;
        }
        thead {
          color: #eee;
          background-color: rgba(55, 59, 63, 0.9);
        }
        // .el-table__header {
        //   width: 900px !important;
        // }
        // .el-table__header-wrapper {
        //   .has-gutter {
        //     tr {
        //       th:first-child {
        //         width: 180px !important;
        //       }
        //     }
        //   }
        // }
        // .el-table__body-wrapper {
        //   .el-table__row {
        //     td:first-child {
        //       width: 180px !important;
        //     }
        //   }
        // }
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
    .swimBtn {
      z-index: 166;
      width: 60px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #fff;
      position: absolute;
      top: 60px;
      left: 10px;
    }
    .hiddenCard {
      z-index: 188;
      position: relative;
      position: absolute;
      top: 60px;
      left: 70px;
      width: 50%;
      height: 370px;
      padding: 20px;
      border-radius: 10px;
      background-color: rgba(85, 92, 98, 0.9);
      /deep/ .el-radio-group {
        display: inline-block;
        background: transparent;

        .el-radio-button__inner {
          width: 80px;
          border: 1px solid #6989a5;
          border-radius: 5px;
          background: transparent;
          color: #6989a5;
          margin: 0 0 8px 8px;
          padding: 0 0;

          .valve_num {
            width:80px;
            height:35px;
            line-height: 35px;
            text-align: center;
            background:transparent;
          }
        }
        .is-active {
          .el-radio-button__inner {
            background: #ccc;
            border: 1px solid transparent;
          }
        }
      }
      .posBtn {
        position: absolute;
        right: 20px;
        bottom: 20px;
      }
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
      width: 100%;
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
    .bargraph {
      float: left;
      width: 100%;
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
    .ChoseGateWay {
      position: absolute;
        top: 0;
        left: 0;
      /deep/ .el-select {
        // position: absolute;

        // left: 0;
        .el-input__inner {
          width: 250px;
          height: 60px;
          font-size: 18px;
          border: none;
          border-radius: none;
          background-color: rgba(77, 83, 95, 0.712);
          border-radius: 0;
          color: #fff;
        }
      }
    }
    .bargraph {
      float: left;
      width: 100%;
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
}
</style>
