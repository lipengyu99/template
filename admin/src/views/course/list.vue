<template>
    <div> 
        <div class="filter-container">
            <h3>课程列表</h3>
            <el-input v-model="listQuery.title" placeholder="标题" style="width:200px" @keyup.enter.native = true>
            </el-input>
            <el-select v-model="listQuery.importantOptions" clearable placeholder="重要性" style="width:90px;">
                <el-option v-for="item in importantOptions"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>
            </el-select>
            <el-select v-model="listQuery.type" placeholder="类型">
                <el-option v-for="item in calendaroptions"
                    :key="item.key"
                    :label="item.label"
                    :value="item.key">
                </el-option>
            </el-select>
            <el-button type="primary" @click="handleFilter" icon="el-icon-search" style="margin-left:10px">搜索</el-button>
            <el-button type="primary" @click="handleFilter" icon="el-icon-edit">编辑</el-button>
            <el-button type="primary" @click="handleFilter" icon="el-icon-download">导出</el-button>
            <div style="margin-top:10px;">
                <el-checkbox v-model="showReviewer" label="审核人"></el-checkbox>
            </div>
            <el-table :data="list" border fit 
            highlight-current-row 
           
            style="width: 100%;margin-top:20px;">
                <el-table-column v-for="col in columns.item"
                    :prop="col.prop"
                    :key="col.id"
                    :label="col.label"
                    :width="col.width">
                </el-table-column>
                <el-table-column
                    prop="action"
                    key="action"
                    label="操作">
                    <template slot-scope="{row}">
                        <el-button size="mini" type="primary" @click="handleUpdate(row)" >编辑</el-button>
                        <el-button size="mini" type="danger" >删除</el-button>
                        
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin-top:20px">
                <el-pagination
               @size-change="sizeChange"
               @current-change="currentChange"
               :current-page="currentPage"
               :page-sizes="[20, 40, 80, 100]"
               :page-size="pageSize"
               layout="total, sizes, prev, pager, next, jumper"
               :total="total" background>
                </el-pagination>
            </div>
            <el-dialog
                :title="textMap[dialogStatus]"
                :visible.sync="dialogFormVisible"
                width="50%"
                >
                <el-form :model="temp" ref="dataForm" label-width="80px">
                    <el-form-item label="类型" prop="type">
                       <el-select v-model="temp.type" placeholder="选择类型" style="width:100%">
                           <el-option v-for="item in calendaroptions"
                               :key="item.key"
                               :label="item.label"
                               :value="item.key">
                           </el-option>
                       </el-select>
                    </el-form-item>
                    <el-form-item label="状态" style="width:100%">
                            <el-select v-model="temp.status" placeholder="状态">
                                <el-option v-for="item in statusOptions"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                                </el-option>
                            </el-select>
                    </el-form-item>
                    <el-form-item label="重要性">
                        <el-rate v-model="temp.importance"  :max="3" style="margin-top:8px;"></el-rate>
                    </el-form-item>
                    <el-form-item label="标题" prop="title">
                        <el-input v-model="temp.title" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">立即创建</el-button>
                        <el-button @click="dialogFormVisible=false">取消</el-button>
                    </el-form-item>
                </el-form>
                
                
               
            </el-dialog>
            
           
            
        </div>
    </div>
</template>

<script>
import { parseTime } from "../../utils/index.js";
export default {
  data() {
    return {
        dialogStatus:'',
        textMap:{
            update:'Edit',
            creare:'Create',
        },
        dialogFormVisible:false,
      currentPage: 1,
      pageSize: 20,
      resource: "",
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        title: undefined,
        importantOptions: undefined,
        type: undefined,
        page: 1,
        limit: 20,
        sort: "+id"
      },
      temp: {
        id: undefined,
        importance: 1,

        timestamp: new Date(),
        title: "",
        type: "",
        status: "发布成功"
      },
      importantOptions: [1, 2, 3],
      calendaroptions : [{ key: 'CN', label: 'China' },
        { key: 'US', label: 'USA' },
        { key: 'JP', label: 'Japan' },
        { key: 'EU', label: 'Eurozone' }],
         statusOptions: ['发布成功', '草稿', '删除'],
      showReviewer: false,
      columns: {
        item: [
          {
            id: "1",
            label: "ID",
            width: "80px",
            prop: "_id"
          },
          {
            id: "2",
            label: "创建时间",
            width: "150px",
            prop: "createdAt"
          },
          {
            id: "3",
            label: "标题",
            width: "150px",
            prop: "title"
          },
          {
            id: "4",
            label: "重要性",
            width: "150px",
            prop: "Imp"
          },
          {
            id: "5",
            label: "类型",
            width: "150px",
            prop: "type"
          },
          {
            id: "6",
            label: "状态",
            width: "150px",
            prop: "status"
          }
        ]
      }
    };
  },
  methods: {
    getList() {
      this.listLoading = true;
      const res = this.$http.get("course", this.listQuery).then(response => {
        
        this.list = response.data.data;
        this.total = response.data.total
      });
    },
    sizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    currentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleFilter() {
      this.listQuery.page = 1;
    },
    handleUpdate(row) {
        this.dialogFormVisible = true
       this.temp = Object.assign({},row)
       this.dialogStatus = 'update'
    //    this.$nextTick(() => {
    //     this.$refs['dataForm'].clearValidate()
    //   })
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style>
.filter-container {
  margin: 20px 20px 20px 20px;
}
</style>
