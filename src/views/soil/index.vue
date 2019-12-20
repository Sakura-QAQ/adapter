<template>
  <div class="container">
    <!-- 数据列表 -->
    <ul>
      <li v-for="item in 8" :key="item">
        <div class="tl-tag">
          <img src="../../assets/icon/icon_gzqd.png" alt />
          <p>EC</p>
          <p>us/cm</p>
        </div>
        <div class="tl-num">
          <p>3500</p>
        </div>
      </li>
    </ul>
    <!-- charts图表 -->
    <div>
      <x-chart id="highcharts" class="high" :option="option"></x-chart>
    </div>
  </div>
</template>

<script>

// 导入chart组件
import XChart from '@/components/charts'
var myvue = {}
export default {
  data () {
    return {
      option: {},
      data: [
        {
          name: 'EC:',
          data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
        }
      ],
      other: {
        chart: {
          type: 'spline',
          // zoomType: 'x',
          backgroundColor: 'transparent'
        },
        title: {
          text: '',
          style: {
            'color': '#fff'
          }
        },
        subtitle: {
          text: '',
          style: {
            'color': 'rgb(151, 177, 201)'
          }
        },
        xAxis: [{
          type: 'datetime',
          lineColor: '#6989a5',
          tickColor: '#6989a5',
          labels: {
            style: {
              'color': '#fff',
              'cursor': 'default',
              'fontSize': '14px'
            }
          }
        }],
        yAxis: [{
          title: {
            text: 'EC值',
            style: {
              'color': 'rgb(151, 177, 201)',
              'font-size': '14px'
            }
          },
          // 轴标签
          labels: {
            style: {
              'color': '#fff',
              'cursor': 'default',
              'fontSize': '14px'
            },
            align: 'center'
          },
          // 角标
          gridLineColor: '#2e3f4f',
          gridLineDashStyle: 'solid'
        }],
        legend: {
          enabled: false
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            pointStart: 2010
          }
        },
        series: ''
      }
    }
  },

  beforeCreate: function () {
    myvue = this
  },
  // methods: {
  //   async getData () {
  //     // 请求数据
  //     let last = await this.$http.get('https://data.jianshukeji.com/jsonp?filename=json/usdeur.json&callback=?')
  //     console.log(last)
  //   }
  // },
  mounted: function () {
    this.other.title.text = '蓝洋益海施肥机系统'
    this.other.subtitle.text = '数据来源：thesolarfoundation.com'
    this.other.series = myvue.data // 数据
    this.option = myvue.other
    // this.getData()
  },
  components: {
    XChart
  }
}
</script>

<style lang="less" scoped>
.container {
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    width: 580px;
    height: 340px;
    margin: 0 auto;
    padding-top: 15px;
    border: 1px solid #5c7b95;

    li {
      cursor: pointer;
      width: 120px;
      height: 146px;
      background: url(../../assets/images/bg5.png) no-repeat;
      background-size: 120px 146px;
      text-align: center;

      .tl-tag {
        width: 100%;
        height: 90px;

        p:nth-child(2) {
          color: #fff;
        }
      }

      .tl-num {
        width: 100%;
        height: 50px;

        p {
          line-height: 50px;
          font-size: 25px;
          font-weight: 800;
          color: #fff;
        }
      }
    }
  }

  .high {
    margin-top: 30px;
  }
}
</style>
