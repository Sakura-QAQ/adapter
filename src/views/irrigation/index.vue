<template>
  <div class="irr-container">
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="100px"
      class="demo-dynamic"
    >
      <el-select v-model="value" placeholder="请选择施肥机" size="small">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-form-item
        v-for="(domain, index) in dynamicValidateForm.domains"
        :label="'策略' + (index + 1)"
        :key="domain.key"
        :prop="'domains.' + index + '.value'">
        启动时间：
        <el-time-select
          v-model="domain.value"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30'
          }"
          placeholder="选择时间">
        </el-time-select>
        自动：
        <el-switch
          v-model="swich"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
        手动：
        <el-switch
          v-model="swich"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
        <!-- <el-input v-model="domain.value"></el-input> -->
        <el-button @click.prevent="removeDomain(domain)" size="mini">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="addDomain">新增策略</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dynamicValidateForm: {
        domains: [
          {
            value: ''
          }
        ],
        plan: ''
      },
      options: [
        {
          value: '选项1',
          label: '1#施肥机'
        },
        {
          value: '选项2',
          label: '2#施肥机'
        }
      ],
      value: '',
      swich: false
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    removeDomain (item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain () {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .irr-container {
    .el-select {
      margin: 0 0 20px 6%;
    }
    .el-form-item /deep/ .el-form-item__label{
      color: #fff;
    }
  }
</style>
