<template>
  <div class="leftnav">
    <div class="logo-title">
      <img src="../../assets/image/logo.png">
      <span class="my-title">位置映射IPv6网络系统</span>
      <!-- <span>
         <span class="name">奇安信</span>
         <span class="desc">资产探查平台</span>
       </span>-->
    </div>
    <el-aside >
      <el-menu
              :default-active="$route.path"
              text-color="hsla(0,0%,100%,.45)"
              active-text-color="#fff"
              background-color="#001529"
              class="menu"
              style="border:none;"
              @open="handleOpen"
              @close="handleClose"
              unique-opened
              router>


        <el-submenu index="1">
          <template slot="title">
           <svg-icon icon-class="add" style="margin-right: 18px;font-size: 22px"/>
            <span>IPv6位置AP</span>
          </template>
          <el-menu-item-group class="submenu">
            <template slot="title"></template>
            <el-menu-item index="/APlist"><span style="font-weight: 700;">·</span> 位置AP列表</el-menu-item>
            <el-menu-item index="/APMap"><span style="font-weight: 700;">·</span> IPv6位置AP地图</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <svg-icon icon-class="info" style=" margin-right: 18px;font-size: 22px"/>
            <span>IPv6多态信息叠加</span>
          </template>
          <el-menu-item-group class="submenu">
            <template slot="title"></template>
            <el-menu-item index="/mapping"><span style="font-weight: 700;">·</span> IPv6基础设施映射</el-menu-item>
            <el-menu-item index="/service"><span style="font-weight: 700;">·</span> IPv6业务属性标定</el-menu-item>
            <el-menu-item index="/loc"><span style="font-weight: 700;">·</span> IPv6多态地理信息标定</el-menu-item>
<!--            <el-menu-item index="/IPv6Info">查看</el-menu-item>-->
           <!-- <el-menu-item index="2-2">ip地址池</el-menu-item>
            <el-menu-item index="2-2">脆弱性</el-menu-item>-->
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
           <svg-icon icon-class="secret" style=" margin-right: 18px;font-size: 22px;"/>
            <span>位置隐私保护追溯</span>
          </template>
          <el-menu-item-group class="submenu">
            <template slot="title"></template>
            <el-menu-item index="/priList"><span style="font-weight: 700;">·</span> 位置AP列表</el-menu-item>
            <el-menu-item index="/priMap"><span style="font-weight: 700;">·</span> IPv6位置AP地图</el-menu-item>
<!--            <el-menu-item index="/addrView">查看</el-menu-item>-->
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <svg-icon icon-class="app" style=" margin-right: 18px;font-size: 22px"/>
            <span>应用示范</span>
          </template>
          <el-menu-item-group class="submenu">
            <template slot="title"></template>
            <el-menu-item index="/Tsinghua"><span style="font-weight: 700;">·</span> 清华大学</el-menu-item>
            <el-menu-item index="/Peking"><span style="font-weight: 700;">·</span> 北京大学</el-menu-item>
            <el-menu-item index="/bupt"><span style="font-weight: 700;">·</span> 北京邮电大学</el-menu-item>
            <el-menu-item index="/wuhan"><span style="font-weight: 700;">·</span> 武汉大学</el-menu-item>
<!--            <el-menu-item index="/serviceStatistics"><span style="font-weight: 700;">·</span> 报表</el-menu-item>-->
<!--            <el-menu-item index="/serviceView">查看</el-menu-item>-->
          </el-menu-item-group>
        </el-submenu>
<!--
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>IPv6地理位置</span>
          </template>
          <el-menu-item-group class="submenu">
            <template slot="title"></template>
            <el-menu-item index="/localExplore"><span style="font-weight: 700;">·</span> 资源</el-menu-item>
&lt;!&ndash;            <el-menu-item index="/localStatistics">统计</el-menu-item>&ndash;&gt;
&lt;!&ndash;            <el-menu-item index="/localView">查看</el-menu-item>&ndash;&gt;
          </el-menu-item-group>
        </el-submenu>-->


      </el-menu>
    </el-aside>

   <!-- <div> <router-view></router-view></div>-->
  </div>
</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      }
    }
  }
</script>

<style >
  .leftnav{
    height: 100%;
    width: 250px;
   /* min-width: 250px;
    min-height: 100%;*/
    /*padding-top: 64px;*/
    box-shadow: 2px 0 6px rgba(0,21,41,.35);
    position: fixed;
    z-index: 10;
    flex: 0 0 250px;
    background-color: #001529;
    /*float: left;*/
    /*height: 100%;*/

   /* background-color: rgb(50, 65, 87);*/
    /*text-align: left;*/
   /* padding-top: 1%;*/
  }
.logo-title{
  position: relative;
  height: 60px;
  color: #fff;
  border-bottom: 2px solid #333;
}
 .logo-title img{
   position: relative;
   top: 12px;
   left: 8px ;
   width: 40px;
   height: 40px;
 }
 .my-title{
   /*position: absolute;*/
   /*right: 40px;*/
   /*bottom: 4px;*/
   /*color: #ccc;*/
   /*font-size: 15px;*/
   position: relative;
   left: 18px;
   top: -2px;

 }
/*.logo-title .name{
  position: relative;
  top: -20px;
  left: 30px;
  font-size: 24px;
}
.logo-title .desc{
  font-size: 14px;
  position: relative;
  left: -45px;
}*/
  .el-aside {
    width: 250px !important;
    min-height: 100%;
    height: 100%;
    position: relative;
    font-size: 12px;
    background-color: #001529 !important;
  }
 /* ul li {
    font-size: 16px;
    text-align: left;
   !* background-color: rgb(48, 65, 86);*!
  }*/



  .menu-logo{
    position: relative;
    padding: 0 24px;
    overflow: hidden;
    background: #001529;
    cursor: pointer;
    color:#fff;
  }
  .icon{
    float: right;
    width: 8px;
    height: 8px;
    position: relative;
    top: 25px;
  }
  .submenu{
    position: relative;
    left: 25px;
    top: -10px;
    margin-bottom: 0;
  }
</style>




