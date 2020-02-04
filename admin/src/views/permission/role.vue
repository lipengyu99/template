<template>
<div class="file">
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
        <el-button v-if="scope.row.status!='ban'" type="danger" size="small" @click="tip(scope.row,'ban')" icon="el-icon-close">禁用</el-button>
        <el-button v-if="scope.row.status!='used'" type="success" size="small" @click="tip(scope.row,'used')" icon="el-icon-check">启用</el-button>
    </template>
    <template slot-scope="scope" slot="status">
       <el-tag  :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
    </template>
    </avue-crud>
</div>
 
</template>

<script>
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        used: "success",
        ban: "danger"
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
      option: {
      }
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
      this.$http
        .get("permission", {
          params: {
            query: this.query
          }
        })
        .then(response => {
          this.data = response.data.data;
          this.page.total=response.data.total
        });
    },
    fetchOption() {
      this.$http.get("permission/option").then(res => {
       this.option =res.data.option
      });
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
    dateChange(date) {
      // window.console.log(date);
      this.$message.success(date);
    },
    rowSave(row, done, loading) {
      this.$http.post("permission", row);
      this.fetchData();
      done();
    },
    rowUpdate(row, index, done, loading) {
      const data = JSON.parse(JSON.stringify(row));
      delete data.$index;
      delete data.$Imp;
      delete data.$type;
      delete data.$status;
      this.$http.put("permission/" + row._id, data);
      this.fetchData();
      done();
    },
    rowDel(row, index) {
      const data = JSON.parse(JSON.stringify(row));
      delete data.$index;
      delete data.$Imp;
      delete data.$type;
      delete data.$status;
      this.$http.delete("permission/" + row._id, data);
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
      this.$http.put("permission/" + row._id, data);
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
.file{
    margin: 20px 20px 20px 20px;
}
</style>
