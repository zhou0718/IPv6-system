<template>
  <div class="addView">
    <el-table
            :data="tableData"
            stripe
            border
            fit
            :cell-style="{'text-align':'center'}"
            :header-cell-style="{'text-align':'center'}"
    >

      <el-table-column
              width="100px"
              prop="id"
              label="id" />

      <el-table-column
              width="100px"
              prop="name"
              label="name" >

      </el-table-column>

      <el-table-column
              width="90px"
              prop="status"
              label="状态" />

      <el-table-column
              prop="recorded_lng"
              label="recorded_lng" />
      <el-table-column
              prop="recorded_lat"
              label="recorded_lat" />

      <el-table-column
              width="170px"
              prop="coding"
              label="编解码" />

      <el-table-column
              prop="time"
              label="最新时间" />
      <el-table-column
              width="130px"
              prop="device_type"
              label="设备类型" />
    </el-table>
   <!-- <el-pagination
            class="pager"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total">
    </el-pagination>-->
  </div>
</template>

<script>
  import {getAllDevices} from "../../network/requestDeviceAll";

  export default {
    name: "addlist",
    data(){
      return{
        active:0,
        tableData:[],
        total: 0,
        pageSize: 50,
        currentPage:1,
        // start_time: '2020-04-08 11:11:11',
        // end_time: '2020-07-23 21:00:57',
      }
    },
    mounted(){
      getAllDevices().then(res => {
        let data = res.data.data
        // console.log(data);
        data = data.filter(item => item.id !== 0 )
        // console.log(data);
        this.total = data.total;
        this.tableData = data
      })
    },
    methods:{
      handleCurrentChange(val) {
       /* requestAddr(val,this.pageSize).then(res => {
          let data = res.data.data
          this.tableData = data.data;
        })*/
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
    }
  }
</script>

<style scoped>
  .addView{

  }
  .pager{
    width: 500px;
    background-color: #f8f8f8;
    margin-top: 15px;
  }
</style>
