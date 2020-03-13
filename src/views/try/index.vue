<template>
  <div>
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
    <br />
    <br />
    <input class="submit" type="submit" @click="submit">
  </div>
</template>

<script >
export default {
  data () {
    return {
      text1: 0,
      text2: 1,
      day: 0,
      radioData: 0
    }
  },
  methods: {
    start (value) {
      // this.day = this.text2
      // console.log(value)
    },
    submit () {
      // if (this.text1 === 0) {
      //   this.radioData = 1
      // } else if (this.text2 === 1) {
      //   this.radioData = this.day
      // }
      console.log(this.radioData)
    }
  }
}
</script>

<style>
  .hideContent{
      display: none;
  }
</style>
