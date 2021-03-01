<template>
  <div class="addView">
<!--    <my-list :loc="row" style="display: none"></my-list>-->
    <el-dialog title="信息填写" :visible.sync="dialogFormVisible"  :close-on-click-modal="false" @close="concel">
      <el-form :model="form" label-position="left">
        <el-form-item label="用户名" label-width="120px" style="margin-left: 50px">
          <el-input v-model="form.user" autocomplete="off" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" style="margin-left: 50px">
          <el-input v-model="form.pwd" autocomplete="off" style="width: 400px" type="password"></el-input>
        </el-form-item>
        <el-form-item label="密钥"  label-width="120px" style="margin-left: 50px">
          <el-input v-model="form.key" autocomplete="off" style="width: 400px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="concel">取 消</el-button>
        <el-button type="primary" @click="encrypted">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <el-dialog title="信息填写" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-position="left">
        <el-form-item label="密钥"  label-width="120px" style="margin-left: 50px">
          <el-input v-model="form.key" autocomplete="off" style="width: 400px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="encrypted">确 定</el-button>
      </div>-
    </el-dialog>-->

    <el-dialog title="信息填写" :visible.sync="dialogFormVisible1" :close-on-click-modal="false" @close="concel1">
    <el-form :model="form1" label-position="left">
      <el-form-item label="解密密钥" label-width="120px" style="margin-left: 50px">
        <el-input v-model="form1.key" autocomplete="off" style="width: 400px"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="concel1">取 消</el-button>
      <el-button type="primary" @click="decrypted">确 定</el-button>
    </div>
  </el-dialog>
    <el-table
            style="margin-top: 10px"
            :data="tableData"
            stripe
            border
            fit
            :cell-style="{'text-align':'center'}"
            :header-cell-style="{'text-align':'center'}">
      <el-table-column
              prop="id"
              label="id"
              width="70px" />
      <el-table-column
              prop="name"
              label="name" />

      <el-table-column
            width="140px"
            prop="ip"
            label="IP地址" >
    </el-table-column>

      <el-table-column
              width="120px"
              prop="recorded_lat"
              label="recorded_lat" />

      <el-table-column
              width="120px"
              prop="recorded_lng"
              label="recorded_lng" />
      <el-table-column
              width="120px"
              prop="decoded_lat"
              label="decoded_lat" />
      <el-table-column
              width="120px"
              prop="decoded_lng"
              label="decoded_lng" />
      <el-table-column
              prop="_encrypted"
              label="是否加密" >
        <template slot-scope="scope">
          {{scope.row.is_encrypted ? '是':'否'}}
        </template>
      </el-table-column>
<!--      <el-table-column-->
<!--              prop="coding"-->
<!--              label="编解码" />-->

      <el-table-column
              prop="status"
              label="status" />

      <el-table-column
              width=" 120px"
              prop="device_type"
              label="device_type" />
      <el-table-column
        label="操作"
        width="150px"
      >
        <template slot-scope='scope'>
<!--         <el-button v-if="!scope.row._encrypted" type="text" size="small" @click="encrypted">加密</el-button>-->
<!--          <el-button type="text" size="small" @click="decrypted(scope.row)">解密</el-button>-->
            <el-switch
                    v-model="scope.row.is_encrypted"
                    active-text="加密"
                    inactive-text="查看"
                    @change="changeValue(scope.row)"
                    style="position: relative;left: 5px">
            </el-switch>
         <!-- <el-dialog title="信息填写" :visible.sync="dialogFormVisible1">
            <el-form :model="form1" label-position="left">
              <el-form-item label="解密密钥" label-width="120px" style="margin-left: 50px">
                <el-input v-model="form1.key" autocomplete="off" style="width: 400px"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="decrypted(scope.row)">确 定</el-button>
            </div>
          </el-dialog>-->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {getAllDevices} from "../../network/requestDeviceAll";
  import axios from 'axios'
  export default {
    name: "priList",
    inject: ['reload'], // this.reload()刷新当前页面
    data(){
      return{
        // active:0,
        tableData:[],
        total: 0,
        pageSize: 50,
        currentPage:1,
        start_time: '2020-04-08 11:11:11',
        end_time: '2020-07-23 21:00:57',
        value: true, //  el-switch 绑定的变量
        // active: false,
        // inactive: true,
        input: '', //el-input输入的内容
        dialogFormVisible: false, // 对话框是否可见
        dialogFormVisible1: false,
        form: {
          user:'',
          pwd: '',
          key: '',
        },
        form1:{
          key:'',
        },
        row: {},
      }
    },
    mounted(){
      getAllDevices().then(res => {
        let data = res.data.data
        // console.log(data);
        data = data.filter(item => item.id !== 0 )
        this.total = data.total;
        this.tableData = data
      })
    },
    methods:{
      handleCurrentChange(val) {

      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      changeValue(value) {
        this.row = value
        if(!value.is_encrypted){
          this.dialogFormVisible1 = true
        }
        else
          this.dialogFormVisible = true
      },
      encrypted() {
        this.dialogFormVisible = false
        console.log(this.row);
        axios({
          method: 'post',
          url: 'http://203.91.121.228:12864/login',
          data:{
            name: this.form.user,
            password: this.form.pwd,
            key: this.form.key,
            encrypt: this.row.is_encrypted
          }
        }).then(res => {
           this.row.is_encrypted = res.data.code === 200
          getAllDevices().then(res => {
            let data = res.data.data
            // console.log(data);
            data = data.filter(item => item.id !== 0 )
            this.total = data.total;
            data.forEach(item => {
              if(this.row.id === item.id){
                console.log(item);
                this.row.decoded_lat = item.decoded_lat
                this.row.decoded_lng = item.decoded_lng
              }
            })
            // this.tableData = data
            // this.tableData.forEach(item => {
            //   if(this.row.id === item.id){
            //    this.row = item
            //    this.row.is_encrypted = true
            //   }
            // })
          })
           // this.reload()
        }).catch(err => {
          // this.row.is_encrypted = false
          console.log(err);
        })
      },
      decrypted() {
        this.dialogFormVisible1 = false
        console.log(this.row.name);
        axios({
          method: 'post',
          url:'http://203.91.121.228:12864/queryDeviceInfo',
          data:{
            name: this.row.name,
            key: this.form1.key
          }
        }).then(res => {
          // console.log(res.data.data);
          this.row.decoded_lat = res.data.data.decoded_lat
          this.row.decoded_lng = res.data.data.decoded_lng
          this.row.is_encrypted = false
          // this.$store.commit('SET_ROW', this.row)
         setTimeout(() => {
           this.$router.push({
             path:'/priMap',
             query:{
               row: this.row
             }
           })
         },1500)
        }).catch(err => {
          // this.row.is_encrypted = true
          console.log(err);
        })
      },
     concel() {
        this.dialogFormVisible = false
        this.row.is_encrypted = false
     },
      concel1() {
        this.dialogFormVisible1 = false
        this.row.is_encrypted = true
      }
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
