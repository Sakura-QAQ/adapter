<template>
  <div class="container">
    <div class="MainData" v-if="flagShow">
      <div class="header">
        <div class="header-left">
          <el-form :model="areaId">
            <el-select v-model="areaId.id" placeholder="请选择温室">
              <el-option
                v-for="item in area"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form>
        </div>
        <div class="header-right">
          <div class="sfj">
            施肥机：{{fertilizerName}}
          </div>
          <el-checkbox-group class="checkFl" v-model="checkboxGroup">
            <template v-for="(item, index) in Vals">
              <el-checkbox-button :label="index" :key="index" v-show="index < 12">
                <div class="valve_num">{{item}}</div>
              </el-checkbox-button>
            </template>
          </el-checkbox-group>
        </div>
      </div>
      <div class="leftCard">
        <div v-for="item in fomulaCrop" :key="item.id" @click="showData(item)">{{item.formula.name}}</div>
      </div>
      <div class="rightCard">
        <div class="topData">
          <div class="date">
            <div class="title">起止日期：</div>
            <div class="starts">
              <span>{{mathData.startDate}}</span>&nbsp;
              <i>至</i>&nbsp;
              <span>{{mathData.endDate}}</span>
            </div>
          </div>
          <div class="target">
            <div>{{mathData.ecBase}}</div>
            <div>EC基础值</div>
          </div>
          <div class="target">
            <div>{{mathData.ecTarget}}</div>
            <div>EC目标值</div>
          </div>
          <div class="target">
            <div>{{mathData.phTarget}}</div>
            <div>PH目标值</div>
          </div>
          <ul>
            <li>
              <span>{{plans.channel1}}：</span>
              <span>{{mathData.channel1}}</span>
            </li>
            <li>
              <span>{{plans.channel2}}：</span>
              <span>{{mathData.channel2}}</span>
            </li>
            <li>
              <span>{{plans.channel3}}：</span>
              <span>{{mathData.channel3}}</span>
            </li>
            <li>
              <span>{{plans.channel4}}：</span>
              <span>{{mathData.channel4}}</span>
            </li>
            <li>
              <span>{{plans.channel5}}：</span>
              <span>{{mathData.channel5}}</span>
            </li>
            <li>
              <span>{{plans.channel6}}：</span>
              <span>{{mathData.channel6}}</span>
            </li>
            <li>
              <span>{{plans.channel7}}：</span>
              <span>{{mathData.channel7}}</span>
            </li>
            <li>
              <span>{{plans.channel8}}：</span>
              <span>{{mathData.channel8}}</span>
            </li>
            <li>
              <span>{{plans.channel9}}：</span>
              <span>{{mathData.channel9}}</span>
            </li>
          </ul>
        </div>
        <div class="Mainbody">
          <div class="title">作业排期表</div>
          <!-- <div class="add">添加</div> -->
          <div class="tableData">
            <el-table
              :data="tableData"
              style="width: 100%"
              :row-class-name="tableRowClassName">
              <el-table-column
                prop="date"
                label="日期"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址">
              </el-table-column>
            </el-table>
          </div>
          <div class="btn" @click="fog">
            <input class="submit" type="button" value="添加">
          </div>
        </div>
      </div>
    </div>
    <div class="hiddenData" v-if="flagHidden">
      <div class="Data-add">
        <div class="vavles">
          <el-checkbox-group class="checkFl" v-model="checkboxGroup">
            <template v-for="(item, index) in 8">
              <el-checkbox-button :label="index" :key="index">
                <div class="valve_num">{{item}}</div>
              </el-checkbox-button>
            </template>
          </el-checkbox-group>
        </div>
        <div class="formData">
          <div>
            <span class="just">灌溉方式：</span>
            <el-radio-group v-model="radio1" @change="start">
              <el-radio :label="0">
                灌溉时长
              </el-radio>
              <el-radio :label="1">
                灌溉流量
              </el-radio>
            </el-radio-group>
          </div>
          <div>
            <span class="ML">灌溉量：</span>
            <!-- 灌溉时长 -->
            <div v-show="irrFlag.time">
              <input class="text" type="text" v-model="irrData.irrTime">
            </div>
            <!-- 灌溉量 -->
            <div v-show="irrFlag.Volume">
              <input class="text" type="text" v-model="irrData.irrVolume">
            </div>
            {{irr}}
          </div>
          <div>
            <span>启动时间：</span>
            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
              <el-form-item
                v-for="(domain, index) in dynamicValidateForm.domains"
                :key="domain.key"
                :prop="'domains.' + index + '.value'"
                 @change="push(index)"
              >
                <el-date-picker v-model="domain.value" type="datetime" placeholder="选择日期时间"  value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
                <el-button @click.prevent="removeDomain(domain)" size="small" class="delete">删除</el-button>
              </el-form-item>
              <el-form-item>
                <el-button size="small" @click="addDomain">新增</el-button>
              </el-form-item>
              <div class="fixBtn">
                <input class="submit" type="button" value="返回" @click="ReTurn">
                <input class="submit" type="button" value="提交" @click="addList">
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 增加的时间
      dynamicValidateForm: {
        domains: [
          { value: '' }
        ]
        // email: ''
      },
      // 项目(园区)id
      request: {
        projectId: ''
      },
      // 施肥机下拉框传的id
      irrParams: {
        fertilizerId: ''
      },
      fertilizer: [],
      // 大棚id
      areaId: {
        id: ''
      },
      // 大棚数据
      area: [],
      // 作物配方绑定列表
      fomulaCrop: [],
      // 通道列表
      plans: {
        channel1: '通道',
        channel2: '通道',
        channel3: '通道',
        channel4: '通道',
        channel5: '通道',
        channel6: '通道',
        channel7: '通道',
        channel8: '通道',
        channel9: '通道'
      },
      // ec ph 通道默认数据
      mathData: {
        startDate: '(年--月--日)',
        endDate: '(年--月--日)',
        ecBase: 0,
        ecTarget: 0,
        phTarget: 0,
        channel1: 0,
        channel2: 0,
        channel3: 0,
        channel4: 0,
        channel5: 0,
        channel6: 0,
        channel7: 0,
        channel8: 0,
        channel9: 0
      },
      // 灌溉切换
      irrData: {
        //  时长
        irrTime: 0,
        // 灌溉量
        irrVolume: 0
      },
      // 隐藏显示灌溉框
      irrFlag: {
        time: true,
        Volume: false
      },
      addData: {
        formulaId: '',
        exeTimeList: [],
        irrigationType: 0,
        irrigationTime: 0,
        irrigationVolume: 0,
        fertilizerId: ''
      },
      // 施肥机名称
      fertilizerName: '',
      // 阀号
      Vals: [],
      // 选中的阀号
      checkboxGroup: [],
      irr: '分钟',
      radio1: 0,
      flagShow: true,
      flagHidden: false,
      value: '',
      value1: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      idarea: ''
    }
  },
  created () {
    const projectId = JSON.parse(window.sessionStorage.getItem('projectId'))
    this.request.projectId = projectId
    this.getareas()
  },
  methods: {
    // 获取大棚数据
    async getareas () {
      // 获取园区第一条数据
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/area/queryByProjectId', this.request)
      this.area = res.data.data
      this.areaId.id = this.area[0].id

      // 施肥机id queryById
      const resQuery = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/area/queryById', this.areaId)
      const ferid = resQuery.data.data.fertilizerId
      this.addData.fertilizerId = resQuery.data.data.fertilizerId
      // 公用的施肥机id在这里
      const fers = {
        id: ferid
      }
      // 通过id获取施肥机名称 queryById
      const QueryFer = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/fertilizer/queryById', fers)
      this.fertilizerName = QueryFer.data.data.name

      // 获取阀被选中的阀索引并赋值
      this.checkboxGroup = JSON.parse(this.area[0].fertilizerValves)
      // 获取施肥机对应的阀号
      const queryVals = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/fertilizer/queryValveAlias', fers)
      const strs = queryVals.data.data
      this.Vals = strs.split(',')

      // 配方绑定列表
      let ID = {
        areaId: this.areaId.id
      }
      const fomulaCrop = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/area/queryFormulaLinkByAreaId', ID)
      this.fomulaCrop = fomulaCrop.data.data

      // 通道
      const plans = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/channel/queryByProjectId', this.request)
      this.plans = plans.data.data
    },
    // 获取施肥机列表
    async getarea () {
      // const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/area/queryById', id)
      // console.log(res)
    },
    // 点击展示详细数据
    showData (item) {
      this.addData.formulaId = item.formulaId
      this.mathData = {
        startDate: item.startDate,
        endDate: item.endDate,
        ecBase: item.formula.ecBase,
        ecTarget: item.formula.ecTarget,
        phTarget: item.formula.phTarget,
        channel1: item.formula.channel1,
        channel2: item.formula.channel2,
        channel3: item.formula.channel3,
        channel4: item.formula.channel4,
        channel5: item.formula.channel5,
        channel6: item.formula.channel6,
        channel7: item.formula.channel7,
        channel8: item.formula.channel8,
        channel9: item.formula.channel9
      }
    },
    // 打开弹出层
    fog () {
      this.flagHidden = true
    },
    // 循环监控计划
    start () {
      if (this.radio1 === 1) {
        this.irrFlag.time = false
        this.irrFlag.Volume = true
        this.irrData.irrTime = 0
        this.irr = 'm³'
      } else {
        this.irrFlag.time = true
        this.irrFlag.Volume = false
        this.irrData.irrVolume = 0
        this.irr = '分钟'
      }
    },
    // 添加作业排期
    async addList () {
      let arr = this.dynamicValidateForm.domains
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index].value
        this.addData.exeTimeList.push(element)
      }

      let list = {
        formulaId: this.addData.formulaId,
        areaId: this.areaId.id,
        projectId: this.request.projectId,
        fertilizerId: this.addData.fertilizerId,
        valveNumbers: JSON.stringify(this.checkboxGroup),
        irrigationType: this.radio1,
        irrigationTime: Number(this.irrData.irrTime),
        irrigationVolume: Number(this.irrData.irrVolume),
        exeTimeList: this.addData.exeTimeList,
        dtuCode: '1'
      }
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/irrigation/addIrriSchedule', list)
      console.log(res)
    },
    // 返回弹出层
    ReTurn () {
      this.flagHidden = false
    },
    // 列表添加类名
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    // 表单提交
    submitForm (item) {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert('submit!')
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
      console.log(item)
    },
    // 移除时间段
    removeDomain (item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    // 添加时间段
    addDomain () {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  .MainData{
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 1625px;
    height: 825px;
    border: 1px solid #6989a5;
    border-radius: 15px;
    background-color: rgba(0, 0, 0, 0.8);
    .header {
      padding-top: 20px;
      .header-left {
        display: inline-block;
        width: 250px;
        height: 74px;
        margin-left: 25px;
        background-color: #232733;
        // /deep/ .el-form {
        //   // float: left;
        // }
        /deep/ .el-select {
          padding: 18px 0 0 25px;
        }
        /deep/ .el-input__inner {
          height: 40px;
          border: none;
          background-color: rgba(78, 82, 87, 0.9);
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
      .header-right {
        display: inline-block;
        width: 1300px;
        height: 74px;
        margin-left: 25px;
        padding:0 0 10px 20px;
        background-color: #232733;
        .sfj {
          display: inline-block;
          height: 74px;
          line-height: 74px;
        }
        /deep/ .checkFl {
          display: inline-block;
        }
        // 阀号组件样式
        /deep/ .el-checkbox-group {
          margin-top: 20px;
          background: transparent;

          .el-checkbox-button__inner {
            width: 80px;
            border: 1px solid #6989a5;
            border-radius: 5px;
            background: transparent;
            color: #6989a5;
            margin: 0 0 8px 8px;
            padding: 0 0;

            .valve_num {
              width:80px;
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
    .leftCard {
      float: left;
      text-align: center;
      width: 300px;
      height: 100%;

      > div {
        width: 250px;
        height: 80px;
        line-height: 80px;
        margin: 20px auto;
        border: 1px solid #6c768d;
        font-weight: 800;
        font-size: 20px;
        color: #ccc;
        border-radius: 10px;
        cursor: pointer;
      }
    }
    .rightCard {
      float: left;
      width: 1300px;
      margin-top: 20px;
      .topData {
        height: 200px;
        background-color: #242c3b;
        >div {
          float: left;
        }
        .date {
          width: 100%;
          height: 50px;
          .title {
            float: left;
            height: 50px;
            line-height: 50px;
            font-weight: 800;
            margin-left: 500px;
          }
          .starts {
            float: left;
            height: 50px;
            line-height: 50px;
          }
        }
        .target {
          margin-left: 90px;

          div:first-child {
            width: 110px;
            height: 110px;
            line-height: 110px;
            border-radius: 50%;
            text-align: center;
            border: 1px solid #546d9d;
            border-radius: 50%;
            font-size: 32px;
            font-weight: 800;
            background-color: #232733;
            color: #0ed6f4;
          }
          div:last-child {
            height: 40px;
            line-height: 40px;
            text-align: center;
          }
        }
        ul {
          display: inline-block;
          width: 520px;
          height: 150px;
          margin-left: 90px;
          li {
            margin: 15px 0 0 0;
            float: left;
            span {
              display: inline-block;
              width: 80px;
              height: 25px;
            }
          }
        }
      }
      .Mainbody {
        position: relative;
        height: 410px;
        margin-top: 20px;
        background-color: #232733;
        padding-top: 40px;
        .tableData {
          width: 750px;
          margin: 0 auto;
          /deep/ .el-table::before {
            height: 0;
          }
          /deep/ .el-table {
            margin: 0 auto;
            background-color: transparent;
            color: #fff;
            th {
              border: 0;
              background-color: transparent;
            }
            tr {
              border: 0;
              background-color: transparent;
            }
            tr:nth-child(odd) {
              background-color: rgba(43, 45, 47, 0.9);
            }
            tr:nth-child(even) {
              background-color: rgba(55, 59, 63, 0.9);
            }
            tr:hover > td {
              background-color: rgba(78, 82, 87, 0.9);;
            }
            td {
              border: none;
            }
            thead {
              color: #eee;
              background-color: rgba(55, 59, 63, 0.9);
            }
          }
        }
        .title {
          text-align: center;
          height: 55px;
          line-height: 55px;
          font-weight: 800;
          font-size: 20px;
        }
        .btn {
          position: absolute;
          top: 12px;
          right: 10px;
        }
      }
    }
  }
  .hiddenData {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(59, 63, 66, 0.9);

    .Data-add {
      position: absolute;
      margin: auto;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 700px;
      height: 600px;
      background-color: rgba(20, 20, 20, 0.9);
      .vavles {
        // 改ui组件
        width: 650px;
        height: 75px;
        line-height: 75px;
        margin: 20px auto;
        text-align: center;
        background-color: #242c3b;
        /deep/ .el-checkbox-group {
          // margin-top: 20px;
          background: transparent;

          .el-checkbox-button__inner {
            width: 65px;
            border: 1px solid #6989a5;
            border-radius: 5px;
            background: transparent;
            color: #6989a5;
            margin: 0 0 0 10px;
            padding: 0 0;

            .valve_num {
              width:65px;
              height:40px;
              line-height: 40px;
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
      .formData {
        position: relative;
        width: 650px;
        height: 460px;
        margin: 0 auto;
        background-color: #242c3b;
        padding-top: 30px;
        > div {
          font-size: 18px;
          margin-bottom: 20px;
          span {
            display: inline-block;
            width: 120px;
            height: 24px;
            line-height: 24px;
            font-size: 18px;
            text-align: right;
            margin-right: 30px;
          }
          .text {
            background-color: #2a3b49;
            margin-right: 8px;
          }
        }
        div:nth-child(1) {
          /deep/ .el-radio__label {
            color: #97b1c9;
            font-size: 18px;
          }
        }
        div:nth-child(2) {
          > div {
            display: inline-block;
          }
        }
        div:nth-child(3) {
          span {
            float: left;
          }
          /deep/.el-form {
            float: left;
            padding-left: 10px;

            .el-form-item {
              margin-bottom: 10px;
              .el-form-item__content {
                margin-left: -8px !important;
                .delete {
                  height: 35px;
                  margin-left: 10px;
                }
              }
              .el-input__inner {
                height: 40px;
              }
            }
          }
          .fixBtn {
            position: absolute;
            bottom: 50px;
            right: 10px;
            .submit {
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
