<template>
    <div v-bind:id=id  v-bind:data=data></div>
</template>

<script>
import chalk from '@/assets/js/chalk'
export default {
  name: 'linegraph',
  data () {
    return {
      ChartLineGraph: null
    }
  },
  //  深度监听 父组件刚开始没有值，只有图表的配置项
  //  父组件ajax请求后改变数据的值，传递过来，图表已生成，监听传过来的值的改变
  watch: {
    data: {
      handler (newvalue, oldvalue) {
        this.drawLineGraph(this.id, newvalue)
      },
      // deep:true必须放在data里！百度真他妈害人不浅
      deep: true
    }
  },
  props: ['id', 'data'],
  mounted () {
    this.drawLineGraph(this.id, this.data)
  },
  methods: {
    drawLineGraph (id, data) {
      let _this = this
      let myChart = document.getElementById(id)
      this.$echarts.registerTheme('chalk', chalk) // 注册主题
      this.ChartLineGraph = this.$echarts.init(myChart, 'chalk')
      this.ChartLineGraph.setOption(data)
      window.addEventListener('resize', function () {
        _this.ChartLineGraph.resize()
      })
    }
  },
  beforeDestroy () {
    if (this.ChartLineGraph) {
      this.ChartLineGraph.clear()
    }
  }
}
</script>

<style scoped>

</style>
