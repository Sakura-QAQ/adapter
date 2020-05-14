<template>
<div class="crop">
  <div class="crop-container">
    <div class="fer-table">
      <div class="bg-title">
        <p>通道列表</p>
      </div>
      <div class="btn">
        <el-select v-model="reqParams.fertilizerId" placeholder="选择施肥机" @change="ferChange">
          <el-option v-for="item in fertilizer" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <input class="submit" type="button" value="提交" @click="updata">
      </div>
      <div class="pn-ltable">
        <table border="1" cellspacing="0" cellpadding="10" align="center">
          <thead  align="center">
            <tr>
              <th width="100">序号</th>
              <th width="200">通道</th>
            </tr>
          </thead>
          <tbody  align="center">
            <tr v-for="(item, index) in channels" :key="index">
              <td>{{index + 1}}通道：</td>
              <td><input type="text" v-model="channels[index]"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// 肥料主要有氮、磷、钾、硫、钙、镁、氯、硼、锰、铜、锌、铁、钼、钴、硼、锰、铜、锌、铁、钼、钴
export default {
  data () {
    return {
      find: 'find',
      flag: false,
      edit: {},
      request: { projectId: '' },
      // 施肥机id
      reqParams: {
        fertilizerId: ''
      },
      // 施肥机列表
      fertilizer: [],
      ferData: {},
      channels: ''
    }
  },
  created () {
    const projectId = JSON.parse(window.sessionStorage.getItem('projectId'))
    this.request.projectId = projectId
    this.getfertilizer().then(res => {
      this.getway()
    })
  },
  methods: {
    async ferChange () {
      this.getway()
    },
    async getfertilizer () {
      const res = await this.$http.post('fertilizer/api/fertilizer/queryByProjectId', this.request)
      this.fertilizer = res.data.data
      this.reqParams.fertilizerId = this.fertilizer[0].id
    },
    // 获取通道数据
    async getway () {
      const ID = {
        id: this.reqParams.fertilizerId
      }
      const { data: { data } } = await this.$http.post('fertilizer/api/fertilizer/queryById', ID)
      if (data.channels === null || data.channels === '') {
        data.channels = ',,,,,,,,'
        this.channels = data.channels.split(',')
        this.$message.warning('此施肥机无通道名称，请编辑后提交')
      } else {
        this.ferData = data
        this.channels = data.channels.split(',')
      }
    },
    // 更新数据
    async updata () {
      const channel = {
        id: this.reqParams.fertilizerId,
        channels: this.channels.join(',')
      }
      if (channel.channels === ',,,,,,,,') {
        this.$message.error('提交参数不能为空')
        return false
      } else {
        const { data } = await this.$http.post('http://192.168.1.254:10020/fertilizer/api/fertilizer/updateFertilizerChannels', channel)
        if (data.code === 200) {
          this.$message.success('提交成功')
          this.getway()
        } else {
          this.$message.error(data.msg)
        }
      }
    },
    // 清空
    clear () {
      this.edit = {}
    }
  }
}
</script>

<style lang="less" scoped>
@deep: ~'>>>';
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
    .btn {
      text-align:left;
      margin:0 0 15px 0;
      padding-left: 50px;
      .submit {
        margin-left: 50%;
      }
      @{deep} .el-select {
        .el-input__inner {
          width: 162px;
          height: 38px;
          border: none;
          border-radius: none;
          background-color: rgba(77, 83, 95, 0.712);
          border-radius: 0;
          color: #fff;
        }
      }
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
      text-align: left;
      margin-right: 50px;
    }
  }
}
</style>
