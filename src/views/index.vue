<template>
  <div class="wrap">
  <!-- <div class="sider"><sider-bar/></div>
    <div class="header"><my-header/></div>-->
    <sider-bar/>
    <section>
    <my-header/>
    <div class="content">

        <main class="layout-content">
          <router-view></router-view>
        </main>
    </div>
    </section>
  </div>
</template>

<script>
  import SiderBar from '../components/siderbar/SiderBar'
  import MyHeader from '../components/narbar/Header'
  export default {
    name: "index",
    components:{
      SiderBar,
      MyHeader
    }
  }
</script>

<style scoped>
  .wrap {
    /*display: flex;*/
    /*height: 100%;*/
    display: flex;
    height: 100%;
    position: relative;
    min-height: 100%;
    background: #f0f2f5;

  }
 /* .sider {
    width: 150px;
    height: 100%;
    background-color: rgb(48, 65, 86);
  }
  .header {
    display: flex;
    flex: 1;
    height: 4rem;
  }*/
  .layout-content{
    /*margin: 24px;*/
    position: absolute;
    left: -5px;
    top: 8px;
    right: 0;
    height: 100%;
    box-sizing: border-box;

  }

  .content{
    flex: auto;
    position: absolute;
    top: 70px;
    left: 275px;
    right: 10px;
    bottom: 0;
    height: 650px;
    /*overflow: hidden;*/
   /* display: flex;
    justify-content: space-evenly;*/
   /* margin-top: 20px;*/
  }
  section{
    display: flex;
    flex: auto;
    position: relative;
    flex-direction: column;
    display: block;
  }
</style>
