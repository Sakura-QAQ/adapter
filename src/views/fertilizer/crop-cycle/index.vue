<template>
  <div class="container">
    <!-- 作物管理 -->
    <div class="crop-container">
      <div class="fer-table">
        <div class="bg-title">
          <p>作物管理</p>
        </div>
        <div class="add-data">
          <!-- 添加作物:<input type="text" v-model="crops.name" /> -->
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
            :data="productList.slice((reqParams.currentPage-1)*reqParams.PageSize,reqParams.currentPage*reqParams.PageSize)"
            style="width: 500px"
          >
            <el-table-column label="序号" type="index" width="125" align="center"></el-table-column>
            <el-table-column prop="name" label="名称" width="125" align="center"></el-table-column>
            <el-table-column label="操作" width="250" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="editData(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pager">
            <el-pagination
              layout="prev, pager, next"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="reqParams.currentPage"
              :page-sizes="reqParams.pageSizes"
              :page-size="reqParams.PageSize"
              :total="reqParams.totalCount"
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
            :data="titles.slice((reqParams1.currentPage-1)*reqParams1.PageSize,reqParams1.currentPage*reqParams1.PageSize)"
            style="width: 600px"
            >
            <el-table-column label="序号" type="index" width="125" align="center"></el-table-column>
            <el-table-column prop="name" label="名称" width="125" align="center"></el-table-column>
            <el-table-column prop="descr" label="描述" width="200" align="center"></el-table-column>
            <el-table-column label="操作" width="150" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="editCycle(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="delCycle(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pager">
            <el-pagination
              layout="prev, pager, next"
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page="reqParams1.currentPage"
              :page-sizes="reqParams1.pageSizes"
              :page-size="reqParams1.PageSize"
              :total="reqParams1.totalCount"
            ></el-pagination>
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
      reqParams: {
        // 默认显示第几页
        currentPage: 1,
        // 总条数，根据接口获取数据长度(注意：这里不能为空)
        totalCount: 1,
        // 个数选择器（可修改）
        pageSizes: [1, 2],
        // 默认每页显示的条数（可修改）
        PageSize: 5
      },
      reqParams1: {
        currentPage: 1,
        totalCount: 1,
        pageSizes: [1, 2],
        PageSize: 5
      },
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
    handleSizeChange (val) {
      // 改变每页显示的条数
      this.reqParams.PageSize = val
      this.reqParams.currentPage = 1
    },
    handleCurrentChange (newPage) {
      // 提交当前页码给后台才能获取对应的数据
      this.reqParams.currentPage = newPage
      // if (this.reqParams.totalCount === (this.reqParams.currentPage - 1) * this.pageSize && this.reqParams.PageSize !== 0) {
      //   this.reqParams.currentPage -= 1
      //   // this.getcrops()// 获取列表数据
      //   // console.log(1)
      //   console.log(this.reqParams.currentPage)
      // }
    },
    // 作物管理部分
    // 获取作物列表
    async getcrops () {
      const res = await this.$http.post(
        'http://192.168.1.202:10020/fertilizer/api/crop/queryByProjectId',
        this.request
      )
      this.reqParams.totalCount = res.data.data.length
      this.productList = res.data.data
    },
    async add () {
      this.crops = {
        id: this.crops.id,
        name: this.crops.name,
        projectId: this.request.projectId,
        isDel: this.crops.isDel
      }
      const res = await this.$http.post(
        'http://192.168.1.202:10020/fertilizer/api/crop/add',
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
            'http://192.168.1.202:10020/fertilizer/api/crop/delete',
            this.cropsID
          )
          // 删除成功
          this.$message.success('删除成功')
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
        'http://192.168.1.202:10020/fertilizer/api/crop/update',
        this.edit
      )
      // console.log(res)
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
    handleSizeChange1 (val) {
      // 改变每页显示的条数
      this.reqParams1.PageSize = val
      this.reqParams1.currentPage = 1
    },
    handleCurrentChange1 (newPage) {
      // 提交当前页码给后台才能获取对应的数据
      this.reqParams1.currentPage = newPage
    },
    async getCycle () {
      const res = await this.$http.post(
        'http://192.168.1.202:10020/fertilizer/api/period/queryByProjectId',
        this.request
      )
      this.reqParams1.totalCount = res.data.data.length
      this.titles = res.data.data
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
        'http://192.168.1.202:10020/fertilizer/api/period/saveOrUpdate',
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
            'http://192.168.1.202:10020/fertilizer/api/period/delete',
            this.cycleId
          )
          // 删除成功
          this.$message.success('删除成功')
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
        'http://192.168.1.202:10020/fertilizer/api/period/saveOrUpdate',
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
  display: flex;
  justify-content: space-evenly;
  .crop-container {
    .fer-table {
      position: relative;
      width: 670px;
      height: 500px;
      border: 1px solid #5c7b95;
      border-radius: 20px;
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
        // text-align: center;
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
        text-align: center;
        /deep/ .el-table::before {
          height: 0;
        }
        /deep/ .el-table {
          margin: 0 auto;
          // margin: 10px 0;
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
              background-color: rgba(91, 112, 129, 0.9);
              border: 1px solid transparent;
              color: #eee;
            }
          }
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
  }
  .cycle-container {
    .fer-table {
      position: relative;
      width: 670px;
      height: 500px;
      border: 1px solid #5c7b95;
      border-radius: 20px;
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
        text-align: center;
        /deep/ .el-table::before {
          height: 0;
        }
        /deep/ .el-table {
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
            background-color: rgba(85, 92, 98, 0.9);
          }
          td {
            // border-bottom: 1px solid #666;
            border: none;
            // background-color: transparent;
          }
          .cell {
            .el-button {
              background-color: rgba(91, 112, 129, 0.9);
              border: 1px solid transparent;
              color: #eee;
            }
          }
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
  }
}
</style>
