<template>
  <div class="container">
    <div class="top-position">
      <el-form :model="houseId">
        <el-form-item label="选择大棚：">
          <el-select v-model="houseId.id">
            <el-option v-for="item in house" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="ferz">
        <span>当前施肥机:</span>
        <span>1#施肥机</span>
      </div>
      <div class="data">
        <span>日期选择：</span>
        <el-date-picker
          v-model="daterange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <input type="button" class="submit" value="确定">
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
        <div class="hiddenCard" v-show="hiddenCard" @mouseenter="enterItem"
        @mouseleave="leaveItem"></div>
        <linegraph class="bargraph" :id="'bargraph_1'" :data="option1"></linegraph>
        <div class="share"></div>
        <div class="btn" @click="realtimeBtn"></div>
      </div>
      <!-- 气象站 -->
      <div class="chart_2" v-if="flagMin">
        <div class="topCard"  @click="tableWeather" style="cursor:pointer;">
          气象站
        </div>
        <linegraph class="bargraph" :id="'bargraph_2'" :data="option2"></linegraph>
        <div class="btn" @click="sceneBtn"></div>
      </div>
      <!-- 土壤墒情 -->
      <div class="chart_3" v-if="flagMin">
        <div class="topCard" @click="tableSoil" style="cursor:pointer;">
          土壤墒情
        </div>
        <div class="swimBtn" @mouseenter="enterItem1" @mouseleave="leaveItem1">
          <span>电磁阀</span>
        </div>
        <div class="hiddenCard" v-show="hiddenCard1" @mouseenter="enterItem1"
        @mouseleave="leaveItem1"></div>
        <linegraph class="bargraph" :id="'bargraph_3'" :data="option3"></linegraph>
        <div class="share"></div>
        <div class="btn" @click="soilBtn"></div>
      </div>
      <!-- 历史数据表 -->
      <div class="historytable" v-if="flagMin">
        <div class="topCard">
          历史数据表
        </div>
        <!-- 表格-->
        <v-table
          v-if="flagtable1"
          style="width:100%;"
          :height="380"
          :show-vertical-border="false"
          table-bg-color="rgba(41,52,65)"
          title-bg-color="rgba(41,52,65)"
          odd-bg-color="rgba(85, 92, 98, 0.9)"
          :is-horizontal-resize="true"
          :columns="tableConfig.columns"
          :table-data="tableConfig.tableData"
        ></v-table>
        <v-table
          v-if="flagtable2"
          style="width:100%"
          :height="380"
          :show-vertical-border="false"
          table-bg-color="rgba(41,52,65)"
          title-bg-color="rgba(41,52,65)"
          odd-bg-color="#313a44"
          :is-horizontal-resize="true"
          :columns="tableConfig.columns"
          :table-data="tableConfig.tableData"
        ></v-table>
        <v-table
          v-if="flagtable3"
          style="width:100%"
          :height="380"
          :show-vertical-border="false"
          table-bg-color="rgba(41,52,65)"
          title-bg-color="rgba(41,52,65)"
          odd-bg-color="#313a44"
          :is-horizontal-resize="true"
          :columns="tableConfig.columns"
          :table-data="tableConfig.tableData"
        ></v-table>
        <!-- <div class="pager">
          <v-pagination
            @page-change="pageChange"
            @page-size-change="pageSizeChange"
            :total="total"
            :page-size="pageSize"
            :layout="['total', 'prev', 'pager', 'next', 'jumper']"
          ></v-pagination>
        </div> -->
      </div>
    </div>
    <div class="chart1_big" v-if="flagbig_1">
      <!-- 实时数据 -->
      <div class="topCard">
        施肥机数据
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
      // 分页和表格数据
      // pageIndex: 1,
      // pageSize: 7,
      // total: 0,
      tableConfig: {
        tableData: [
          { date: '2020-04-02', PHdata: '58', ECdata: '68', flow: '112', Allflow: '584', level: '100', press: '50', pressCut: '130' },
          { date: '2020-04-03', PHdata: '58', ECdata: '68', flow: '112', Allflow: '584', level: '100', press: '50', pressCut: '130' },
          { date: '2020-04-04', PHdata: '58', ECdata: '68', flow: '112', Allflow: '584', level: '100', press: '50', pressCut: '130' },
          { date: '2020-04-05', PHdata: '58', ECdata: '68', flow: '112', Allflow: '584', level: '100', press: '50', pressCut: '130' },
          { date: '2020-04-06', PHdata: '58', ECdata: '68', flow: '112', Allflow: '584', level: '100', press: '50', pressCut: '130' },
          { date: '2020-04-07', PHdata: '58', ECdata: '68', flow: '112', Allflow: '584', level: '100', press: '50', pressCut: '130' },
          { date: '2020-04-08', PHdata: '58', ECdata: '68', flow: '112', Allflow: '584', level: '100', press: '50', pressCut: '130' },
          { date: '2020-04-09', PHdata: '58', ECdata: '68', flow: '112', Allflow: '584', level: '100', press: '50', pressCut: '130' },
          { date: '2020-04-10', PHdata: '58', ECdata: '68', flow: '112', Allflow: '584', level: '100', press: '50', pressCut: '130' }
        ],
        columns: [
          {
            field: 'date',
            title: '日期',
            width: 180,
            titleAlign: 'center',
            columnAlign: 'center'
          },
          {
            field: 'PHdata',
            title: 'PH',
            width: 100,
            titleAlign: 'center',
            columnAlign: 'center'
          },
          {
            field: 'ECdata',
            title: 'EC(μs/cm)',
            width: 120,
            titleAlign: 'center',
            columnAlign: 'center'
          },
          {
            field: 'flow',
            title: '流量(m³/H)',
            width: 100,
            titleAlign: 'center',
            columnAlign: 'center'
          },
          {
            field: 'Allflow',
            title: '累计流量(L)',
            width: 100,
            titleAlign: 'center',
            columnAlign: 'center'
          },
          {
            field: 'level',
            title: '液位(cm)',
            width: 100,
            titleAlign: 'center',
            columnAlign: 'center'
          },
          {
            field: 'press',
            title: '压力(kg/㎡)',
            width: 120,
            titleAlign: 'center',
            columnAlign: 'center'
          },
          {
            field: 'pressCut',
            title: '负压(kg/㎡)',
            width: 120,
            titleAlign: 'center',
            columnAlign: 'center'
          }
        ]
      },
      flagtable1: true,
      flagtable2: false,
      flagtable3: false,
      // 电磁阀显示隐藏
      hiddenCard: false,
      hiddenCard1: false,
      // 起始结束时间
      daterange: '',
      x: 0,
      y: 0,
      // 施肥机下拉框数据
      houseId: {
        id: ''
      },
      house: [
        {
          id: 1,
          name: '1#大棚'
        },
        {
          id: 2,
          name: '2#大棚'
        }
      ],
      // 施肥机id
      reqParams: {
        fertilizerId: ''
      },
      request: {
        projectId: ''
      },
      titles: [],
      fertilizer: [],
      flagAll: true,
      flagMin: true,
      flagbig_1: false,
      flagbig_2: false,
      flagbig_3: false,
      option1: {
        // title: {
        //   text: '实时数据',
        //   top: 5
        //   // left: 'center'
        // },
        tooltip: {
          trigger: 'axis'
          // formatter: '{a} <br/>{b} : {c}'
        },
        legend: {
          left: 'center',
          data: ['PH', 'EC', '流量', '累计流量'],
          top: 5,
          // textStyle: {// 图例文字的样式
          //   color: 'white'
          // }
          z: 10
        },
        xAxis: {
          type: 'category',
          data: ['15:00', '15:10', '15:20', '15:30', '15:40', '15:50', '16:00', '16:10', '16:20', '16:30', '16:40', '16:50']
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '8%',
          containLabel: false
        },
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
          }
        ],
        series: [
          {
            name: 'PH',
            type: 'line',
            data: [3.5, 2.4, 2.52, 2.25, 2.7, 2.5, 4.3, 1.23, 1.69, 1.25, 1.36, 1.56],
            showSymbol: true,
            yAxisIndex: 0,
            symbolSize: 5
          },
          {
            name: 'EC',
            type: 'line',
            data: [6, 5.2, 5.4, 5.8, 5.16, 5.32, 5.64, 5.28, 5.6, 5.25, 5.63, 5.65, 5.12],
            showSymbol: true,
            yAxisIndex: 1,
            symbolSize: 5
          },
          {
            name: '流量',
            type: 'line',
            data: [223, 252, 242, 385, 268, 374, 256, 300, 322, 215, 262, 323, 299],
            showSymbol: true,
            yAxisIndex: 2,
            symbolSize: 5
          },
          {
            name: '累计流量',
            type: 'line',
            data: [12521, 16842, 13542, 16842, 13222, 14526, 13475, 16222.5, 14263, 13265, 14653, 12358, 13768],
            showSymbol: true,
            yAxisIndex: 3,
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
          data: ['温度', '湿度', '光照', 'CO2'],
          top: 5
        },
        xAxis: {
          type: 'category',
          data: ['15:00', '15:10', '15:20', '15:30', '15:40', '15:50', '16:00', '16:10', '16:20', '16:30', '16:40', '16:50']
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '8%',
          containLabel: false
        },
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
          }
        ],
        series: [
          {
            name: '温度',
            type: 'line',
            data: [1.8, 2.98, 1.96, 2.27, 3.81, 3.47, 1.74, 3.23, 4.69, 5.25, 4.36, 2.56],
            showSymbol: true,
            yAxisIndex: 0,
            symbolSize: 5
          },
          {
            name: '湿度',
            type: 'line',
            data: [3, 4.2, 2.4, 3.8, 4.16, 2.32, 1.64, 3.28, 4.6, 3.25, 2.63, 4.65, 3.12],
            showSymbol: true,
            yAxisIndex: 1,
            symbolSize: 5
          },
          {
            name: '光照',
            type: 'line',
            data: [20.5, 28, 24, 38, 26, 21, 21.64, 32, 26, 30, 19, 25, 22],
            showSymbol: true,
            yAxisIndex: 3,
            symbolSize: 5
          },
          {
            name: 'CO2',
            type: 'line',
            data: [50, 78, 87, 68, 76, 51, 61.64, 42, 56, 60, 59, 55, 42],
            showSymbol: true,
            yAxisIndex: 3,
            symbolSize: 5
          }
        ]
      },
      option3: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          left: 'center',
          data: ['土温1', '土湿2', '土温2', 'PH'],
          top: 5
        },
        xAxis: [
          {
            type: 'category',
            data: ['15:00', '15:10', '15:20', '15:30', '15:40', '15:50', '16:00', '16:10', '16:20', '16:30', '16:40', '16:50']
          }
        ],
        grid: {
          left: '2%',
          right: '2%',
          bottom: '8%',
          // 区域是否包含坐标轴刻度
          containLabel: false
        },
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
          }
        ],
        /* dataZoom: [{
          type: 'slider', // 图表下方的伸缩条
          show: true, // 是否显示
          realtime: true, // 拖动时，是否实时更新系列的视图
          start: 0, // 伸缩条开始位置（1-100），可以随时更改
          end: 100 // 伸缩条结束位置（1-100），可以随时更改
        }], */
        /* toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            }
          }
        }, */
        dataZoom: [{
          type: 'inside'
        }],
        series: [
          {
            name: '土温1',
            type: 'line',
            data: [0.8, 0.98, 0.96, 0.27, 0.81, 0.47, 0.74, 0.23, 0.69, 0.25, 0.36, 0.56],
            showSymbol: true,
            yAxisIndex: 0,
            symbolSize: 5
          },
          {
            name: '土湿2',
            type: 'line',
            data: [1, 0.2, 0.4, 0.8, 0.16, 0.32, 0.64, 1.28, 1.6, 0.25, 0.63, 0.65, 0.12],
            showSymbol: true,
            yAxisIndex: 1,
            symbolSize: 5
          },
          {
            name: '土温2',
            type: 'line',
            data: [20, 15, 14, 21, 23, 22, 14, 20, 13, 17, 19, 17, 20],
            showSymbol: true,
            yAxisIndex: 2,
            symbolSize: 5
          },
          {
            name: 'PH',
            type: 'line',
            data: [560, 780, 240, 462, 397, 512, 685, 482, 489, 564, 849, 231, 451],
            showSymbol: true,
            yAxisIndex: 3,
            symbolSize: 5
          }
        ]
      }
    }
  },
  created () {
    const projectId = JSON.parse(window.sessionStorage.getItem('projectId'))
    this.request.projectId = projectId
  },
  mounted () {
  },
  methods: {
    // 历史数据表格+分页
    // getTableData () {
    //   this.total = this.tableConfig.tableData.length
    // },
    // pageChange (pageIndex) {
    //   this.pageIndex = pageIndex
    //   this.getTableData()
    // },
    // pageSizeChange (pageSize) {
    //   this.pageIndex = 1
    //   this.pageSize = pageSize
    //   this.getTableData()
    // },
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
    enterItem1 () {
      this.hiddenCard1 = true
    },
    // 电磁阀按钮离开
    leaveItem () {
      this.hiddenCard = false
    },
    leaveItem1 () {
      this.hiddenCard1 = false
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
    async getfertilizer () {
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/fertilizer/queryByProjectId', this.request)
      this.fertilizer = res.data.data
      this.reqParams.fertilizerId = this.fertilizer[0].id
      console.log(res.data.data)
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
        background-color: rgba(100, 87, 87, 0.3);
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
      span {
        display: inline-block;
      }
      span:first-child {
        width: 90px;
      }
      span:last-child {
        width: 90px;
      }
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
        position: absolute;
        top: 45px;
        left: 70px;
        width: 90%;
        height: 370px;
        border-radius: 10px;
        background-color: rgba(85, 92, 98, 0.9);
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
        position: absolute;
        top: 45px;
        left: 70px;
        width: 90%;
        height: 370px;
        border-radius: 10px;
        background-color: rgba(85, 92, 98, 0.9);
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
      /deep/ .v-table-views {
        border: none;
        .v-table-header-row {
          .v-table-title-cell {
            border-color: #666;
          }
        }
        .v-table-body {
          .v-table-body-cell {
            border-color: #666;
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
