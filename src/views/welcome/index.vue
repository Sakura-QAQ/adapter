<template>
  <div class="container">
    <div class="top-position">
      <el-form :model="reqParams">
        <el-form-item label="选择施肥机：">
          <el-select v-model="reqParams.fertilizerId" @change="fn">
            <el-option v-for="item in fertilizer" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="chartData" v-if="flagAll">
      <!-- 实时数据 -->
      <div class="chart_1" v-if="flagMin">
        <div class="topCard">
          实时数据
        </div>
        <div class="leftCard">
          <vue-scroll :ops="ops" style="width:100%;height:100%">
            <div class="bgfont">
              <div class="bgline">
                <div class="icons">PH</div>
                <div class="content">0.8</div>
              </div>
              <div class="bgline">
                <div class="icons">EC</div>
                <div class="content">2</div>
              </div>
              <div class="bgline">
                <div class="icons">流量</div>
                <div class="content">1000</div>
              </div>
              <div class="bgline">
                <div class="icons">累计流量</div>
                <div class="content">15000</div>
              </div>
              <div class="bgline">
                <div class="icons">液位</div>
                <div class="content">10/L</div>
              </div>
              <div class="bgline">
                <div class="icons">压力</div>
                <div class="content">100KP</div>
              </div>
              <div class="bgline">
                <div class="icons">负压</div>
                <div class="content">20KP</div>
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
          <div class="bgfont">
            <!-- <img src="../../assets/images/cut_img/juxing.png" alt=""> -->
            <div class="bgline">
              <div class="icons">温度</div>
              <div class="content">25/℃</div>
            </div>
            <div class="bgline">
              <div class="icons">湿度</div>
              <div class="content">10/%</div>
            </div>
            <div class="bgline">
              <div class="icons">光照</div>
              <div class="content">0.5</div>
            </div>
            <div class="bgline">
              <div class="icons">CO2</div>
              <div class="content">2/ml</div>
            </div>
            <div class="bgline">
              <div class="icons">风向</div>
              <div class="content">东南</div>
            </div>
            <div class="bgline">
              <div class="icons">风速</div>
              <div class="content">10 m/s</div>
            </div>
          </div>
        </div>
        <linegraph class="bargraph" :id="'bargraph_2'" :data="option2"></linegraph>
        <div class="btn" @click="sceneBtn"></div>
      </div>
      <!-- 土壤墒情 -->
      <div class="chart_3" v-if="flagMin">
        <div class="topCard">
          土壤墒情
        </div>
        <div class="leftCard">
          <div class="bgfont">
            <!-- <img src="../../assets/images/cut_img/juxing.png" alt=""> -->
            <div class="bgline">
              <div class="icons">土温1</div>
              <div class="content">12</div>
            </div>
            <div class="bgline">
              <div class="icons">土湿2</div>
              <div class="content">0.8</div>
            </div>
            <div class="bgline">
              <div class="icons">土温2</div>
              <div class="content">18</div>
            </div>
            <div class="bgline">
              <div class="icons">土湿2</div>
              <div class="content">12 KPa</div>
            </div>
            <div class="bgline">
              <div class="icons">PH</div>
              <div class="content">0.8</div>
            </div>
            <div class="bgline">
              <div class="icons">EC</div>
              <div class="content">0.1</div>
            </div>
          </div>
        </div>
        <linegraph class="bargraph" :id="'bargraph_3'" :data="option3"></linegraph>
        <div class="btn" @click="soilBtn"></div>
      </div>
      <!-- 天气预报 -->
      <div class="weather" v-if="flagMin">
        <div class="topCard">
          实时天气
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
            <div>今天</div>
            <div class="icons"></div>
            <div class="data">6°/22°</div>
          </div>
          <div class="fr">
            <div>明天</div>
            <div class="icons"></div>
            <div class="data">6°/22°</div>
          </div>
          <div class="fr">
            <div>后天</div>
            <div class="icons"></div>
            <div class="data">6°/22°</div>
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
              <div class="content">0.8</div>
            </div>
            <div class="bgline">
              <div class="icons">EC</div>
              <div class="content">2</div>
            </div>
            <div class="bgline">
              <div class="icons">流量</div>
              <div class="content">1000</div>
            </div>
            <div class="bgline">
              <div class="icons">累计流量</div>
              <div class="content">15000</div>
            </div>
            <div class="bgline">
              <div class="icons">液位</div>
              <div class="content">10/L</div>
            </div>
            <div class="bgline">
              <div class="icons">压力</div>
              <div class="content">100KP</div>
            </div>
            <div class="bgline">
              <div class="icons">负压</div>
              <div class="content">20KP</div>
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
        <div class="bgfont">
          <div class="bgline">
            <div class="icons">温度</div>
            <div class="content">25/℃</div>
          </div>
          <div class="bgline">
            <div class="icons">湿度</div>
            <div class="content">10/%</div>
          </div>
          <div class="bgline">
            <div class="icons">光照</div>
            <div class="content">0.5</div>
          </div>
          <div class="bgline">
            <div class="icons">CO2</div>
            <div class="content">2/ml</div>
          </div>
          <div class="bgline">
            <div class="icons">风向</div>
            <div class="content">东南</div>
          </div>
          <div class="bgline">
            <div class="icons">风速</div>
            <div class="content">10 m/s</div>
          </div>
        </div>
      </div>
      <linegraph class="bargraph" :id="'bargraph2_big'" :data="option2"></linegraph>
      <div class="btn" @click="sceneBtn_small"></div>
    </div>
    <div class="chart3_big" v-if="flagbig_3">
      <div class="topCard">
        土壤墒情
      </div>
      <div class="leftCard">
        <div class="bgfont">
          <!-- <img src="../../assets/images/cut_img/juxing.png" alt=""> -->
          <div class="bgline">
            <div class="icons">土温1</div>
            <div class="content">12</div>
          </div>
          <div class="bgline">
            <div class="icons">土湿2</div>
            <div class="content">0.8</div>
          </div>
          <div class="bgline">
            <div class="icons">土温2</div>
            <div class="content">18</div>
          </div>
          <div class="bgline">
            <div class="icons">土湿2</div>
            <div class="content">12 KPa</div>
          </div>
          <div class="bgline">
            <div class="icons">PH</div>
            <div class="content">0.8</div>
          </div>
          <div class="bgline">
            <div class="icons">EC</div>
            <div class="content">0.1</div>
          </div>
        </div>
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
          data: ['PH', 'EC'],
          top: 5
          // textStyle: {// 图例文字的样式
          //   color: 'white'
          // }
        },
        xAxis: {
          type: 'category',
          // name: 'x', y轴的标题
          // splitLine: { show: false }, 标题展示或不展示
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        },
        grid: {
          left: '1%',
          right: '2%',
          bottom: '8%',
          containLabel: true
        },
        yAxis: {
          type: 'category',
          // name: 'y', x轴的标题
          // splitLine: { show: true },标题展示或不展示
          data: ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%']
        },
        series: [
          {
            name: 'PH',
            type: 'line',
            data: [3.5, 2.4, 1.52, 1.25, 4.7, 5.5, 4.3, 0.23, 0.69, 0.25, 0.36, 0.56],
            // 浮点
            showSymbol: true,
            symbolSize: 5
          },
          {
            name: 'EC',
            type: 'line',
            data: [1, 0.2, 1.4, 3.8, 1.16, 2.32, 0.64, 1.28, 5.6, 3.25, 3.63, 1.65, 5.12],
            // itemStyle: {
            //   normal: {
            //     lineStyle: {
            //       width: 5,
            //       color: '#000'
            //     }
            //   }
            // },
            // 浮点
            showSymbol: true,
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
          data: ['温度', '光照'],
          top: 5
        },
        xAxis: {
          type: 'category',
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        },
        grid: {
          left: '1%',
          right: '2%',
          bottom: '8%',
          containLabel: true
        },
        yAxis: {
          type: 'category',
          data: ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%']
        },
        series: [
          {
            name: '温度',
            type: 'line',
            data: [1.8, 2.98, 1.96, 2.27, 3.81, 3.47, 1.74, 3.23, 4.69, 5.25, 4.36, 2.56],
            showSymbol: true,
            symbolSize: 5
          },
          {
            name: '光照',
            type: 'line',
            data: [3, 4.2, 2.4, 3.8, 4.16, 2.32, 1.64, 3.28, 4.6, 3.25, 2.63, 4.65, 3.12],
            showSymbol: true,
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
          data: ['土温1', '土湿2'],
          top: 5
        },
        xAxis: {
          type: 'category',
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        },
        grid: {
          left: '1%',
          right: '2%',
          bottom: '8%',
          containLabel: true
        },
        yAxis: {
          type: 'category',
          data: ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%']
        },
        series: [
          {
            name: '土温1',
            type: 'line',
            data: [0.8, 0.98, 0.96, 0.27, 0.81, 0.47, 0.74, 0.23, 0.69, 0.25, 0.36, 0.56],
            showSymbol: true,
            symbolSize: 5
          },
          {
            name: '土湿2',
            type: 'line',
            data: [1, 0.2, 0.4, 0.8, 0.16, 0.32, 0.64, 1.28, 5.6, 0.25, 0.63, 0.65, 0.12],
            showSymbol: true,
            symbolSize: 5
          }
        ]
      }
    }
  },
  created () {
    const projectId = JSON.parse(window.sessionStorage.getItem('projectId'))
    this.request.projectId = projectId
    this.getfertilizer()
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
    async getfertilizer () {
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/fertilizer/queryByProjectId', this.request)
      this.fertilizer = res.data.data
      this.reqParams.fertilizerId = this.fertilizer[0].id
      console.log(res.data.data)
    },
    async fn () {
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/irrigation/queryByFertilizerId', this.reqParams)
      this.titles = res.data.data
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
      background-color:  rgb(49, 58, 68);
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
      width: 30%;
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
            width: 35%;
            height: 80px;
            border-radius: 5px;
            font-size: 1.5rem;
            border-right: 1px solid RGB(101,133,159);
            float: left;
            font-weight: 800;
            background-color: RGB(54,76,95);
          }
          .content {
            width: 65%;
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
      width: 70%;
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
      width: 30%;
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
            width: 35%;
            height: 80px;
            border-radius: 5px;
            font-size: 1.5rem;
            border-right: 1px solid RGB(101,133,159);
            float: left;
            font-weight: 800;
            background-color: RGB(54,76,95);
          }
          .content {
            width: 65%;
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
      width: 70%;
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
      width: 30%;
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
            width: 35%;
            height: 80px;
            border-radius: 5px;
            font-size: 1.5rem;
            border-right: 1px solid RGB(101,133,159);
            float: left;
            font-weight: 800;
            background-color: RGB(54,76,95);
          }
          .content {
            width: 65%;
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
      width: 70%;
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
