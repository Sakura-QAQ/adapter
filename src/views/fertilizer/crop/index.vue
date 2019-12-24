<template>
<div class="crop-container">
  <div class="fer-table">
    <div class="bg-title">
      <p>作物管理</p>
    </div>
    <el-transfer v-model="value" :data="data" :titles="['Source', 'Target']"></el-transfer>
  </div>
</div>
</template>

<script>
export default {
  data () {
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 9; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`
          // disabled: i % 4 === 0
        })
      }
      return data
    }
    return {
      data: generateData(),
      value: [2, 4]
    }
  }
}
</script>

<style lang="less" scoped>
.crop-container {
  display: flex;
  justify-content: center;
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
      background:url(../../../assets/images/bg0.png) no-repeat;
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

    /deep/.el-transfer {
      display: -webkit-box;
      -webkit-box-pack: center;
      // color: #fff;
      .el-transfer-panel {
        background-color: transparent;
        border: 1px solid #6989a5;
        .el-transfer-panel__header {
          background: #ccc;
        }
        .el-transfer-panel__item.el-checkbox {
          color: #ccc;
        }
        .el-checkbox__inner {
          background-color: rgba(185, 177, 177, 0.774);
        }
      }

      .el-transfer__button i {
        color: #fff;
      }
    }
  }
}
</style>
