<template>
<div class="filecontainer">
    <avue-crud :data="data" :option="option3" v-model="obj" @date-change="dateChange" @row-save="rowSave" @row-update="rowUpdate" @row-del="rowDel" @search-change="searchChange">
    <template slot-scope="scope" slot="_idForm">
        <el-tag type="info" >新增</el-tag>
    </template>
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
      query: {
        page: 1
      },
      option3: {
        index: true,
        indexLabel: "序号",
        title: "课程管理",
        menuType: "icon",
        page: false,
        align: "center",
        dateBtn: true,
        dateDefault: true,
        menuAlign: "center",
        column: [
          {
            label: "标题",
            prop: "title",
            search: true,
            regex: true
          },
          {
            label: "重要性",
            prop: "Imp",
            type: "select",
            search: true,
            sortable: true,
            dicData: [
              { value: 1, label: "1" },
              { value: 2, label: "2" },
              { value: 3, label: "3" }
            ]
          },
          {
            label: "类型",
            prop: "type",
            type: "select",
            search: true,

            dicData: [
              { value: "CN", label: "China" },
              { value: "US", label: "USA" },
              { value: "JP", label: "Japan" },
              { value: "EU", label: "Eurozone" }
            ]
          },
          {
            label: "日期",
            prop: "createdAt",
            type: "date",
            sortable: true,
            format: "yyyy-MM-dd hh:mm:ss",
            valueFormat: "yyyy-MM-dd hh:mm:ss",
            addDisabled: true
          },
          {
            label: "状态",
            prop: "status",
            slot: true,
            type: "select",
            dicData: [
              { value: "published", label: "发布成功" },
              { value: "drft", label: "草稿" }
            ]
          }
        ]
      }
    };
  },
  methods: {
    fetchData() {
      this.$http
        .get("course", {
          params: {
            query: this.query
          }
        })
        .then(response => {
          this.data = response.data.data;
        });
    },
    fetchOption() {
      this.$http.get("course/option").then(res => {
        console.log(res);
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
      //this.$message.success(date);
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
    //this.fetchOption();
  }
};
</script>

<style>
.filecontainer {
  margin: 20px 20px 20px 20px;
}
</style>
