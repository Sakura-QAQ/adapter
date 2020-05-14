<template>
  <div class="container">
    <div class="l-table">
      <div>温室作物配方绑定</div>
      <div>
        <span>选择温室:</span>
        <el-form :model="areaId">
          <el-select v-model="areaId.id" placeholder="请选择温室" @change="areaTab">
            <el-option
              v-for="item in area"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form>
        <input class="submit" type="button" @click="fog" value="添加">
      </div>
      <div>
        <el-table
          :data="tableData.slice((pageNum - 1)*pageSize, pageNum*pageSize)"
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
        <div class="box" v-show="total > 7">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="currentchange"
            @next-click="nextpage"
            @prev-click="prevpage"
            :current-page="pageNum"
            :page-size="pageSize"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <div class="r-table" v-if="flagform">
      <div class="dataform">
        <div>
          <span class="maxWidth">周期配方:</span>
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
          <vue-scroll :ops="ops" style="width:100%;height:100%">
            <div :class="{model:true,list:index==num}" v-for="(item, index) in fomula" :key="index" @click="getDataId(item, index)">
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
                  <span>{{channel[0]}}</span>
                  <i>：</i>
                  <span>{{item.channel1}}</span>
                </div>
                <div>
                  <span>{{channel[1]}}</span>
                  <i>：</i>
                  <span>{{item.channel2}}</span>
                </div>
                <div>
                  <span>{{channel[2]}}</span>
                  <i>：</i>
                  <span>{{item.channel3}}</span>
                </div>
                <div>
                  <span>{{channel[3]}}</span>
                  <i>：</i>
                  <span>{{item.channel4}}</span>
                </div>
                <div>
                  <span>{{channel[4]}}</span>
                  <i>：</i>
                  <span>{{item.channel5}}</span>
                </div>
                <div>
                  <span>{{channel[5]}}</span>
                  <i>：</i>
                  <span>{{item.channel6}}</span>
                </div>
                <div>
                  <span>{{channel[6]}}</span>
                  <i>：</i>
                  <span>{{item.channel7}}</span>
                </div>
                <div>
                  <span>{{channel[7]}}</span>
                  <i>：</i>
                  <span>{{item.channel8}}</span>
                </div>
                <div>
                  <span>{{channel[8]}}</span>
                  <i>：</i>
                  <span>{{item.channel9}}</span>
                </div>
              </div>
            </div>
          </vue-scroll>
        </div>
        <div>
          <input class="submit" type="button" value="取消" @click="flagform=false">&nbsp;
          <input class="submit" type="button" value="提交" @click="submitForm">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 分页参数
      pageNum: 1,
      pageSize: 7,
      total: 0,
      // 滚动条
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          keepShow: true
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false, // 是否只有滚动的时候才显示滚动条
          background: '#F5F5F5', // 滚动条颜色
          opacity: 0.5, // 滚动条透明度
          'overflow-x': 'hidden'
        }
      },
      // 索引点击
      num: null,
      flagform: false,
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
      // 编辑所需的id
      editId: '',
      // 排期
      sort: null,
      // 通道
      channel: [],
      // 作物配方绑定列表
      tableData: [],
      // ferId
      ferId: ''
    }
  },
  created () {
    const projectId = JSON.parse(window.sessionStorage.getItem('projectId'))
    this.request.projectId = projectId
  },
  mounted () {
    this.getareas().then(res => {
      this.getcrop()
      this.getcycle()
      this.getfomulaLink()
    })
  },
  methods: {
    // 分页
    currentchange (newPage) {
      this.pageNum = newPage
    },
    prevpage () {
      this.pageNum = this.pageNum - 1
    },
    nextpage () {
      this.pageNum = this.pageNum + 1
    },
    // 温室切换
    areaTab () {
      this.getfomulaLink()
    },
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
          await this.$http.post('fertilizer/api/area/deleteFormulaLink', ID)
          // 删除成功
          this.$message.success('删除成功')
          const totalPage = Math.ceil((this.total - 1) / this.pageSize)
          const pageNum = this.pageNum > totalPage ? totalPage : this.pageNum
          this.pageNum = pageNum < 1 ? 1 : pageNum
          this.getfomulaLink()
        })
        .catch(() => {})
    },
    // 大棚
    async getareas () {
      // 获取园区第一条数据
      const res = await this.$http.post('fertilizer/api/area/queryByProjectId', this.request)
      this.area = res.data.data
      this.areaId.id = this.area[0].id
    },
    // 配方列表
    async getfomulaLink () {
      // 配方绑定列表
      let ID = {
        areaId: this.areaId.id
      }
      const { data: { data } } = await this.$http.post('fertilizer/api/area/queryFormulaLinkByAreaId', ID)
      this.tableData = data
      this.total = data.length
    },
    // 作物
    async getcrop () {
      const crop = await this.$http.post('fertilizer/api/crop/queryByProjectId', this.request)
      this.crop = crop.data.data
    },
    // 周期
    async getcycle () {
      const cycle = await this.$http.post('fertilizer/api/period/queryByProjectId', this.request)
      this.cycle = cycle.data.data
    },
    // 配方和通道
    async getfomulaOrchanner () {
      const ID = {
        id: this.ferId
      }
      const { data: { data } } = await this.$http.post('fertilizer/api/fertilizer/queryById', ID)
      this.channel = data.channels.split(',')
    },
    async changeCrop () {
      let that = this
      let ID = {
        cropId: that.cropId.id,
        periodId: that.cycleId.id,
        fertilizerId: this.ferId
      }
      if (ID.periodId !== '') {
        const res = await this.$http.post('fertilizer/api/formula/queryByCropAndPeriod', ID)
        this.fomula = res.data.data
        if (res.data.data.length === 0) {
          this.$message.warning('未查到！')
          this.fomula = []
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
        periodId: that.cycleId.id,
        fertilizerId: this.ferId

      }
      if (ID.cropId !== '') {
        const res = await this.$http.post('fertilizer/api/formula/queryByCropAndPeriod', ID)

        if (res.data.data.length === 0) {
          this.$message.warning('未查到！')
          this.fomula = []
        } else {
          this.$message.success('查到了！')
          this.fomula = res.data.data
        }
      }
    },
    // 点击列表获取id
    getDataId (item, index) {
      this.num = index
      this.formulaId = item.id
    },
    clear () {
      this.cropId.id = ''
      this.cycleId.id = ''
      this.formulaId = ''
      this.sort = ''
      this.num = null
      this.fomula = []
      this.datatime = []
    },
    // 添加
    async fog () {
      this.clear()
      const { data: { data } } = await this.$http.post('fertilizer/api/area/queryById', this.areaId)
      this.ferId = data.fertilizerId
      this.getfomulaOrchanner()
      this.flagform = true
    },
    // 编辑
    async edit (index, row) {
      this.clear()
      this.flagform = true
      this.editId = row.id
      this.areaId.id = row.areaId
      this.formulaId = row.formulaId
      this.sort = row.sort
      this.datatime.unshift(row.startDate, row.endDate)
      if (row.formula === null) {
        this.cropId.id = ''
        this.cycleId.id = ''
        this.$message.error('无此配方，请继续编辑或删除')
      } else {
        this.cropId.id = row.formula.cropId
        this.cycleId.id = row.formula.periodId
      }
      const { data: { data } } = await this.$http.post('fertilizer/api/area/queryById', this.areaId)
      this.ferId = data.fertilizerId
      let ID = {
        cropId: row.formula.cropId,
        periodId: row.formula.periodId,
        fertilizerId: this.ferId
      }
      this.getfomulaOrchanner()
      const res = await this.$http.post('fertilizer/api/formula/queryByCropAndPeriod', ID)
      this.fomula = res.data.data
    },
    // 提交
    async submitForm () {
      let form = {
        id: this.editId,
        areaId: this.areaId.id,
        formulaId: this.formulaId,
        startDate: this.datatime[0],
        endDate: this.datatime[1],
        sort: Number(this.sort)
      }
      if (this.datatime[0] === undefined && this.datatime[1] === undefined) {
        this.$message.error('请填写起止时间')
        return false
      } else if (form.formulaId === '') {
        this.$message.error('请选择配方')
        return false
      } else {
        const { data } = await this.$http.post('fertilizer/api/area/saveOrUpdateFormulaLink', form)
        if (data.code === 100) {
          this.$message.error(data.msg)
        } else if (data.code === 200) {
          this.$message.success('添加成功')
        }
        this.flagform = false
        this.getfomulaLink()
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
  .l-table {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 1280px;
    height: 720px;
    border: 1px solid #5c7b95;
    background-color: #000;
    padding: 20px 20px;
    border-radius: 8px;
    >div:nth-child(1) {
      height: 60px;
      line-height: 60px;
      font-weight: 800;
      text-align: center;
      font-size: 24px;
      background-color: #242c3b;
      border-radius: 5px;
    }
    >div:nth-child(2) {
      height: 80px;
      margin-top: 20px;
      background-color: #242c3b;
      border-radius: 5px;
      span {
        display: inline-block;
        font-weight: 800;
        line-height: 80px;
        margin: 0 15px ;
      }
      /deep/ .el-form {
        display: inline-block;
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
        margin-left: 65%;
      }
    }
    >div:nth-child(3) {
      height: 500px;
      margin-top: 20px;
      padding: 20px;
      border-radius: 5px;
      background-color: #242c3b;
      .box {
        margin-top: 12px;
        text-align: center;
      }
      /deep/ .el-table::before {
        height: 0;
      }
      /deep/ .el-table {
        margin: 0 auto;
        background-color: transparent;
        color: #fff;
        th {
          border: 0;
          background-color: rgba(55, 59, 63, 0.9);
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
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(59, 63, 66, 0.9);
    .dataform {
      position: absolute;
      margin: auto;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 900px;
      height: 600px;
      background-color: rgba(20, 20, 20, 0.9);
      padding: 20px;
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
        height: 400px;
        .model {
          width: 600px;
          height: 130px;
          margin: 15px auto;
          background-color: #2f3544;
          border: 1px solid #ccc;
          border-radius: 8px;
          cursor: pointer;
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
        .list {
          background-color: #666;
        }
      }
      > div:nth-child(5) {
        position: absolute;
        top: 20px;
        right: 15px;
      }
    }
    .maxWidth {
      display: inline-block;
      width: 90px;
    }
  }
}
</style>
