<template>
  <div>
    <select ref="addRequestState" @change="showValue()">
      <option value="4" selected>全部</option>
      <option value="0">未处理</option>
      <option value="1">已忽略</option>
      <option value="2">已接受</option>
      <option value="3">已拒绝</option>
    </select>
    <el-select v-model="plan" filterable placeholder="请选择" value-key="id" @change="currentSel">
      <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data () {
    return {
      plan: '',
      options: [
        {
          value: '选项1',
          id: 1,
          code: 'xuanxiang1',
          label: '黄金糕'
        },
        {
          code: 'xuanxiang2',
          id: 2,
          value: '选项2',
          label: '双皮奶'
        },
        {
          id: 3,
          value: '选项3',
          code: 'xuanxiang3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          id: 4,
          code: 'xuanxiang4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭',
          id: 5,
          code: 'xuanxiang5'
        }
      ]
    }
  },
  methods: {
    showValue () {
      let index = parseInt(this.$refs.addRequestState.value)
      console.log(index)
    },
    currentSel (selVal) {
      this.code = selVal.code
      this.name = selVal.label
      console.log('选择的name为：' + this.name, '选择的code为:' + this.code)
      console.log(selVal)
    }
  }
}
</script>

<style>

</style>
