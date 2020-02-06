<template>
<div class="filecontainer">
    <avue-crud :data="data" :option="option" 
    v-model="obj" 
    :page='page'
    @on-load="onLoad"
    @size-change="sizeChange"
    @current-change="currentChange"
    @row-save="rowSave" 
    @row-update="rowUpdate" 
    @row-del="rowDel" 
    @search-change="searchChange">
    <template slot-scope="scope" slot="menu">
        <el-button v-if="scope.row.status!='drft'" type="info" size="small" @click="tip(scope.row,'drft')" icon="el-icon-close">drft</el-button>
        <el-button v-if="scope.row.status!='published'" type="success" size="small" @click="tip(scope.row,'published')" icon="el-icon-check">publish</el-button>
    </template>
    <template slot-scope="scope" slot="status">
       <el-tag  :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
    </template>
    </avue-crud>
</div>
    
</template>

<script>
import { fetchList,fetchOptions } from "@/api/course";
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        drft: "info"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      obj: {},
      data: [],
      page: {
        currentPage: 1,
        total: 0
      },
      query: {
        page: 1
      },
      option: {}
    };
  },
  methods: {
    onLoad(page) {
      this.query.page = this.page.currentPage;
      this.query.limit = this.page.pageSize;
      this.fetchData();
    },
    currentChange(val) {
      this.page.currentPage = val;
      this.fetchData();
      this.query.page = this.page.currentPage;
      this.query.limit = this.page.pageSize;
    },
    sizeChange(val) {
      this.page.currentPage = 1;
      this.query.page = this.page.currentPage;
      this.page.pageSize = val;
      this.query.limit = this.page.pageSize;
      this.fetchData();
    },
    fetchData() {
      fetchList(this.query).then(response=>{
        this.data = response.data
        this.page.total = response.total
      })
    },
    fetchOption() {
      fetchOptions().then(res=>{
      this.option = res.option
      })
    },

    searchChange(params, done) {
      done();
      if (params.title) {
        params.title = { $regex: params.title };
        this.query.where = params;
        this.fetchData();
        this.$message.success(JSON.stringify(params));
      } else {
        this.query.where = params;
        this.fetchData();
        this.$message.info(JSON.stringify(params));
      }
    },
    
    rowSave(row, done, loading) {
      this.$http.post("course", row);
      this.fetchData();
      done();
    },
  
    
    rowUpdate(row, index, done, loading) {
      const data = JSON.parse(JSON.stringify(row));
      delete data.$index;
      delete data.$Imp;
      delete data.$type;
      delete data.$status;
      this.$http.put("course/" + row._id, data);
      this.fetchData();
      done();
    },
    rowDel(row, index) {
      const data = JSON.parse(JSON.stringify(row));
      delete data.$index;
      delete data.$Imp;
      delete data.$type;
      delete data.$status;
      this.$http.delete("course/" + row._id, data);
      this.fetchData();
    },

    //更新
    tip(row, status) {
      row.status = status;
      const data = JSON.parse(JSON.stringify(row));
      delete data.$index;
      delete data.$Imp;
      delete data.$type;
      delete data.$status;
      this.$http.put("course/" + row._id, data);
      this.$message.success("success");
    }
  },
  created() {
    this.fetchData();
    this.fetchOption();
  }
};
</script>

<style>
.filecontainer {
  margin: 20px 20px 20px 20px;
}
</style>
