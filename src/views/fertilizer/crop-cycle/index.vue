<template>
  <div class="container">
    <div class="mainBox">
      <!-- 作物管理 -->
      <div class="crop-container">
        <div class="fer-table">
          <div class="bg-title">
            <p>作物管理</p>
          </div>
          <div class="add-data">
            <input class="submit" type="button" value="添加" @click="flag1=true" />
          </div>
          <div v-if="flag1" class="layer-box">
            <el-input placeholder="请输入作物" v-model="crops.name" clearable></el-input>
            <input class="submit" type="button" @click="add" value="确定" />&nbsp;
            <input class="submit" type="button" @click="flag1=false" value="取消" />
          </div>
          <div v-if="flagEdit" class="layer-box">
            <el-input placeholder="要编辑的作物" v-model="edit.name" clearable></el-input>
            <input class="submit" type="button" @click="updata" value="确定" />&nbsp;
            <input class="submit" type="button" @click="flagEdit=false" value="取消" />
          </div>
          <div class="list">
            <el-table
              :data="productList.slice((pageNum - 1)*pageSize, pageNum*pageSize)"
              style="width: 500px"
            >
              <el-table-column prop="name" label="名称" width="250" align="center"></el-table-column>
              <el-table-column label="操作" width="250" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" @click="editData(scope.$index, scope.row)">编辑</el-button>
                  <el-button size="mini" @click="del(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pager">
              <el-pagination
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
      <!-- 周期管理 -->
      <div class="cycle-container">
        <div class="fer-table">
          <div class="bg-title">
            <p>周期管理</p>
          </div>
          <div class="add-data">
            <input class="submit" type="button" value="添加" @click="flag2=true" />
          </div>
          <div class="layer" v-if="flag2">
            <el-input placeholder="周期名称" v-model="cycle.name" clearable></el-input>
            <el-input type="textarea" :rows="2" placeholder="周期描述" v-model="cycle.descr"></el-input>
            <input class="submit" type="button" @click="addCycle" value="确定" />&nbsp;
            <input class="submit" type="button" @click="flag2=false" value="取消" />
          </div>
          <div class="layer" v-if="flagEdit2">
            <el-input placeholder="周期名称" v-model="edit1.name" clearable></el-input>
            <el-input type="textarea" :rows="2" placeholder="周期描述" v-model="edit1.descr"></el-input>
            <input class="submit" type="button" @click="updataCycle" value="确定" />&nbsp;
            <input class="submit" type="button" @click="flagEdit2=false" value="取消" />
          </div>
          <div class="list">
            <el-table
              :data="titles.slice((pageNum1 - 1)*pageSize1, pageNum1*pageSize1)"
              style="width: 600px"
              >
              <el-table-column prop="name" label="名称" width="150" align="center"></el-table-column>
              <el-table-column prop="descr" label="描述" width="300" align="center"></el-table-column>
              <el-table-column label="操作" width="150" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" @click="editCycle(scope.$index, scope.row)">编辑</el-button>
                  <el-button size="mini" @click="delCycle(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pager">
              <el-pagination
                layout="prev, pager, next"
                @current-change="currentchange1"
                @next-click="nextpage1"
                @prev-click="prevpage1"
                :current-page="pageNum1"
                :page-size="pageSize1"
                :total="total1"
              ></el-pagination>
            </div>
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
      // 作物分页参数
      pageNum: 1,
      pageSize: 5,
      total: 0,
      // 周期分页参数
      pageNum1: 1,
      pageSize1: 5,
      total1: 0,
      // 弹框
      flag1: false,
      flagEdit: false,
      // add请求作物数据
      crops: {
        id: '',
        name: '',
        projectId: '',
        isDel: 0
      },
      // 作物id
      cropsID: {
        id: ''
      },
      // 编辑的数据
      edit: {},
      // 请求列表的参数
      request: { projectId: '' },
      // 作物数据
      productList: [],
      // 周期部分
      // 周期add添加数据
      cycle: {
        id: '',
        name: '',
        descr: '',
        projectId: '',
        isDel: 0
      },
      // 编辑的周期
      edit1: {},
      flag2: false,
      flagEdit2: false,
      // 周期id
      cycleId: {
        id: ''
      },
      // 周期列表
      titles: [],
      // 周期id
      cycles: {
        projectId: ''
      }
    }
  },
  created () {
    this.getcrops()
    this.getCycle()
    const projectId = JSON.parse(window.sessionStorage.getItem('projectId'))
    this.request.projectId = projectId
  },
  methods: {
    // 分页
    currentchange (newPage) {
      this.pageNum = newPage
      this.getcrops()
    },
    prevpage () {
      this.pageNum = this.pageNum - 1
      this.getcrops()
    },
    nextpage () {
      this.pageNum = this.pageNum + 1
      this.getcrops()
    },
    // 作物管理部分
    // 获取作物列表
    async getcrops () {
      const res = await this.$http.post(
        'fertilizer/api/crop/queryByProjectId',
        this.request
      )
      this.productList = res.data.data
      this.total = res.data.data.length
    },
    async add () {
      this.crops = {
        id: this.crops.id,
        name: this.crops.name,
        projectId: this.request.projectId,
        isDel: this.crops.isDel
      }
      const res = await this.$http.post(
        'fertilizer/api/crop/add',
        this.crops
      )
      if (res.data.code === 200) {
        this.$message.success('添加成功')
      } else {
        this.$message.error('添加失败')
      }
      this.crops.name = ''
      this.flag1 = false
      this.getcrops()
    },
    // 删除数据
    async del (index, row) {
      this.cropsID.id = row.id
      this.$confirm('此操作将永久删除该作物, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.post(
            'fertilizer/api/crop/delete',
            this.cropsID
          )
          // 删除成功
          this.$message.success('删除成功')
          const totalPage = Math.ceil((this.total - 1) / this.pageSize)
          const pageNum = this.pageNum > totalPage ? totalPage : this.pageNum
          this.pageNum = pageNum < 1 ? 1 : pageNum
          this.getcrops()
        })
        .catch(() => {})
    },
    // 编辑数据
    editData (index, row) {
      // 将要编辑的数据传入
      // 编辑层打开，显示
      this.flagEdit = true
      // // 将要编辑的数据赋值给this.edit，绑定this.edit
      this.edit = {
        id: row.id,
        name: row.name,
        projectId: row.projectId,
        isDel: row.isDel
      }
    },
    // 更新数据
    async updata () {
      this.flagEdit = false
      const res = await this.$http.post(
        'fertilizer/api/crop/update',
        this.edit
      )
      if (res.data.code === 200) {
        this.$message.success('修改成功')
        this.getcrops()
      } else {
        this.$message.error('修改失败')
        this.getcrops()
      }
    },
    // 周期管理部分
    // 获取周期列表
    currentchange1 (newPage) {
      this.pageNum1 = newPage
      this.getFerList()
    },
    prevpage1 () {
      this.pageNum1 = this.pageNum1 - 1
      this.getFerList()
    },
    nextpage1 () {
      this.pageNum1 = this.pageNum1 + 1
      this.getFerList()
    },
    async getCycle () {
      const res = await this.$http.post(
        'fertilizer/api/period/queryByProjectId',
        this.request
      )
      this.titles = res.data.data
      this.total1 = res.data.data.length
    },
    // 增加(编辑)数据
    async addCycle () {
      this.cycle = {
        id: this.cycle.id,
        name: this.cycle.name,
        descr: this.cycle.descr,
        projectId: this.request.projectId,
        isDel: this.cycle.isDel
      }
      const res = await this.$http.post(
        'fertilizer/api/period/saveOrUpdate',
        this.cycle
      )
      if (res.data.code === 200) {
        this.$message.success('添加成功')
      } else {
        this.$message.error('添加失败')
      }
      this.flag2 = false
      // 添加完成后清空
      this.cycle.name = ''
      this.cycle.descr = ''
      this.getCycle()
    },
    // 删除数据
    async delCycle (index, row) {
      this.cycleId.id = row.id
      this.$confirm('此操作将永久删除该周期, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.post(
            'fertilizer/api/period/delete',
            this.cycleId
          )
          // 删除成功
          this.$message.success('删除成功')
          const totalPage1 = Math.ceil((this.total1 - 1) / this.pageSize)
          const pageNum1 = this.pageNum1 > totalPage1 ? totalPage1 : this.pageNum1
          this.pageNum1 = pageNum1 < 1 ? 1 : pageNum1
          this.getCycle()
        })
        .catch(() => {})
    },
    // 编辑数据
    editCycle (index, row) {
      // 将要编辑的数据传入
      // 编辑层打开，显示
      this.flagEdit2 = true
      // 将要编辑的数据赋值给this.edit，绑定this.edit
      this.edit1 = {
        id: row.id,
        name: row.name,
        descr: row.descr,
        projectId: row.projectId,
        isDel: row.isDel
      }
    },
    // 更新周期
    async updataCycle () {
      this.flagEdit2 = false
      const res = await this.$http.post(
        'fertilizer/api/period/saveOrUpdate',
        this.edit1
      )
      if (res.data.code === 200) {
        this.$message.success('修改成功')
        this.getCycle()
      } else {
        this.$message.error('修改失败')
        this.getCycle()
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
  .mainBox {
    position: absolute;
    display: flex;
    justify-content: space-evenly;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 1500px;
    height: 800px;
    padding-top: 30px;
    .crop-container {
      .fer-table {
        position: relative;
        width: 670px;
        height: 500px;
        border: 1px solid #5c7b95;
        border-radius: 10px;
        background: #000;
        padding: 60px 0 40px 0;
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
        .add-data {
          position: absolute;
          right: 40px;
          top: 10px;
        }
        .layer-box {
          z-index: 200;
          text-align: center;
          position: absolute;
          width: 600px;
          height: 80%;
          background-color: rgba(85, 92, 98, 0.9);
          border: 1px solid #666;
          border-radius: 15px;
          margin: 0 0 0 32px;

          /deep/ .el-input {
            margin: 20% 10px 0 0;
            width: 150px;
            font-size: 16px;
          }
        }
        .list {
          width: 630px;
          height: 394px;
          // background-color: #232934;
          padding-top: 20px;
          margin: 0 auto;
          border-radius: 8px;
          .pager {
            margin-top: 12px;
            text-align: center;
          }
        }
      }
    }
    .cycle-container {
      .fer-table {
        position: relative;
        width: 670px;
        height: 500px;
        border: 1px solid #5c7b95;
        border-radius: 10px;
        background: #000;
        padding: 60px 0 40px 0;
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
        .add-data {
          position: absolute;
          right: 40px;
          top: 10px;
        }
        .layer {
          z-index: 200;
          text-align: center;
          position: absolute;
          width: 600px;
          height: 80%;
          background-color: rgba(85, 92, 98, 0.9);
          border: 1px solid #666;
          border-radius: 15px;
          margin: 0 0 0 32px;

          /deep/ .el-input {
            margin: 20% 10px 0 0;
            width: 150px;
            font-size: 16px;
          }
          /deep/ .el-textarea__inner {
            width: 300px;
            font-size: 16px;
            margin: 10px auto;
          }
        }
        .list {
          width: 630px;
          height: 394px;
          // background-color: #242c3b;
          padding-top: 20px;
          margin: 0 auto;
          border-radius: 8px;
          .pager {
            margin-top: 12px;
            text-align: center;
          }
        }
      }
    }
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
      border: none;
    }
    thead {
      color: #eee;
      background-color: rgba(91, 112, 129, 0.9);
    }
  }
}
</style>
