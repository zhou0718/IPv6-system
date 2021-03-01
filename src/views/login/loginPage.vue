<template>
  <div class="login">
  <div class="login-wrap">

   <div class="title" >IPv6一键通</div>

   <div class="el-form el-content">
    <el-form
       ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      label-position="left"
      auto-complete="on"
      class="el-form__inner">

      <el-form-item  prop="username" style="margin-top: 10px">
<!--        <span class="svg-container">-->
        <!--          <svg-icon icon-class="user"></svg-icon>-->
        <!--        </span>-->

        <!--<div style="display: flex;width: 350px;box-sizing: border-box;border: 1px solid #DCDFE6;border-radius: 4px">
        <div style="width: 45px;box-sizing: border-box;border-radius: 4px;text-align: center;border: 1px solid #DCDFE6;border-right:0;background-color: #f8f8f8;"><svg-icon icon-class="user"></svg-icon></div>-->

        <el-input
            ref="username"
            placeholder="username"
            v-model="loginForm.username"
            type="text"
            tabindex="1"
            auto-complete="on"
            style="width: 290px;">
            <i slot="prepend"><svg-icon icon-class="user"></svg-icon></i>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <!-- <span class="svg-container">
           <svg-icon icon-class="password"></svg-icon>
         </span>-->
        <el-input
             ref="password"
             placeholder="password"
             v-model="loginForm.password"
             :type="passwordType"
             auto-complete="on"
             @keyup.enter.native="handleLogin"
             style="width: 290px;">
           <i slot="prepend"><svg-icon icon-class="password"></svg-icon></i>
          <i slot="suffix" @click="showPassword"><svg-icon :icon-class="this.passwordType ==='password' ? 'eye':'eye-open'" style="height: 40px"></svg-icon></i>
        </el-input>
      </el-form-item>
    </el-form>
   </div>
    <el-button style="width: 290px;" type="primary" @click.native.prevent="handleLogin">登录</el-button>
    <div class="register-btn-wrapper">
      <div class="register-btn">
        <a>立即注册</a>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import {requestLogin} from "../../network/requestUser";

  export default {
    name: "Test",
    data(){
      const validatePassword = (rule, value,callback) => {
        if (value === '') {
          callback(new Error('密码不能为空'))
        } else {
          callback()
        }
      }

      return{
        passwordType: 'password',
        loginForm:{
          username: 'admin',
          password: 'admin',
        },
        loginRules: {
          username: [{ required: true, message: '用户名不能为空', trigger: 'blur' },],
          password: [{required: true,  trigger: 'blur', validator: validatePassword},],
        },
      };
    },

    methods:{
      showPassword(){
        if(this.passwordType==='password'){
          this.passwordType = ''
        }else {
          this.passwordType = 'password'
        }
      },
      handleLogin(){
        this.$refs.loginForm.validate(valid =>{
          if(valid){
            requestLogin(this.loginForm.username, this.loginForm.password).then(res =>{
                  console.log(res.headers['token']);
                  localStorage.setItem('token',res.headers['token'])
              /*let arr = getCookie.split(";")
              for(let i = 0; i<arr.length;i++){
                console.log(arr[i]);
              }*/
              this.$message.success("登录成功")
              if(res.data.data){
                this.$router.push('/addressAP')
              }else{
                alert('用户名或密码错误')
                this.loginForm.password = ''
              }
            }) .catch(error => {
               this.$message.error(error)
            })
          }else{
             alert('用户名或密码不能为空')
          }
        })
      }
    }
  }
</script>

<style scoped>

.login{
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url("../../assets/image/login.jpg");
  background-size: 100%;



}

.login-wrap{
/*  position: relative;*/
/*  padding: 30px 60px 0;*/
  width: 350px;
  height: 290px;
  margin: auto;
  position: absolute;
  text-align: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: hsla(0,0%,100%,.3);

}
.title{
  width: 100%;
  height:50px;
  color: #fff;
  margin: 0;
  /*line-height: 50px;*/
  text-align: center;
  font-size: 20px;
  border-bottom: 1px solid #fff;
}
.el-form{
  padding-top: 30px;
}
.register-btn-wrapper{
  width: 290px;
  margin: 0 auto;
}
.register-btn{
   float: right;
   padding: 10px 0;
   color:tomato;
}
/*.el-content{
  padding: 30px 30px;
}*/

/*.svg-container {
  padding: 6px 5px 6px 15px;
  color: #889aa4;
  vertical-align: middle;
  width: 15px;
  display: inline-block;
}*/

/*.userinput{
  box-sizing: border-box;
  border: 2px solid #DDD;
 !* width: 300px;
  height: 36px;*!
  border-radius: 5px;
  margin-top: 27px;
  margin-left: 50%;
  transform: translateX(-50%);
}


.userinput div:first-child {
  box-sizing: border-box;
  float: left;
  width: 32px;
  height: 32px;
  background: rgb(233,236,239);
  background-position:8px 10px;
  border-right: 2px solid #DDD;
}*/
</style>
