<template>
  <div class="explore">
    <div style="margin-top: 5px">
      <el-input type="text" suffix-icon="el-icon-search" style="width: 320px" placeholder="请输入关键字" v-model="input" @keyup.enter.native="search"></el-input>
      <el-button type="primary" style="margin-left: 90px" @click="search">搜索</el-button>
    </div>
    <div class="explore-table" style="margin-top: 20px">
      <el-table
              :data="tableData"
              stripe
              border
              style="width: 100%">
        <el-table-column
                type="index"
                label="序号"
                width="70px">
          <template slot-scope="scope">
            <span>{{(currentPage-1)*pageSize+scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="domainName"
          label="域名"
          width="150px"/>
        <el-table-column
                prop="ipv6"
                label="IPv6地址"
                width="200px"/>
        <el-table-column
                prop="asNumber"
                label="AS号">
        </el-table-column>
        <el-table-column
                prop="asName"
                label="AS名称"
                width="200px">
        </el-table-column>
        <el-table-column
                prop="org"
                label="AS机构"
                width="200px">
        </el-table-column>
        <el-table-column
                prop="classify"
                label="行业分类">
        </el-table-column>
        <el-table-column
                prop="name"
                label="名称">
        </el-table-column>
        <el-table-column
                prop="geo"
                label="位置">
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
            class="pager"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import {requestServer} from "../../network/requestIPv6Info";

  export default {
    name: "service",
    data(){
      return{
        all:[],
        active:0,
        tableData:[],
        total: 0,
        pageSize: 50,
        currentPage:1,
        data:{},
        input: '',
        value: [],
      }
    },
    mounted(){
     this.getData()
    },
    methods:{
      handleCurrentChange(val) {
        window.scroll(0,0)
        this.currentPage = val
        requestServer(val,this.pageSize).then(res => {
          this.tableData = []
          let data = res.data.data
          //this.tableData = data.data.splice((val-1)*this.pageSize,this.pageSize)
          for(let i = (val-1)*this.pageSize;i < this.pageSize * val;i++){
            if(data.data[i]){
              this.tableData.push(data.data[i])
            }
          }
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      search() {
       let arr = []
       for(let item of this.all){
         if(!arr.includes(item.classify)){
           arr.push(item.classify)
         }
       }
        this.input = this.input.trim()
        // if(this.input !== '国务院部门网站' && this.input !== '地方政府网站' && this.input !== '中央企业网站' && this.input !== '政府职能网站'&& this.input !== '地市级政府网站' && this.input !== '部委直属高校'&& this.input !== '地方高校'&& this.input !== '生活服务'&& this.input !== '网络科技'&& this.input !== '购物'&& this.input !== '新闻媒体') {
        if(!arr.includes(this.input)){
          //this.input = ''
          alert('请输入正确的行业分类')
        }else{
          let table =  this.all.filter(item => {
            return item.classify === this.input
          })
          this.total = table.length
          this.tableData = table.splice(0,this.pageSize)
        }
      },
      getData(){
        requestServer(this.currentPage,this.pageSize).then(res => {
          let data = res.data.data
          this.all = data.data
          // this.tableData = data.data.splice(0,this.pageSize)
          for(let i = 0;i < this.pageSize;i++){
            this.tableData.push(data.data[i])
          }
          this.total = data.total
        })
      }
    }
  }
</script>

<style scoped>
  .explore-top{
    /*margin-left: 30px;*/
  }
  .my-steps{
    display: inline-block;
    width: 900px;
    position: relative;
    left: 100px;
    top: -10px;
  }
  .pager{
    width: 500px;
    background-color: #f8f8f8;
    margin-top: 30px;
    margin-bottom: 20px;
  }
</style>

