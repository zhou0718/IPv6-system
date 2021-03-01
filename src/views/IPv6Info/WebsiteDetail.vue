<template>
  <!--<div style="width: 530px;">
    <div style="font-size: 20px;margin-bottom: 30px;width:380px;text-align: center" >网站详细信息</div>
    <el-form label-position="left" label-width="80px" >
      <el-form-item  label="ip地址 :">
        <el-input style="width: 300px" v-model=webIp :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="访问时间 :">
        <el-input style="width: 300px" v-model=visitTime :disabled="true"></el-input>
      </el-form-item>
      &lt;!&ndash;<el-form-item label="服务类型:">

      </el-form-item>
      <el-form-item label="网站业务概述:">

      </el-form-item>&ndash;&gt;
    </el-form>
  </div>-->
  <div class="webisteDetail">
    <el-table
            :data="tableData"
            stripe
            border
            fit
            style="width: 100%"
            :header-cell-style="{'text-align':'left'}">


      <el-table-column
              prop="webIp"
              label="ip地址" />



      <el-table-column
              prop="visitTime"
              label="访问时间" />

      <el-table-column
              prop="url"
              label="访问url" />

      <el-table-column
              prop="httpStatusCode"
              label="http状态码" />


    </el-table>

   <!-- <div class="block" style="float: right;margin-right: 5%;margin-top: 3%">
       <el-pagination
          :size-change="handleSizeChange"
          :current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="10"
          layout="total,prev,pager,next,jumper"
          :total="400" >

       </el-pagination>
    </div>-->
  </div>
</template>

<script>
import {requestWebsiteInfo} from "../../network/requestWebsite";

export default {
    name: "WebsiteDetail",
    data(){
      return{
        tableData: [],
        webIp: '',
        visitTime: '',
        id: 0,
        index: 0
      }
    },
    mounted() {
      this.getData()
    },
    methods:{
      getData(){
        this.id = this.$route.query.id
        console.log(this.id);
        this.index = this.$route.query.index
        // console.log(this.index);
        requestWebsiteInfo(this.id).then(res => {
          this.tableData = res.data.data
          console.log(this.tableData);
          /* this.webIp = res.data.data[this.index].webIp
           this.visitTime = res.data.data[this.index].visitTime*/
        })
      }
    }
  }
</script>

<style scoped>

</style>
