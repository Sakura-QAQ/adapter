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
        <div class="list">
          <el-table
            :data="titles.slice((reqParamsIrr.currentPage-1)*reqParamsIrr.PageSize,reqParamsIrr.currentPage*reqParamsIrr.PageSize)"
            style="width:790px"
            @current-change="ChangeAuto"
          >
            <el-table-column label="序号" type="index" width="70" align="center"></el-table-column>
            <el-table-column prop="name" label="策略名称" width="70" align="center"></el-table-column>
            <el-table-column prop="startTime" label="起始时间" width="70" align="center"></el-table-column>
            <!-- <el-table-column prop="startDate" label="起始日期" width="70" align="center"></el-table-column>
            <el-table-column prop="endDate" label="结束日期" width="70" align="center"></el-table-column> -->
            <el-table-column prop="irrigationType" label="灌溉类型" width="70" align="center"></el-table-column>
            <el-table-column prop="irrigationTime" label="灌溉时长" width="70" align="center"></el-table-column>
            <el-table-column prop="irrigationVolume" label="灌溉流量" width="70" align="center"></el-table-column>
            <!-- <el-table-column prop="intervalTime" label="每隔" width="70" align="center"></el-table-column> -->
            <el-table-column prop="optionName" label="配方" width="70" align="center"></el-table-column>
            <el-table-column prop="status" label="状态" width="70" align="center"></el-table-column>
            <el-table-column label="操作" width="210" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="editData(scope.$index, scope.row)">详情</el-button>
                <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
                <el-button size="mini" type="primary"  @click="setCurrent(scope.row)">启动</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pager">
            <el-pagination
              layout="prev, pager, next"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="reqParamsIrr.currentPage"
              :page-size="reqParamsIrr.PageSize"
              :total="reqParamsIrr.totalCount"
            ></el-pagination>
        </div>
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
                  <el-radio :label="0" style="padding-bottom:5px;">仅一次</el-radio>
                  <br />
                  <el-radio :label="1" >
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
                <el-radio-group v-model="radio1" @change="irr()">
                  <el-radio :label="0">
                    灌溉时长:
                    <input type="text" v-model="edit.irrigationTime" />(秒)
                  </el-radio>
                  <br />
                  <el-radio :label="1" style="padding-top:5px;">
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
        <div class="editbox" v-if="flagVal">
          <div class="vals">
            阀号名称:<el-input v-model="Valsname"></el-input>
          </div>
          <div class="vals-btn">
            <input class="submit" type="button" value="修改" @click="modifyVal">&nbsp;
            <input class="submit" type="button" value="取消" @click="flagVal=false">
          </div>
        </div>
        <div class="control-valve">
          <div class="bg-tag">
            <p>阀号</p>
          </div>
          <el-checkbox-group v-model="checkboxGroup" @change="changebox">
            <template v-for="(item, index) in Vals">
              <el-checkbox-button :label="index" :key="index" v-show="cut(index)" >
                <div class="valve_num" v-on:dblclick="editval($event, index)">{{item}}</div>
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
export default {
  data () {
    return {
      reqParamsIrr: {
        // 默认显示第几页
        currentPage: 1,
        // 总条数，根据接口获取数据长度(注意：这里不能为空)
        totalCount: 1,
        // 个数选择器（可修改）
        pageSizes: [1, 2, 3, 4],
        // 默认每页显示的条数（可修改）
        PageSize: 5
      },
      day: 0,
      hours: 0,
      mins: 0,
      curIndex: false,
      isActive: false,
      content: '更多阀号▼',
      // 阀号
      Vals: [],
      Valsname: '',
      ValsIndex: null,
      // 阀号弹出层
      flagVal: false,
      // 灌溉列表
      titles: [],
      // 施肥机数据
      fertilizer: [],
      // 施肥机下拉框传的id
      reqParams: {
        fertilizerId: ''
      },
      // 阀号id(施肥机id)
      ValId: {
        id: ''
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
        irrigationType: 0,
        irrigationTime: null,
        irrigationVolume: null,
        valveNumbers: '',
        nextExeTime: null,
        createTime: null,
        updateTime: null,
        isDel: 0
      },
      currentRow: null
      // 胡涛的施肥机id
      // id: {
      //   id: '70a8c935-5d11-11ea-9f50-00d86189352f'
      // }
    }
  },
  created () {
    const projectId = JSON.parse(window.sessionStorage.getItem('projectId'))
    this.request.projectId = projectId
    this.getfomula()
    this.getfertilizer()
    // 获取阀号
  },
  mounted () {
    let that = this
    setTimeout(() => {
      that.enterPage()
      that.getValve()
      this.ValId.id = this.reqParams.fertilizerId
    }, 200)
  },
  methods: {
    setCurrent (row) {
      // this.$refs.singleTable.setCurrentRow(row)
      console.log(row)
    },
    ChangeAuto (val) {
      this.currentRow = val
    },
    handleSizeChange (val) {
      // 改变每页显示的条数
      this.reqParamsIrr.PageSize = val
      this.reqParamsIrr.currentPage = 1
    },
    handleCurrentChange (newPage) {
      // 提交当前页码给后台才能获取对应的数据
      this.reqParamsIrr.currentPage = newPage
      // console.log(newPage)
    },
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
      this.reqParamsIrr.totalCount = res.data.data.length
    },
    // 切换施肥机
    async fn () {
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/irrigation/queryByFertilizerId', this.reqParams)
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
      this.ValId.id = this.reqParams.fertilizerId
      this.getValve()
    },
    // 循环计划监控
    start () {
      if (this.radio === 0) {
        let data = {
          onlyOnce: 1
        }
        this.edit.onlyOnce = data.onlyOnce
        // console.log(this.edit.onlyOnce)
      } else if (this.radio === 1) {
        let data = {
          onlyOnce: 0
        }
        this.edit.onlyOnce = data.onlyOnce
      }
    },
    // 灌溉计划监控
    irr () {
      if (this.radio1 === 0) {
        this.edit.irrigationType = '时长'
      } else if (this.radio1 === 1) {
        this.edit.irrigationType = '流量'
      }
    },
    // 获取施肥机列表
    async getfertilizer () {
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/fertilizer/queryByProjectId', this.request)
      this.fertilizer = res.data.data
      this.reqParams.fertilizerId = this.fertilizer[0].id
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
      this.edit.fertilizerId = this.reqParams.fertilizerId
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
      // console.log(res)
      if (res.data.code === 200) {
        this.$message.success('处理成功')
      } else {
        this.$message.error('处理失败')
      }
      this.clear()
      this.enterPage()
    },
    changebox () {
      // console.log(this.checkboxGroup)
      this.edit.valveNumbers = this.checkboxGroup
    },
    // 删除数据
    async del (index, row) {
      this.planId.id = row.id
      this.$confirm('此操作将永久删除该策略, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.post('http://192.168.1.202:10020/fertilizer/api/irrigation/delete', this.planId)
          // 删除成功
          this.$message.success('删除成功')
          this.enterPage()
        })
        .catch(() => {})
    },
    // 编辑数据
    editData (index, row) {
      // 将要编辑的数据传入
      // 编辑层打开，显示
      // this.flag = true
      // 将要编辑的数据赋值给this.edit，绑定this.edit
      // this.edit.valveNumbers = this.checkboxGroup
      // console.log(item.intervalTime)
      // 赋值之前先清空上一个
      this.clear()
      this.day = parseInt(row.intervalTime / (24 * 60))
      this.hours = parseInt((row.intervalTime % (24 * 60)) / 60)
      this.mins = (row.intervalTime % (24 * 60)) % 60
      // = this.radio = this.edit.
      this.edit = {
        id: row.id,
        name: row.name,
        formulaId: row.formulaId,
        projectId: row.projectId,
        fertilizerId: row.fertilizerId,
        status: row.status,
        startTime: row.startTime,
        onlyOnce: row.onlyOnce,
        intervalTime: row.intervalTime,
        startDate: row.startDate,
        endDate: row.endDate,
        irrigationType: row.irrigationType,
        irrigationTime: row.irrigationTime,
        irrigationVolume: row.irrigationVolume,
        valveNumbers: row.valveNumbers,
        nextExeTime: row.nextExeTime,
        createTime: row.createTime,
        updateTime: row.updateTime,
        isDel: row.isDel
      }
      if (this.edit.onlyOnce === 1) {
        this.radio = 0
      } else if (this.edit.onlyOnce === 0) {
        this.radio = 1
      }
      if (this.edit.irrigationType === '时长') {
        this.radio1 = 0
      } else if (this.edit.irrigationType === '流量') {
        this.radio1 = 1
      }
      // if (this.datatime.length === 2) {
      //   return false
      // } else {
      //   this.datatime.unshift(row.startDate, row.endDate)
      // }
      this.datatime.unshift(row.startDate, row.endDate)
      const valnum = JSON.parse(this.edit.valveNumbers)
      this.checkboxGroup = valnum

      // console.log(this.edit)
    },
    // 清空后添加
    clear () {
      this.edit = {
        id: '',
        name: '',
        formulaId: '',
        projectId: '',
        fertilizerId: '',
        status: 0,
        startTime: '00:00',
        onlyOnce: 1,
        intervalTime: null,
        startDate: null,
        endDate: null,
        irrigationType: 0,
        irrigationTime: 0,
        irrigationVolume: null,
        valveNumbers: '',
        nextExeTime: null,
        createTime: null,
        updateTime: null,
        isDel: 0
      }
      this.day = 0
      this.hours = 0
      this.mins = 0
      this.radio = 0
      this.radio1 = 0
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
    // 获取阀名
    async getValve () {
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/fertilizer/queryValveAlias', this.ValId)
      const strs = res.data.data
      this.Vals = strs.split(',')
    },
    // 编辑阀名
    editval (e, index) {
      this.flagVal = true
      this.Valsname = this.Vals[index]
      this.ValsIndex = index
    },
    // 修改阀名
    async modifyVal () {
      this.flagVal = false
      let i = this.ValsIndex
      this.Vals[i] = this.Valsname
      let valve = {
        id: this.ValId.id,
        valveAlias: this.Vals.join(',')
      }
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/fertilizer/updateValveAlias', valve)
      if (res.data.code === 200) {
        this.$message.success('处理成功')
      } else {
        this.$message.error('处理失败')
      }
      this.getValve()
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
    .list {
      text-align: center;
      /deep/ .el-table::before {
        height: 0;
      }
      /deep/ .el-table {
        // margin: 10px 0;
        margin: 0 auto;
        background-color: transparent;
        th {
          border: 0;
          background-color: transparent;
        }
        tr {
          border: 0;
          background-color: transparent;
        }
        tr:hover > td {
          background-color: rgba(85, 92, 98, 0.9);;
        }
        td {
          // border-bottom: 1px solid #666;
          border: none;
          // background-color: transparent;
        }
        .cell {
          .el-button {
            background-color: rgba(82, 102, 119, 0.9);
            border: 1px solid transparent;
            color: #eee;
          }
        }
      }

      .pager {
        margin-top: 12px;
        text-align: center;
      }
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
    .editbox {
      position: absolute;
      top: 0;
      left: 0;
      width: 638px;
      height: 270px;
      background-color: rgba(85, 92, 98, 0.9);
      margin: 32px 16px;
      .vals {
        margin-left: 200px;
        /deep/ .el-input {
          width: 150px;
          text-align: center;
          margin: 100px 0 0 10px;
        }
      }
      .vals-btn {
        margin-top: 15px;
        text-align: center;
      }
    }
    .control-valve {
      margin-top: 70px;
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
