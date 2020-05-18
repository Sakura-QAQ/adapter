<template>
  <div class="daily-container">
    <div class="l-table">
      <div>系统日志查询</div>
      <div>
        <span>选择施肥机:</span>
        <el-form class="" :model="fertilizerId">
          <el-select v-model="fertilizerId.id" placeholder="请选择施肥机">
            <el-option
              v-for="item in ferList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form>
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
        </div>
        <input class="submit" type="button" value="查询" @click="queryData">
      </div>
      <div>
        <el-table
          :data="tableData.slice((pageNum - 1)*pageSize, pageNum*pageSize)"
          style="width: 100%">
          <el-table-column
            prop="datetime"
            label="时间">
          </el-table-column>
          <el-table-column
            prop="fertilizerName"
            label="施肥机">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="showData(scope.$index, scope.row)">详情</el-button>
            </template>
          </el-table-column>
          <!-- <el-table-column
            label="指令"
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-input type="textarea" :rows="3" v-model="scope.row.commandStr" class="resizeNone"></el-input>
            </template>
          </el-table-column> -->
          <!-- <el-table-column
            prop="descr"
            label="描述">
            <template slot-scope="scope">
              <el-input type="textarea" :rows="3" v-model="scope.row.descr" class="resizeNone"></el-input>
            </template>
          </el-table-column> -->
        </el-table>
        <el-dialog
          title="日志详情"
          :visible.sync="dialogVisible"
          width="35%"
          :close-on-click-modal="false">
          <div class="model">
            <span>指令：</span>
            <el-input
              class="textarea"
              type="textarea"
              :rows="5"
              v-model="dialogData.commandStr">
            </el-input>
          </div>
          <div class="model">
            <span>描述：</span>
            <el-input
              class="textarea"
              type="textarea"
              :rows="5"
              v-model="dialogData.descr">
            </el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">返回</el-button>
          </span>
        </el-dialog>
        <div class="box" v-show="total > 8">
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 分页参数
      pageNum: 1,
      pageSize: 8,
      total: 0,
      // 对话框
      dialogVisible: false,
      // 园区id
      request: {
        projectId: ''
      },
      // 施肥机id
      fertilizerId: {
        id: ''
      },
      ferList: [],
      // 时间段
      daterange: [],
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
      tableData: [],
      dialogData: {
        commandStr: '',
        descr: ''
      }
    }
  },
  created () {
    const projectId = JSON.parse(window.sessionStorage.getItem('projectId'))
    this.request.projectId = projectId
  },
  mounted () {
    this.getferbypro().then(res => {
      // this.getdaily()
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
    // 通过园区id查施肥机
    async getferbypro () {
      const res = await this.$http.post('fertilizer/api/fertilizer/queryByProjectId', this.request)
      this.ferList = res.data.data
      this.fertilizerId.id = this.ferList[0].id
    },
    // 通过查施肥机id查日志
    async queryData () {
      // const params = {
      //   columns: [],
      //   conditions: ["fertilizer_id='" + this.fertilizerId.id + "'", "date_format(datetime,'%Y-%m-%d')>='" + this.daterange[0] + "'", "date_format(datetime,'%Y-%m-%d')<='" + this.daterange[1] + "'"],
      //   sorts: []
      // }
      const params = {
        columns: [],
        conditions: ["fertilizer_id='" + this.fertilizerId.id + "'", "datetime>='" + this.daterange[0] + "'", "datetime<='" + this.daterange[1] + "'"],
        sorts: []
      }
      const { data: { data } } = await this.$http.post('fertilizer/api/log/queryIrriLogs', params)
      this.total = data.length
      this.$message.success('查到了' + data.length + '条日志')
      for (let i = 0; i < data.length; i++) {
        const element = data[i]
        element.datetime = this.$moment(element.datetime).format('YYYY-MM-DD HH:ss')
        const params = {
          id: element.fertilizerId
        }
        const res = await this.$http.post('fertilizer/api/fertilizer/queryById', params)
        element.fertilizerName = res.data.data.name
      }
      this.tableData = data
      this.tableData.map(val => {
        if (val.status === 0) {
          val.status = '未执行'
        } else if (val.status === 1) {
          val.status = '排队中'
        } else if (val.status === 2) {
          val.status = '执行中'
        } else if (val.status === 3) {
          val.status = '已完成'
        } else if (val.status === 4) {
          val.status = '执行异常'
        } else if (val.status === 5) {
          val.status = '强制结束'
        } else if (val.status === 6) {
          val.status = '过期未执行'
        }
      })
    },
    // 详情
    showData (index, row) {
      this.dialogVisible = true
      this.dialogData.descr = row.descr
      this.dialogData.commandStr = row.commandStr
    }
  }
}
</script>

<style lang="less" scoped>
.daily-container {
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
    height: 750px;
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
      .ChoseDate {
        display: inline-block;
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
      }
      .submit {
        float: right;
        margin: 25px 18px;
      }
    }
    >div:nth-child(3) {
      height: 530px;
      margin-top: 20px;
      padding: 20px;
      border-radius: 5px;
      background-color: #242c3b;
      .box {
        margin-top: 8px;
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
        .resizeNone{
          .el-textarea__inner{ //el_input中的隐藏属性
            resize: none;
          }
        }
      }

    }
  }
  /deep/ .el-dialog {
    color: #fff;
    margin-top: 28vh !important;
    // background-color: #242c3b;
    // .model {
    //   span {
    //     color: #fff;
    //   }
    //   .textarea {
    //     .el-textarea__inner {
    //       background-color: #666;
    //       color: #fff;
    //     }
    //   }
    // }
  }
}
</style>
