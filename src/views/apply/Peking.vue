<!--
<template>
  <my-map :center="center"></my-map>
</template>

<script>
  import MyMap from '../components/MyMap'
  export default {
    name: "wuhan",
    components:{
      MyMap,
    },
    data() {
      return{
        center:{lng: 116.31515, lat: 39.999006}
      }
    }
  }
</script>

<style scoped>

</style>
-->
<template>
  <baidu-map class="map" :center="center" :zoom="17" :scroll-wheel-zoom="true">
    <bml-curve-line :points="points" :editing="true" @lineupdate="update"></bml-curve-line>
    <bml-curve-line :points="points1" :editing="true" @lineupdate="update1" :strokeColor="color"></bml-curve-line>
    <bm-point-collection :points="points" shape="BMAP_POINT_SHAPE_STAR" color="#0923D9" size="BMAP_POINT_SIZE_BIG"  @mouseover="showInfo"></bm-point-collection>
    <bm-point-collection :points="points1" shape="BMAP_POINT_SHAPE_STAR" color="#0923D9" size="BMAP_POINT_SIZE_BIG"  @mouseover="showInfo"></bm-point-collection>
    <bm-info-window :position="infoPosition" title="节点信息：" :show="infoOff" @close="infoWindowClose" @open="infoWindowOpen" style="width:300px">
      <p v-html="infoCont"></p>
    </bm-info-window>
    <bm-overlay
            v-for="(point,index) of points"
            :key="index"
            pane="labelPane"
            class="logo"
            @draw="draw(point, $event.map, $event.el)"
            @mouseover.native="active = true"
            @mouseleave.native="active = false">
      <!--      <div><img src="../../assets/image/logo.jpg"  alt="" ></div>-->
    </bm-overlay>
  </baidu-map>
</template>

<script>
  import {BmlCurveLine,BmOverviewMap, BmPointCollection , BmInfoWindow, BmOverlay} from 'vue-baidu-map'
  import axios from 'axios'
  import MyMap from '../components/MyMap'
  export default {
    name: "Peking",
    components:{
      MyMap,
      BmOverviewMap,
      BmInfoWindow,
      BmPointCollection,
      BmOverlay,
      BmlCurveLine,
    },
    data() {
      return{
        // center:{lng: 113.01182447823254, lat: 33.24694360641503},
        center:{lng:116.31515,lat:39.999006},
        points:[],
        points1:[],
        color: 'red',
        pointInfo:[],
        infoPosition: {lng: 0, lat: 0},      // 信息窗口位置
        infoOff: false,     //  信息窗口显示
        infoCont:''   ,       // 信息窗口内容
        start_time: '2020-08-28 00:00:00',
        end_time:'2020-08-28 23:35:00',
      }
    },
    mounted() {
      axios({
        method:'post',
        url:'http://203.91.121.228:12864/queryDeviceInfoTrace',
        data:{
          name:'loc-ap-7',
          start_time: this.start_time,
          end_time: this.end_time
          // start_time:"",
          // end_time:"",
        }
      }).then(res => {
        let data = res.data.data
        console.log(data);
        for(let item of data){
          let obj = {}
          obj.lat = item.recorded_lat
          obj.lng = item.recorded_lng
          this.points.push(obj)
          this.pointInfo.push(item)
        }
        // console.log(this.points);
      })
      axios({
        method:'post',
        url:'http://203.91.121.228:12864/queryDeviceInfoTrace',
        data:{
          name:'loc-ap-9',
          start_time: this.start_time,
          end_time: this.end_time
          // start_time:"",
          // end_time:"",
        }
      }).then(res => {
        let data = res.data.data
        console.log(data);
        for(let item of data){
          let obj = {}
          obj.lat = item.recorded_lat
          obj.lng = item.recorded_lng
          this.points1.push(obj)
          this.pointInfo.push(item)
        }
        // console.log(this.points);
      })
    },
    methods:{
      update (e) {
        this.points = e.target.cornerPoints
      },
      update1 (e) {
        this.points = e.target.cornerPoints
      },
      showInfo({currentTarget, point, returnValue, target, type}){
        // console.log(this.val);
        console.log(point);
        this.infoOff = true
        this.infoPosition.lng = point.lng
        this.infoPosition.lat = point.lat
        //console.log(this.points);
        // this.points.forEach(item => {   // 获取滑过标点窗体信息
        //   if(item.lat === point.lat && item.lng === point.lng ){
        //     this.infoCont = '经度: '+ item.lat + '</br>' +  '纬度: '+ item.lng
        //   }
        // })
        this.pointInfo.forEach(item => {   // 获取滑过标点窗体信息
          if(item.recorded_lat === point.lat && item.recorded_lng === point.lng ){
            this.infoCont = 'name: '+ item.name + '</br>' +  '状态: '+ item.status + '</br>' + '经度: '+ point.lat + '</br>' +  '纬度: '+ point.lng + '</br>' + '最新时间: '+ item.time + '</br>' +  '设备类型: '+ item.device_type
          }
        })
      },
      infoWindowClose (e) {
        this.infoOff = false
      },
      infoWindowOpen (e) {
        this.infoOff = true
      },
      draw(point, map, el) {
        const pixel = map.pointToOverlayPixel({
          lat: point.lat,
          lng: point.lng
        })
        el.style.left = pixel.x - 25 + 'px'
        el.style.top = pixel.y - 25 + 'px'
        // console.log(point);
      },
    }
  }
</script>

<style scoped>
  .logo{
    position: absolute;
    font-size: 16px;
    color: dodgerblue;
    font-weight: 500;
  }
  div{
    position: absolute;
  }
  div img{
    width:  20px;
    height: 20px;
  }
</style>
