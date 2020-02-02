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
                    :label="item"
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
                    :prop="col.id"
                    :key="col.id"
                    :label="col.label"
                    :width="col.width">
                </el-table-column>
                <el-table-column
                    prop="action"
                    key="action"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" >编辑</el-button>
                        <el-button size="mini" type="danger" @click="remove(scope.row)">删除</el-button>
                        
                    </template>
                </el-table-column>
                
                
            </el-table>
            
        </div>
    </div>
</template>

<script>
//import {fetchList} from '@/api/course'
export default {
  data() {
    return {
      listLoading: true,
      listQuery: {
        title: undefined,
        importantOptions: undefined,
        type: undefined,
        page: 1,
        limit: 20,
        sort: "+id"
      },
      importantOptions: [1, 2, 3],
      calendaroptions: undefined,
      showReviewer: false,
      columns: {
        item: [
          {
            id: "1",
            label: "ID",
            width: "80px",
            prop: "id"
          },
          {
            id: "2",
            label: "创建时间",
            width: "150px",
            prop: "createat"
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
            prop: "Imp",
          },
          {
              id:"5",
              label:'类型',
              width:'150px',
              prop:'type'
          },
          {
            id: "6",
            label: "状态",
            width: "150px",
            prop: "status"
          },
         
        ]
      }
    };
  },
  methods: {
    getList() {
      this.listLoading = true;
      // this.getList()
    },
    handleFilter() {
      this.listQuery.page = 1;
    }
  }
};
</script>

<style>
.filter-container{
    margin: 20px 20px 20px 20px
}
</style>
