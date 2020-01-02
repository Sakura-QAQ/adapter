<template>
  <div class="sta-container">
    <!-- <div>
      <div class="bg-title">
        <p>定义时长</p>
      </div>
      <div class="check-time">
        <span>
          选择时间:
          <select name id>
            <option value="week">一周</option>
            <option value="month">一月</option>
          </select>
        </span>
        <input class="submit" type="submit" value="确认" />
      </div>
      <table class="pn-ltable" border="1" cellspacing="0" cellpadding="10" align="center">
        <thead>
          <tr>
            <th width="100">类型</th>
            <th width="100">最大值</th>
            <th width="100">最小值</th>
            <th width="100">平均值</th>
          </tr>
        </thead>
        <tbody class="pn-ltbody" align="center">
          <tr v-for="item in 4" :key="item">
            <td>土壤温度</td>
            <td>35</td>
            <td>35</td>
            <td>35</td>
          </tr>
        </tbody>
      </table>
    </div> -->
    <div>
      <div class="bg-title">
        <p>灌溉统计</p>
      </div>
      <div class="check-time">
        <el-time-picker
          is-range
          v-model="value1"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围">
        </el-time-picker>
        <table class="pn-ltable" border="1" cellspacing="0" cellpadding="10" align="center">
          <thead>
            <tr>
              <th width="100">类型</th>
              <th width="100">最大值</th>
              <th width="100">最小值</th>
              <th width="100">平均值</th>
            </tr>
          </thead>
          <tbody class="pn-ltbody" align="center">
            <tr v-for="item in 4" :key="item">
              <td>PH</td>
              <td>35</td>
              <td>35</td>
              <td>35</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: new Date()
    }
  }
}
</script>

<style lang="less" scoped>
.sta-container {
  display: flex;
  justify-content: space-evenly;
  > div {
    position: relative;
    width: 670px;
    height: 500px;
    border: 1px solid #5c7b95;
    border-radius: 20px;
    background: #000;
    padding-top: 60px;
    margin-top: 30px;

    .bg-title {
      position: absolute;
      top: -25px;
      left: 21%;
      width: 380px;
      height: 50px;
      background: url(../../assets/images/bg0.png) no-repeat;
      background-size: contain;

      p {
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #fff;
        font-size: 26px;
        font-weight: 800;
      }
    }

    .check-time {
      text-align: center;
      margin-bottom: 20px;
      select {
        width: 250px;
        height: 34px;
        padding: 0 15px;
        font-size: 16px;
        color: #fff;
        border: 1px solid #215077;
        background-color: rgba(41, 58, 72);
      }

      .submit {
        width: 100px;
        height: 35px;
        color: #fff;
        background-color: #6888a4;
      }

      .el-date-editor {
        background-color: #000;
        border: none;
        /deep/ .el-range-separator {
          color: #97b1c9;
        }
        /deep/ .el-range-input {
          color: #fff;
        }
      }

      .pn-ltable {
        margin-top: 20px;
      }
    }
  }
}
</style>
