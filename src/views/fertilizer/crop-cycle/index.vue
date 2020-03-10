<template>
  <div class="container">
    <!-- 作物管理 -->
    <div class="crop-container">
      <div class="fer-table">
        <div class="bg-title">
          <p>作物管理</p>
        </div>
        <div class="add-data">
          添加作物:<input type="text" v-model="crops.name" />
          <span>
            <button @click="add()">增加</button>
          </span>
        </div>
        <div class="layer" v-if="flag1">
          <div class="mask">
            <div class="content">
              编辑作物:<input type="text" v-model="edit.name" />
              <button @click="updata">更新</button>
              <button @click="flag1=false">取消</button>
            </div>
          </div>
        </div>
        <div class="list">
          <table border="1" cellspacing="0" cellpadding="10" align="center">
            <thead  align="center">
              <tr>
                <td width="70">序号</td>
                <td width="70">作物</td>
                <td width="120">操作</td>
              </tr>
            </thead>
            <tbody  align="center">
              <tr v-for="(item,index) in productList" :key="index">
                <td>{{index + 1}}</td>
                <td>{{item.name}}</td>
                <td>
                  <span class="edit" @click="editData(item)" style="cursor: pointer;">编辑</span>
                  &nbsp;
                  <span class="delete" @click="del(index)" style="cursor: pointer;">删除</span>
                </td>
              </tr>
            </tbody>
          </table>
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
          添加周期:<input type="text" v-model="cycle.name" />
          <span>
            <button @click="addCycle()">增加</button>
          </span>
        </div>
        <div class="layer" v-if="flag2">
          <div class="mask">
            <div class="content">
              周期:<input type="text" v-model="edit.name" />
              <button @click="upCycle">更新</button>
              <button @click="flag2=false">取消</button>
            </div>
          </div>
        </div>
        <div class="pn-ltable">
          <table border="1" cellspacing="0" cellpadding="10" align="center">
            <thead  align="center">
              <tr>
                <td width="70">序号</td>
                <td width="70">周期</td>
                <td width="70">描述</td>
                <td width="120">操作</td>
              </tr>
            </thead>
            <tbody  align="center">
              <tr v-for="(item,index) in titles" :key="index">
                <td>{{index + 1}}</td>
                <td>{{item.name}}</td>
                <td>{{item.descr}}</td>
                <td>
                  <span class="edit" @click="editCycle(item)" style="cursor: pointer;">编辑</span>
                  &nbsp;
                  <span class="delete" @click="delCycle(index)" style="cursor: pointer;">删除</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      find: 'find',
      flag1: false,
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
      flag2: false,
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
    // 作物管理部分
    // 获取作物列表
    async getcrops () {
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/crop/queryByProjectId', this.request)
      this.productList = res.data.data
    },
    async add () {
      this.crops = {
        id: this.crops.id,
        name: this.crops.name,
        projectId: this.request.projectId,
        isDel: this.crops.isDel
      }
      await this.$http.post('http://192.168.1.202:10020/fertilizer/api/crop/add', this.crops)
      this.getcrops()
    },
    // 删除数据
    async del (index) {
      this.cropsID.id = this.productList[index].id
      await this.$http.post('http://192.168.1.202:10020/fertilizer/api/crop/delete', this.cropsID)
      this.getcrops()
    },
    // 编辑数据
    editData (item) {
      // 将要编辑的数据传入
      // 编辑层打开，显示
      this.flag1 = true
      // 将要编辑的数据赋值给this.edit，绑定this.edit
      this.edit = {
        id: item.id,
        name: item.name,
        projectId: item.projectId,
        isDel: item.isDel
      }
    },
    // 更新数据
    async updata () {
      this.flag1 = false
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/crop/update', this.edit)
      console.log(res)
      this.getcrops()
    },

    // 周期管理部分
    // 获取周期列表
    async getCycle () {
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/period/queryByProjectId', this.request)
      this.titles = res.data.data
    },
    // 增加数据
    async addCycle () {
      this.cycle = {
        id: this.cycle.id,
        name: this.cycle.name,
        descr: this.cycle.descr,
        projectId: this.request.projectId,
        isDel: this.cycle.isDel
      }
      await this.$http.post('http://192.168.1.202:10020/fertilizer/api/period/saveOrUpdate', this.cycle)
      // 添加完成后清空
      this.getCycle()
    },
    // 删除数据
    async delCycle (index) {
      this.cycleId.id = this.titles[index].id
      await this.$http.post('http://192.168.1.202:10020/fertilizer/api/period/delete', this.cycleId)
      this.getCycle()
    },
    // 编辑数据
    editCycle (item) {
      // 将要编辑的数据传入
      // 编辑层打开，显示
      this.flag2 = true
      // 将要编辑的数据赋值给this.edit，绑定this.edit
      this.edit = {
        id: item.id,
        name: item.name,
        descr: item.descr,
        projectId: item.projectId,
        isDel: item.isDel
      }
    },
    // 更新数据
    async upCycle () {
      this.flag2 = false
      await this.$http.post('http://192.168.1.202:10020/fertilizer/api/period/saveOrUpdate', this.edit)
      this.getCycle()
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
      border: 1px solid #5c7b95;
      border-radius: 20px;
      background: #000;
      padding: 40px 20px;
      margin-top: 30px;

      .bg-title {
        position: absolute;
        top: -25px;
        left: 21%;
        width: 380px;
        height: 50px;
        background:url(../../../assets/images/bg0.png) no-repeat;
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
        text-align: center;
      }
      .layer {
        text-align: center;
      }
    }
  }
  .cycle-container {
    .fer-table {
      position: relative;
      width: 670px;
      border: 1px solid #5c7b95;
      border-radius: 20px;
      background: #000;
      padding: 40px 20px;
      margin-top: 30px;

      .bg-title {
        position: absolute;
        top: -25px;
        left: 21%;
        width: 380px;
        height: 50px;
        background:url(../../../assets/images/bg0.png) no-repeat;
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
        text-align: center;
      }
      .layer {
        text-align: center;
      }
    }
  }
}
</style>
