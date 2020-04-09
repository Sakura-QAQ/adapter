<template>
  <div class="container">
    <div class="MainData" v-if="flagShow">
      <div class="header">
        <div class="header-left">
          <el-form :model="areaId">
            <el-select v-model="areaId.id" placeholder="请选择温室" @change="areaTab">
              <el-option
                v-for="item in area"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form>
        </div>
        <div class="header-right">
          <div class="sfj">
            施肥机：{{fertilizerName}}
          </div>
          <el-checkbox-group class="checkFl" v-model="checkboxGroup">
            <template v-for="(item, index) in fergroup">
              <el-checkbox-button :label="index + 1" :key="index" v-show="index < 24">
                <div class="valve_num" v-on:dblclick="editval($event, index)">{{Vals[index]}}</div>
              </el-checkbox-button>
            </template>
          </el-checkbox-group>
        </div>
      </div>
      <div class="leftCard">
        <div :class="{active:index==num}" v-for="(item, index) in fomulaCrop" :key="index" @click="showData(item,index)">{{item.formula.name}}</div>
      </div>
      <div class="rightCard">
        <div class="topData">
          <div class="date">
            <div class="title">起止日期：</div>
            <div class="starts">
              <span>{{mathData.startDate}}</span>&nbsp;
              <i>至</i>&nbsp;
              <span>{{mathData.endDate}}</span>
            </div>
          </div>
          <div class="target">
            <div>{{mathData.ecBase}}</div>
            <div>EC基础值</div>
          </div>
          <div class="target">
            <div>{{mathData.ecTarget}}</div>
            <div>EC目标值</div>
          </div>
          <div class="target">
            <div>{{mathData.phTarget}}</div>
            <div>PH目标值</div>
          </div>
          <ul>
            <li>
              <span>{{plans.channel1}}：</span>
              <span>{{mathData.channel1}}</span>
            </li>
            <li>
              <span>{{plans.channel2}}：</span>
              <span>{{mathData.channel2}}</span>
            </li>
            <li>
              <span>{{plans.channel3}}：</span>
              <span>{{mathData.channel3}}</span>
            </li>
            <li>
              <span>{{plans.channel4}}：</span>
              <span>{{mathData.channel4}}</span>
            </li>
            <li>
              <span>{{plans.channel5}}：</span>
              <span>{{mathData.channel5}}</span>
            </li>
            <li>
              <span>{{plans.channel6}}：</span>
              <span>{{mathData.channel6}}</span>
            </li>
            <li>
              <span>{{plans.channel7}}：</span>
              <span>{{mathData.channel7}}</span>
            </li>
            <li>
              <span>{{plans.channel8}}：</span>
              <span>{{mathData.channel8}}</span>
            </li>
            <li>
              <span>{{plans.channel9}}：</span>
              <span>{{mathData.channel9}}</span>
            </li>
          </ul>
        </div>
        <div class="Mainbody">
          <div class="title">作业排期表</div>
          <!-- <div class="add">添加</div> -->
          <div class="tableData">
            <el-table
              :data="tableData"
              style="width: 100%"
              :row-class-name="tableRowClassName">
              <el-table-column
                prop="exeTime"
                label="执行时间"
                width="240">
              </el-table-column>
              <el-table-column
                prop="irrigationVolume"
                label="灌溉量"
                width="180">
              </el-table-column>
              <el-table-column
                prop="irrigationTime"
                label="灌溉时长"
                width="180">
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                width="180">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <span @click="del(scope.$index, scope.row)" style="padding-right:5px;">删除</span>
                  <span @click="editData(scope.$index, scope.row)" style="padding-right:5px;">编辑</span>
                  <span @click="onReady(scope.$index, scope.row, $event)" style="padding-right:5px;">启动</span>
                  <span @click="onStop(scope.$index, scope.row, $event)">停止</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="btn" @click="fog">
            <input class="submit" type="button" value="添加">
          </div>
        </div>
      </div>
      <div class="editValves" v-if="flagVal">
        <div class="vals">
          阀号名称:<el-input v-model="Valsname"></el-input>
        </div>
        <div class="vals-btn">
          <input class="submit" type="button" value="修改" @click="modifyVal">&nbsp;
          <input class="submit" type="button" value="取消" @click="flagVal=false">
        </div>
      </div>
    </div>
    <div class="hiddenData" v-if="flagHidden">
      <div class="Data-add">
        <div class="vavles">
          <el-checkbox-group class="checkFl" v-model="checkboxGroup">
            <template v-for="(item, index) in fergroup">
              <el-checkbox-button :label="index + 1" :key="index" v-show="index < 24">
                <div class="valve_num" v-on:dblclick="editval($event, index)">{{Vals[index]}}</div>
              </el-checkbox-button>
            </template>
          </el-checkbox-group>
        </div>
        <div class="formData">
          <div>
            <span class="just">灌溉方式：</span>
            <el-radio-group v-model="radio1" @change="start">
              <el-radio :label="0">
                灌溉时长
              </el-radio>
              <el-radio :label="1">
                灌溉流量
              </el-radio>
            </el-radio-group>
          </div>
          <div>
            <span class="ML">灌溉量：</span>
            <!-- 灌溉时长 -->
            <div v-show="irrFlag.time">
              <input class="text" type="text" v-model="irrData.irrTime">
            </div>
            <!-- 灌溉量 -->
            <div v-show="irrFlag.Volume">
              <input class="text" type="text" v-model="irrData.irrVolume">
            </div>
            {{irr}}
          </div>
          <div>
            <span>启动时间：</span>
            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
              <el-form-item
                v-for="(domain, index) in dynamicValidateForm.domains"
                :key="domain.key"
                :prop="'domains.' + index + '.value'"
                 @change="push(index)"
              >
                <el-date-picker v-model="domain.value" type="datetime" placeholder="选择日期时间"  value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
                <el-button @click.prevent="removeDomain(domain)" size="small" class="delete">删除</el-button>
              </el-form-item>
              <el-form-item>
                <el-button size="small" @click="addDomain">新增</el-button>
              </el-form-item>
              <div class="fixBtn">
                <input class="submit" type="button" value="返回" @click="ReTurn">
                <input class="submit" type="button" value="提交" @click="addList">
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <div class="hiddenData" v-if="flagHidden2">
      <div class="Data-add">
        <div class="vavles">
          <el-checkbox-group class="checkFl" v-model="checkboxGroup">
            <template v-for="(item, index) in fergroup">
              <el-checkbox-button :label="index + 1" :key="index" v-show="index < 24">
                <div class="valve_num" v-on:dblclick="editval($event, index)">{{Vals[index]}}</div>
              </el-checkbox-button>
            </template>
          </el-checkbox-group>
        </div>
        <div class="formData">
          <div>
            <span class="just">灌溉方式：</span>
            <el-radio-group v-model="radio1" @change="start">
              <el-radio :label="0">
                灌溉时长
              </el-radio>
              <el-radio :label="1">
                灌溉流量
              </el-radio>
            </el-radio-group>
          </div>
          <div>
            <span class="ML">灌溉量：</span>
            <!-- 灌溉时长 -->
            <div v-show="irrFlag.time">
              <input class="text" type="text" v-model="irrData.irrTime">
            </div>
            <!-- 灌溉量 -->
            <div v-show="irrFlag.Volume">
              <input class="text" type="text" v-model="irrData.irrVolume">
            </div>
            {{irr}}
          </div>
          <div>
            <span>启动时间：</span>
            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
              <el-form-item
                v-for="(domain, index) in dynamicValidateForm.domains"
                :key="domain.key"
                :prop="'domains.' + index + '.value'"
                 @change="push(index)"
              >
                <el-date-picker v-model="domain.value" type="datetime" placeholder="选择日期时间"  value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
                <el-button @click.prevent="removeDomain(domain)" size="small" class="delete">删除</el-button>
              </el-form-item>
              <el-form-item>
                <el-button size="small" @click="addDomain">新增</el-button>
              </el-form-item>
              <div class="fixBtn">
                <input class="submit" type="button" value="返回" @click="flagHidden2=false">
                <input class="submit" type="button" value="提交" @click="editList">
              </div>
            </el-form>
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
      // 启动
      starts: '启动',
      // 编辑阀号名称
      Valsname: '',
      // 阀索引值
      ValsIndex: 0,
      // 阀号修改层
      flagVal: false,
      // tab切换
      num: 0,
      // 增加的时间
      dynamicValidateForm: {
        domains: [
          { value: '' }
        ]
      },
      // 项目(园区)id
      request: {
        projectId: ''
      },
      // 施肥机下拉框传的id
      irrParams: {
        fertilizerId: ''
      },
      fertilizer: [],
      // 大棚id
      areaId: {
        id: ''
      },
      // 监听id
      ChangeAreaID: '',
      // 默认列表id
      enterID: '',
      // 大棚数据
      area: [],
      // 作物配方绑定列表
      fomulaCrop: [],
      // 通道列表
      plans: {
        channel1: '通道',
        channel2: '通道',
        channel3: '通道',
        channel4: '通道',
        channel5: '通道',
        channel6: '通道',
        channel7: '通道',
        channel8: '通道',
        channel9: '通道'
      },
      // ec ph 通道默认数据
      mathData: {
        startDate: '(年--月--日)',
        endDate: '(年--月--日)',
        ecBase: 0,
        ecTarget: 0,
        phTarget: 0,
        channel1: 0,
        channel2: 0,
        channel3: 0,
        channel4: 0,
        channel5: 0,
        channel6: 0,
        channel7: 0,
        channel8: 0,
        channel9: 0
      },
      // 灌溉切换
      irrData: {
        //  时长
        irrTime: 0,
        // 灌溉量
        irrVolume: 0
      },
      // 隐藏显示灌溉框
      irrFlag: {
        time: true,
        Volume: false
      },
      // 数据提交(编辑)
      addData: {
        id: '',
        formulaId: '',
        areaFormulaLinkId: '',
        exeTimeList: [],
        irrigationType: 0,
        irrigationTime: 0,
        irrigationVolume: 0,
        fertilizerId: ''
      },
      // 施肥机名称
      fertilizerName: '',
      // 阀号
      Vals: [],
      // 选中的阀号
      checkboxGroup: [],
      // 施肥机对应的阀
      fergroup: [],
      irr: '分钟',
      radio1: 0,
      flagShow: true,
      flagHidden: false,
      flagHidden2: false,
      value: '',
      value1: '',
      tableData: [],
      idarea: ''
    }
  },
  created () {
    const projectId = JSON.parse(window.sessionStorage.getItem('projectId'))
    this.request.projectId = projectId
    this.getareas()
  },
  mounted () {
    let that = this
    setTimeout(() => {
      that.getfomulalist()
      that.QueryFer()
      that.getpassway()
    }, 200)
    setTimeout(() => {
      that.enterpage()
    }, 300)
  },
  methods: {
    // 阀号修改
    async modifyVal () {
      this.flagVal = false
      let i = this.ValsIndex
      this.Vals[i] = this.Valsname
      let valve = {
        id: this.addData.fertilizerId,
        valveAlias: this.Vals.join(',')
      }
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/fertilizer/updateValveAlias', valve)
      if (res.data.code === 200) {
        this.$message.success('处理成功')
      } else {
        this.$message.error('处理失败')
      }
    },
    // 获取大棚数据
    async getareas () {
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/area/queryByProjectId', this.request)
      this.area = res.data.data
      this.areaId.id = this.area[0].id
    },
    // 施肥机数据
    async QueryFer () {
      // 通过areaID查询施肥机ID
      let IDfer = {
        id: this.areaId.id
      }
      const resQuery = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/area/queryById', IDfer)
      // console.log(resQuery.data.data)

      const fergroup = resQuery.data.data.fertilizerValves.split(',')
      this.fergroup = fergroup

      this.addData.fertilizerId = resQuery.data.data.fertilizerId
      // 公用的施肥机id
      const ferid = resQuery.data.data.fertilizerId
      const fers = {
        id: ferid
      }
      // 通过id获取施肥机名称 queryById
      const QueryFer = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/fertilizer/queryById', fers)
      this.fertilizerName = QueryFer.data.data.name
      // 获取施肥机对应的阀号
      const queryVals = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/fertilizer/queryValveAlias', fers)
      const strs = queryVals.data.data
      this.Vals = strs.split(',')
    },
    // 通过areaID获取配方绑定列表
    async getfomulalist () {
      let ID = {
        areaId: this.areaId.id
      }
      const fomulaCrop = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/area/queryFormulaLinkByAreaId', ID)
      this.fomulaCrop = fomulaCrop.data.data
    },
    // 进入页面默认值
    async enterpage () {
      this.addData.formulaId = this.fomulaCrop[0].formulaId
      this.addData.areaFormulaLinkId = this.fomulaCrop[0].id
      this.mathData = {
        startDate: this.fomulaCrop[0].startDate,
        endDate: this.fomulaCrop[0].endDate,
        ecBase: this.fomulaCrop[0].formula.ecBase,
        ecTarget: this.fomulaCrop[0].formula.ecTarget,
        phTarget: this.fomulaCrop[0].formula.phTarget,
        channel1: this.fomulaCrop[0].formula.channel1,
        channel2: this.fomulaCrop[0].formula.channel2,
        channel3: this.fomulaCrop[0].formula.channel3,
        channel4: this.fomulaCrop[0].formula.channel4,
        channel5: this.fomulaCrop[0].formula.channel5,
        channel6: this.fomulaCrop[0].formula.channel6,
        channel7: this.fomulaCrop[0].formula.channel7,
        channel8: this.fomulaCrop[0].formula.channel8,
        channel9: this.fomulaCrop[0].formula.channel9
      }
      let areaFormulaLinkId = {
        areaFormulaLinkId: this.fomulaCrop[0].id
      }
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/irrigation/queryByAreaFormulaLinkId', areaFormulaLinkId)
      this.tableData = res.data.data
      this.tableData.map(val => {
        if (val.status === 0) {
          val.status = '未执行'
        } else if (val.status === 1) {
          val.status = '排队中'
        } else if (val.status === 2) {
          val.status = '执行中'
        } else if (val.status === 3) {
          val.status = '已完成'
        } else if (val.status === 4) {
          val.status = '执行异常'
        }
      })
    },
    // 获取通道
    async getpassway () {
      // 通道
      const plans = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/channel/queryByProjectId', this.request)
      this.plans = plans.data.data
    },
    // 点击展示详细数据
    async showData (item, index) {
      this.num = index
      this.addData.formulaId = item.formulaId
      this.addData.areaFormulaLinkId = item.id
      this.mathData = {
        startDate: item.startDate,
        endDate: item.endDate,
        ecBase: item.formula.ecBase,
        ecTarget: item.formula.ecTarget,
        phTarget: item.formula.phTarget,
        channel1: item.formula.channel1,
        channel2: item.formula.channel2,
        channel3: item.formula.channel3,
        channel4: item.formula.channel4,
        channel5: item.formula.channel5,
        channel6: item.formula.channel6,
        channel7: item.formula.channel7,
        channel8: item.formula.channel8,
        channel9: item.formula.channel9
      }
      let areaFormulaLinkId = {
        areaFormulaLinkId: item.id
      }
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/irrigation/queryByAreaFormulaLinkId', areaFormulaLinkId)
      this.tableData = res.data.data
      this.tableData.map(val => {
        if (val.status === 0) {
          val.status = '未执行'
        } else if (val.status === 1) {
          val.status = '排队中'
        } else if (val.status === 2) {
          val.status = '执行中'
        } else if (val.status === 3) {
          val.status = '已完成'
        } else if (val.status === 4) {
          val.status = '执行异常'
        }
      })
    },
    // 打开弹出层
    fog () {
      this.flagHidden = true
    },
    // 编辑阀名
    editval (e, index) {
      this.flagVal = true
      this.Valsname = this.Vals[index]
      this.ValsIndex = index
    },
    // 返回弹出层
    ReTurn () {
      this.flagHidden = false
    },
    // 循环监控计划
    start () {
      if (this.radio1 === 1) {
        this.irrFlag.time = false
        this.irrFlag.Volume = true
        this.irrData.irrTime = 0
        this.irr = 'm³'
      } else {
        this.irrFlag.time = true
        this.irrFlag.Volume = false
        this.irrData.irrVolume = 0
        this.irr = '分钟'
      }
    },
    async getItem (loop) {
      let areaFormulaLinkId = {
        areaFormulaLinkId: loop
      }
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/irrigation/queryByAreaFormulaLinkId', areaFormulaLinkId)
      this.tableData = res.data.data
      this.tableData.map(val => {
        if (val.status === 0) {
          val.status = '未执行'
        } else if (val.status === 1) {
          val.status = '排队中'
        } else if (val.status === 2) {
          val.status = '执行中'
        } else if (val.status === 3) {
          val.status = '已完成'
        } else if (val.status === 4) {
          val.status = '执行异常'
        }
      })
    },
    // 列表添加类名
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    // 移除时间段
    removeDomain (item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    // 添加时间段
    addDomain () {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      })
    },
    // 清空
    clear () {
      this.addData.formulaId = ''
      this.addData.exeTimeList = []
      this.radio1 = 0
      this.irrData.irrTime = 0
      this.irrData.irrVolume = 0
      this.checkboxGroup = []
      // this.areaId.id = ''
      this.addData.areaFormulaLinkId = ''
      this.projectId = ''
    },
    // 编辑数据
    editData (index, row) {
      // this.clear()
      this.projectId = row.projectId
      if (row.status === '未执行') {
        row.status = 0
      } else if (row.status === '排队中') {
        row.status = 1
      } else if (row.status === '执行中') {
        row.status = 2
      } else if (row.status === '已完成') {
        row.status = 3
      } else if (row.status === '执行异常') {
        row.status = 4
      }
      this.flagHidden2 = true
      // id
      this.addData.id = row.id
      // 周期id
      this.addData.formulaId = row.formulaId
      // 启动时间
      this.dynamicValidateForm.domains[0].value = row.exeTime
      // 灌溉类型
      this.radio1 = row.irrigationType
      // 灌溉时长
      this.irrData.irrTime = row.irrigationTime
      // 灌溉流量
      this.irrData.irrVolume = row.irrigationVolume
      // 阀号
      this.checkboxGroup = JSON.parse(row.valveNumbers)
      // areaId
      this.areaId.id = row.areaId
      // areaFormulaLinkId
      this.addData.areaFormulaLinkId = row.areaFormulaLinkId
      // 园区id
    },
    // 提交作业排期
    async addList () {
      let arr = this.dynamicValidateForm.domains
      var brr = arr.map(item => {
        return item.value
      })
      this.addData.exeTimeList = brr
      let list = {
        areaFormulaLinkId: this.addData.areaFormulaLinkId,
        formulaId: this.addData.formulaId,
        areaId: this.areaId.id,
        projectId: this.request.projectId,
        fertilizerId: this.addData.fertilizerId,
        valveNumbers: JSON.stringify(this.checkboxGroup),
        irrigationType: this.radio1,
        irrigationTime: Number(this.irrData.irrTime),
        irrigationVolume: Number(this.irrData.irrVolume),
        exeTimeList: this.addData.exeTimeList
      }
      if (list.valveNumbers !== '[]') {
        const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/irrigation/addIrriSchedule', list)
        if (res.data.code === 200) {
          this.$message.success('提交成功')
          this.flagHidden = false
          this.getItem(this.addData.areaFormulaLinkId)
        }
      } else if (list.valveNumbers === '[]') {
        this.$message.error('提交失败，阀号为必选项')
        return false
      }
    },
    // 提交编辑的排期表
    async editList () {
      let list = {
        id: this.addData.id,
        areaFormulaLinkId: this.addData.areaFormulaLinkId,
        formulaId: this.addData.formulaId,
        areaId: this.areaId.id,
        projectId: this.request.projectId,
        fertilizerId: this.addData.fertilizerId,
        valveNumbers: JSON.stringify(this.checkboxGroup),
        irrigationType: this.radio1,
        irrigationTime: Number(this.irrData.irrTime),
        irrigationVolume: Number(this.irrData.irrVolume),
        exeTime: this.dynamicValidateForm.domains[0].value
      }
      const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/irrigation/saveOrUpdate', list)
      if (res.data.code === 200) {
        this.$message.success('提交成功')
      }
      this.flagHidden2 = false
      this.getItem(this.addData.areaFormulaLinkId)
    },
    // 删除
    del (index, row) {
      let ID = {
        id: row.id
      }
      this.$confirm('此操作将永久删除该策略, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.post('http://192.168.1.202:10020/fertilizer/api/irrigation/delete', ID)
          // 删除成功
          this.$message.success('删除成功')
          this.getItem(this.addData.areaFormulaLinkId)
        })
        .catch(() => {})
    },
    // 切换
    async areaTab () {
      this.QueryFer()
      let ID = {
        areaId: this.areaId.id
      }
      const fomulaCrop = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/area/queryFormulaLinkByAreaId', ID)
      this.fomulaCrop = fomulaCrop.data.data
      this.addData.formulaId = this.fomulaCrop[0].formulaId
      this.addData.areaFormulaLinkId = this.fomulaCrop[0].id
      this.mathData = {
        startDate: this.fomulaCrop[0].startDate,
        endDate: this.fomulaCrop[0].endDate,
        ecBase: this.fomulaCrop[0].formula.ecBase,
        ecTarget: this.fomulaCrop[0].formula.ecTarget,
        phTarget: this.fomulaCrop[0].formula.phTarget,
        channel1: this.fomulaCrop[0].formula.channel1,
        channel2: this.fomulaCrop[0].formula.channel2,
        channel3: this.fomulaCrop[0].formula.channel3,
        channel4: this.fomulaCrop[0].formula.channel4,
        channel5: this.fomulaCrop[0].formula.channel5,
        channel6: this.fomulaCrop[0].formula.channel6,
        channel7: this.fomulaCrop[0].formula.channel7,
        channel8: this.fomulaCrop[0].formula.channel8,
        channel9: this.fomulaCrop[0].formula.channel9
      }
      this.getItem(this.fomulaCrop[0].id)
    },
    // 启动停止
    async onReady (index, row, e) {
      // e.target = 0
      // console.log(e.target.innerText)
      // e.target.innerText = '停止'
      // let start = {
      //   scheduleId: row.id
      // }
      // let stop = {
      //   fertilizerId: row.fertilizerId
      // }
      // if (this.starts === '启动') {
      //   this.starts = '停止'
      //   const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/irrigation/startupForcibly', start)
      //   console.log(res)
      // } else if (this.starts === '停止') {
      //   this.starts = '启动'
      //   const res = await this.$http.post('http://192.168.1.202:10020/fertilizer/api/irrigation/startupForcibly', stop)
      //   console.log(res)
      // }
    },
    onStop (index, row, e) {

    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  .MainData{
    overflow: hidden;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 1625px;
    height: 825px;
    border: 1px solid #6989a5;
    border-radius: 15px;
    background-color: rgba(0, 0, 0, 0.8);
    .header {
      padding-top: 20px;
      .header-left {
        position: relative;
        display: inline-block;
        width: 250px;
        height: 120px;
        margin-left: 25px;
        background-color: #232733;
        // /deep/ .el-form {
        //   // float: left;
        //   // position: absolute;
        // }
        /deep/ .el-select {
          position: absolute;
          top: 18%;
          padding: 18px 0 0 25px;
        }
        /deep/ .el-input__inner {
          height: 40px;
          border: none;
          background-color: rgba(78, 82, 87, 0.9);
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
        /deep/ .el-form-item__label {
          color: #fff;
        }

      }
      .header-right {
        position: relative;
        display: inline-block;
        position: relative;
        width: 1300px;
        height: 120px;
        margin-left: 25px;
        padding:0 0 10px 20px;
        background-color: #232733;
        .sfj {
          position: absolute;
          top: 18%;
          display: inline-block;
          height: 74px;
          line-height: 74px;
        }
        // 阀号组件样式
        /deep/ .el-checkbox-group {
          // margin-top: 20px;
          position: absolute;
          left: 13%;
          top: 20px;
          display: inline-block;
          background: transparent;

          .el-checkbox-button__inner {
            width: 80px;
            border: 1px solid #6989a5;
            border-radius: 5px;
            background: transparent;
            color: #6989a5;
            margin: 0 0 8px 8px;
            padding: 0 0;

            .valve_num {
              width:80px;
              height:35px;
              line-height: 35px;
              text-align: center;
              background:transparent;
            }
          }
          .is-checked {
            .el-checkbox-button__inner {
              background-color: #ccc;
              border: 1px solid transparent;
            }
          }
        }
      }
    }
    .leftCard {
      float: left;
      text-align: center;
      width: 300px;
      height: 100%;
      > div {
        width: 250px;
        height: 80px;
        line-height: 80px;
        margin: 20px auto;
        border: 1px solid #6c768d;
        font-weight: 800;
        font-size: 20px;
        color: #ccc;
        border-radius: 10px;
        cursor: pointer;
      }
      .active {
        background-color: rgba(142, 160, 218, 0.8);
      }
    }
    .rightCard {
      float: left;
      width: 1300px;
      margin-top: 20px;
      .topData {
        height: 200px;
        background-color: #242c3b;
        >div {
          float: left;
        }
        .date {
          width: 100%;
          height: 50px;
          .title {
            float: left;
            height: 50px;
            line-height: 50px;
            font-weight: 800;
            margin-left: 500px;
          }
          .starts {
            float: left;
            height: 50px;
            line-height: 50px;
          }
        }
        .target {
          margin-left: 90px;

          div:first-child {
            width: 110px;
            height: 110px;
            line-height: 110px;
            border-radius: 50%;
            text-align: center;
            border: 1px solid #546d9d;
            border-radius: 50%;
            font-size: 32px;
            font-weight: 800;
            background-color: #232733;
            color: #0ed6f4;
          }
          div:last-child {
            height: 40px;
            line-height: 40px;
            text-align: center;
          }
        }
        ul {
          display: inline-block;
          width: 520px;
          height: 150px;
          margin-left: 90px;
          li {
            margin: 15px 0 0 0;
            float: left;
            span {
              display: inline-block;
              width: 80px;
              height: 25px;
            }
          }
        }
      }
      .Mainbody {
        position: relative;
        height: 420px;
        margin-top: 20px;
        background-color: #232733;
        padding-top: 40px;
        .tableData {
          width: 80%;
          margin: 0 auto;
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
              background-color: rgba(78, 82, 87, 0.9);;
            }
            td {
              border: none;
            }
            thead {
              color: #eee;
              background-color: rgba(55, 59, 63, 0.9);
            }
          }
        }
        .title {
          text-align: center;
          height: 55px;
          line-height: 55px;
          font-weight: 800;
          font-size: 20px;
        }
        .btn {
          position: absolute;
          top: 12px;
          right: 10px;
        }
      }
    }
    .editValves {
      z-index: 188;
      position: absolute;
      top: 20px;
      left: 19%;
      width: 1280px;
      height: 120px;
      padding-top: 20px;
      border-radius: 10px;
      background-color: rgba(85, 92, 98, 0.9);
      .vals {
        display: inline-block;
        margin-left: 35%;
        /deep/ .el-input {
          width: 150px;
          text-align: center;
          margin: 20px 0 0 10px;
        }
      }
      .vals-btn {
        margin-left: 22px;
        display: inline-block;
        text-align: center;
      }
    }
  }
  .hiddenData {
    z-index: 200;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(59, 63, 66, 0.9);

    .Data-add {
      position: absolute;
      margin: auto;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 700px;
      height: 600px;
      background-color: rgba(20, 20, 20, 0.9);
      .vavles {
        // 改ui组件
        width: 650px;
        height: 146px;
        line-height: 46px;
        margin: 20px auto;
        padding-top: 4px;
        text-align: center;
        background-color: #242c3b;
        /deep/ .el-checkbox-group {
          background: transparent;

          .el-checkbox-button__inner {
            width: 70px;
            border: 1px solid #6989a5;
            border-radius: 5px;
            background: transparent;
            color: #6989a5;
            margin: 0 0 0 10px;
            padding: 0 0;

            .valve_num {
              width:65px;
              height:40px;
              line-height: 40px;
              text-align: center;
              background:transparent;
            }
          }
          .is-checked {
            .el-checkbox-button__inner {
              background-color: #ccc;
              border: 1px solid transparent;
            }
          }
        }
      }
      .formData {
        position: relative;
        width: 650px;
        height: 392px;
        margin: 0 auto;
        background-color: #242c3b;
        padding-top: 30px;
        > div {
          font-size: 18px;
          margin-bottom: 20px;
          span {
            display: inline-block;
            width: 120px;
            height: 24px;
            line-height: 24px;
            font-size: 18px;
            text-align: right;
            margin-right: 30px;
          }
          .text {
            background-color: #2a3b49;
            margin-right: 8px;
          }
        }
        div:nth-child(1) {
          /deep/ .el-radio__label {
            color: #97b1c9;
            font-size: 18px;
          }
        }
        div:nth-child(2) {
          > div {
            display: inline-block;
          }
        }
        div:nth-child(3) {
          span {
            float: left;
          }
          /deep/.el-form {
            float: left;
            padding-left: 10px;

            .el-form-item {
              margin-bottom: 10px;
              .el-form-item__content {
                margin-left: -8px !important;
                .delete {
                  height: 35px;
                  margin-left: 10px;
                }
              }
              .el-input__inner {
                height: 40px;
              }
            }
          }
          .fixBtn {
            position: absolute;
            bottom: 50px;
            right: 10px;
            .submit {
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
