<template>
  <div class="container">
    <div class="statistic">
      <div class="leftData">
        <div class="ChoseItem">
          <span>选择大棚：</span>
          <el-select v-model="houseId.id">
            <el-option v-for="item in house" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <div class="Ferz">
            <span>施肥机：</span>
            <span>1#施肥机</span>
          </div>
        </div>
        <div class="ChoseDate">
          <span>选择日期：</span>
          <el-date-picker
            v-model="daterange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <input type="button" class="submit" value="确定">
        </div>
      </div>
      <div class="middleData">
        <span>选择电磁阀：</span>
        <div>
          <div v-for="(item, index) in 10" :key="index">A{{index + 1}} 阀</div>
        </div>
      </div>
      <div class="rightData">
        <div>
          <span>绑定配方：</span>
          <span>西红柿清苗</span>
        </div>
        <div>
          <span>
            <strong>通道1：</strong>0
          </span>
          <span>
            <strong>通道2：</strong>0
          </span>
          <span>
            <strong>通道3：</strong>0
          </span>
          <span>
            <strong>通道4：</strong>0
          </span>
          <span>
            <strong>通道5：</strong>0
          </span>
          <span>
            <strong>通道6：</strong>0
          </span>
          <span>
            <strong>通道7：</strong>0
          </span>
          <span>
            <strong>通道8：</strong>0
          </span>
          <span>
            <strong>通道9：</strong>0
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
          :row-dblclick="DbHandle"
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
      // 表格数据
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      tableConfig: {
        tableData: [
          { date: '2020-04-02', IrrNum: '1', IrrSize: '120', IrrTime: '0', MaxPH: '188', MinPH: '100', MeanPH: '120', MaxEC: '1500', MinEC: '1200', MeanEC: '1365' },
          { date: '2020-04-03', IrrNum: '1', IrrSize: '120', IrrTime: '0', MaxPH: '188', MinPH: '100', MeanPH: '120', MaxEC: '1500', MinEC: '1200', MeanEC: '1365' },
          { date: '2020-04-04', IrrNum: '1', IrrSize: '120', IrrTime: '0', MaxPH: '188', MinPH: '100', MeanPH: '120', MaxEC: '1500', MinEC: '1200', MeanEC: '1365' },
          { date: '2020-04-05', IrrNum: '1', IrrSize: '120', IrrTime: '0', MaxPH: '188', MinPH: '100', MeanPH: '120', MaxEC: '1500', MinEC: '1200', MeanEC: '1365' },
          { date: '2020-04-06', IrrNum: '1', IrrSize: '120', IrrTime: '0', MaxPH: '188', MinPH: '100', MeanPH: '120', MaxEC: '1500', MinEC: '1200', MeanEC: '1365' },
          { date: '2020-04-07', IrrNum: '1', IrrSize: '120', IrrTime: '0', MaxPH: '188', MinPH: '100', MeanPH: '120', MaxEC: '1500', MinEC: '1200', MeanEC: '1365' },
          { date: '2020-04-08', IrrNum: '1', IrrSize: '120', IrrTime: '0', MaxPH: '188', MinPH: '100', MeanPH: '120', MaxEC: '1500', MinEC: '1200', MeanEC: '1365' },
          { date: '2020-04-09', IrrNum: '1', IrrSize: '120', IrrTime: '0', MaxPH: '188', MinPH: '100', MeanPH: '120', MaxEC: '1500', MinEC: '1200', MeanEC: '1365' },
          { date: '2020-04-10', IrrNum: '1', IrrSize: '120', IrrTime: '0', MaxPH: '188', MinPH: '100', MeanPH: '120', MaxEC: '1500', MinEC: '1200', MeanEC: '1365' },
          { date: '2020-04-12', IrrNum: '1', IrrSize: '120', IrrTime: '0', MaxPH: '188', MinPH: '100', MeanPH: '120', MaxEC: '1500', MinEC: '1200', MeanEC: '1365' }
        ],
        columns: [
          {
            field: 'date',
            title: '日期',
            width: 180,
            titleAlign: 'center',
            columnAlign: 'center'
          },
          {
            field: 'IrrNum',
            title: '灌溉次数',
            width: 100,
            titleAlign: 'center',
            columnAlign: 'center'
          },
          {
            field: 'IrrSize',
            title: '灌溉量(L)',
            width: 120,
            titleAlign: 'center',
            columnAlign: 'center'
          },
          {
            field: 'IrrTime',
            title: '灌溉时长(分钟)',
            width: 120,
            titleAlign: 'center',
            columnAlign: 'center'
          },
          {
            field: 'MaxPH',
            title: 'PH最大值',
            width: 100,
            titleAlign: 'center',
            columnAlign: 'center'
          },
          {
            field: 'MinPH',
            title: 'PH最小值',
            width: 100,
            titleAlign: 'center',
            columnAlign: 'center'
          },
          {
            field: 'MeanPH',
            title: 'PH平均值',
            width: 120,
            titleAlign: 'center',
            columnAlign: 'center'
          },
          {
            field: 'MaxEC',
            title: 'EC最大值(μS/cm)',
            width: 150,
            titleAlign: 'center',
            columnAlign: 'center'
          },
          {
            field: 'MinEC',
            title: 'EC最小值(μS/cm)',
            width: 150,
            titleAlign: 'center',
            columnAlign: 'center'
          },
          {
            field: 'MeanEC',
            title: 'EC平均值(μS/cm)',
            width: 150,
            titleAlign: 'center',
            columnAlign: 'center'
          },
          {
            field: 'link',
            title: '备用',
            width: 248,
            titleAlign: 'center',
            columnAlign: 'center'
          }
        ]
      },
      // 日期选择
      daterange: '',
      // 施肥机下拉框数据
      houseId: {
        id: ''
      },
      house: [
        {
          id: 1,
          name: '1#大棚'
        },
        {
          id: 2,
          name: '2#大棚'
        }
      ]
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
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
    //
    DbHandle () {
      console.log(111)
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
      > div {
        div {
          float: left;
          width: 70px;
          height: 40px;
          border: 1px solid #fff;
          text-align: center;
          line-height: 40px;
          margin: 6px 10px;
        }
      }
    }
    .rightData {
      float: left;
      width: 470px;
      height: 150px;
      border-radius: 10px;
      margin: 20px 0 0 20px;
      padding: 20px;
      background-color: #242c3b;
      div:first-child {
        text-align: center;
        margin-bottom: 10px;
        span:first-child {
          font-weight: 800;
        }
      }
      div:last-child {
        text-align: center;
        span {
          display: inline-block;
          width: 130px;
          height: 30px;
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
