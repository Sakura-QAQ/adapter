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
    </div>
    <div class="r-table">
      <div>
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
      </div>
      <div>
        <div>
          起止日期:
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
          排序: <input type="number">
        </div>
      </div>
      <div>
        可用配方:
        <div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      edit: {
        cropId: '',
        periodId: ''
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
      }]
    }
  },
  created () {
    const projectId = JSON.parse(window.sessionStorage.getItem('projectId'))
    this.request.projectId = projectId
    this.getareas()
    this.getcrop()
    this.getcycle()
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
    async getareas () {
      // 获取园区第一条数据
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/area/queryByProjectId', this.request)
      this.area = res.data.data
      this.areaId.id = this.area[0].id
    },
    async getcrop () {
      const crop = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/crop/queryByProjectId', this.request)
      this.crop = crop.data.data
    },
    async getcycle () {
      const cycle = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/period/queryByProjectId', this.request)
      this.cycle = cycle.data.data
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
    div:nth-child(2) {
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
    }
  }
}
</style>
