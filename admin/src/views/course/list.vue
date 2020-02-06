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
            <el-button type="primary" @click="handleCreate" icon="el-icon-edit">添加</el-button>
            <el-button type="primary" @click="handleFilter" icon="el-icon-download">导出</el-button>
            <div style="margin-top:10px;">
                <el-checkbox v-model="showReviewer" label="审核人"></el-checkbox>
            </div>
            <el-table :data="list" border fit 
            highlight-current-row 
            v-loading="listLoading"
           
             :default-sort = "{prop: 'Imp', order: 'descending'}"
            style="width: 100%;margin-top:20px;">
                <el-table-column v-for="col in columns.item"
                    :prop="col.prop"
                    :key="col.id"
                     :sortable="col.sortable"
                    :label="col.label"
                    :width="col.width">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    sortable
                    width="150px">
                    <template slot-scope="{row}">
                        <el-tag :type="row.status | statusFilter" >{{row.status}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="action"
                    key="action"
                    label="操作">
                    <template slot-scope="{row}">
                        <el-button size="mini" type="primary" @click="handleUpdate(row)" >编辑</el-button>
                        <el-button size="mini" v-if="row.status!='发布成功'" type="success" @click="handleModifyStatus(row,'发布成功')">发布</el-button>
                        <el-button size="mini" v-if="row.status!='草稿'" type="info" @click="handleModifyStatus(row,'草稿')">草稿</el-button>
                        <el-button size="mini" type="danger" @click="remove(row)">删除</el-button>
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
                        <el-rate v-model="temp.Imp"  :max="3" style="margin-top:8px;"></el-rate>
                    </el-form-item>
                    <el-form-item label="标题" prop="title">
                        <el-input v-model="temp.title" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
  filters: {
    statusFilter(status) {
      const statusMap = {
        发布成功: "success",
        草稿: "info",
      };
      return statusMap[status]
    }
  },
  data() {
    return {
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "创建"
      },
      dialogFormVisible: false,
      currentPage: 1,
      pageSize: 1,
      resource: "",
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        title: undefined,
        importantOptions: undefined,
        type: undefined,
        page: 1,
      },
      temp: {
        id: "",
        Imp: 1,
        title: "",
        type: "",
        status: "发布成功"
      },
      importantOptions: [1, 2, 3],
      calendaroptions: [
        { key: "CN", label: "China" },
        { key: "US", label: "USA" },
        { key: "JP", label: "Japan" },
        { key: "EU", label: "Eurozone" }
      ],
      statusOptions: ["发布成功", "草稿"],
      showReviewer: false,
      columns: { }
    };
  },
  methods: {
      getoption(){
          this.$http.get('course/option').then(response=>{
            this.columns = response.data.columns
          })
      },
    getList() {
      this.listLoading = true;
      this.$http.get("course",{params:this.listQuery}).then(response => {
        this.list = response.data.data;
        this.total = response.data.total;
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },
    sizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    currentChange(val) {
      console.log(`当前页: ${val}`);
    },
    sortChange(params){
        console.log(params)
    },
    handleModifyStatus(row,status){
        this.$message({
            message:'success',
            type:'success',
        })
        row.status = status
        
        this.$http.put('course/'+row._id,row)
    },

    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleUpdate(row) {
      this.dialogFormVisible = true;
      this.temp = Object.assign({}, row);
      this.dialogStatus = "update";
      this.temp.id = row._id;
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        Imp: 1,
        title: "",
        type: "",
        status: "发布成功"
      };
    },
    handleCreate() {
      this.dialogFormVisible = true;
      this.resetTemp();
      this.dialogStatus = "create";
    },
    remove(row) {
      this.$confirm("是否确定删除该文件？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http.delete("course/" + row._id);
        this.getList();
      });

      console.log("remove" + row._id);
    },
    onSubmit() {
      if (this.temp.id == undefined) {
        //创建
        this.$http.post("course", this.temp);
        this.dialogFormVisible = false;
        this.getList();
      } else {
        this.$http.put("course/" + this.temp.id, this.temp);
        this.dialogFormVisible = false;
        this.getList();
      }
    }
  },
  created() {
    this.getList();
    this.getoption();
  }
};
</script>

<style>
.filter-container {
  margin: 20px 20px 20px 20px;
}
</style>
