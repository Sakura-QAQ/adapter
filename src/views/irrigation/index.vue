<template>
  <!-- 启动时间 灌溉时长 灌溉流量 选择配方 -->
  <!-- 有运行停止的切换按钮 -->
  <div class="irr-container">
    <div class="irr-form">
      <div class="bg-title">
        <p>策略列表</p>
      </div>
      <div class="pn-ltable">
        <table border="1" cellspacing="0" cellpadding="10" align="center">
          <thead align="center">
            <tr>
              <td width="70">序号</td>
              <td width="70">灌溉名称</td>
              <td width="70">启动时间</td>
              <td width="70">灌溉时长(秒)</td>
              <td width="70">灌溉流量(m³)</td>
              <td width="70">配方</td>
              <td width="70">下次启动时间</td>
              <td width="70">状态</td>
              <td width="120">操作</td>
            </tr>
          </thead>
          <tbody align="center">
            <tr v-for="(item,index) in titles" :key="index">
              <td>{{item.id}}</td>
              <td>{{item.name}}</td>
              <td>{{item.start}}</td>
              <td>{{item.time}}</td>
              <td>{{item.flow}}</td>
              <td>{{item.formula}}</td>
              <td>{{item.next}}</td>
              <td>{{item.type}}</td>
              <td>
                <span class="edit" @click="editData(item)">编辑</span>
                <span class="delete" @click="del(index)">删除</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="show-form">
      <div class="bg-title">
        <p>灌溉管理</p>
      </div>
      <div class="layer">
        <div class="bg-tag">
          <p>详情</p>
        </div>
        <ul class="mask">
          <li>
            名称:
            <input type="text" v-model="edit.name" />
          </li>
          <li class="content">
            启动时间:
            <input type="text" v-model="edit.start" />
            <el-radio-group v-model="radio">
              <el-radio label="1">仅一次</el-radio>
              <el-radio label="2">
                每隔
                <input type="text" :value="message" :disabled="diasabledInput" />天
                <input type="text" :value="message" :disabled="diasabledInput" />小时
              </el-radio>
            </el-radio-group>
          </li>
          <li>
            <el-radio v-model="radio1" label="1">
              灌溉时长:
              <input type="text" v-model="edit.time" :disabled="diasabledInput1" />
            </el-radio>
            <el-radio v-model="radio1" label="2">
              灌溉流量:
              <input type="text" v-model="edit.flow" :disabled="diasabledInput2" />
            </el-radio>
          </li>
          <li>
            配方:
            <input type="text" v-model="edit.formula" />
          </li>
          <li>
            <button @click="updata()">更新</button>
            <button @click="clean()">清空</button>
            <!-- @click="flag=false" -->
          </li>
        </ul>
      </div>
      <div class="control-valve">
        <div class="bg-tag">
          <p>阀号</p>
        </div>
        <ul class="valve">
          <li v-for="item in 64" :key="item">
            <span>{{item}}#阀</span>
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
      find: 'find',
      flag: false,
      diasabledInput: true,
      diasabledInput1: false,
      diasabledInput2: true,
      message: '',
      message1: '',
      message2: '',
      titles: [
        {
          name: 'null',
          start: 'start',
          time: 'time',
          flow: 'flow',
          formula: 'formula',
          next: 'next',
          type: '0',
          id: '1'
        },
        {
          name: '1',
          start: '2',
          time: 'tim33e',
          flow: '4',
          formula: '5',
          next: '6',
          type: '0',
          id: '2'
        }
      ],
      radio: '1',
      radio1: '1',
      edit: {}
    }
  },
  // created () {
  //   if (this.radio === '1') {
  //     this.diasabledInput = true
  //   } else {
  //     this.diasabledInput = false
  //   }
  // },
  methods: {
    // 删除数据
    del (index) {
      // 点击删除后，将删除数据的下标传入，进行删除
      if (this.titles.length === 1) {
        alert('至少保留一条数据')
        return false
      } else {
        this.titles.splice(index, 1)
      }
    },
    // 编辑数据
    editData (item) {
      // 将要编辑的数据传入
      // 编辑层打开，显示
      // this.flag = true
      // 将要编辑的数据赋值给this.edit，绑定this.edit
      this.edit = {
        name: item.name,
        time: item.time,
        flow: item.flow,
        start: item.start,
        formula: item.formula,
        type: item.type,
        next: item.next,
        id: item.id
      }
    },
    // 更新数据
    updata () {
      // 点击更新按钮后触发，将用对象中的ID值来判断，选中更改的对象，并将更改后的对象重新给到this.titles
      for (var i = 0; i < this.titles.length; i++) {
        if (this.titles[i].id === this.edit.id) {
          this.titles[i] = this.edit
          // this.flag = false
          // console.log(this.edit)
          this.$set(this.titles, i, this.edit)
        }
      }
    },
    // 清空
    clean () {
      this.edit = {}
    }
    // change () {
    //   if (this.radio === '1') {
    //     this.diasabledInput = true
    //   } else {
    //     this.diasabledInput = false
    //   }
    //   console.log(this.diasabledInput)
    // }
  },
  watch: {
    radio () {
      if (this.radio === '1') {
        this.diasabledInput = true
        this.message = ''
      } else {
        this.diasabledInput = false
      }
    },
    radio1 () {
      if (this.radio1 === '1') {
        this.diasabledInput1 = false
        this.diasabledInput2 = true
        this.edit.flow = ''
      } else {
        this.diasabledInput1 = true
        this.diasabledInput2 = false
        this.edit.time = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.irr-container {
  display: flex;
  justify-content: space-evenly;
  .irr-form {
    position: relative;
    height: 700px;
    padding-top: 40px;
    border: 1px solid #6989a5;
    background-color: #000;
    // overflow: auto;

    .bg-title {
      position: absolute;
      top: -10px;
      left: -1px;
      width: 150px;
      height: 40px;
      background: url(../../assets/images/bg4.png) no-repeat;
      background-size: 150px 40px;

      p {
        height: 40px;
        line-height: 36px;
        text-align: center;
        color: #fff;
        font-size: 24px;
        font-weight: 800;
      }
    }

    .pn-ltable {
      width: 730px;
      height: 603px;
      overflow: auto;
      margin: 0 auto;
      padding: 0 20px;
    }
  }

  .show-form {
    position: relative;
    width: 670px;
    height: 100%;
    padding-top: 40px;
    border: 1px solid #6989a5;
    background-color: #000;

    .bg-title {
      position: absolute;
      top: -10px;
      left: -1px;
      width: 150px;
      height: 40px;
      background: url(../../assets/images/bg4.png) no-repeat;
      background-size: 150px 40px;

      p {
        height: 40px;
        line-height: 36px;
        text-align: center;
        color: #fff;
        font-size: 24px;
        font-weight: 800;
      }
    }

    .layer {
      text-align: center;
      .mask {
        padding: 0 20px;
        text-align: left;

        li {
          margin-bottom: 10px;

          /deep/ .el-radio__label {
            font-size: 16px;
            color: #97b1c9;
          }
        }
      }
    }
    .control-valve {
      .valve {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        margin-top: 10px;
        li {
          width: 75px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          border: 1px solid #6989a5;
          border-radius: 7px;
          margin: 5px 0;
          cursor: pointer;
        }
      }
    }
  }

  .bg-tag {
    width: 100%;
    height: 30px;
    text-align: center;
    background: url(../../assets/images/bg_title.png) no-repeat center;

    p {
      color: #fff;
      font-weight: 800;
      font-size: 20px;
      text-align: center;
    }
  }
}
</style>
