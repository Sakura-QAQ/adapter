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
        添加作物:<input type="text" v-model="obj.user" />
        <!-- 时长:<input type="text" v-model="obj.time" />
        数量:<input type="text" v-model="obj.type" /> -->
        <span>
          <button @click="add()">增加</button>
        </span>
      </div>
      <div class="layer" v-show="flag">
        <div class="mask">
          <div class="content">
            编辑作物:<input type="text" v-model="edit.user" />
            <!-- 时长:<input type="text" v-model="edit.time" />
            流量<input type="text" v-model="edit.type" /> -->
            <button @click="updata()">更新</button>
            <button @click="flag=false">取消</button>
          </div>
        </div>
      </div>
      <div class="pn-ltable">
        <table border="1" cellspacing="0" cellpadding="10" align="center">
          <thead  align="center">
            <tr>
              <td width="70">序号</td>
              <td width="70">作物</td>
              <!-- <td width="70">时长(秒)</td>
              <td width="70">数量</td> -->
              <td width="120">操作</td>
            </tr>
          </thead>
          <tbody  align="center">
            <tr v-for="(item,index) in titles" :key="index">
              <td>{{item.id}}</td>
              <td>{{item.user}}</td>
              <!-- <td>{{item.time}}</td>
              <td>{{item.type}}</td> -->
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
      obj: {
        user: '',
        // time: '',
        // type: '',
        id: ''
      },
      titles: [
        {
          user: '西红柿',
          // time: '12',
          // type: '0',
          id: '1'
        },
        {
          user: '番茄',
          // time: '20',
          // type: '0',
          id: '2'
        },
        {
          user: '土豆',
          // time: '19',
          // type: '1',
          id: '3'
        },
        {
          user: '马铃薯',
          // time: '19',
          // type: '1',
          id: '4'
        }
      ],
      edit: {}
    }
  },
  methods: {
    add () {
      // 增加数据
      // 动态id
      var _id =
        Math.max.apply(
          null,
          this.titles.map(v => {
            return v.id
          })
        ) + 1

      // 判断增加数据是否全部为空
      if (!this.obj.user) return
      // 将添加的数据，增加到数组中
      this.titles.push({
        user: this.obj.user,
        // time: this.obj.time,
        // type: this.obj.type,
        id: _id
      })
      // 添加完成后，将输入框清空
      this.obj = {
        user: '',
        // time: '',
        // type: '',
        id: ''
      }
    },
    // 删除数据
    del (index) {
      if (confirm('确定删除？')) {
        // 点击删除后，将删除数据的下标传入，进行删除
        if (this.titles.length === 1) {
          alert('至少保留一条数据')
          return false
        } else {
          this.titles.splice(index, 1)
        }
      }
    },
    // 编辑数据
    editData (item) {
      // 将要编辑的数据传入
      // 编辑层打开，显示
      this.flag = true
      // 将要编辑的数据赋值给this.edit，绑定this.edit
      this.edit = {
        user: item.user,
        // time: item.time,
        // type: item.type,
        id: item.id
      }
    },
    // 更新数据
    updata () {
      // 点击更新按钮后触发，将用对象中的ID值来判断，选中更改的对象，并将更改后的对象重新给到this.titles
      for (var i = 0; i < this.titles.length; i++) {
        if (this.titles[i].id === this.edit.id) {
          this.titles[i] = this.edit
          this.flag = false
        }
      }
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
    padding: 60px 0px;
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
