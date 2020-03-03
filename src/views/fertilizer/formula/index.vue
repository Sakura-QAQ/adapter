<template>
<div class="formula">
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
  <div class="fer-container">
    <div class="fer-plan">
      <div>
        <p>配方列表</p>
      </div>
      <table class="pn-ltable" border="1" cellspacing="0" cellpadding="10" align="center">
        <thead>
          <tr>
            <th width="70">配方名称</th>
            <th width="70">作物</th>
            <th width="70">周期</th>
            <th width="70">EC基数</th>
            <th width="70">EC目标</th>
            <th width="70">PH目标</th>
            <th width="70">操作</th>
          </tr>
        </thead>
        <tbody class="pn-ltbody" align="center">
          <tr v-for="(item, index) in titles" :key="index">
            <td>{{item.name}}</td>
            <td>{{item.cropId}}</td>
            <td>{{item.periodDay}}</td>
            <td>{{item.ecBase}}</td>
            <td>{{item.ecTarget}}</td>
            <td>{{item.phTarget}}</td>
            <td>
              <span class="edit" @click="editData(item)" style="cursor: pointer;">编辑</span>
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
          <input class="submit" type="submit" value="修改" @click="updata" />
        </li>
        <li>
          配方名称: <input type="text" v-model="edit.name">
        </li>
        <li class="check-time">
          <span>
            选择作物:
            <select @change="fn($event)" v-model="edit.cropId">
              <option v-for="item in crop" :value="item.name" :label="item.name" :key="item.id">{{item.name}}</option>
            </select>
          </span>
          <span>
            选择周期:
            <select @change="cycleindex($event)" v-model="edit.periodId">
              <option v-for="item in cycle" :value="item.name" :key="item.id">{{item.name}}</option>
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
            <input type="number" v-model="edit.ecTarget" />
          </span>
          <span>
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
      list: {
        title: '通道'
      },
      titles: [],
      projectId: {
        projectId: 'project_id'
      },
      channelid: {
        projectId: 'channel'
      },
      cycleid: {
        projectId: '阿斯1111蒂芬'
      },
      channel: {},
      crop: [],
      cycle: [],
      edit: {}
    }
  },
  created () {
    this.getfomula()
  },
  methods: {
    async getfomula () {
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/formula/queryByProjectId', this.projectId)
      this.titles = res.data.data
    },
    async getchannel () {
      const way = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/channel/queryByProjectId', this.channelid)
      this.channel = way.data.data
    },
    async getcrop () {
      const crop = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/crop/queryByProjectId', this.channelid)
      this.crop = crop.data.data
    },
    async getcycle () {
      const cycle = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/period/queryByProjectId', this.cycleid)
      this.cycle = cycle.data.data
    },
    fn (event) {
      console.log(event.target.value)
    },
    cycleindex (event) {
      console.log(event.target.value)
    },
    async updata () {
      await this.$http.post('http://192.168.1.202:10020/fertilizer/api/formula/saveOrUpdate', this.edit)
      this.getfomula()
    },
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
    }
  },
  mounted () {
    this.getchannel()
    this.getcrop()
    this.getcycle()
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
    padding: 60px 0px;

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
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
      padding-top: 50px;
      height: 140px;
      padding-left: 20px;
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
