<template>
<div class="file">
  <el-container>
    <el-aside width="200px">
        <avue-tree :option="treeOption" :data="treeData" @node-click="nodeClick"></avue-tree>
    </el-aside>
    <el-main>
        <avue-crud 
        :data="data" 
        :option="option" 
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
              <el-button v-if="scope.row.status!='ban'" 
              type="danger" size="small" @click="tip(scope.row,'ban')" 
              icon="el-icon-close">禁用</el-button>
              <el-button v-if="scope.row.status!='used'" 
              type="success" size="small" @click="tip(scope.row,'used')" 
              icon="el-icon-check">启用</el-button>
            </template>
            <template slot-scope="scope" slot="status">
              <el-tag  :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
            </template>
        </avue-crud>
    </el-main>
</el-container>
</div>
 
</template>

<script>
import { getAllRole, getOptions } from "@/api/role";
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
      treeData: [
        {
          id: 0,
          label: "运营部门",
          value: 0,
          children: [
            {
              id: 1,
              label: "武汉运营部门",
              value: 0
            },
            {
              id:2,
              label:'锦山运营部门',
              value:1
            },
            {
              id:3,
              label:'北京运营部门',
              value:'2'
            }
          ]
        },
        {
          id: 1,
          label: "技术部门",
          value: 1,
          children: [
            {
              id: 2,
              label: "武汉技术部门",
              value: 0
            },
            {
              id:3,
              label:'锦山技术部门',
              value:1
            },
            {
              id:4,
              label:'北京技术部门',
              value:'2'
            }
          ]
        },

      ],
       treeOption:{
            nodeKey:'id',
            addBtn:false,
            menu:false,
            size:'small',
            formOption:{
              labelWidth:100,
              column:[{
                  label:'自定义项',
                  prop:'test'
              }],
            },
            props:{
              labelText:'标题',
              label:'label',
              value:'value',
              children:'children'
            }
          },
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
      getAllRole(this.query).then(res => {
        this.data = res.data;
        this.page.total = res.total;
      });
    },
    fetchOption() {
      getOptions().then(res => {
        this.option = res.option;
      });
    },
    searchChange(params, done) {
      done();
      if (params.name) {
        params.name = { $regex: params.name };
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
      this.$http.post("permission", row);
      this.fetchData();
      done();
    },
    rowUpdate(row, index, done, loading) {
      const data = JSON.parse(JSON.stringify(row));
      delete data.$index;
      delete data.$Imp;
      delete data.$status;
      delete data.$department;
      this.$http.put("permission/" + row._id, data);
      this.fetchData();
      done();
    },
    rowDel(row, index) {
      const data = JSON.parse(JSON.stringify(row));
      delete data.$index;
      delete data.$Imp;
      delete data.$status;
      delete data.$department;
      this.$http.delete("permission/" + row._id, data);
      this.fetchData();
    },

    //更新
    tip(row, status) {
      row.status = status;
      const data = JSON.parse(JSON.stringify(row));
      delete data.$index;
      delete data.$Imp;
      delete data.$status;
      delete data.$department;
      this.$http.put("permission/" + row._id, data);
      this.$message.success("success");
    },
    nodeClick(data){
      window.console.log(data.value)
    }
    
  },
  created() {
    this.fetchData();
  
    this.fetchOption();
  }
};
</script>

<style>
.file {
  margin: 20px 0px 20px 20px;
}
</style>
