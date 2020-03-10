
<template>
  <el-radio-group v-model="radioData" @change="start">
    <el-radio :label="text1" style="padding-bottom:5px;">仅一次</el-radio>
    <br />
    <el-radio :label="text2" >
      <input
        v-model="day"
        type="text"
        style="width:60px;"
      />天
    </el-radio>
  </el-radio-group>
</template>

<script >
export default {
  data () {
    return {
      text1: 0,
      text2: 1,
      day: '',
      radioData: 0
    }
  },
  methods: {
    start (value) {
      console.log(this.text1)
      console.log(this.text2)
    }
  }
}
</script>

<style>
  .hideContent{
      display: none;
  }
</style>
