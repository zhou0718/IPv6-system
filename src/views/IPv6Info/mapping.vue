<template>
  <div class="explore">
      <div style="margin-top: 5px">
        <el-input type="text" suffix-icon="el-icon-search" style="width: 320px" placeholder="请输入关键字" v-model="input" @keyup.enter.native="search"></el-input>
       <!-- <el-select v-model="value"  placeholder="请选择" style="margin-left: 72px;width: 320px;">
          <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>-->
        <el-button type="primary" style="margin-left: 90px" @click="search">搜索</el-button>
      </div>
    <div class="explore-table" style="margin-top: 20px">
      <el-table
              :data="tableData"
              stripe
              border
              style="width: 100%">
        <el-table-column
                prop="serialNumber"
                label="序号"
                width="70px"/>
        <el-table-column
                prop="ipv6Address"
                label="IPv6地址"
                width="300px"/>

        <el-table-column
                prop="asNumber"
                label="自治域号"
                width="100px">
        </el-table-column>
        <el-table-column
                prop="asName"
                label="自治域名称">
        </el-table-column>
        <el-table-column
                prop="addressType"
                label="设备类型"
                width="100px">
        </el-table-column>
        <el-table-column
                prop="organization"
                label="组织机构">
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
  import {requestFacility} from "../../network/requestIPv6Info";
  export default {
    name: "explore",
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
        requestFacility(this.currentPage,this.pageSize).then(res => {
          window.scroll(0,0)
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
        this.input = this.input.trim()
        if(this.input !== '路由器' && this.input !== '服务器' && this.input !== '客户端' && this.input !== 'DNS服务器') {
          alert('请输入正确的设备类型')
        }else{
          console.log(this.all.length);
          let table =  this.all.filter(item => {
            return item.addressType === this.input
          })
          this.total = table.length
          this.tableData = table.splice(0,this.pageSize)
        }
      },
      getData() {
        requestFacility(this.currentPage,this.pageSize).then(res => {
          let data = res.data.data
          this.all = data.data
          // this.tableData = data.data.splice(0,this.pageSize)
          for(let i = 0;i < this.pageSize;i++){
            this.tableData.push(data.data[i])
          }
          this.total = data.total
        })
      }
    },

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

