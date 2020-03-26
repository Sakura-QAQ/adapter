<template>
  <div class="container">
    <div class="l-table">
      <div>温室作物配方绑定</div>
      <div>
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
        <input class="submit" type="button" value="添加">
      </div>
      <div>
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column
            prop="formula.name"
            label="作物周期配方"
            width="180">
          </el-table-column>
          <el-table-column
            prop="startDate"
            label="起始时间"
            width="120">
          </el-table-column>
          <el-table-column
            width="120"
            prop="endDate"
            label="结束时间">
          </el-table-column>
          <el-table-column
            prop="formula.descr"
            label="描述">
          </el-table-column>
          <el-table-column
            prop="sort"
            label="排序">
          </el-table-column>
          <el-table-column label="删除">
            <template slot-scope="scope">
              <el-button size="mini" @click="remove(scope.$index, scope.row)">删除</el-button>
              <el-button size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="r-table">
      <div>
        <el-form :model="cropId">
          <el-select v-model="cropId.id" placeholder="请选择作物" @change="changeCrop">
            <el-option
              v-for="item in crop"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form>
        <el-form :model="cycleId">
          <el-select v-model="cycleId.id" placeholder="请选择周期" @change="changeCycle">
            <el-option
              v-for="item in cycle"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form>
      </div>
      <div>
        <div>
          <span class="maxWidth">起止日期:</span>
          <el-date-picker
            v-model="datatime"
            type="daterange"
            start-placeholder="起始日期"
            end-placeholder="结束日期"
            style="width:288px;"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
        <div>
          <span class="maxWidth">排序: </span>
          <input type="number" v-model="sort">
        </div>
      </div>
      <span class="maxWidth">可用配方:</span>
      <div>
        <div class="list" v-for="item in fomula" :key="item.id" @click="getDataId(item)">
          <div class="top">
            <div>{{item.name}}</div>
            <div>
              <span>描述：</span>
              <span>{{item.descr}}</span>
            </div>
          </div>
          <div class="middle">
            <div>
              <span>EC基础值：</span>
              <span>{{item.ecBase}}</span>
            </div>
            <div>
              <span>EC目标值：</span>
              <span>{{item.ecTarget}}</span>
            </div>
            <div>
              <span>PH目标值：</span>
              <span>{{item.phTarget}}</span>
            </div>
          </div>
          <div class="bottom">
            <div>
              <span>{{channel.channel1}}</span>
              <i>：</i>
              <span>{{item.channel1}}</span>
            </div>
            <div>
              <span>{{channel.channel2}}</span>
              <i>：</i>
              <span>{{item.channel2}}</span>
            </div>
            <div>
              <span>{{channel.channel3}}</span>
              <i>：</i>
              <span>{{item.channel3}}</span>
            </div>
            <div>
              <span>{{channel.channel4}}</span>
              <i>：</i>
              <span>{{item.channel4}}</span>
            </div>
            <div>
              <span>{{channel.channel5}}</span>
              <i>：</i>
              <span>{{item.channel5}}</span>
            </div>
            <div>
              <span>{{channel.channel6}}</span>
              <i>：</i>
              <span>{{item.channel6}}</span>
            </div>
            <div>
              <span>{{channel.channel7}}</span>
              <i>：</i>
              <span>{{item.channel7}}</span>
            </div>
            <div>
              <span>{{channel.channel8}}</span>
              <i>：</i>
              <span>{{item.channel8}}</span>
            </div>
            <div>
              <span>{{channel.channel9}}</span>
              <i>：</i>
              <span>{{item.channel9}}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <input class="submit" type="button" value="提交" @click="submitForm">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cropId: {
        id: ''
      },
      cycleId: {
        id: ''
      },
      // 起始(结束)时间
      datatime: [],
      // 大棚id
      areaId: {
        id: ''
      },
      // 项目(园区)id
      request: {
        projectId: ''
      },
      // 大棚数据
      area: [],
      // 作物
      crop: [],
      // 周期
      cycle: [],
      // 配方
      fomula: [],
      // 配方ID
      formulaId: '',
      // 排期
      sort: null,
      // 通道
      channel: [],
      // 作物配方绑定列表
      tableData: []
    }
  },
  created () {
    const projectId = JSON.parse(window.sessionStorage.getItem('projectId'))
    this.request.projectId = projectId
    this.getareas()
    this.getcrop()
    this.getcycle()
    this.getfomulaOrchanner()
  },
  methods: {
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    // 删除
    async remove (index, row) {
      let ID = {
        id: row.id
      }
      this.$confirm('此操作将永久删除该策略, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.post('http://192.168.1.202:10020/fertilizer/api/area/deleteFormulaLink', ID)
          // 删除成功
          this.$message.success('删除成功')
          this.getareas()
        })
        .catch(() => {})
    },
    // 大棚
    async getareas () {
      // 获取园区第一条数据
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/area/queryByProjectId', this.request)
      this.area = res.data.data
      this.areaId.id = this.area[0].id

      // 配方绑定列表
      let ID = {
        areaId: this.areaId.id
      }
      const fomulaCrop = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/area/queryFormulaLinkByAreaId', ID)
      this.tableData = fomulaCrop.data.data
      this.getareas()
    },
    // 作物
    async getcrop () {
      const crop = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/crop/queryByProjectId', this.request)
      this.crop = crop.data.data
    },
    // 周期
    async getcycle () {
      const cycle = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/period/queryByProjectId', this.request)
      this.cycle = cycle.data.data
    },
    // 配方和通道
    async getfomulaOrchanner () {
      const way = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/channel/queryByProjectId', this.request)
      this.channel = way.data.data
    },
    async changeCrop () {
      let that = this
      let ID = {
        cropId: that.cropId.id,
        periodId: that.cycleId.id
      }
      if (ID.periodId !== '') {
        const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/formula/queryByCropAndPeriod', ID)
        this.fomula = res.data.data
        if (res.data.data.length === 0) {
          this.$message.warning('未查到！')
        } else {
          this.$message.success('查到了！')
          this.fomula = res.data.data
        }
      }
    },
    async changeCycle () {
      let that = this
      let ID = {
        cropId: that.cropId.id,
        periodId: that.cycleId.id
      }
      if (ID.cropId !== '') {
        const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/formula/queryByCropAndPeriod', ID)

        if (res.data.data.length === 0) {
          this.$message.warning('未查到！')
        } else {
          this.$message.success('查到了！')
          this.fomula = res.data.data
        }
      }
    },
    getDataId (item) {
      this.formulaId = item.id
    },
    // 编辑
    async edit (index, row) {
      this.areaId.id = row.areaId
      this.formulaId = row.formulaId
      this.sort = row.sort
      this.datatime.unshift(row.startDate, row.endDate)
    },
    async submitForm () {
      let form = {
        areaId: this.areaId.id,
        formulaId: this.formulaId,
        startDate: this.datatime[0],
        endDate: this.datatime[1],
        sort: Number(this.sort)
      }
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/area/saveOrUpdateFormulaLink', form)

      if (res === undefined) {
        this.$message.error('一个配方只能插一次')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  .l-table {
    width: 750px;
    div:nth-child(1) {
      text-align: center;
    }
    div:nth-child(2) {
      /deep/ .el-form {
        float: left;
        .el-input__inner {
          height: 40px;
          border: none;
          background-color: rgba(78, 82, 87, 0.9);
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
      .submit {
        float: right;
      }
    }
    div:nth-child(3) {
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

  }
  .r-table {
    width: 750px;
    height: 500px;
    border: 1px solid #fff;
    position: relative;
    .maxWidth {
      display: inline-block;
      width: 90px;
    }
    > div:nth-child(1) {
      margin-bottom: 10px;
      /deep/ .el-form {
        margin-right: 10px;
        display: inline-block;
        .el-input__inner {
          height: 35px;
          border: none;
          background-color: #2a3b49;
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
    }
    > div:nth-child(2) {
      > div {
        margin-bottom: 10px;
      }
      /deep/ .el-input__inner {
        width: 150px;
        height: 40px;
        border: none;
        background-color: #2a3b49;
        border-radius: 0;
        color: #fff;
      }
      /deep/ .el-date-editor {
        width: 155px;
        .el-range-input {
          color: #fff;
        }
      }
      /deep/ .el-input__icon {
        line-height: 35px;
      }
      /deep/ .el-radio__label {
        color: #97b1c9;
      }
      /deep/ .el-range-separator {
        color: #fff;
      }
    }
    > div:nth-child(4) {
      height: 350px;
      overflow-y: scroll;
      .list {
        width: 600px;
        height: 130px;
        margin: 15px auto;
        border: 1px solid #fff;

        .top {
          height: 30px;
          line-height: 30px;
          div {
            float: left;
            margin-left: 20px;
          }
        }
        .middle {
          height: 30px;
          line-height: 30px;
          div {
            float: left;
            margin-left: 20px;
          }
        }
        .bottom {
          height: 30px;
          line-height: 30px;
          div {
            float: left;
            margin-left: 20px;
          }
        }
      }
    }
    > div:nth-child(5) {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
</style>
