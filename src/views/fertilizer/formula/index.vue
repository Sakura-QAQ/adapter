<template>
<div class="formula">
  <div class="fer-container">
    <div class="fer-plan">
      <div>
        <p>配方列表</p>
      </div>
      <div><input class="submit" type="button" value="添加" @click="clear"></div>
      <table class="pn-ltable" border="1" cellspacing="0" cellpadding="10" align="center">
        <thead>
          <tr>
            <th width="70">配方名称</th>
            <th width="70">作物</th>
            <th width="70">周期</th>
            <th width="70">周期天数</th>
            <th width="70">EC基数</th>
            <th width="70">EC目标</th>
            <th width="70">PH目标</th>
            <th width="70">操作</th>
          </tr>
        </thead>
        <tbody class="pn-ltbody" align="center">
          <tr v-for="(item, index) in titles" :key="index">
            <td>{{item.name}}</td>
            <td>{{item.cropName}}</td>
            <td>{{item.cycleName}}</td>
            <td>{{item.periodDay}}</td>
            <td>{{item.ecBase}}</td>
            <td>{{item.ecTarget}}</td>
            <td>{{item.phTarget}}</td>
            <td>
              <span class="edit" @click="editData(item)" style="cursor: pointer;">编辑</span>&nbsp;
              <span class="edit" @click="del(index)" style="cursor: pointer;">删除</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="fer-table">
      <div class="bg-title">
        <p>配方详情</p>
      </div>
      <ul>
        <li>
          <!-- <input class="add" type="submit" value="添加" @click="add" /> -->
          <input class="submit" type="button" value="提交" @click="updata" />
        </li>
        <li>
          配方名称: <input type="text" v-model="edit.name">
        </li>
        <li class="check-time">
          <span>
            选择作物:
            <select v-model="edit.cropId">
              <option v-for="item in crop" :value="item.id" :label="item.name" :key="item.id">{{item.name}}</option>
            </select>
          </span>
          <span>
            选择周期:
            <select v-model="edit.periodId">
              <option v-for="item in cycle" :value="item.id" :label="item.name" :key="item.id">{{item.name}}</option>
            </select>
          </span>
          <span>
            周期:
            <input type="text" v-model="edit.periodDay" /> 天
          </span>
        </li>
        <li>
          <span>
            EC的基数:
            <input type="number" v-model="edit.ecBase" />
          </span>
        </li>
        <li>
          <span>
            EC目标值:
            <input type="number" v-model="edit.ecTarget" />μS/cm
          </span>
          <span style="margin-left:15px;">
            PH目标值:
            <input type="number" v-model="edit.phTarget" />
          </span>
        </li>
        <li>
          施肥通道:
          <div>
            <span class="list-group-item">
              {{channel.channel1}}: <input type="text" v-model="edit.channel1" />
            </span>
            <span class="list-group-item">
              {{channel.channel2}}: <input type="text" v-model="edit.channel2" />
            </span>
            <span class="list-group-item">
              {{channel.channel3}}: <input type="text" v-model="edit.channel3" />
            </span>
            <span class="list-group-item">
              {{channel.channel4}}: <input type="text" v-model="edit.channel4" />
            </span>
            <span class="list-group-item">
              {{channel.channel5}}: <input type="text" v-model="edit.channel5" />
            </span>
            <span class="list-group-item">
              {{channel.channel6}}: <input type="text" v-model="edit.channel6" />
            </span>
            <span class="list-group-item">
              {{channel.channel7}}: <input type="text" v-model="edit.channel7" />
            </span>
            <span class="list-group-item">
              {{channel.channel8}}: <input type="text" v-model="edit.channel8" />
            </span>
            <span class="list-group-item">
              {{channel.channel9}}: <input type="text" v-model="edit.channel9" />
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      // 项目id
      request: {
        projectId: ''
      },
      list: {
        title: '通道'
      },
      // 配方
      titles: [],
      // 根据索引id删除
      fomulaId: {
        id: ''
      },
      // 通道
      channel: {},
      // 作物列表
      crop: [],
      // 周期
      cycle: [],
      // 编辑
      edit: {}
    }
  },
  created () {
    this.getchannel()
    const projectId = JSON.parse(window.sessionStorage.getItem('projectId'))
    this.request.projectId = projectId
  },
  beforeMount () {
    this.getcrop()
    this.getcycle()
  },
  mounted () {
    this.getfomula()
  },
  methods: {
    // 获取作物
    async getcrop () {
      const crop = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/crop/queryByProjectId', this.request)
      // console.log(crop)
      this.crop = crop.data.data
    },
    // 渲染配方列表
    async getfomula () {
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/formula/queryByProjectId', this.request)
      var crop2 = this.crop
      var cycle2 = this.cycle
      var titles2 = res.data.data
      for (var i = 0; i < titles2.length; i++) {
        titles2[i].cropName = '已删除'
        titles2[i].cycleName = '已删除'
        for (var j = 0; j < crop2.length; j++) {
          if (titles2[i].cropId === crop2[j].id) {
            titles2[i].cropName = crop2[j].name
          }
        }
        for (var l = 0; l < cycle2.length; l++) {
          if (titles2[i].periodId === cycle2[l].id) {
            titles2[i].cycleName = cycle2[l].name
          }
        }
      }
      this.titles = titles2
      // this.titles = res.data.data
    },
    // 获取施肥通道
    async getchannel () {
      const way = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/channel/queryByProjectId', this.request)
      this.channel = way.data.data
    },
    // 获取到作物id赋值给列表
    // 获取周期
    async getcycle () {
      const cycle = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/period/queryByProjectId', this.request)
      this.cycle = cycle.data.data
    },
    // 删除作物
    async del (index) {
      this.fomulaId.id = this.titles[index].id
      await this.$http.post('http://192.168.1.202:10020/fertilizer/api/formula/delete', this.fomulaId)
      this.getfomula()
    },
    // 获取索引
    // fn (event) {
    //   console.log(event.target.value)
    // },
    // 获取周期索引
    // cycleindex (event) {
    //   console.log(event.target.value)
    // },
    // 编辑
    editData (item) {
      this.edit = {
        id: item.id,
        projectId: item.projectId,
        name: item.name,
        cropId: item.cropId,
        periodId: item.periodId,
        periodDay: item.periodDay,
        ecBase: item.ecBase,
        ecTarget: item.ecTarget,
        phTarget: item.phTarget,
        channel1: item.channel1,
        channel2: item.channel2,
        channel3: item.channel3,
        channel4: item.channel4,
        channel5: item.channel5,
        channel6: item.channel6,
        channel7: item.channel7,
        channel8: item.channel8,
        channel9: item.channel9
      }
    },
    // 更新和提交
    async updata () {
      this.edit = {
        id: this.edit.id,
        projectId: this.request.projectId,
        name: this.edit.name,
        cropId: this.edit.cropId,
        periodId: this.edit.periodId,
        periodDay: this.edit.periodDay,
        ecBase: this.edit.ecBase,
        ecTarget: this.edit.ecTarget,
        phTarget: this.edit.phTarget,
        channel1: this.edit.channel1,
        channel2: this.edit.channel2,
        channel3: this.edit.channel3,
        channel4: this.edit.channel4,
        channel5: this.edit.channel5,
        channel6: this.edit.channel6,
        channel7: this.edit.channel7,
        channel8: this.edit.channel8,
        channel9: this.edit.channel9
      }
      await this.$http.post('http://192.168.1.202:10020/fertilizer/api/formula/saveOrUpdate', this.edit)
      this.edit = {}
      this.getfomula()
    },
    clear () {
      this.edit = {
        id: null,
        projectId: null,
        name: null,
        cropId: null,
        periodId: null,
        periodDay: null,
        ecBase: null,
        ecTarget: null,
        phTarget: null,
        channel1: 0,
        channel2: 0,
        channel3: 0,
        channel4: 0,
        channel5: 0,
        channel6: 0,
        channel7: 0,
        channel8: 0,
        channel9: 0
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
    width: 800px;
    margin-top: 28px;
    border: 1px solid #5c7b95;
    background-color: #000;
    border-radius: 10px;
    padding: 70px 0 60px 0;

    div:nth-child(1) {
      position: absolute;
      top: -25px;
      left: 21%;
      width: 380px;
      height: 50px;
      background: url(../../../assets/images/bg0.png) no-repeat;
      background-size: contain;

      p {
        line-height: 50px;
        text-align: center;
        color: #fff;
        font-size: 26px;
        font-weight: 800;
      }
    }

    div:nth-child(2) {
      position: absolute;
      top: 30px;
      right: 42px;
      // text-align: right;

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

        .submit {
          position: absolute;
          top: 30px;
          right: 42px;
        }
        .add {
          position: absolute;
          top: 30px;
          right: 128px;
        }
      }
      li:last-child {
        div {
          display: flex;
          justify-content: space-evenly;
          flex-wrap: wrap;

          .list-group-item {
            margin: 10px 15px;
          }
        }
      }
    }
  }
}
</style>
