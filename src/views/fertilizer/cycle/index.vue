<template>
<div class="cycle">
  <div class="cycle-container">
    <div class="fer-table">
      <div class="bg-title">
        <p>周期管理</p>
      </div>
      <div class="add-data">
        添加周期:<input type="text" v-model="cycle.name" />
        <!-- 时长:<input type="text" v-model="obj.time" />
        数量:<input type="text" v-model="obj.type" /> -->
        <span>
          <button @click="add()">增加</button>
        </span>
      </div>
      <div class="layer" v-if="flag">
        <div class="mask">
          <div class="content">
            周期:<input type="text" v-model="edit.name" />
            <button @click="updata">更新</button>
            <button @click="flag=false">取消</button>
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
              <!-- <td width="70">projectID</td> -->
              <!-- <td width="70">状态</td> -->
              <td width="120">操作</td>
            </tr>
          </thead>
          <tbody  align="center">
            <tr v-for="(item,index) in titles" :key="index">
              <td>{{index + 1}}</td>
              <td>{{item.name}}</td>
              <td>{{item.descr}}</td>
              <!-- <td>{{item.projectId}}</td> -->
              <!-- <td>{{item.isDel}}</td> -->
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
</div>
</template>

<script>
export default {
  data () {
    return {
      find: 'find',
      flag: false,
      // 周期添加数据
      cycle: {
        id: '',
        name: '',
        descr: '',
        projectId: '阿斯1111蒂芬',
        isDel: 0
      },
      // 周期id
      cycleId: {
        id: ''
      },
      projectId: {
        projectId: '阿斯1111蒂芬'
      },
      titles: [
      ],
      edit: {}
    }
  },
  created () {
    this.getCycle()
  },
  methods: {
    // 获取周期
    async getCycle () {
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/period/queryByProjectId', this.projectId)
      // console.log(res)
      this.titles = res.data.data
    },
    // 增加数据
    async add () {
      await this.$http.post('http://192.168.1.202:10020/fertilizer/api/period/saveOrUpdate', this.cycle)
      // 添加完成后清空
      this.cycle = {
        id: '',
        name: '',
        descr: '',
        projectId: '阿斯1111蒂芬',
        isDel: 0
      }
      this.getCycle()
      // 增加数据
      // 动态id
      // var _id =
      //   Math.max.apply(
      //     null,
      //     this.titles.map(v => {
      //       return v.id
      //     })
      //   ) + 1

      // // 判断增加数据是否全部为空
      // if (!this.obj.time) return
      // // 将添加的数据，增加到数组中
      // this.titles.push({
      //   // user: this.obj.user,
      //   time: this.obj.time,
      //   // type: this.obj.type,
      //   id: _id
      // })
      // // 添加完成后，将输入框清空
      // this.obj = {
      //   // user: '',
      //   time: '',
      //   // type: '',
      //   id: ''
      // }
    },
    // 删除数据
    async del (index) {
      this.cycleId.id = this.titles[index].id
      await this.$http.post('http://192.168.1.202:10020/fertilizer/api/period/delete', this.cycleId)
      this.getCycle()
    },
    // 编辑数据
    editData (item) {
      // 将要编辑的数据传入
      // 编辑层打开，显示
      this.flag = true
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
    async updata () {
      this.flag = false
      await this.$http.post('http://192.168.1.202:10020/fertilizer/api/period/saveOrUpdate', this.edit)
      this.getCycle()
    }
  }
}
</script>

<style lang="less" scoped>
.cycle-container {
  display: flex;
  justify-content: center;
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
</style>
