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
            施肥机：{{fertilizerName}}<br>
            状态：{{isOnline}}
          </div>
          <el-checkbox-group class="checkFl" v-model="checkboxGroup">
            <template v-for="(item, index) in fergroup">
              <el-checkbox-button :label="index + 1" :key="index" v-show="index < 24" disabled>
                <div class="valve_num">{{Vals[item - 1]}}</div>
              </el-checkbox-button>
            </template>
          </el-checkbox-group>
        </div>
      </div>
      <div class="leftCard">
        <vue-scroll :ops="ops" style="width:100%;height:100%">
          <div :class="{list:true,active:index==num}" v-for="(item, index) in fomulaCrop" :key="index" @click="showData(item,index)">{{item.formula.name}}</div>
        </vue-scroll>
      </div>
      <div class="rightCard">
        <div class="topData">
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
            <div class="date">
              <div class="dateTitle">起止日期：</div>
              <div class="starts">
                <span>{{mathData.startDate}}</span>&nbsp;
                <i>至</i>&nbsp;
                <span>{{mathData.endDate}}</span>
              </div>
            </div>
            <div class="title">吸肥比例</div>
            <li>
              <span>{{channels[0]}}：</span>
              <span>{{mathData.channel1}}</span>
            </li>
            <li>
              <span>{{channels[1]}}：</span>
              <span>{{mathData.channel2}}</span>
            </li>
            <li>
              <span>{{channels[2]}}：</span>
              <span>{{mathData.channel3}}</span>
            </li>
            <li>
              <span>{{channels[3]}}：</span>
              <span>{{mathData.channel4}}</span>
            </li>
            <li>
              <span>{{channels[4]}}：</span>
              <span>{{mathData.channel5}}</span>
            </li>
            <li>
              <span>{{channels[5]}}：</span>
              <span>{{mathData.channel6}}</span>
            </li>
            <li>
              <span>{{channels[6]}}：</span>
              <span>{{mathData.channel7}}</span>
            </li>
            <li>
              <span>{{channels[7]}}：</span>
              <span>{{mathData.channel8}}</span>
            </li>
            <li>
              <span>{{channels[8]}}：</span>
              <span>{{mathData.channel9}}</span>
            </li>
          </ul>
        </div>
        <div class="Mainbody">
          <div class="title">作业排期表</div>
          <!-- <div class="add">添加</div> -->
          <div class="tableData">
            <el-table
              :data="tableData.slice((pageNum - 1)*pageSize, pageNum*pageSize)"
              style="width: 100%"
              :row-class-name="tableRowClassName"
              @row-click="showValves($event)">
              <el-table-column
                prop="exeTime"
                label="执行时间"
                width="240">
              </el-table-column>
              <el-table-column
                prop="irrigationVolume"
                label="灌溉量(L)"
                width="180">
              </el-table-column>
              <el-table-column
                prop="irrigationTime"
                label="灌溉时长(秒)"
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
            <div class="box" v-show="total > 6">
              <el-pagination
                background
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
          <el-checkbox-group class="checkFl" v-model="checkboxGroup" @change="changebox">
            <template v-for="(item, index) in fergroup">
              <el-checkbox-button :label="index + 1" :key="index" v-show="index < 24">
                <div class="valve_num">{{Vals[item - 1]}}</div>
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
          <div class="model"></div>
        </div>
      </div>
    </div>
    <div class="hiddenData" v-if="flagHidden2">
      <div class="Data-add">
        <div class="vavles">
          <el-checkbox-group class="checkFl" v-model="checkboxGroup"  @change="changebox">
            <template v-for="(item, index) in fergroup">
              <el-checkbox-button :label="index + 1" :key="index" v-show="index < 24">
                <div class="valve_num">{{Vals[item - 1]}}</div>
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
                <input class="submit" type="button" value="返回" @click="ReTurn2">
                <input class="submit" type="button" value="提交" @click="editList">
              </div>
            </el-form>
          </div>
          <div class="model"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 分页参数
      pageNum: 1,
      pageSize: 6,
      total: 0,
      // 滚动条
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          keepShow: true
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false, // 是否只有滚动的时候才显示滚动条
          background: '#F5F5F5', // 滚动条颜色
          opacity: 0.5, // 滚动条透明度
          'overflow-x': 'hidden'
        }
      },
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
      channels: ['通道', '通道', '通道', '通道', '通道', '通道', '通道', '通道', '通道'],
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
      // 施肥机状态
      isOnline: '',
      // 阀号
      Vals: [],
      // 选中的索引
      checkboxGroup: [],
      // 施肥机对应的阀
      fergroup: [],
      // 对应阀下标
      ferindex: [],
      // 点击的阀号
      checkvalve: '',
      irr: '秒',
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
  },
  mounted () {
    this.getareas().then(res => {
      this.getfomulalist()
      this.QueryFer().then(res => {
        this.enterpage()
      })
    })
  },
  methods: {
    // 分页
    currentchange (newPage) {
      this.pageNum = newPage
    },
    prevpage () {
      this.pageNum = this.pageNum - 1
    },
    nextpage () {
      this.pageNum = this.pageNum + 1
    },
    // 阀号修改
    async modifyVal () {
      this.flagVal = false
      let i = this.ValsIndex
      this.Vals[i] = this.Valsname
      let valve = {
        id: this.addData.fertilizerId,
        valveAlias: this.Vals.join(',')
      }
      const res = await this.$http.post('fertilizer/api/fertilizer/updateValveAlias', valve)
      if (res.data.code === 200) {
        this.$message.success('处理成功')
      } else {
        this.$message.error('处理失败')
      }
    },
    // 获取大棚数据
    async getareas () {
      const res = await this.$http.post('fertilizer/api/area/queryByProjectId', this.request)
      this.area = res.data.data
      this.areaId.id = this.area[0].id
    },
    // 施肥机数据
    async QueryFer () {
      // 通过areaID查询施肥机ID
      let IDfer = {
        id: this.areaId.id
      }
      const resQuery = await this.$http.post('fertilizer/api/area/queryById', IDfer)

      const fergroup = resQuery.data.data.fertilizerValves.split(',')
      this.fergroup = fergroup

      this.addData.fertilizerId = resQuery.data.data.fertilizerId
      // 公用的施肥机id
      const ferid = resQuery.data.data.fertilizerId
      const fers = {
        id: ferid
      }
      // 通过id获取施肥机名称 queryById
      const QueryFer = await this.$http.post('fertilizer/api/fertilizer/queryById', fers)
      if (QueryFer.data.data.channels === null) {
        this.$message.error('吸肥通道未定义')
        this.mathData = {
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
        }
        this.fertilizerName = ''
        this.isOnline = ''
        this.fergroup = []
        this.channels = []
        this.pageNum = 1
        this.total = 0
        this.addData = {
          id: '',
          formulaId: '',
          areaFormulaLinkId: '',
          exeTimeList: [],
          irrigationType: 0,
          irrigationTime: 0,
          irrigationVolume: 0,
          fertilizerId: ''
        }
        return false
      } else {
        if (QueryFer.data.data.isOnline === 0) {
          this.isOnline = '不在线'
        } else {
          this.isOnline = '在线'
        }
        this.fertilizerName = QueryFer.data.data.name
        // 获取施肥机对应的阀号
        const queryVals = await this.$http.post('fertilizer/api/fertilizer/queryValveAlias', fers)
        const strs = queryVals.data.data
        this.Vals = strs.split(',')
        // 获取通道名称
        const channel = await this.$http.post('fertilizer/api/fertilizer/queryById', fers)
        this.channels = channel.data.data.channels.split(',')
      }
    },
    // 通过areaID获取配方绑定列表
    async getfomulalist () {
      let ID = {
        areaId: this.areaId.id
      }
      const fomulaCrop = await this.$http.post('fertilizer/api/area/queryFormulaLinkByAreaId', ID)
      if (fomulaCrop.data.data.length === 0) {
        this.$message.warning('该温室没有配方数据！请到配方绑定页面中进行添加！')
        return false
      } else {
        this.fomulaCrop = fomulaCrop.data.data
      }
    },
    // 进入页面默认值
    async enterpage () {
      if (this.fomulaCrop.length === 0) {
        return false
      } else {
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
        const res = await this.$http.post('fertilizer/api/irrigation/queryByAreaFormulaLinkId', areaFormulaLinkId)
        this.tableData = res.data.data
        this.total = res.data.data.length
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
          } else if (val.status === 5) {
            val.status = '强制结束'
          } else if (val.status === 6) {
            val.status = '过期未执行'
          }
        })
      }
    },
    // 点击展示详细数据
    async showData (item, index) {
      this.checkboxGroup = []
      this.num = index
      this.pageNum = 1
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
      const res = await this.$http.post('fertilizer/api/irrigation/queryByAreaFormulaLinkId', areaFormulaLinkId)
      this.tableData = res.data.data
      this.total = res.data.data.length
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
        } else if (val.status === 5) {
          val.status = '强制结束'
        } else if (val.status === 6) {
          val.status = '过期未执行'
        }
      })
    },
    // 打开添加弹出层
    fog () {
      this.dynamicValidateForm.domains = [{ value: '' }]
      this.irrData = {
        //  时长
        irrTime: 0,
        // 灌溉量
        irrVolume: 0
      }
      this.checkboxGroup = []
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
      this.dynamicValidateForm.domains = [{ value: '' }]
      this.irrData = {
        //  时长
        irrTime: 0,
        // 灌溉量
        irrVolume: 0
      }
      this.checkboxGroup = []
      this.checkvalve = ''
      this.map = []
    },
    ReTurn2 () {
      this.flagHidden2 = false
      this.dynamicValidateForm.domains = [{ value: '' }]
      this.irrData = {
        //  时长
        irrTime: 0,
        // 灌溉量
        irrVolume: 0
      }
      this.checkboxGroup = []
      this.checkvalve = ''
    },
    // 循环监控计划
    start () {
      if (this.radio1 === 1) {
        this.irrFlag.time = false
        this.irrFlag.Volume = true
        this.irrData.irrTime = 0
        this.irr = 'L'
      } else {
        this.irrFlag.time = true
        this.irrFlag.Volume = false
        this.irrData.irrVolume = 0
        this.irr = '秒'
      }
    },
    async getItem (loop) {
      let areaFormulaLinkId = {
        areaFormulaLinkId: loop
      }
      const res = await this.$http.post('fertilizer/api/irrigation/queryByAreaFormulaLinkId', areaFormulaLinkId)
      this.total = res.data.data.length
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
        } else if (val.status === 5) {
          val.status = '强制结束'
        } else if (val.status === 6) {
          val.status = '过期未执行'
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
    changebox () {
      let a = this.checkboxGroup
      let b = this.fergroup
      this.checkvalve = JSON.stringify(b.filter((_, index) => a.includes(index + 1)))
    },
    // 编辑数据
    editData (index, row) {
      const a = JSON.parse(row.valveNumbers)
      this.ferindex = []
      const getindex = (arr, item) => {
        for (let i = 0; i < this.fergroup.length; i++) {
          if (arr[i] === item) {
            return i + 1
          }
        }
      }
      for (let j = 0; j < a.length; j++) {
        const element = a[j]
        this.ferindex.push(getindex(this.fergroup, element))
      }

      this.projectId = row.projectId
      if (row.status === '排队中') {
        // this.$message.warning('排队中不可编辑！')
        return false
      } else if (row.status === '执行中') {
        // this.$message.warning('执行中不可编辑！')
        return false
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
      // 温室id
      this.areaId.id = row.areaId
      // areaFormulaLinkId
      this.addData.areaFormulaLinkId = row.areaFormulaLinkId
      // 阀号点亮
      this.checkboxGroup = this.ferindex
      // 阀号赋值
      this.checkvalve = JSON.stringify(a)
    },
    // 提交作业排期
    async addList () {
      let arr = this.dynamicValidateForm.domains
      let brr = arr.map(item => {
        return item.value
      })
      this.addData.exeTimeList = brr
      let list = {
        areaFormulaLinkId: this.addData.areaFormulaLinkId,
        formulaId: this.addData.formulaId,
        areaId: this.areaId.id,
        projectId: this.request.projectId,
        fertilizerId: this.addData.fertilizerId,
        valveNumbers: this.checkvalve,
        irrigationType: this.radio1,
        irrigationTime: Number(this.irrData.irrTime),
        irrigationVolume: Number(this.irrData.irrVolume),
        exeTimeList: this.addData.exeTimeList
      }

      if (list.valveNumbers !== '') {
        if (list.irrigationTime > 65535) {
          this.$message.error('灌溉时长不能超过65535秒')
          return false
        } else {
          const res = await this.$http.post('fertilizer/api/irrigation/addIrriSchedule', list)
          if (res.data.code === 200) {
            this.$message.success('提交成功')
            this.dynamicValidateForm.domains = [{ value: '' }]
            this.irrData = {
            //  时长
              irrTime: 0,
              // 灌溉量
              irrVolume: 0
            }
            this.checkboxGroup = []
            this.checkvalve = ''
            this.flagHidden = false
            this.getItem(this.addData.areaFormulaLinkId)
          } else {
            this.$message.error(res.data.msg)
          }
        }
      } else if (list.valveNumbers === '') {
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
        valveNumbers: this.checkvalve,
        irrigationType: this.radio1,
        irrigationTime: Number(this.irrData.irrTime),
        irrigationVolume: Number(this.irrData.irrVolume),
        exeTime: this.dynamicValidateForm.domains[0].value
      }
      if (list.irrigationTime > 65535) {
        this.$message.error('灌溉时长不能超过65535秒')
        return false
      } else {
        const res = await this.$http.post('fertilizer/api/irrigation/saveOrUpdate', list)
        if (res.data.code === 100) {
          this.$message.error(res.data.data)
          return false
        } else if (res.data.code === 200) {
          this.$message.success('提交成功')
          this.dynamicValidateForm.domains = [{ value: '' }]
          this.irrData = {
            //  时长
            irrTime: 0,
            // 灌溉量
            irrVolume: 0
          }
          this.checkboxGroup = []
          this.checkvalve = ''
          this.flagHidden2 = false
        }
      }
    },
    // 删除
    del (index, row) {
      let ID = {
        id: row.id
      }
      if (row.status === '排队中') {
        this.checkboxGroup = []
        return false
      } else if (row.status === '执行中') {
        this.checkboxGroup = []
        return false
      } else {
        this.$confirm('此操作将永久删除该策略, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            await this.$http.post('fertilizer/api/irrigation/delete', ID)
            // 删除成功
            this.$message.success('删除成功')
            const totalPage = Math.ceil((this.total - 1) / this.pageSize)
            const pageNum = this.pageNum > totalPage ? totalPage : this.pageNum
            this.pageNum = pageNum < 1 ? 1 : pageNum
            this.getItem(this.addData.areaFormulaLinkId)
          })
          .catch(() => {})
      }
    },
    // 切换
    async areaTab () {
      this.checkboxGroup = []
      this.QueryFer().then(async () => {
        let ID = {
          areaId: this.areaId.id
        }
        const fomulaCrop = await this.$http.post('fertilizer/api/area/queryFormulaLinkByAreaId', ID)
        if (fomulaCrop.data.data.length === 0) {
          this.$message.warning('该温室没有配方数据！请到配方绑定页面中进行添加！')
          this.fomulaCrop = []
          this.addData.formulaId = ''
          this.mathData = {
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
          }
          this.tableData = []
          return false
        } else {
        // 直接调用this.getfomulalist()会出bug
          this.num = 0
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
        }
        this.getItem(this.fomulaCrop[0].id)
        this.pageNum = 1
      })
    },
    // 启动停止
    async onReady (index, row, e) {
      const ID = {
        scheduleId: row.id
      }
      this.$confirm('确定启动?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data } = await this.$http.post('fertilizer/api/irrigation/startupForcibly', ID)
          if (data.code === 200) {
            this.$message.success('启动成功')
          } else {
            this.$message.error(data.msg)
          }
          this.getItem(row.areaFormulaLinkId)
        })
        .catch(() => {})
    },
    onStop (index, row, e) {
      const ID = {
        fertilizerId: row.fertilizerId
      }
      this.$confirm('确定停止?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data } = await this.$http.post('fertilizer/api/irrigation/STOP', ID)
          if (data.code === 200) {
            this.$message.success('已停止')
          } else {
            this.$message.error(data.msg)
          }
          this.getItem(row.areaFormulaLinkId)
        })
        .catch(() => {})
    },
    // 单击显示阀号
    showValves (e) {
      if (e.status === '排队中') {
        this.$message.warning('排队中不可操作！')
        this.checkboxGroup = []
        return false
      } else if (e.status === '执行中') {
        this.$message.warning('执行中不可操作！')
        this.checkboxGroup = []
        return false
      } else {
        const a = JSON.parse(e.valveNumbers)
        this.ferindex = []
        const getindex = (arr, item) => {
          for (let i = 0; i < this.fergroup.length; i++) {
            if (arr[i] === item) {
              return i + 1
            }
          }
        }
        for (let j = 0; j < a.length; j++) {
          const element = a[j]
          this.ferindex.push(getindex(this.fergroup, element))
        }
        this.checkboxGroup = this.ferindex
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
          height: 40px;
          line-height: 40px;
        }
        // 阀号组件样式
        /deep/ .el-checkbox-group {
          // margin-top: 20px;
          position: absolute;
          left: 18%;
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
      height: 660px;
      .list {
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
        height: 155px;
        background-color: #242c3b;
        >div {
          float: left;
        }
        .target {
          margin: 20px 0 0 80px;

          div:first-child {
            width: 88px;
            height: 88px;
            line-height: 88px;
            border-radius: 50%;
            text-align: center;
            border: 1px solid #546d9d;
            font-size: 22px;
            font-weight: 800;
            background-color: #232733;
            color: #0ed6f4;
          }
          div:last-child {
            height: 36px;
            line-height: 36px;
            text-align: center;
          }
        }
        ul {
          display: inline-block;
          width: 570px;
          height: 114px;
          margin-left: 180px;
          .date {
            width: 100%;
            height: 34px;
            padding-left: 130px;
            .dateTitle {
              float: left;
              line-height: 34px;
            }
            .starts {
              float: left;
              line-height: 34px;
            }
          }
          .title {
            font-weight: 800;
            text-align: center;
            padding: 2px;
            border-bottom: 1px solid rgba(57, 146, 206, 0.8)
          }
          li {
            margin: 3px 0 0 0;
            float: left;
            span:first-child {
              display: inline-block;
              width: 120px;
              height: 25px;
              text-align: right;
            }
            span:last-child {
              display: inline-block;
              width: 70px;
              height: 25px;
              text-align: left;
            }
          }
        }
      }
      .Mainbody {
        position: relative;
        height: 466px;
        margin-top: 20px;
        background-color: #232733;
        padding-top: 28px;
        .tableData {
          width: 80%;
          margin: 0 auto;
          .box {
            margin-top: 12px;
            text-align: center;
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
              background-color: rgba(55, 59, 63, 0.9);
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
              background-color: rgba(78, 82, 87, 0.9);
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
          height: 40px;
          line-height: 40px;
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
            // float: left;
            padding-left: 10px;
            height: 250px;
            overflow-y: scroll;
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
        .model {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 20px;
          height: 251px;
          background-color: #242c3b;
        }
      }
    }
  }
}
</style>
