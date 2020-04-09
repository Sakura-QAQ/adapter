<template>
<div class="crop">
  <div class="crop-container">
    <div class="fer-table">
      <div class="bg-title">
        <p>通道列表</p>
      </div>
      <div class="btn" style="text-align:right;margin:0 50px 15px 0;">
        <input class="submit" type="button" value="提交" @click="updata">
        <!-- <input type="button" value="清空" @click="clear"> -->
      </div>
      <div class="pn-ltable">
        <table border="1" cellspacing="0" cellpadding="10" align="center">
          <thead  align="center">
            <tr>
              <th width="80">序号</th>
              <th width="200">通道</th>
              <!-- <th width="120">操作</th> -->
            </tr>
          </thead>
          <tbody  align="center">
            <tr>
              <td>1</td>
              <!-- <td>{{plans.channel1}}</td> -->
              <td><input type="text" v-model="plans.channel1"></td>
              <!-- <td rowspan="9">
                <span style="cursor: pointer;" @click="editData">编辑</span>
              </td> -->
            </tr>
            <tr>
              <td>2</td>
              <!-- <td>{{plans.channel2}}</td> -->
              <td><input type="text" v-model="plans.channel2"></td>
            </tr>
            <tr>
              <td>3</td>
              <!-- <td>{{plans.channel3}}</td> -->
              <td><input type="text" v-model="plans.channel3"></td>
            </tr>
            <tr>
              <td>4</td>
              <!-- <td>{{plans.channel4}}</td> -->
              <td><input type="text" v-model="plans.channel4"></td>
            </tr>
            <tr>
              <td>5</td>
              <!-- <td>{{plans.channel5}}</td> -->
              <td><input type="text" v-model="plans.channel5"></td>
            </tr>
            <tr>
              <td>6</td>
              <!-- <td>{{plans.channel6}}</td> -->
              <td><input type="text" v-model="plans.channel6"></td>
            </tr>
            <tr>
              <td>7</td>
              <!-- <td>{{plans.channel7}}</td> -->
              <td><input type="text" v-model="plans.channel7"></td>
            </tr>
            <tr>
              <td>8</td>
              <!-- <td>{{plans.channel8}}</td> -->
              <td><input type="text" v-model="plans.channel8"></td>
            </tr>
            <tr>
              <td>9</td>
              <!-- <td>{{plans.channel9}}</td> -->
              <td><input type="text" v-model="plans.channel9"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      find: 'find',
      flag: false,
      edit: {},
      plans: {},
      request: { projectId: '' }
    }
  },
  created () {
    const projectId = JSON.parse(window.sessionStorage.getItem('projectId'))
    this.request.projectId = projectId
    this.getway()
  },
  methods: {
    // 获取通道数据
    async getway () {
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/channel/queryByProjectId', this.request)
      this.plans = res.data.data
      // console.log(res.data.data)
    },
    // 更新数据
    async updata () {
      this.plans = {
        id: this.plans.id,
        projectId: this.plans.projectId,
        channel1: this.plans.channel1,
        channel2: this.plans.channel2,
        channel3: this.plans.channel3,
        channel4: this.plans.channel4,
        channel5: this.plans.channel5,
        channel6: this.plans.channel6,
        channel7: this.plans.channel7,
        channel8: this.plans.channel8,
        channel9: this.plans.channel9,
        createTime: this.plans.createTime,
        updateTime: this.plans.updateTime,
        isDel: this.plans.isDel
      }
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/channel/saveOrUpdate', this.plans)
      // console.log(res)
      if (res.data.code === 200) {
        this.$message.success('修改成功')
      } else {
        this.$message.error('修改失败')
      }
      this.getway()
    },
    // 清空
    clear () {
      this.edit = {}
    }
  }
}
</script>

<style lang="less" scoped>
.crop-container {
  display: flex;
  justify-content: space-evenly;
  margin-top: 58px;
  .fer-table {
    position: relative;
    width: 670px;
    border: 1px solid #5c7b95;
    border-radius: 20px;
    background: #000;
    padding: 40px 0px;
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
    .add-data {
      text-align: center;
    }
    .layer {
      text-align: center;
    }
  }
  .modify {
    position: relative;
    width: 670px;
    border: 1px solid #5c7b95;
    border-radius: 20px;
    background: #000;
    padding: 40px 0px;
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
    .passway {
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
      text-align: center;
      margin-top: 50px;
      div {
        width: 200px;
        height: 50px;
      }
    }
    .btn {
      text-align: right;
      margin-right: 50px;
    }
  }
}
</style>
