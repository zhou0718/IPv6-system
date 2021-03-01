<template>
  <div class="navbar">
    <span class="iconfont icon-xinxi icon-info" >
      <span :model="value"></span>
      <el-divider direction="vertical" class="divider"></el-divider>
    </span>

    <span class="iconfont icon-bell icon-bell" >
      <el-divider direction="vertical" class="divider"></el-divider>
    </span>


    <div class="right-menu">

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <!--<img src="../../assets/image/11.jpg" class="user-avatar">-->
          <div class="user">
            <span class="iconfont icon-document"></span>
            <span class="iconfont icon-user"></span>
             <span>admin</span>
             <span class="iconfont icon-arrowdown"></span>
          </div>
          <el-dropdown-menu class="item" slot="dropdown">
            <router-link to="/order">
              <el-dropdown-item style="background-color: #fff">首页</el-dropdown-item>
            </router-link>
            <!-- <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
               <el-dropdown-item>Docs</el-dropdown-item>
             </a>-->
            <el-dropdown-item style="background-color: #fff" divided>
              <span style="display:block;" @click="logout">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </div>
      </el-dropdown>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'Navbar',
    data(){
      return{
        value: '5'
      }
    },
    methods:{
      logout(){
        localStorage.removeItem('token')
        this.$router.push('/login')
      }
    }
  }
</script>

<style xml:lang="scss">
  .navbar{
    height:64px;
    position: fixed;
    top: 0;
    left: 250px;
    right: 0;
    z-index: 11;
    border-radius:0;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
  }



  .right-menu {
    position: absolute;
    right: 10px;
    width: 240px;
    height: 64px;

   }
  .right-menu-item {
    display: inline-block;
    padding: 0;
    height: 100%;
    font-size: 18px;
    color: rgba(0,0,0,.65);
    vertical-align: text-bottom;
  }



  .avatar-container {
      padding: 0;
  }

  .avatar-wrapper {
    margin-top: 7px;
    margin-right: 40px;
    position: relative;
  }

  .user-avatar {
    cursor: pointer;
    width: 60px;
    height: 50px;
    border-radius: 10px;
    color: rgba(0,0,0,.65);
  }

  .el-icon-caret-bottom {
    cursor: pointer;
    position: absolute;
    right: -20px;
    top: 35px;
    font-size: 12px;
  }
  a{
    text-decoration: none;
  }
.el-icon-caret-bottom{
  font-size: 18px;
  color: rgba(0,0,0,.65);
  vertical-align: text-bottom;
}
.logo{
  float: left;
  width: 40px;
  height: 40px;
  margin-left:15px;
  margin-top: 15px;
}
.title{
  float: left;
  width: 230px;
  margin-left: 10px;
  line-height: 64px;
  color: rgba(0,0,0,.65);
  font-size: 22px;
}
/*.iconfont{
  display: inline-block;
  width: 35px;
  height: 35px;
}*/
.icon-info{
  position: absolute;
  left: 15px;
  top: 25px;
  width: 33px;
  height: 20px;
}
.divider{
  position: absolute;
  left: 18px;
  top: 2px;
}
.icon-bell{
  position: absolute;
  left: 60px;
  top: 25px;
  width: 33px;
  height: 20px;
}
.user{
  position: relative;
 /* left: 100px;*/
  top: 18px;
  margin-left: 100px;

}
.user span{
  margin-right: 8px;
}
.icon-arrowdown{
  position: relative;
  top: 2px;
  right: 2px;
}
.icon-document{
  position: relative;
  left: -50px;
}


  /*.top {
      float: right;
     height:100%;
     width: 100%;

   !* float:left;
    margin:13px 0 13px 50px;
    font-size: 20px;*!
  }
  .top button{
    float: right;
    font-size: 20px;
    line-height: 64px;
    color: black;
    padding: 0 30px;
  }*/







</style>
