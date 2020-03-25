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
              <el-checkbox-button :label="index" :key="index" v-show="index < 8">
                <div class="valve_num">{{item}}</div>
              </el-checkbox-button>
            </template>
          </el-checkbox-group>
        </div>
      </div>
      <div class="leftCard">
        <div>西红柿定值</div>
        <div>西红柿定值</div>
        <div>西红柿定值</div>
        <div>西红柿定值</div>
        <div>西红柿定值</div>
        <div>西红柿定值</div>
        <div>西红柿定值</div>
      </div>
      <div class="rightCard">
        <div class="topData">
          <div class="date">
            <div class="title">起止日期：</div>
            <div class="starts">
              <span>2020.03.05</span>&nbsp;
              <i>至</i>&nbsp;
              <span>2020.03.06</span>
            </div>
          </div>
          <div class="target">
            <div>0.5</div>
            <div>EC基础值</div>
          </div>
          <div class="target">
            <div>0.7</div>
            <div>EC目标值</div>
          </div>
          <div class="target">
            <div>14</div>
            <div>PH目标值</div>
          </div>
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
            <el-radio-group v-model="radio1">
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
            <input class="text" type="text">{{irr}}
          </div>
          <div>
            <span>启动时间：</span>
            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
              <el-form-item prop="email">
                <el-date-picker
                  v-model="dynamicValidateForm.email"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item
                v-for="(domain, index) in dynamicValidateForm.domains"
                :key="domain.key"
                :prop="'domains.' + index + '.value'"
              >
                <el-date-picker v-model="domain.value" type="datetime" placeholder="选择日期时间"></el-date-picker>
                <el-button @click.prevent="removeDomain(domain)" size="small" class="delete">删除</el-button>
              </el-form-item>
              <el-form-item>
                <!-- <el-button type="primary" size="small" @click="submitForm(item)">提交</el-button> -->
                <el-button size="small" @click="addDomain">新增</el-button>
              </el-form-item>
              <div class="fixBtn">
                <input class="submit" type="button" value="返回" @click="ReTurn">
                <input class="submit" type="button" value="提交">
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
      dynamicValidateForm: {
        domains: [{
          value: ''
        }],
        email: ''
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

      // 通过施肥机id查灌溉列表
      // 192.168.1.202:10020/fertilizer/api/irrigation/queryByFertilizerId
      const fertilizerId = {
        fertilizerId: fers.id
      }
      const irrList = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/irrigation/queryByFertilizerId', fertilizerId)
      console.log(irrList)
    },
    // changebox () {
    //   console.log(this.checkboxGroup)
    // },
    // 获取施肥机列表
    async getarea () {
      // const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/area/queryById', id)
      // console.log(res)
    },
    // 打开弹出层
    fog () {
      this.flagHidden = true
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
      }
    }
    .rightCard {
      float: left;
      width: 1300px;
      margin-top: 20px;
      .topData {
        height: 250px;
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
          margin-left: 104px;

          div:first-child {
            width: 150px;
            height: 150px;
            line-height: 150px;
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
