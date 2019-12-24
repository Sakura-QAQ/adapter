<template>
  <div class="fer-container">
    <div class="fer-plan">
      <div>
        <p>基数通道</p>
      </div>
      <div>
        <span>
          EC的基数:
          <input type="number" />
        </span>
        <span>
          PH、EC的目标值:
          <input type="number" />
        </span>
      </div>
      <div>
        <span>{{list.title}}:</span>
        <ul class="list-group">
          <li class="list-group-item" v-for="(item,index) in 9" :key="item">
            {{index + 1}}#通道：
            <input type="text" />
          </li>
        </ul>
      </div>
    </div>
    <div class="fer-table">
      <div class="bg-title">
        <p>生长周期</p>
      </div>
      <div class="check-time">
        <span>
          选择作物:
          <select name id>
            <option value="">无</option>
          </select>
        </span>
        <span>
          选择周期:
          <select name id>
            <option value="week">一周</option>
            <option value="month">一月</option>
          </select>
        </span>
        <span>
          周期天数:
          <input type="text" value="0" /> 天
        </span>
        <!-- <input class="submit" type="submit" value="确认" /> -->
      </div>
      <table class="pn-ltable" border="1" cellspacing="0" cellpadding="10" align="center">
        <thead>
          <tr>
            <th width="150">品种</th>
            <th width="150">生长期</th>
            <th width="150">天数</th>
          </tr>
        </thead>
        <tbody class="pn-ltbody" align="center">
          <tr v-for="item in 7" :key="item">
            <td>西红柿</td>
            <td>定值</td>
            <td>幼苗</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: {
        title: '通道'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.fer-container {
  display: flex;
  justify-content: space-evenly;
  .fer-plan {
    position: relative;
    width: 600px;
    height: 300px;
    background: url(../../../assets/images/bg2.png) no-repeat;
    background-size: 600px 300px;
    margin-top: 28px;

    div:nth-child(1) {
      position: absolute;
      top: -5px;
      left: 2px;
      width: 150px;
      height: 40px;
      background: url(../../../assets/images/bg4.png) no-repeat;
      background-size: 150px 40px;

      p {
        height: 40px;
        line-height: 36px;
        text-align: center;
        color: #fff;
        font-size: 24px;
        font-weight: 800;
      }
    }

    div:nth-child(2) {
      padding-top: 50px;
      height: 140px;
      padding-left: 20px;

      p {
        height: 60px;
        line-height: 60px;
      }
    }

    div:nth-child(3) {
      padding-left: 20px;
      .list-group {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        .list-group-item {
          height: 40px;
          line-height: 40px;
        }
      }
    }
  }

  .fer-table {
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
      background: url(../../../assets/images/bg0.png) no-repeat;
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
        width: 100px;
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
    }
  }
}
</style>
