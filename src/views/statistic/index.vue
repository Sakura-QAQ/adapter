<template>
  <div class="container">
    <div class="statistic">
      <div class="leftData">
        <div class="ChoseItem">
          <span>选择温室：</span>
          <el-select v-model="areaId.id" @change="areaChange">
            <el-option v-for="item in area" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <div class="Ferz">
            <span>施肥机：</span>
            <span>{{ferName}}</span>
          </div>
        </div>
        <div class="ChoseDate">
          <span>选择日期：</span>
          <el-date-picker
            v-model="daterange"
            type="daterange"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions">
          </el-date-picker>
          <input type="button" class="submit" value="确定" @click="sending">
        </div>
      </div>
      <div class="middleData">
        <span>选择电磁阀：</span>
        <el-radio-group class="checkFl" v-model="checkboxGroup" @change="changebox">
          <template v-for="(item, index) in fergroup">
            <el-radio-button :label="index + 1" :key="index" v-show="index < 24">
              <div class="valve_num">{{Vals[item - 1]}}</div>
            </el-radio-button>
          </template>
        </el-radio-group>
      </div>
      <div class="rightData">
        <div>
          <span>配方:{{fomulaData.name}}</span>
        </div>
        <div>
          <span>
            <strong>EC基数:</strong>
            {{fomulaData.ecBase}}
          </span>
          <span>
            <strong>EC目标值:</strong>
            {{fomulaData.ecTarget}}
          </span>
          <span>
            <strong>PH目标值:</strong>
            {{fomulaData.phTarget}}
          </span>
        </div>
        <div>吸肥比列：</div>
        <div>
          <span>
            <strong>{{channels[0]}}:</strong>
            {{fomulaData.channel1}}
          </span>
          <span>
            <strong>{{channels[1]}}:</strong>
            {{fomulaData.channel2}}
          </span>
          <span>
            <strong>{{channels[2]}}:</strong>
            {{fomulaData.channel3}}
          </span>
          <span>
            <strong>{{channels[3]}}:</strong>
            {{fomulaData.channel4}}
          </span>
          <span>
            <strong>{{channels[4]}}:</strong>
            {{fomulaData.channel5}}
          </span>
          <span>
            <strong>{{channels[5]}}:</strong>
            {{fomulaData.channel6}}
          </span>
          <span>
            <strong>{{channels[6]}}:</strong>
            {{fomulaData.channel7}}
          </span>
          <span>
            <strong>{{channels[7]}}:</strong>
            {{fomulaData.channel8}}
          </span>
          <span>
            <strong>{{channels[8]}}:</strong>
            {{fomulaData.channel9}}
          </span>
        </div>
      </div>
      <div class="bottomData">
        <!-- 表格-->
        <v-table
          style="width:100%;"
          :show-vertical-border="false"
          table-bg-color="rgba(41,52,65)"
          title-bg-color="rgba(41,52,65)"
          odd-bg-color="rgba(85, 92, 98, 0.9)"
          :is-horizontal-resize="true"
          :is-vertical-resize="true"
          :vertical-resize-offset="100"
          :row-click="DbHandle"
          :row-click-color="bgcolor"
          :columns="tableConfig.columns"
          :table-data="tableConfig.tableData.slice(
            (this.pageIndex - 1) * this.pageSize,
            this.pageIndex * this.pageSize
          )"
          :paging-index="(pageIndex-1)*pageSize"
        ></v-table>
        <div class="pager">
          <!-- 分页-->
          <v-pagination
            @page-change="pageChange"
            @page-size-change="pageSizeChange"
            :total="total"
            :page-size="pageSize"
            :layout="['total', 'prev', 'pager', 'next', 'jumper']"
          ></v-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 项目(园区)id
      request: {
        projectId: ''
      },
      // 表格数据
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      tableConfig: {
        tableData: [],
        columns: [
          {
            field: 'name',
            title: '配方',
            width: 150,
            titleAlign: 'center',
            columnAlign: 'center'
          },
          {
            field: 'exeTime',
            title: '时间',
            width: 150,
            titleAlign: 'center',
            columnAlign: 'center'
          },
          {
            field: 'irrigationVolume',
            title: '灌溉量(L)',
            width: 120,
            titleAlign: 'center',
            columnAlign: 'center'
          },
          {
            field: 'irrigationTime',
            title: '灌溉时长(秒)',
            width: 120,
            titleAlign: 'center',
            columnAlign: 'center'
          },
          {
            field: 'maxPH',
            title: 'PH最大值',
            width: 100,
            titleAlign: 'center',
            columnAlign: 'center'
          },
          {
            field: 'minPH',
            title: 'PH最小值',
            width: 100,
            titleAlign: 'center',
            columnAlign: 'center'
          },
          {
            field: 'avgPH',
            title: 'PH平均值',
            width: 120,
            titleAlign: 'center',
            columnAlign: 'center'
          },
          {
            field: 'maxEC',
            title: 'EC最大值(μS/cm)',
            width: 150,
            titleAlign: 'center',
            columnAlign: 'center'
          },
          {
            field: 'minEC',
            title: 'EC最小值(μS/cm)',
            width: 150,
            titleAlign: 'center',
            columnAlign: 'center'
          },
          {
            field: 'avgEC',
            title: 'EC平均值(μS/cm)',
            width: 150,
            titleAlign: 'center',
            columnAlign: 'center'
          },
          {
            field: 'valveNumbers',
            title: '灌溉阀',
            width: 229,
            titleAlign: 'center',
            columnAlign: 'center'
          }
        ]
      },
      // 日期快捷键
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      // 日期选择
      daterange: [],
      // 温室数据
      area: [],
      // 温室下拉框数据
      areaId: {
        id: ''
      },
      // 施肥机id
      fertilizerId: {
        id: ''
      },
      checkboxGroup: [],
      // 施肥机名称
      ferName: '',
      // 阀号对应
      fergroup: [],
      Vals: [],
      // 选择的阀号
      checkvalve: [],
      // 通道
      channels: [],
      fomulaData: {},
      bgcolor: 'rgba(115, 135, 151, 0.8)'
    }
  },
  created () {
    const projectId = JSON.parse(window.sessionStorage.getItem('projectId'))
    this.request.projectId = projectId
  },
  mounted () {
    this.getareas().then(res => {
      this.getfertilizerId().then(res => {
        this.getferList()
        this.getvalves()
      })
    })
    this.getTableData()
  },
  methods: {
    // 园区切换
    areaChange () {
      this.getfertilizerId().then(res => {
        this.getferList()
        this.getvalves()
      })
    },
    changebox () {
      let a = [this.checkboxGroup]
      let b = this.fergroup
      this.checkvalve = b.filter((_, index) => a.includes(index + 1))
    },
    // 历史数据表格+分页
    getTableData () {
      this.total = this.tableConfig.tableData.length
    },
    pageChange (pageIndex) {
      this.pageIndex = pageIndex
      this.getTableData()
    },
    pageSizeChange (pageSize) {
      this.pageIndex = 1
      this.pageSize = pageSize
      this.getTableData()
    },
    // 点击表格
    DbHandle (rowIndex, rowData) {
      this.fomulaData = rowData
    },
    // 大棚
    async getareas () {
      // 获取园区第一条数据
      const res = await this.$http.post('fertilizer/api/area/queryByProjectId', this.request)
      this.area = res.data.data
      this.areaId.id = this.area[0].id
    },
    // 施肥机id
    async getfertilizerId () {
      const { data: { data } } = await this.$http.post('fertilizer/api/area/queryById', this.areaId)
      this.fergroup = data.fertilizerValves.split(',')
      this.fertilizerId.id = data.fertilizerId
    },
    // 通过施肥机id查列表
    async getferList () {
      const { data: { data } } = await this.$http.post('fertilizer/api/fertilizer/queryById', this.fertilizerId)
      this.channels = data.channels.split(',')
      this.ferName = data.name
    },
    // 获取施肥机对应阀
    async getvalves () {
      const { data: { data } } = await this.$http.post('fertilizer/api/fertilizer/queryValveAlias', this.fertilizerId)
      this.Vals = data.split(',')
    },
    // 数据提交
    async sending () {
      this.fomulaData = {}
      if (this.daterange === null) {
        this.daterange = []
        this.tableConfig.tableData = []
      }
      const req = {
        startTime: this.daterange[0],
        endTime: this.daterange[1],
        fertilizerId: this.fertilizerId.id,
        valveNumber: JSON.stringify(this.checkvalve[0])
      }
      if (this.daterange.length === 0) {
        this.$message.error('请选择起始日期')
        return false
      } else if (req.valveNumber === undefined) {
        this.$message.error('请选择阀')
        return false
      } else {
        const { data: { data } } = await this.$http.post('fertilizer/api/statistics/queryFertilizerDataStatistics', req)
        if (data.length === 0) {
          this.$message.warning('未查到数据')
          this.tableConfig.tableData = data
          this.total = data.length
        } else {
          for (let i = 0; i < data.length; i++) {
            const historylist = data[i]
            if (historylist.irrigationVolume === null) {
              historylist.irrigationVolume = '无'
            }
            const valnum = JSON.parse(historylist.valveNumbers).map(Number)
            historylist.valveNumbers = this.Vals.filter((_, index) => valnum.includes(index + 1)).join(',')
            historylist.exeTime = this.$moment(historylist.exeTime).format('YYYY-MM-DD HH:ss')
          }
          this.$message.success('查到了' + data.length + '条数据')
          this.tableConfig.tableData = data
          this.total = data.length
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  .statistic {
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
    .leftData {
      float: left;
      width: 600px;
      height: 150px;
      border-radius: 10px;
      margin: 20px 0 0 20px;
      padding: 20px;
      background-color: #242c3b;
      .ChoseItem {
        > span {
          font-weight: 800;
        }
        /deep/ .el-select {
          .el-input__inner {
            width: 150px;
            height: 36px;
            border: none;
            background-color: rgba(100, 87, 87, 0.3);
            border-radius: 0;
            color: #fff;
          }
          .el-date-editor.el-input,
          .el-date-editor {
            width: 155px;
          }
          .el-input__icon {
            line-height: 35px;
          }
          .el-radio__label {
            color: #97b1c9;
          }
          .el-form-item__label {
            color: #fff;
          }
        }
        .Ferz {
          margin: 0 0 28px 50px;
          display: inline-block;
          span:first-child {
            display: inline-block;
            width: 80px;
            font-weight: 800;
          }
        }
      }
      .ChoseDate {
        > span {
          font-weight: 800;
        }
        /deep/ .el-date-editor {
          background-color: #2a3b49;
          border:1px solid rgba(100, 87, 87, 0.377);
          .el-range-input {
            color: #fff;
          }
          .el-range-separator {
            width: 8%;
            color: #fff;
          }
        }
        .submit {
          margin-left: 20px;
        }
      }
    }
    .middleData {
      float: left;
      width: 470px;
      height: 150px;
      border-radius: 10px;
      margin: 20px 0 0 20px;
      padding: 10px;
      background-color: #242c3b;
      span {
        display: inline-block;
        font-weight: 800;
        padding: 0 10px;
      }
      /deep/ .el-radio-group {
        display: inline-block;
        background: transparent;

        .el-radio-button__inner {
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
        .is-active {
          .el-radio-button__inner {
            background: #ccc;
            border: 1px solid transparent;
          }
        }
      }
    }
    .rightData {
      float: left;
      width: 470px;
      height: 150px;
      border-radius: 10px;
      margin: 20px 0 0 20px;
      padding: 6px;
      background-color: #242c3b;
      div:nth-child(1) {
        text-align: center;
        height: 26px;
        span:first-child {
          font-weight: 800;
        }
      }
      div:nth-child(2) {
        text-align: center;
        height: 26px;
        span {
          display: inline-block;
          width: 140px;
        }
      }
      div:nth-child(3) {
        font-weight: 800;
        text-align: center;
        // padding-left: 55px;
      }
      div:nth-child(4) {
        text-align: center;
        span {
          display: inline-block;
          width: 130px;
          // height: 28px;
        }
      }
    }
    .bottomData {
      float: left;
      width: 1580px;
      height: 610px;
      border-radius: 10px;
      margin: 20px 0 0 20px;
      padding: 20px;
      background-color: #242c3b;
      /deep/ .v-table-views {
        border: none;
        .v-table-header-row {
          .v-table-title-cell {
            border-color: #666;
          }
        }
        .v-table-body {
          .v-table-body-cell {
            border-color: #666;
          }
        }
      }
      .pager {
        width: 100%;
        position: absolute;
        bottom: 38px;
        left: 0;
        text-align: center;

        /deep/ .v-page-goto-input {
          color: #000;
          // height: 336px !important;
          // height: 297px !important;
          // overflow-x: scroll;
          // overflow-y: hidden;
        }
      }
    }
  }
}
</style>
