<template>
<div class="crop">
  <div class="top-position">
    <span>
      选择施肥机:
      <select name id>
        <option value>1#施肥机</option>
        <option value>2#施肥机</option>
      </select>
    </span>
    <input class="submit" type="submit" value="确定" />
  </div>
  <div class="crop-container">
    <div class="fer-table">
      <div class="bg-title">
        <p>通道列表</p>
      </div>
      <div class="pn-ltable">
        <table border="1" cellspacing="0" cellpadding="10" align="center">
          <thead  align="center">
            <tr>
              <th width="120">序号</th>
              <th width="120">通道</th>
              <th width="120">操作</th>
            </tr>
          </thead>
          <tbody  align="center">
            <tr>
              <td>1</td>
              <td>{{titles.channel1}}</td>
              <td rowspan="9">
                <span style="cursor: pointer;" @click="editData">编辑</span>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>{{titles.channel2}}</td>
            </tr>
            <tr>
              <td>3</td>
              <td>{{titles.channel3}}</td>
            </tr>
            <tr>
              <td>4</td>
              <td>{{titles.channel4}}</td>
            </tr>
            <tr>
              <td>5</td>
              <td>{{titles.channel5}}</td>
            </tr>
            <tr>
              <td>6</td>
              <td>{{titles.channel6}}</td>
            </tr>
            <tr>
              <td>7</td>
              <td>{{titles.channel7}}</td>
            </tr>
            <tr>
              <td>8</td>
              <td>{{titles.channel8}}</td>
            </tr>
            <tr>
              <td>9</td>
              <td>{{titles.channel9}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="modify">
      <div class="bg-title">
        <p>通道管理</p>
      </div>
      <div class="btn">
        <input type="button" value="修改" @click="updata">&nbsp;
        <input type="button" value="清空" @click="clear">
      </div>
      <div class="passway">
        <div>通道1: <input type="text" v-model="edit.channel1"></div>
        <div>通道2: <input type="text" v-model="edit.channel2"></div>
        <div>通道3: <input type="text" v-model="edit.channel3"></div>
        <div>通道4: <input type="text" v-model="edit.channel4"></div>
        <div>通道5: <input type="text" v-model="edit.channel5"></div>
        <div>通道6: <input type="text" v-model="edit.channel6"></div>
        <div>通道7: <input type="text" v-model="edit.channel7"></div>
        <div>通道8: <input type="text" v-model="edit.channel8"></div>
        <div>通道9: <input type="text" v-model="edit.channel9"></div>
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
      titles: {},
      edit: {},
      projectId: { projectId: 'channel' }
    }
  },
  async created () {
    this.getway()
  },
  methods: {
    // 获取通道数据
    async getway () {
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/channel/queryByProjectId', this.projectId)
      this.titles = res.data.data
      // console.log(res.data.data)
    },
    // 编辑数据
    editData () {
      // 将要编辑的数据传入
      // 编辑层打开，显示
      // this.flag = true
      // 将要编辑的数据赋值给this.edit，绑定this.edit
      this.edit = {
        id: this.titles.id,
        projectId: this.titles.projectId,
        channel1: this.titles.channel1,
        channel2: this.titles.channel2,
        channel3: this.titles.channel3,
        channel4: this.titles.channel4,
        channel5: this.titles.channel5,
        channel6: this.titles.channel6,
        channel7: this.titles.channel7,
        channel8: this.titles.channel8,
        channel9: this.titles.channel9,
        createTime: this.titles.createTime,
        updateTime: this.titles.updateTime,
        isDel: 0
      }
    },
    // 更新数据
    async updata () {
      // 点击更新按钮后触发，将用对象中的ID值来判断，选中更改的对象，并将更改后的对象重新给到this.titles
      // for (var i = 0; i < this.titles.length; i++) {
      //   if (this.titles[i].id === this.edit.id) {
      //     this.titles[i] = this.edit
      //     this.flag = false
      //   }
      // }
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/channel/saveOrUpdate', this.edit)
      console.log(res)
      this.getway()
    },
    // 清空
    clear () {
      // this.edit = {
      //   id: this.titles.id,
      //   projectId: this.titles.projectId,
      //   channel1: null,
      //   channel2: null,
      //   channel3: null,
      //   channel4: null,
      //   channel5: null,
      //   channel6: null,
      //   channel7: null,
      //   channel8: null,
      //   channel9: null,
      //   createTime: this.titles.createTime,
      //   updateTime: this.titles.updateTime,
      //   isDel: 0
      // }
      this.edit = {}
    }
  }
}
</script>

<style lang="less" scoped>
.crop-container {
  display: flex;
  justify-content: space-evenly;
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
