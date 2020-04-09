<template>
<div class="container">
  <div class="fer-container">
    <div class="fer-plan">
      <div class="bg-title">
        <p>配方列表</p>
      </div>
      <div class="add-data"><input class="submit" type="button" value="添加" @click="clear"></div>
      <div class="list">
        <el-table
          :data="titles.slice((reqParamsFl.currentPage-1)*reqParamsFl.PageSize,reqParamsFl.currentPage*reqParamsFl.PageSize)"
          style="width:760px"
        >
          <el-table-column prop="name" label="配方" width="120" align="center"></el-table-column>
          <el-table-column prop="descr" label="描述" width="230" align="center"></el-table-column>
          <el-table-column prop="ecBase" label="Ec基数" width="70" align="center"></el-table-column>
          <el-table-column prop="ecTarget" label="Ec目标值" width="90" align="center"></el-table-column>
          <el-table-column prop="phTarget" label="PH目标值" width="95" align="center"></el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="editData(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" @click="del(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pager" v-show="reqParamsFl.totalCount > 6">
          <el-pagination
            layout="prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="reqParamsFl.currentPage"
            :page-size="reqParamsFl.PageSize"
            :total="reqParamsFl.totalCount"
          ></el-pagination>
        </div>
      </div>
    </div>
    <div class="fer-table">
      <div class="bg-title">
        <p>配方详情</p>
      </div>
      <ul>
        <li>
          <input class="submit" type="button" value="提交" @click="updata" />
        </li>
        <li class="check-time">
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
          <!-- <span>
            周期:
            <input type="text" v-model="edit.periodDay" /> 天
          </span> -->
        </li>
        <li>
          <span>
            EC的基数:
            <input type="number" v-model="edit.ecBase" />
          </span>
        </li>
        <li>
          <span>
            EC目标值:
            <input type="number" v-model="edit.ecTarget" />μS/cm
          </span>
          <span style="margin-left:15px;">
            PH目标值:
            <input type="number" v-model="edit.phTarget" />
          </span>
        </li>
        <li>
          <span class="descr">配方描述: </span>
          &nbsp;
          <el-input
            type="textarea"
            v-model="edit.descr">
          </el-input>
        </li>
        <li>
          施肥通道:
          <div>
            <span class="list-group-item">
              {{channel.channel1}}: <input type="text" v-model="edit.channel1" />
            </span>
            <span class="list-group-item">
              {{channel.channel2}}: <input type="text" v-model="edit.channel2" />
            </span>
            <span class="list-group-item">
              {{channel.channel3}}: <input type="text" v-model="edit.channel3" />
            </span>
            <span class="list-group-item">
              {{channel.channel4}}: <input type="text" v-model="edit.channel4" />
            </span>
            <span class="list-group-item">
              {{channel.channel5}}: <input type="text" v-model="edit.channel5" />
            </span>
            <span class="list-group-item">
              {{channel.channel6}}: <input type="text" v-model="edit.channel6" />
            </span>
            <span class="list-group-item">
              {{channel.channel7}}: <input type="text" v-model="edit.channel7" />
            </span>
            <span class="list-group-item">
              {{channel.channel8}}: <input type="text" v-model="edit.channel8" />
            </span>
            <span class="list-group-item">
              {{channel.channel9}}: <input type="text" v-model="edit.channel9" />
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      // 分页
      reqParamsFl: {
        // 默认显示第几页
        currentPage: 1,
        // 总条数，根据接口获取数据长度(注意：这里不能为空)
        totalCount: 0,
        // 个数选择器（可修改）
        pageSizes: [1, 2, 3, 4],
        // 默认每页显示的条数（可修改）
        PageSize: 6
      },
      // 项目id
      request: {
        projectId: ''
      },
      list: {
        title: '通道'
      },
      // 配方
      titles: [],
      // 根据索引id删除
      fomulaId: {
        id: ''
      },
      // 通道
      channel: {},
      // 作物列表
      crop: [],
      // 周期
      cycle: [],
      // 编辑
      edit: {}
    }
  },
  created () {
    this.getcrop()
    this.getcycle()
    this.getchannel()
    const projectId = JSON.parse(window.sessionStorage.getItem('projectId'))
    this.request.projectId = projectId
  },
  mounted () {
    let that = this
    setTimeout(() => {
      that.getfomula()
    }, 150)
  },
  methods: {
    tableRowClassName (row, rowIndex) {
      if (rowIndex % 2 !== 1) {
        return 'success-row'
      }
      return ''
    },
    handleSizeChange (val) {
      // 改变每页显示的条数
      this.reqParamsFl.PageSize = val
      this.reqParamsFl.currentPage = 1
    },
    handleCurrentChange (newPage) {
      // 提交当前页码给后台才能获取对应的数据
      this.reqParamsFl.currentPage = newPage
    },
    // 获取作物
    async getcrop () {
      const crop = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/crop/queryByProjectId', this.request)
      // console.log(crop)
      this.crop = crop.data.data
    },
    // 渲染配方列表
    async getfomula () {
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/formula/queryByProjectId', this.request)
      var crop2 = this.crop
      var cycle2 = this.cycle
      var titles2 = res.data.data
      for (var i = 0; i < titles2.length; i++) {
        titles2[i].cropName = '已删除'
        titles2[i].cycleName = '已删除'
        for (var j = 0; j < crop2.length; j++) {
          if (titles2[i].cropId === crop2[j].id) {
            titles2[i].cropName = crop2[j].name
          }
        }
        for (var l = 0; l < cycle2.length; l++) {
          if (titles2[i].periodId === cycle2[l].id) {
            titles2[i].cycleName = cycle2[l].name
          }
        }
      }
      this.titles = titles2
      this.reqParamsFl.totalCount = res.data.data.length
    },
    // 获取施肥通道
    async getchannel () {
      const way = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/channel/queryByProjectId', this.request)
      this.channel = way.data.data
    },
    // 获取到作物id赋值给列表
    // 获取周期
    async getcycle () {
      const cycle = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/period/queryByProjectId', this.request)
      this.cycle = cycle.data.data
    },
    // 删除
    async del (index, row) {
      // let that = this
      this.fomulaId.id = row.id
      this.$confirm('此操作将永久删除该配方, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.post('http://192.168.1.202:10020/fertilizer/api/formula/delete', this.fomulaId)
          // 删除成功
          // this.$message.success('删除成功')
          let totalPage = Math.ceil((this.reqParamsFl.totalCount) / this.reqParamsFl.PageSize)
          let currentPage = this.reqParamsFl.currentPage > totalPage ? totalPage : this.reqParamsFl.currentPage
          this.reqParamsFl.currentPage = currentPage < 1 ? 1 : currentPage
          this.getfomula()
        })
        .catch(() => {})
    },
    // 编辑
    editData (index, row) {
      console.log(row)
      this.edit = {
        id: row.id,
        projectId: row.projectId,
        descr: row.descr,
        cropId: row.cropId,
        periodId: row.periodId,
        // periodDay: row.periodDay,
        ecBase: row.ecBase,
        ecTarget: row.ecTarget,
        phTarget: row.phTarget,
        channel1: row.channel1,
        channel2: row.channel2,
        channel3: row.channel3,
        channel4: row.channel4,
        channel5: row.channel5,
        channel6: row.channel6,
        channel7: row.channel7,
        channel8: row.channel8,
        channel9: row.channel9
      }
    },
    // 更新和提交
    async updata () {
      this.edit = {
        id: this.edit.id,
        projectId: this.request.projectId,
        descr: this.edit.descr,
        cropId: this.edit.cropId,
        periodId: this.edit.periodId,
        // periodDay: this.edit.periodDay,
        ecBase: this.edit.ecBase,
        desc: this.edit.desc,
        ecTarget: this.edit.ecTarget,
        phTarget: this.edit.phTarget,
        channel1: this.edit.channel1,
        channel2: this.edit.channel2,
        channel3: this.edit.channel3,
        channel4: this.edit.channel4,
        channel5: this.edit.channel5,
        channel6: this.edit.channel6,
        channel7: this.edit.channel7,
        channel8: this.edit.channel8,
        channel9: this.edit.channel9
      }
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/formula/saveOrUpdate', this.edit)
      console.log(res)

      if (res.data.code === 200) {
        this.$message.success('处理成功')
        this.getfomula()
      } else {
        this.$message.error('处理失败')
        this.getfomula()
      }
      this.edit = {}
    },
    clear () {
      this.edit = {
        id: null,
        projectId: null,
        // name: null,
        cropId: null,
        periodId: null,
        // periodDay: null,
        ecBase: null,
        ecTarget: null,
        phTarget: null,
        channel1: 0,
        channel2: 0,
        channel3: 0,
        channel4: 0,
        channel5: 0,
        channel6: 0,
        channel7: 0,
        channel8: 0,
        channel9: 0
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  width: 100%;
  height: 100%;
  position: relative;
  .fer-container {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 1625px;
    height: 825px;
    // border: 1px solid #6989a5;
    border-radius: 15px;
    // background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: space-evenly;
    padding-top: 44px;
    .fer-plan {
      position: relative;
      width: 840px;
      height: 602px;
      margin-top: 28px;
      border: 1px solid #5c7b95;
      background-color: #000;
      border-radius: 10px;
      padding: 80px 0 60px 0;
      color: #fff;

      .bg-title {
        position: absolute;
        top: -25px;
        left: 21%;
        width: 380px;
        height: 50px;
        background: url(../../../assets/images/bg0.png) no-repeat;
        background-size: contain;

        p {
          line-height: 50px;
          text-align: center;
          color: #fff;
          font-size: 26px;
          font-weight: 800;
        }
      }
      .add-data {
        position: absolute;
        top: 30px;
        right: 42px;
      }
      .list {
        height: 460px;
        width: 800px;
        margin: 0 auto;
        padding-top: 28px;
        // background-color: #232733;
        border-radius: 10px;
        /deep/ .el-table::before {
          height: 0;
        }
        /deep/ .el-table {
          margin: 0 auto;
          // margin: 10px 0;
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
            background-color: rgba(90, 96, 102, 0.9);;
          }
          td {
            // border-bottom: 1px solid #666;
            border: none;
            // background-color: transparent;
          }
          thead {
            color: #eee;
            background-color: rgba(91, 112, 129, 0.9);
          }
          // 按钮样式
          // .cell {
          //   .el-button {
          //     background-color: rgba(91, 112, 129, 0.9);
          //     border: 1px solid transparent;
          //     color: #eee;
          //   }
          // }
        }

        .pager {
          // position: absolute;
          // bottom: 12%;
          // left: 36%;
          margin-top: 12px;
          text-align: center;
        }
      }
    }
    .fer-table {
      position: relative;
      width: 670px;
      height: 602px;
      border: 1px solid #5c7b95;
      border-radius: 10px;
      background: rgba(19, 18, 18, 0.8);
      padding-top: 60px;
      margin-top: 30px;

      .bg-title {
        position: absolute;
        top: -25px;
        left: 21%;
        width: 380px;
        height: 50px;
        background: url(../../../assets/images/bg0.png) no-repeat;
        background-size: contain;

        p {
          height: 50px;
          line-height: 50px;
          text-align: center;
          color: #fff;
          font-size: 26px;
          font-weight: 800;
        }
      }
      ul {
        padding: 0 15px;
        li {
          margin-bottom: 25px;

          .submit {
            position: absolute;
            top: 30px;
            right: 42px;
          }
          .add {
            position: absolute;
            top: 30px;
            right: 128px;
          }
          .descr {
            display: inline-block;
            height: 60px;
          }
          /deep/ .el-textarea {
              display: inline-block;
              width: 230px;
              .el-textarea__inner {
              // width: 200px;
              background-color: #2a3b49;
              color: #fff;
              border: 1px solid transparent;
              font-size: 18px;
            }
          }
        }
        li:last-child {
          div {
            // display: flex;
            // justify-content: space-evenly;
            // flex-wrap: wrap;
            text-align: center;
            span {
              display: inline-block;
              width: 150px;
            }

            .list-group-item {
              margin: 10px 15px;
            }
          }
        }
        select {
          height: 30px;
          line-height: 30px;
        }
      }
    }
  }
}
</style>
