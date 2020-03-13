<template>
  <!-- 启动时间 灌溉时长 灌溉流量 选择配方 -->
  <!-- 有运行停止的切换按钮 -->
  <div class="irr-container">
    <div class="top-position">
      <el-form :model="reqParams">
        <el-form-item label="选择施肥机：">
          <el-select v-model="reqParams.fertilizerId" @change="fn">
            <el-option v-for="item in fertilizer" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="irrigation">
      <!-- 策略列表 -->
      <div class="irr-form">
        <div class="bg-title">
          <p>策略列表</p>
        </div>
        <div><input class="submit" type="button" value="添加" @click="clear"></div>
        <div class="pn-ltable">
          <table border="0" cellspacing="0" cellpadding="10" align="center">
            <thead align="center">
              <tr>
                <td width="70">序号</td>
                <td width="70">灌溉名称</td>
                <td width="70">启动时间</td>
                <td width="70">启动日期</td>
                <td width="70">结束日期</td>
                <td width="70">灌溉方式</td>
                <td width="70">灌溉时长(秒)</td>
                <td width="70">灌溉流量(m³)</td>
                <td width="70">每隔</td>
                <td width="70">配方</td>
                <td width="70">状态</td>
                <td width="120">操作</td>
              </tr>
            </thead>
            <tbody align="center">
              <tr v-for="(item, index) in titles" :key="index">
                <td>{{index + 1}}</td>
                <td>{{item.name}}</td>
                <td>{{item.startTime}}</td>
                <td>{{item.startDate}}</td>
                <td>{{item.endDate}}</td>
                <td>{{item.irrigationType}}</td>
                <td>{{item.irrigationTime}}</td>
                <td>{{item.irrigationVolume}}</td>
                <td>{{item.intervalTime}}</td>
                <td>{{item.optionName}}</td>
                <td>{{item.status}}</td>
                <td>
                  <span class="edit" @click="editData(item)" style="cursor: pointer;">编辑</span>
                  &nbsp;
                  <span
                    class="delete"
                    @click="del(index)"
                    style="cursor: pointer;"
                  >删除</span>
                  <span style="cursor: pointer;">启动</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- 详情 -->
      <div class="show-form">
        <div class="bg-title">
          <p>详情</p>
        </div>
        <div class="layer">
          <!-- 操作 -->
          <div class="handle">
            <input class="submit" type="button" @click="add()" value="提交">
          </div>
          <div class="information">
            <!-- 名称 -->
            <div>
              <div class="align">名称</div>
              <div style="margin-left:50px;">
                <input type="text" v-model="edit.name" />
              </div>
            </div>
            <!-- 启动时间 -->
            <div>
              <div class="align">启动时间</div>
              <div style="margin-left:50px;">
                <el-time-select
                  v-model="edit.startTime"
                  :picker-options="{
                    start: '07:30',
                    step: '00:01',
                    end: '18:30'
                  }"
                  placeholder="选择时间"
                ></el-time-select>
              </div>
              <div style="margin-left:50px;">
                <el-radio-group v-model="radio" @change="start">
                  <el-radio :label="1" style="padding-bottom:5px;">仅一次</el-radio>
                  <br />
                  <el-radio :label="0" >
                    <div style="padding-bottom:5px;font-size: 14px;">
                      每隔
                      <input
                        v-model="day"
                        type="text"

                        style="width:60px;"
                      />天
                      <input
                        v-model="hours"
                        type="text"

                        style="width:60px;"
                      />小时
                      <input
                        v-model="mins"
                        type="text"

                        style="width:60px;"
                      />分
                    </div>
                    <br />
                    <div class="block">
                      <el-date-picker
                        v-model="datatime"
                        type="datetimerange"
                        start-placeholder="起始日期"
                        end-placeholder="结束日期"
                        style="width:288px;"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :default-time="['00:00:00', '23:59:59']"
                        @change="check">
                      </el-date-picker>
                    </div>
                  </el-radio>
                </el-radio-group>
              </div>
            </div>
            <!-- 灌溉 -->
            <div>
              <div class="align">灌溉</div>
              <div style="margin-left:50px;">
                <el-radio-group v-model="radio1">
                  <el-radio :label="edit.irrigationTime">
                    灌溉时长:
                    <input type="text" v-model="edit.irrigationTime" />(秒)
                  </el-radio>
                  <br />
                  <el-radio :label="edit.irrigationVolume" style="padding-top:5px;">
                    灌溉流量:
                    <input type="text" v-model="edit.irrigationVolume" />(m³)
                  </el-radio>
                </el-radio-group>
              </div>
            </div>
            <br />
            <!-- 配方 -->
            <div>
              <div class="align">配方</div>
              <div style="margin-left:50px">
                <el-select
                  v-model="edit.formulaId"
                  filterable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :value="item.id"
                    :label="item.name"
                  >{{item.name}}</el-option>
                </el-select>
              </div>
            </div>
          </div>
        </div>
        <div class="control-valve">
          <div class="bg-tag">
            <p>阀号</p>
          </div>
          <el-checkbox-group v-model="checkboxGroup" @change="changebox">
            <template v-for="(item, index) in 64">
              <el-checkbox-button :label="index" :key="index" v-show="cut(index)" >
                <div class="valve_num" v-on:dblclick="editval($event)">阀</div>
              </el-checkbox-button>
            </template>
          </el-checkbox-group>
          <div
            @click="lock"
            style="text-align:center;color:#fff;cursor:pointer;padding-bottom:5px;"
          >{{content}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import collapse from '@/collapse'
export default {
  data () {
    return {
      day: 0,
      hours: 0,
      mins: 0,
      curIndex: false,
      message: '',
      message1: '',
      message2: '',
      isActive: false,
      content: '更多阀号▼',
      // 阀号
      val: '',
      // 灌溉列表
      titles: [],
      // 施肥机数据
      fertilizer: [],
      // 施肥机下拉框传的id
      reqParams: {
        fertilizerId: '6c539b84-6380-11ea-9f50-00d86189352f'
      },
      // 循环计划单选
      radio: 0,
      // 灌溉的单选
      radio1: 0,
      plan: '',
      // 配方数据
      options: [],
      // 项目id
      request: {
        projectId: ''
      },
      // 日期和时间
      datatime: [],
      value2: '',
      planId: {
        id: null
      },
      checkboxGroup: [],
      // 要提交或要编辑的数据
      edit: {
        id: '',
        name: '',
        formulaId: '',
        projectId: '',
        fertilizerId: '',
        status: 0,
        startTime: null,
        onlyOnce: 1,
        intervalTime: null,
        startDate: null,
        endDate: null,
        irrigationType: null,
        irrigationTime: null,
        irrigationVolume: null,
        valveNumbers: '',
        nextExeTime: null,
        createTime: null,
        updateTime: null,
        isDel: 0
      }
    }
  },
  created () {
    const projectId = JSON.parse(window.sessionStorage.getItem('projectId'))
    this.request.projectId = projectId
    // const fertilizerId = window.sessionStorage.getItem('fertilizerId')
    // this.reqParams.fertilizerId = fertilizerId
    this.getfomula()
    this.getfertilizer()
  },
  mounted () {
    this.enterPage()
    // this.getIrrigation()
  },
  methods: {
    // 进入页面渲染
    async enterPage () {
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/irrigation/queryByFertilizerId', this.reqParams)
      // this.titles = res.data.data
      var options = this.options
      var titles2 = res.data.data
      for (var i = 0; i < titles2.length; i++) {
        titles2[i].optionName = '已删除'
        for (var j = 0; j < options.length; j++) {
          if (titles2[i].formulaId === options[j].id) {
            titles2[i].optionName = options[j].name
          }
        }
        this.titles = titles2
        if (titles2[i].status === 0) {
          titles2[i].status = '不可用'
        } else {
          titles2[i].status = '可用'
        }
        if (titles2[i].irrigationType === 0) {
          titles2[i].irrigationType = '时长'
        } else {
          titles2[i].irrigationType = '流量'
        }
      }
    },
    // 切换施肥机
    async fn () {
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/irrigation/queryByFertilizerId', this.reqParams)
      // console.log(this.reqParams.fertilizerId)
      this.titles = res.data.data
      var options = this.options
      var titles2 = res.data.data
      for (var i = 0; i < titles2.length; i++) {
        titles2[i].optionName = '已删除'
        for (var j = 0; j < options.length; j++) {
          if (titles2[i].formulaId === options[j].id) {
            titles2[i].optionName = options[j].name
          }
        }
        // this.titles = titles2
        if (titles2[i].status === 0) {
          titles2[i].status = '不可用'
        } else {
          titles2[i].status = '可用'
        }
        if (titles2[i].irrigationType === 0) {
          titles2[i].irrigationType = '时长'
        } else {
          titles2[i].irrigationType = '流量'
        }
      }
      this.getfertilizer()
    },
    // 循环计划监控
    start (value) {
      if (this.radio === 0) {
        this.day = 0
        this.hours = 0
        this.mins = 0
      }
    },
    // 获取施肥机列表
    async getfertilizer () {
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/fertilizer/queryByProjectId', this.request)
      this.fertilizer = res.data.data
    },
    // 获取灌溉策略列表
    async getIrrigation () {
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/irrigation/queryByProjectId', this.request)
      var options = this.options
      var titles2 = res.data.data
      for (var i = 0; i < titles2.length; i++) {
        titles2[i].optionName = '已删除'
        for (var j = 0; j < options.length; j++) {
          if (titles2[i].formulaId === options[j].id) {
            titles2[i].optionName = options[j].name
          }
        }
        this.titles = titles2
        if (titles2[i].status === 0) {
          titles2[i].status = '不可用'
        } else {
          titles2[i].status = '可用'
        }
        if (titles2[i].irrigationType === 0) {
          titles2[i].irrigationType = '时长'
        } else {
          titles2[i].irrigationType = '流量'
        }
      }
    },
    // 获取配方列表
    async getfomula () {
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/formula/queryByProjectId', this.request)
      this.options = res.data.data
    },
    // 添加和修改
    async add () {
      const day = this.day * 24 * 60
      const hours = this.hours * 60
      const mins = parseInt(this.mins)
      const all = day + hours + mins
      this.edit.intervalTime = all
      this.edit.valveNumbers = JSON.stringify(this.checkboxGroup)
      this.edit.projectId = this.request.projectId
      if (this.edit.status === '不可用') {
        this.edit.status = 0
      } else if (this.edit.status === '可用') {
        this.edit.status = 1
      }
      if (this.edit.irrigationType === '时长') {
        this.edit.irrigationType = 0
      } else if (this.edit.irrigationType === '流量') {
        this.edit.irrigationType = 1
      }
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/irrigation/saveOrUpdate', this.edit)
      console.log(res)
      this.day = 0
      this.hours = 0
      this.mins = 0
      this.checkboxGroup = []
      this.edit = {}
      this.datatime = []
      this.enterPage()
    },
    changebox () {
      // console.log(this.checkboxGroup)
      this.edit.valveNumbers = this.checkboxGroup
    },
    // 删除数据
    async del (index) {
      // 点击删除后，将删除数据的下标传入，进行删除
      // if (confirm('是否删除') === true) {
      //   if (this.titles.length === 1) {
      //     alert('至少保留一条数据')
      //     return false
      //   } else {
      //     this.titles.splice(index, 1)
      //   }
      // }
      this.planId.id = this.titles[index].id
      await this.$http.post('http://192.168.1.202:10020/fertilizer/api/irrigation/delete', this.planId)
      this.getIrrigation()
    },
    // 编辑数据
    editData (item) {
      // 将要编辑的数据传入
      // 编辑层打开，显示
      // this.flag = true
      // 将要编辑的数据赋值给this.edit，绑定this.edit
      // this.edit.valveNumbers = this.checkboxGroup
      // console.log(item.intervalTime)
      this.day = parseInt(item.intervalTime / (24 * 60))
      this.hours = parseInt((item.intervalTime % (24 * 60)) / 60)
      this.mins = (item.intervalTime % (24 * 60)) % 60
      // this.radio = this.edit.onlyOnce
      this.datatime.unshift(item.startDate, item.endDate)
      this.edit = {
        id: item.id,
        name: item.name,
        formulaId: item.formulaId,
        projectId: item.projectId,
        fertilizerId: item.fertilizerId,
        status: item.status,
        startTime: item.startTime,
        onlyOnce: item.onlyOnce,
        intervalTime: item.intervalTime,
        startDate: item.startDate,
        endDate: item.endDate,
        irrigationType: item.irrigationType,
        irrigationTime: item.irrigationTime,
        irrigationVolume: item.irrigationVolume,
        valveNumbers: item.valveNumbers,
        nextExeTime: item.nextExeTime,
        createTime: item.createTime,
        updateTime: item.updateTime,
        isDel: item.isDel
      }
      const valnum = JSON.parse(this.edit.valveNumbers)
      this.checkboxGroup = valnum
      // console.log(this.edit)
    },
    // // 清空
    clear () {
      this.edit = {}
      this.day = 0
      this.hours = 0
      this.mins = 0
      this.checkboxGroup = []
      this.datatime = []
    },
    // 阀索引函数条件
    cut (index) {
      if (this.isActive === false) {
        return index < 8
      } else if (this.isActive === true) {
        return !index < 8
      }
    },
    // 通过阀索引函数条件进行展开/折叠
    lock () {
      if (this.isActive === false) {
        this.isActive = true
        this.content = '隐藏阀号▲'
      } else {
        this.isActive = false
        this.content = '更多阀号▼'
      }
    },
    // 日期选择监控
    check () {
      console.log(this.datatime)
      this.edit.startDate = this.datatime[0]
      this.edit.endDate = this.datatime[1]
    },
    editval (e) {
      console.log(e.target.textContent)
      e.target.textContent = 8
    }
  }
}
</script>

<style lang="less" scoped>
.top-position {
  /deep/ .el-input__inner {
    width: 150px;
    height: 35px;
    border: none;
    background-color: #2a3b49;
    border-radius: 0;
    color: #fff;
  }
  /deep/ .el-date-editor.el-input,
  .el-date-editor {
    width: 155px;
  }
  /deep/ .el-input__icon {
    line-height: 35px;
  }
  /deep/ .el-radio__label {
    color: #97b1c9;
  }
  /deep/ .el-form-item__label {
    color: #fff;
  }
}
.irrigation {
  display: flex;
  justify-content: space-evenly;

  .irr-form {
    position: relative;
    width: 880px;
    height: 475px;
    padding-top: 40px;
    border: 1px solid #6989a5;
    background-color: #000;

    .bg-title {
      position: absolute;
      top: -10px;
      left: -1px;
      width: 150px;
      height: 40px;
      background: url(../../assets/images/bg4.png) no-repeat;
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

    .pn-ltable {
      overflow: auto;
      margin: 0 auto;
      padding: 0 20px;
    }
    .submit {
      position: absolute;
      right: 30px;
      top: 10px;
    }
  }

  .show-form {
    position: relative;
    width: 670px;
    height: 100%;
    padding-top: 40px;
    border: 1px solid #6989a5;
    background-color: #000;

    .bg-title {
      position: absolute;
      top: -10px;
      left: -1px;
      width: 150px;
      height: 40px;
      background: url(../../assets/images/bg4.png) no-repeat;
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
    .layer {
      background-color: #000;
      margin: 0 auto;
      padding: 0 15px;

      .handle {
        position: absolute;
        top: 10px;
        right: 30px;
      }
      .information {
        div {
          display: inline-block;
        }
        > div {
          padding-top: 10px;
        }

        .align {
          width: 65px;
          text-align: center;
        }

        /deep/ .block {
          .el-range-editor .el-range-input {
            color: #fff;
            margin-bottom: 13px;
          }
          .el-range__close-icon {
            position: absolute;
          }
        }
      }

      /deep/ .el-input__inner {
        width: 150px;
        height: 35px;
        border: none;
        background-color: #2a3b49;
        border-radius: 0;
        color: #fff;
      }
      /deep/ .el-date-editor.el-input,
      .el-date-editor {
        width: 155px;
      }
      /deep/ .el-input__icon {
        line-height: 35px;
      }
      /deep/ .el-radio__label {
        color: #97b1c9;
      }
    }
    .control-valve {
      .valve {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        margin-top: 10px;
        li {
          width: 75px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          border: 1px solid #6989a5;
          border-radius: 7px;
          margin: 5px 0;
          cursor: pointer;
        }
      }
      // 改ui组件
      /deep/ .el-checkbox-group {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        margin-top: 20px;
        background: transparent;

        .el-checkbox-button__inner {
          width: 75px;
          border: 1px solid #6989a5;
          border-radius: 5px;
          background: transparent;
          color: #6989a5;
          margin-bottom: 8px;
          padding: 0 0;

          .valve_num {
            width:75px;
            height:35px;
            line-height: 35px;
            text-align: center;
            background:transparent;
          }
        }
        .is-checked {

          .el-checkbox-button__inner {
            background-color: #ccc;
            border: 1px solid transparent;
          }
        }
      }
    }
  }

  .bg-tag {
    width: 100%;
    height: 30px;
    text-align: center;
    margin-top: 30px;
    background: url(../../assets/images/bg_title.png) no-repeat center;

    p {
      color: #fff;
      font-weight: 800;
      font-size: 20px;
      text-align: center;
    }
  }

  .changeColor {
    color: #fff;
    font-weight: 800;
    border: 1px solid #fff;
  }
}
</style>
