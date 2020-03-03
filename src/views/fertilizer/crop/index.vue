<template>

<div>
  <div class="top-position">
    <span>
      选择施肥机:
      <select name id>
        <option value>1#施肥机</option>
        <option value>2#施肥机</option>
      </select>
    </span>
    <input class="submit" type="submit" value="确定" />
  </div>
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
      <div class="layer" v-if="flag">
        <div class="mask">
          <div class="content">
            编辑作物:<input type="text" v-model="edit.name" />
            <button @click="updata">更新</button>
            <button @click="flag=false">取消</button>
          </div>
        </div>
      </div>
      <div class="list">
        <table border="1" cellspacing="0" cellpadding="10" align="center">
          <thead  align="center">
            <tr>
              <td width="70">序号</td>
              <td width="70">作物</td>
              <td width="70">状态id</td>
              <td width="120">操作</td>
            </tr>
          </thead>
          <tbody  align="center">
            <tr v-for="(item,index) in productList" :key="index">
              <td>{{index + 1}}</td>
              <td>{{item.name}}</td>
              <td>{{item.isDel}}</td>
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
// import MoPaging from "./";
export default {
  data () {
    return {
      find: 'find',
      flag: false,
      // add请求作物数据
      crops: {
        id: '',
        name: '',
        projectId: 'channel',
        isDel: 0
      },
      // 作物id
      cropsID: {
        id: ''
      },
      // 编辑的数据
      edit: {},
      // 请求列表的参数
      projectId: { projectId: 'channel' },
      // 分页配置
      productList: [] // 列表数据
    }
  },
  created () {
    this.getcrops()
  },
  methods: {
    // 获取作物列表
    async getcrops () {
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/crop/queryByProjectId', this.projectId)
      // console.log(res)
      this.productList = res.data.data
    },
    async add () {
      await this.$http.post('http://192.168.1.202:10020/fertilizer/api/crop/add', this.crops)
      // // 动态id生成
      // var _id =
      // Math.max.apply(
      //   null,
      //   this.crops.map(v => {
      //     return v.id
      //   })
      // ) + 1

      // // 判断增加数据是否全部为空
      // if (!this.crops.name) return
      // // 将添加的数据，增加到数组中
      // this.crops.push({
      //   id: _id,
      //   name: this.crops.name
      // })
      // 添加完成后，将输入框清空
      this.crops = {
        id: '',
        name: '',
        projectId: 'channel',
        isDel: 0
      }
      this.getcrops()
    },
    // 删除数据
    async del (index) {
      // if (confirm('确定删除？')) {
      //   // 点击删除后，将删除数据的下标传入，进行删除
      //   if (this.productList.length === 1) {
      //     alert('至少保留一条数据')
      //     return false
      //   } else {
      //     this.productList.splice(index, 1)
      //   }
      // }
      // const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/crop/delete', this.productList[index].id)
      // console.log(res)
      // this.getcrops()
      this.cropsID.id = this.productList[index].id
      await this.$http.post('http://192.168.1.202:10020/fertilizer/api/crop/delete', this.cropsID)
      this.getcrops()
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
        projectId: item.projectId,
        isDel: item.isDel
      }
    },
    // 更新数据
    async updata () {
      this.flag = false
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/crop/update', this.edit)
      console.log(res)
      this.getcrops()
    }
  }
}
</script>

<style lang="less" scoped>
.crop-container {
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
