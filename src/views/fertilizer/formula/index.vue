<template>
<div class="container">
  <div class="fer-container">
    <div class="fer-plan">
      <div class="bg-title">
        <p>配方列表</p>
      </div>
      <div class="chosefer">
        <el-select v-model="reqParams.fertilizerId" placeholder="选择施肥机" @change="listChange">
          <el-option v-for="item in fertilizer" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="add-data"><input class="submit" type="button" value="添加" @click="clear"></div>
      <div class="list">
        <el-table
          :data="titles.slice((pageNum - 1)*pageSize, pageNum*pageSize)"
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
        <div class="pager" v-show="total > 7">
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
    <div class="fer-table">
      <div class="bg-title">
        <p>配方详情</p>
      </div>
      <div class="btn">
        <input class="submit" type="button" value="提交" @click="updata" />
      </div>
      <ul>
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
          <span>
            选择施肥机:
            <select v-model="reqParams2.fertilizerId" @change="wayChange">
              <option v-for="item in fertilizer" :value="item.id" :label="item.name" :key="item.id">{{item.name}}</option>
            </select>
          </span>
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
          <span>吸肥通道:</span>
          <div>
            <span class="list-group-item">
              <i>{{channels[0]}}: </i>
              <input type="text" v-model="edit.channel1" />
            </span>
            <span class="list-group-item">
              <i>{{channels[1]}}: </i>
              <input type="text" v-model="edit.channel2" />
            </span>
            <span class="list-group-item">
              <i>{{channels[2]}}: </i>
              <input type="text" v-model="edit.channel3" />
            </span>
            <span class="list-group-item">
              <i>{{channels[3]}}: </i>
              <input type="text" v-model="edit.channel4" />
            </span>
            <span class="list-group-item">
              <i>{{channels[4]}}: </i>
              <input type="text" v-model="edit.channel5" />
            </span>
            <span class="list-group-item">
              <i>{{channels[5]}}: </i>
              <input type="text" v-model="edit.channel6" />
            </span>
            <span class="list-group-item">
              <i>{{channels[6]}}: </i>
              <input type="text" v-model="edit.channel7" />
            </span>
            <span class="list-group-item">
              <i>{{channels[7]}}: </i>
              <input type="text" v-model="edit.channel8" />
            </span>
            <span class="list-group-item">
              <i>{{channels[8]}}: </i>
              <input type="text" v-model="edit.channel9" />
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
      pageNum: 1,
      pageSize: 7,
      total: 0,
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
      channels: '',
      // 作物列表
      crop: [],
      // 周期
      cycle: [],
      // 编辑
      edit: {},
      // 施肥机id
      reqParams: {
        fertilizerId: ''
      },
      reqParams2: {
        fertilizerId: ''
      },
      // 施肥机列表
      fertilizer: []
    }
  },
  created () {
    const projectId = JSON.parse(window.sessionStorage.getItem('projectId'))
    this.request.projectId = projectId
  },
  mounted () {
    this.getfertilizer().then(res => {
      this.queryByFertilizerId()
      this.getway()
    })
    this.getcrop()
    this.getcycle()
  },
  methods: {
    // 分页
    currentchange (newPage) {
      this.pageNum = newPage
      this.queryByFertilizerId()
    },
    prevpage () {
      this.pageNum = this.pageNum - 1
      this.queryByFertilizerId()
    },
    nextpage () {
      this.pageNum = this.pageNum + 1
      this.queryByFertilizerId()
    },
    // 列表改变
    listChange () {
      this.queryByFertilizerId()
    },
    // 通道改变
    wayChange () {
      this.getway()
    },
    // 施肥机id查配方列表
    async queryByFertilizerId () {
      const ID = {
        fertilizerId: this.reqParams.fertilizerId
      }
      const { data: { data } } = await this.$http.post('fertilizer/api/formula/queryByFertilizerId', ID)
      this.titles = data
      this.total = data.length
    },
    // 施肥机下拉框
    async getfertilizer () {
      const res = await this.$http.post('fertilizer/api/fertilizer/queryByProjectId', this.request)
      this.fertilizer = res.data.data
      this.reqParams.fertilizerId = this.fertilizer[0].id
      this.reqParams2.fertilizerId = this.fertilizer[0].id
    },
    // 获取作物
    async getcrop () {
      const crop = await this.$http.post('fertilizer/api/crop/queryByProjectId', this.request)
      this.crop = crop.data.data
    },
    // 渲染配方列表
    async getfomula () {
      const res = await this.$http.post('fertilizer/api/formula/queryByProjectId', this.request)
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
      this.total = res.data.data.length
    },
    // 获取通道数据
    async getway () {
      const ID = {
        id: this.reqParams2.fertilizerId
      }
      const { data: { data } } = await this.$http.post('fertilizer/api/fertilizer/queryById', ID)
      if (data.channels === null || data.channels === '') {
        data.channels = ',,,,,,,,'
        this.channels = data.channels.split(',')
        this.$message.warning('此施肥机无通道名称，通道管理可编辑')
      } else {
        this.channels = data.channels.split(',')
      }
    },
    // 获取到作物id赋值给列表
    // 获取周期
    async getcycle () {
      const cycle = await this.$http.post('fertilizer/api/period/queryByProjectId', this.request)
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
          const { data } = await this.$http.post('fertilizer/api/formula/delete', this.fomulaId)
          // 删除成功
          if (data.code === 200) {
            this.$message.success('删除成功')
            const totalPage = Math.ceil((this.total - 1) / this.pageSize)
            const pageNum = this.pageNum > totalPage ? totalPage : this.pageNum
            this.pageNum = pageNum < 1 ? 1 : pageNum
            this.queryByFertilizerId()
          }
        })
        .catch(() => {})
    },
    // 编辑
    editData (index, row) {
      // console.log(row)
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
      this.reqParams2.fertilizerId = row.fertilizerId
    },
    // 更新和提交
    async updata () {
      this.edit = {
        id: this.edit.id,
        projectId: this.request.projectId,
        fertilizerId: this.reqParams2.fertilizerId,
        descr: this.edit.descr,
        cropId: this.edit.cropId,
        periodId: this.edit.periodId,
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
      const res = await this.$http.post('fertilizer/api/formula/saveOrUpdate', this.edit)
      if (res.data.code === 200) {
        this.$message.success('处理成功')
        this.queryByFertilizerId()
      } else {
        this.$message.error(res.data.msg)
        return false
      }
      this.edit = {}
    },
    // 清空
    clear () {
      this.edit = {
        id: null,
        projectId: null,
        cropId: null,
        periodId: null,
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
@deep: ~'>>>';
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
    border-radius: 15px;
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
      .chosefer {
        position: absolute;
        top: 30px;
        left: 42px;
        @{deep} .el-select {
          .el-input__inner {
            width: 162px;
            height: 38px;
            border: none;
            border-radius: none;
            background-color: rgba(77, 83, 95, 0.712);
            border-radius: 0;
            color: #fff;
          }
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
        @{deep} .el-table::before {
          height: 0;
        }
        @{deep} .el-table {
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
      padding-top: 90px;
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
      .btn {
        position: absolute;
        top: 30px;
        right: 42px;
      }
      ul {
        padding: 0 15px;
        // .check-time {
        //   span {
        //     display: inline-block;
        //     height: 30px;
        //   }
        // }
        li {
          overflow: none;
          vertical-align: none;
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
          @{deep} .el-textarea {
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
            text-align: center;
            margin-top: 20px;
            span {
              display: inline-block;
              width: 170px;
            }

            .list-group-item {
              // width: 170px;
              margin: 10px 15px;
              i {
                display: inline-block;
              vertical-align: middle;

                width: 90px;
                font-size: 16px;
                text-align: right;
                padding-right: 5px;
                    overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
      }
    }
  }
}
</style>
