<template>
  <div class="fer-container">
    <div class="fer-plan">
      <div>
        <p>配方</p>
      </div>
      <table class="pn-ltable" border="1" cellspacing="0" cellpadding="10" align="center">
        <thead>
          <tr>
            <th width="150">配方名称</th>
            <th width="90">EC基数</th>
            <th width="90">EC目标</th>
            <th width="90">PH目标</th>
            <th width="90">通道</th>
          </tr>
        </thead>
        <tbody class="pn-ltbody" align="center">
          <tr v-for="item in 7" :key="item">
            <td>null</td>
            <td>null</td>
            <td>null</td>
            <td>null</td>
            <td>null</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="fer-table">
      <div class="bg-title">
        <p>施肥详情</p>
      </div>
      <ul>
        <li>配方名称: <input type="text"></li>
        <li class="check-time">
          <span>
            选择作物:
            <select name id>
              <option value="">无</option>
            </select>
          </span>
          <span>
            选择周期:
            <select name id>
              <option value="">定值</option>
              <option value="">幼苗</option>
              <option value="">清苗</option>
              <option value="">开花</option>
            </select>
          </span>
          <span>
            周期天数:
            <input type="text" value="0" /> 天
          </span>
          <input class="submit" type="submit" value="确认" />
        </li>
        <li>
          <span>
            EC的基数:
            <input type="number" />
          </span>
        </li>
        <li>
          <!-- <span style="display:inline-block;margin-bottom:10px;">
            EC的基数:
            <input type="number" />
          </span> -->
          <!-- <br> -->
          <span>
            EC目标值:
            <input type="number" />
          </span>
          <span>
            PH目标值:
            <input type="number" />
          </span>
        </li>
        <li>
          施肥通道:
          <div>
            <span class="list-group-item" v-for="(item,index) in 9" :key="item">
              {{index + 1}}#通道:
              <input type="text" />
            </span>
          </div>
        </li>
      </ul>
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
    width: 670px;
    margin-top: 28px;
    border: 1px solid #5c7b95;
    background-color: #000;
    border-radius: 10px;
    padding-top: 60px;

    div:nth-child(1) {
      position: absolute;
      top: -10px;
      left: -1px;
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
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
      padding-top: 50px;
      height: 140px;
      padding-left: 20px;

      // span {
      //   margin-left: 20px;
      // }
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
    ul {
      padding: 0 15px;
      li {
        margin-bottom: 10px;
      }
      li:last-child {
        div {
          display: flex;
          justify-content: space-evenly;
          flex-wrap: wrap;
          .list-group-item {
            width: 190px;
            margin: 10px 0;
          }
        }
      }
    }
  }
}
</style>
