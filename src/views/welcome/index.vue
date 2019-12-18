<template>
  <div class="container">
    <!-- 数据列表 -->
    <ul>
      <li>
        <div class="tl-tag">
          <img src="../../assets/icon/icon_gzqd.png" alt="">
          <p>EC</p>
          <p>us/cm</p>
        </div>
        <div class="tl-num">
          <p>3500</p>
        </div>
      </li>
    </ul>

    <!-- charts图表 -->

  </div>
</template>

<script>
export default {
  data () {
    return {
      tag: 'PH',
      num: 0.7
    }
  },
  methods: {
    show () {
      // console.log(111)
    }
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
}
</style>
