<template>
  <div class="fer-container">
    <div class="fer-plan">
      <div>
        <p>EC的基数: <input type="number"> </p>
        <p>PH、EC的目标值: <input type="number"> </p>
      </div>
      <div>
        <span>{{list.title}}:</span>
        <ul class="list-group">
          <li class="list-group-item" v-for="(item,index) in 9" :key="item">
            {{index + 1}}#通道：<input type="text">
          </li>
        </ul>
      </div>
    </div>

    <div class="fer-table">
      <div class="bg-title">
        <p>周期 </p>
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
      width: 600px;
      height: 300px;
      background: url(../../assets/images/bg2.png) no-repeat;
      background-size:  600px 300px;
      margin-top: 28px;

      div:first-child {
        height: 140px;
        padding-left: 20px;

        p {
          height: 60px;
          line-height: 60px;
        }
      }

      div:last-child {
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
        background:url(../../assets/images/bg0.png) no-repeat;
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
    }
  }
</style>
