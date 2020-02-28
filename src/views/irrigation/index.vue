<template>
  <!-- 启动时间 灌溉时长 灌溉流量 选择配方 -->
  <!-- 有运行停止的切换按钮 -->
  <div class="irr-container">
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
    <div class="irrigation">
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
              <tr v-for="(item, index) in titles" :key="index">
                <td>{{item.id}}</td>
                <td>{{item.name}}</td>
                <td>{{item.start}}</td>
                <td>{{item.time}}</td>
                <td>{{item.flow}}</td>
                <td>{{item.formula}}</td>
                <td>{{item.next}}</td>
                <td>{{item.type}}</td>
                <td>
                  <span class="edit" @click="editData(item)" style="cursor: pointer;">编辑</span>
                  &nbsp;
                  <span
                    class="delete"
                    @click="del(index)"
                    style="cursor: pointer;"
                  >删除</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="show-form">
        <div class="bg-title">
          <p>详情</p>
        </div>
        <div class="layer">
          <!-- <table border="0" cellspacing="0" cellpadding="5" style="width:100%;margin-top:20px;">
            <tbody align="left">
              <tr>
                <td width="150">名称</td>
                <td><input type="text" v-model="edit.name" /></td>
              </tr>
              <tr>
                <td>启动时间</td>
                <td>
                  <el-time-select
                    v-model="value"
                    :picker-options="{
                      start: '07:30',
                      step: '00:10',
                      end: '18:30'
                    }"
                    placeholder="选择时间">
                  </el-time-select>
                  <el-radio-group v-model="radio">
                    <el-radio label="1">仅一次</el-radio>
                    <el-radio label="2">
                      每隔
                      <input type="text" :value="message" :disabled="diasabledInput" />天
                      <input type="text" :value="message" :disabled="diasabledInput" />小时
                      <input type="text" :value="message" :disabled="diasabledInput" />分
                      <br>
                      <el-time-select
                        placeholder="起始时间"
                        v-model="startTime"
                        :picker-options="{
                          start: '08:30',
                          step: '00:15',
                          end: '18:30'
                        }">
                      </el-time-select>
                      <el-time-select
                        placeholder="结束时间"
                        v-model="endTime"
                        :picker-options="{
                          start: '08:30',
                          step: '00:15',
                          end: '18:30',
                          minTime: startTime
                        }">
                      </el-time-select>
                    </el-radio>
                  </el-radio-group>
                </td>
              </tr>
              <tr>
                <td>灌溉</td>
                <td>
                  <el-radio v-model="radio1" label="1">
                    灌溉时长:
                    <input type="text" v-model="edit.time" :disabled="diasabledInput1" />
                  </el-radio>
                  <el-radio v-model="radio1" label="2">
                    灌溉流量:
                    <input type="text" v-model="edit.flow" :disabled="diasabledInput2" />
                  </el-radio>
                </td>
              </tr>
              <tr>
                <td>配方</td>
                <td>
                  <el-select v-model="plan" filterable placeholder="请选择" value-key="id" @change="currentSel">
                    <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item"></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>操作</td>
                <td>
                  <button @click="updata()">更新</button>&nbsp;
                  <button @click="close()">取消</button>
                </td>
              </tr>
            </tbody>
          </table>-->
          <div class="handle">
            <button @click="updata()">更新</button>&nbsp;
            <button @click="close()">取消</button>
          </div>
          <div class="information">
            <div>
              <div class="align">名称</div>
              <div style="margin-left:50px;">
                <input type="text" v-model="edit.name" />
              </div>
            </div>
            <div>
              <div class="align">启动时间</div>
              <div style="margin-left:50px;">
                <el-time-select
                  v-model="edit.start"
                  :picker-options="{
                    start: '07:30',
                    step: '00:10',
                    end: '18:30'
                  }"
                  placeholder="选择时间"
                ></el-time-select>
              </div>
              <div style="margin-left:50px;">
                <el-radio-group v-model="radio">
                  <el-radio label="1" style="padding-bottom:5px;">仅一次</el-radio>
                  <br />
                  <el-radio label="2">
                    <div style="padding-bottom:5px;font-size: 14px;">
                      每隔
                      <input
                        type="text"
                        :value="message"
                        :disabled="diasabledInput"
                        style="width:60px;"
                      />天
                      <input
                        type="text"
                        :value="message"
                        :disabled="diasabledInput"
                        style="width:60px;"
                      />小时
                      <input
                        type="text"
                        :value="message"
                        :disabled="diasabledInput"
                        style="width:60px;"
                      />分
                    </div>
                    <br />
                    <div class="block">
                      <el-date-picker
                        v-model="value1"
                        type="daterange"
                        start-placeholder="起始日期"
                        end-placeholder="结束日期"
                        style="width:288px;">
                      </el-date-picker>
                    </div>
                  </el-radio>
                </el-radio-group>
              </div>
            </div>
            <div>
              <div class="align">灌溉</div>
              <div style="margin-left:50px;">
                <el-radio v-model="radio1" label="1">
                  灌溉时长:
                  <input type="text" v-model="edit.time" :disabled="diasabledInput1" />
                </el-radio>
                <br />
                <el-radio v-model="radio1" label="2" style="padding-top:5px;">
                  灌溉流量:
                  <input type="text" v-model="edit.flow" :disabled="diasabledInput2" />
                </el-radio>
              </div>
            </div>
            <br />
            <div>
              <div class="align">配方</div>
              <div style="margin-left:50px">
                <el-select
                  v-model="plan"
                  filterable
                  placeholder="请选择"
                  value-key="id"
                  @change="currentSel"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.label"
                    :value="item"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
        </div>
        <div class="control-valve">
          <div class="bg-tag">
            <p>阀号</p>
          </div>
          <ul class="valve">
            <li v-for="item in 8" :key="item">
              <span>{{item}}#阀</span>
            </li>
          </ul>
          <collapse>
            <ul class="valve" v-show="isActive">
              <li v-for="item in 56" :key="item">
                <span>{{item + 8}}#阀</span>
              </li>
            </ul>
          </collapse>
          <div
            @click="lock"
            style="text-align:center;color:#fff;cursor:pointer;padding-bottom:5px;"
          >{{content}}</div>
        </div>
      </div>
      <!-- <div class="flag-form" v-if="flag">
        <div class="layer">
          <div class="close-icon"></div>
          <div class="bg-tag">
            <p>详情</p>
          </div>
          <table border="0" cellspacing="0" cellpadding="5" style="width:100%;margin-top:20px;">
            <tbody align="left">
              <tr>
                <td width="150">名称</td>
                <td><input type="text" v-model="edit.name" /></td>
              </tr>
              <tr>
                <td>启动时间</td>
                <td>
                  <el-time-select
                    v-model="value"
                    :picker-options="{
                      start: '07:30',
                      step: '00:10',
                      end: '18:30'
                    }"
                    placeholder="选择时间">
                  </el-time-select>
                  <el-radio-group v-model="radio">
                    <el-radio label="1">仅一次</el-radio>
                    <el-radio label="2">
                      每隔
                      <input type="text" :value="message" :disabled="diasabledInput" />天
                      <input type="text" :value="message" :disabled="diasabledInput" />小时
                      <input type="text" :value="message" :disabled="diasabledInput" />分
                      <br>
                      <el-time-select
                        placeholder="起始时间"
                        v-model="startTime"
                        :picker-options="{
                          start: '08:30',
                          step: '00:15',
                          end: '18:30'
                        }">
                      </el-time-select>
                      <el-time-select
                        placeholder="结束时间"
                        v-model="endTime"
                        :picker-options="{
                          start: '08:30',
                          step: '00:15',
                          end: '18:30',
                          minTime: startTime
                        }">
                      </el-time-select>
                    </el-radio>
                  </el-radio-group>
                </td>
              </tr>
              <tr>
                <td>灌溉</td>
                <td>
                  <el-radio v-model="radio1" label="1">
                    灌溉时长:
                    <input type="text" v-model="edit.time" :disabled="diasabledInput1" />
                  </el-radio>
                  <el-radio v-model="radio1" label="2">
                    灌溉流量:
                    <input type="text" v-model="edit.flow" :disabled="diasabledInput2" />
                  </el-radio>
                </td>
              </tr>
              <tr>
                <td>配方</td>
                <td>
                  <el-select v-model="plan" filterable placeholder="请选择" value-key="id" @change="currentSel">
                    <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item"></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>操作</td>
                <td>
                  <button @click="updata()">更新</button>&nbsp;
                  <button @click="close()">取消</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="information">
            <div>
              <div>名称</div>
              <div style="margin-left:50px;"><input type="text" v-model="edit.name" /></div>
            </div>
            <div>
              <div>启动时间</div>
              <div style="margin-left:50px;">
                <el-time-select
                  v-model="value"
                  :picker-options="{
                    start: '07:30',
                    step: '00:10',
                    end: '18:30'
                  }"
                  placeholder="选择时间">
                </el-time-select>
              </div>
              <div style="margin-left:50px;">
                <el-radio-group v-model="radio">
                  <el-radio label="1" style="padding-bottom:5px;">仅一次</el-radio>
                  <br>
                  <el-radio label="2">
                    <div style="padding-bottom:5px;">
                      每隔
                      <input type="text" :value="message" :disabled="diasabledInput" />天
                      <input type="text" :value="message" :disabled="diasabledInput" />小时
                      <input type="text" :value="message" :disabled="diasabledInput" />分
                    </div>
                    <br>
                    <div>
                      <el-time-select
                        placeholder="起始时间"
                        v-model="startTime"
                        :picker-options="{
                          start: '08:30',
                          step: '00:15',
                          end: '18:30'
                        }">
                      </el-time-select>
                      <el-time-select
                        placeholder="结束时间"
                        v-model="endTime"
                        :picker-options="{
                          start: '08:30',
                          step: '00:15',
                          end: '18:30',
                          minTime: startTime
                        }">
                      </el-time-select>
                    </div>
                  </el-radio>
                </el-radio-group>
              </div>
            </div>
            <div>
              <div>灌溉</div>
              <div style="margin-left:50px;">
                <el-radio v-model="radio1" label="1">
                  灌溉时长:
                  <input type="text" v-model="edit.time" :disabled="diasabledInput1" />
                </el-radio>
                <el-radio v-model="radio1" label="2">
                  灌溉流量:
                  <input type="text" v-model="edit.flow" :disabled="diasabledInput2" />
                </el-radio>
              </div>
            </div>
            <br>
            <div>
              <div>配方</div>
              <div style="margin-left:50px">
                <el-select v-model="plan" filterable placeholder="请选择" value-key="id" @change="currentSel">
                <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item"></el-option>
                </el-select>
              </div>
            </div>
            <br>
            <div>
              <div>操作</div>
              <div style="margin-left:50px">
                <button @click="updata()">更新</button>&nbsp;
                <button @click="close()">取消</button>
              </div>
            </div>
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import collapse from '@/collapse'
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
      isActive: false,
      content: '展开▼',
      titles: [
        {
          name: 'null',
          time: 'time',
          flow: '',
          start: '',
          formula: 'null',
          type: '0',
          next: 'next',
          id: '1'
        },
        {
          name: '2',
          time: '',
          flow: '',
          start: '07:50',
          formula: '2',
          type: '0',
          next: 'next',
          id: '2'
        }
      ],
      radio: '1',
      radio1: '1',
      edit: {},
      plan: '',
      options: [
        {
          id: 1,
          value: '选项1',
          code: 'option1',
          label: '1'
        },
        {
          id: 2,
          value: '选项2',
          code: 'option2',
          label: '2'
        },
        {
          id: 3,
          value: '选项3',
          code: 'option3',
          label: '3'
        }
      ],
      value1: '',
      value2: ''
    }
  },
  methods: {
    // 删除数据
    del (index) {
      // 点击删除后，将删除数据的下标传入，进行删除
      if (confirm('是否删除') === true) {
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
    // 配方下拉框
    currentSel (selVal) {
      this.code = selVal.code
      this.name = selVal.label
      // console.log('选择的name为：' + this.name, '选择的code为:' + this.code)
    },
    // 更新数据
    async updata () {
      // 点击更新按钮后触发，将用对象中的ID值来判断，选中更改的对象，并将更改后的对象重新给到this.titles
      for (var i = 0; i < this.titles.length; i++) {
        if (this.titles[i].id === this.edit.id) {
          // this.titles[i] = this.edit
          if ((this.titles[i] = Object.assign(this.titles[i], this.edit))) {
            alert('更新成功')
          }
          this.titles[i].formula = this.name
          console.log(this.edit)
          // this.flag = false
          // console.log(this.edit)
          // if (this.$set(this.titles, i, this.edit)) {
          //   alert('更新成功')
          // }
          // if (Object.assign(this.edit, this.titles)) {
          //   alert('1')
          // }
          // console.log(this.options[i].text)

          // let data = JSON.stringify(this.titles)
          // // console.log(title)
          // await this.$http
          //   .post('url', data)
          //   .then(res => {
          //     console.log(111)
          //   })
          //   .catch(err => {
          //     console.log(err)
          //   })
        }
      }
      // this.flag = false
    },
    // 清空
    close () {
      this.flag = false
    },
    // 展开/折叠
    lock () {
      if (!this.isActive) {
        this.isActive = true
        this.content = '折叠▲'
      } else {
        this.isActive = false
        this.content = '展开▼'
      }
    }
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
  },
  components: {
    collapse
  }
}
</script>

<style lang="less" scoped>
.irrigation {
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
      background-color: #000;
      margin: 0 auto;
      padding: 0 15px;

      .handle {
        position: absolute;
        top: 10px;
        right: 30px;
      }
      .information {
        div {
          display: inline-block;
        }
        > div {
          padding-top: 10px;
        }

        .align {
          width: 65px;
          text-align: center;
        }

        /deep/ .block {
          .el-range-editor .el-range-input {
            color: #fff;
            margin-bottom: 13px;
          }
          .el-range__close-icon {
            position: absolute;
          }
        }
      }

      /deep/ .el-input__inner {
        width: 150px;
        height: 35px;
        border: none;
        background-color: #2a3b49;
        border-radius: 0;
        color: #fff;
      }
      /deep/ .el-date-editor.el-input,
      .el-date-editor {
        width: 155px;
      }
      /deep/ .el-input__icon {
        line-height: 35px;
      }
      /deep/ .el-radio__label {
        color: #97b1c9;
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

  .flag-form {
    width: 80%;
    height: 80%;
    position: fixed;
    top: 120px;
    background: rgba(1, 1, 1, 0.5);
    .layer {
      width: 50%;
      height: 50%;
      background-color: #000;
      margin: 0 auto;
      border: 1px solid #3c5061;
      margin-top: 150px;

      .information {
        div {
          display: inline-block;
        }
        > div {
          padding-top: 10px;
        }
      }

      /deep/ .el-input__inner {
        width: 150px;
        height: 35px;
        border: none;
        background-color: #2a3b49;
        border-radius: 0;
        color: #fff;
      }
      /deep/ .el-date-editor.el-input,
      .el-date-editor.el-input__inner {
        width: 155px;
      }
      /deep/ .el-input__icon {
        line-height: 35px;
      }
    }
  }

  .bg-tag {
    width: 100%;
    height: 30px;
    text-align: center;
    margin-top: 30px;
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
