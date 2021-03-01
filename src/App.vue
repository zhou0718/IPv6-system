<template>
  <div id="app">
     <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        isRouterAlive: true
      }
    },
    methods:{
      reload() {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      }
    }
  }
</script>

<style>
  html,
  body,
  #app {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }
  html {
     background: #f0f2f5;
  }
  .icon{
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
