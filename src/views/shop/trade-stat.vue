<template>
  <div class="container">
    <div class="search-content">
      <div class="search-head">
        <div class="left">
          <el-button type="primary">新建线索</el-button>
          <el-button @click="dialogVisible=true">导入线索</el-button>
          <el-button icon="el-icon-download" @click="exportExcel" />
        </div>
        <div class="right">
          <el-select v-model="typeValue" clearable :placeholder="options[0].label">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <div class="search">
            <el-input v-model="searchValue" placeholder="请输入内容">
              <el-button slot="append" icon="el-icon-search" />
            </el-input>
          </div>
          <div class="dater">
            <el-date-picker
              v-model="dater"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>
        </div>
      </div>
      <div class="search-label">
        <div class="labels">
          <span>常用标签：</span>
          <div class="checkboxs">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="参与返款" />
              <el-checkbox label="支持赔付" />
              <el-checkbox label="反款待联系" />
              <el-checkbox label="鲁班线索" />
              <el-checkbox label="赠款活动" />
            </el-checkbox-group>
          </div>
        </div>
        <div class="setting">
          设置<i class="el-icon-setting" />
        </div>
      </div>
    </div>
    <div class="data-table">
      <el-table
        ref="dragTable"
        :data="tableData"
        style="width: 100%"
        :border="true"
        row-key="id"
      >
        <el-table-column
          v-for="colum in columnData"
          :key="colum.name"
          :label="colum.name"
          :prop="colum.prop"
          :min-width="colum.width"
        />
        <el-table-column
          align="center"
        >
          <template slot="header" slot-scope="scope">
            <span>操作</span>
            <span class="colum-custom">自定义<i class="el-icon-setting" /></span>
          </template>
          <template slot-scope="scope">
            <div class="colum-btns">
              <span @click="onDetail(scope.$index,scope.row)">详情</span>
              <span><i class="el-icon-phone">通话</i></span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="deatil-drawer">
      <el-drawer
        :visible.sync="drawer"
        direction="rtl"
        size="50%"
      >
        <div class="drawer-content">
          <div class="head">
            <span v-if="rowIdx > -1">{{ tableData[rowIdx]['name'] }}</span>
            <span><i class="el-icon-phon">拨打电话</i></span>
          </div>
        </div>
      </el-drawer>
    </div>
    <div class="dialog">
      <el-dialog
        title="导入线索"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <div class="content">
          <div class="dowload">
            <span class="label">下载模板</span>
            <div class="dowload-btn">
              <el-button type="primary" icon="el-icon-download" @click="downloadTemp">下载模板</el-button>
              <p class="note">请按数据模板的格式准备要导入的数据</p>
            </div>
          </div>
          <div class="upload">
            <span class="label">上传文件</span>
            <div class="upload-btn">
              <upload-excel ref="uploadExcel" :request-u-r-l="uploadFileExcel" :t-header="tHeader" />
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="importExcel">开始导入</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import { parseTime } from '@/utils'
import { uploadFileExcel } from '@/api/table'
import uploadExcel from '@/components/Upload/UploadExcel'
export default {

  components: {
    uploadExcel
  },
  data() {
    return {
      searchValue: '', // 搜索内容
      typeValue: '', // 下拉菜单值
      options: [
        { value: 1, label: '按姓名' },
        { value: 2, label: '按QQ号' },
        { value: 3, label: '按邮箱' },
        { value: 4, label: '按详细地址' }
      ],
      dater: null, // 日期
      checkList: [], // 标签
      columnData: [ // 表格列信息
        { name: 'id', prop: 'id', width: '' },
        { name: '姓名', prop: 'name', width: '' },
        { name: '电话', prop: 'tel', width: '' },
        { name: '所属人', prop: 'belongPeople', width: '' },
        { name: '线索状态', prop: 'cluesState', width: '' },
        { name: '通话状态', prop: 'callState', width: '' },
        { name: '标签', prop: 'label', width: '' },
        { name: '线索类型', prop: 'cluesType', width: '' },
        { name: '业务来源', prop: 'businessSource', width: '' },
        { name: '流量来源', prop: 'trafficSource', width: '' },
        { name: '转化状态', prop: 'converState', width: '' },
        { name: '落地页链接', prop: 'pageLink', width: '120' }
      ],
      tableData: [], // 表格信息
      tHeader: [], // 表头信息
      drawer: false, // 是否显示详情界面
      rowIdx: -1, // 详情信息索引
      dialogVisible: false, // 显示上传框
      uploadFileExcel
    }
  },

  computed: {},

  created() {
    // 设置dater默认显示当前时间至一周前
    // dater的格式为[时间戳，时间戳]
    const date = new Date()
    const d1 = date.getTime()
    const d2 = date.setTime(d1 - 3600 * 1000 * 24 * 7)
    this.dater = [d2, d1]

    // 表格数据信息
    setTimeout(() => {
      this.tableData = [
        { id: 1, name: '未命名', tel: '13342088500', belongPeople: '', cluesState: '未联系', callState: '有效沟通', label: '', cluesType: '智能电话', businessSource: '橙子建站', trafficSource: '抖音', converState: '合法转化', pageLink: 'https://www.ccc.com' },
        { id: 2, name: '张三里', tel: '13325088500', belongPeople: '', cluesState: '未联系', callState: '有效沟通', label: '', cluesType: '智能电话', businessSource: '橙子建站', trafficSource: '抖音', converState: '合法转化', pageLink: 'https://www.ccc.com' },
        { id: 3, name: '丽丽', tel: '13358088500', belongPeople: '', cluesState: '未联系', callState: '有效沟通', label: '', cluesType: '智能电话', businessSource: '橙子建站', trafficSource: '抖音', converState: '合法转化', pageLink: 'https://www.ccc.com' },
        { id: 4, name: '张良', tel: '15442088500', belongPeople: '', cluesState: '未联系', callState: '有效沟通', label: '', cluesType: '智能电话', businessSource: '橙子建站', trafficSource: '抖音', converState: '合法转化', pageLink: 'https://www.ccc.com' },
        { id: 5, name: '王蒙', tel: '13642088500', belongPeople: '', cluesState: '未联系', callState: '有效沟通', label: '', cluesType: '智能电话', businessSource: '橙子建站', trafficSource: '抖音', converState: '合法转化', pageLink: 'https://www.ccc.com' },
        { id: 6, name: '徐柳', tel: '18942088500', belongPeople: '', cluesState: '未联系', callState: '有效沟通', label: '', cluesType: '智能电话', businessSource: '橙子建站', trafficSource: '抖音', converState: '合法转化', pageLink: 'https://www.ccc.com' },
        { id: 7, name: '鹤望兰', tel: '16342088500', belongPeople: '', cluesState: '未联系', callState: '有效沟通', label: '', cluesType: '智能电话', businessSource: '橙子建站', trafficSource: '抖音', converState: '合法转化', pageLink: 'https://www.ccc.com' },
        { id: 8, name: '和天文', tel: '17732088500', belongPeople: '', cluesState: '未联系', callState: '有效沟通', label: '', cluesType: '智能电话', businessSource: '橙子建站', trafficSource: '抖音', converState: '合法转化', pageLink: 'https://www.ccc.com' }
      ]
    }, 1000)
    this.tHeader = this.columnData.map(td => {
      return td.name
    })

    this.$nextTick(() => {
      this.setSort()
    })
  },

  methods: {
    onDetail(index, row) {
      // scope 行信息，列信息 索引
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].id === row.id) {
          this.rowIdx = i
          break
        }
      }
      console.log(index, row.id, this.rowIdx)
      if (this.rowIdx < 0) return
      this.drawer = true
    },

    // 导出
    exportExcel() {
      import('@/vendor/Export2Excel').then(excel => {
        const filterVal = this.columnData.map(td => {
          return td.prop
        })
        const data = this.formatJson(filterVal, this.tableData)
        excel.export_json_to_excel({
          header: this.tHeader, // 表头 必填
          data, // 具体数据 必填
          filename: 'crm', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx' // 非必填
        })
      })
    },
    // json转二维数组
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },

    // 导入
    async importExcel() {
      await this.$refs['uploadExcel'].importExcel()
    },

    // 下载
    downloadTemp() {
      window.location.href = 'http://127.0.0.1:7001/public/crm.xlsx'
    },

    // 拖拽
    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
          const targetRow = this.tableData.splice(evt.oldIndex, 1)[0]
          this.tableData.splice(evt.newIndex, 0, targetRow)
        }
      })
    }
  }
}

</script>
<style>
.sortable-ghost{
  opacity: .8;
  color: #fff!important;
  background: #42b983!important;
}
</style>
<style lang='scss' scoped>
.container{
  padding: 20px 30px;
  .search-content{
    background: $appMainPageBg;
    box-shadow: 0 6px 6px -6px #ccc;
    .search-head{
      display: flex;
      justify-content: space-between;
      padding: 10px 20px;
      border-bottom: 1px solid #eee;
      .right{
        display: flex;
        .search{
          ::v-deep{
            width: 200px;
          }
        }
        .dater{
          margin-left: 10px;
        }
      }
    }
    .search-label{
      display: flex;
      justify-content: space-between;
      padding: 10px 20px;
      .labels{
        display: flex;
      }
      .setting{
        color: #0672ff;
      }
    }
  }
  .data-table{
    margin-top: 20px;
    box-shadow: 0 0 6px #ccc;
    .colum-custom{
      color: $menuActiveText;
      margin-left: 10px;
    }
    .colum-btns{
      color: $menuActiveText;
      display: flex;
      justify-content: space-around;
    }
  }
  .dialog{
    .content{
      box-sizing: border-box;
      .dowload,.upload{
        display: flex;
        // align-items: center;
        .label{
          margin-right: 30px;
          line-height: 40px;
        }
      }
      .dowload{
        margin-bottom: 25px;
        .note{
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>
