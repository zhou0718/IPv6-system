<template>
 <!--<div>
  <baidu-map class="map" :center="{lng: 105.404, lat: 29.915}" :zoom="5">
   <bm-point-collection :points="points" shape="BMAP_POINT_SHAPE_RHOMBUS" color="#0ff" size="BMAP_POINT_SIZE_SMALL" @click="clickHandler"></bm-point-collection>
  </baidu-map>
 </div>-->
  <div>
      <el-form style="margin: 5px 4px">
        <el-input style="width: 240px;margin-bottom: 10px" placeholder="请输入编解码" v-model="input" @keyup.enter.native="submit"></el-input>
        <el-button ref="lat" type="text"  style="margin: 0 0 0 300px ">经度: {{lng}}</el-button>
        <el-button ref="lng" type="text"  style="margin: 0 70px ">纬度: {{lat}}</el-button>
        <el-button type="primary" size="small" @click="oriented">定位</el-button>
      </el-form>
     <baidu-map class="map" :center="{lng: 105.404, lat: 29.915}" :zoom="5" @ready="handler" :scroll-wheel-zoom='true'>
    <!--  <bm-point-collection :points="points"  shape="BMAP_POINT_SHAPE_STAR" color="red" size="BMAP_POINT_SIZE_BIG" @click="clickHandler" @mouseover="showInfo"></bm-point-collection>-->
       <bm-point-collection :points="points" shape="BMAP_POINT_SHAPE_STAR" color="#0923D9" size="BMAP_POINT_SIZE_BIG"  @mouseover="showInfo" @click="clickHandler"></bm-point-collection>
       <bm-point-collection :points="points1" shape="BMAP_POINT_SHAPE_STAR" color="#0923D9" size="BMAP_POINT_SIZE_BIG"  @mouseover="showInfo" @click="clickHandler"></bm-point-collection>
       <!-- 信息窗体 -->
       <bm-info-window :position="infoPosition" title="节点信息：" :show="infoOff" @close="infoWindowClose" @open="infoWindowOpen" class="info">
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
         <div><img src="../../assets/image/logo.jpg"  alt="" ></div>
       </bm-overlay>
       <bm-overlay
               v-for="(point,index) of points1"
               :key="index"
               pane="labelPane"
               class="logo"
               @draw="draw(point, $event.map, $event.el)"
               @mouseover.native="active = true"
               @mouseleave.native="active = false">
         <div><img src="../../assets/image/ulogo.jpg"  alt="" ></div>
       </bm-overlay>
     </baidu-map>
  </div>
</template>

<script>
  import axios from 'axios'
 import MyMap from "../components/MyMap"
 import {getAllDevices} from "../../network/requestDeviceAll";
 import {BmOverviewMap, BmPointCollection , BmInfoWindow, BmOverlay} from 'vue-baidu-map'
 export default {
  name: 'APMap',
  components:{
    MyMap,
    BmOverviewMap,
    BmInfoWindow,
    BmPointCollection,
    BmOverlay
  },
  data () {
   return {
    points: [],
    points1:[],
    pointInfo:[],
    start_time: '2019-12-08 11:11:11',
    end_time: '2020-07-23 21:00:57',
    infoPosition: {lng: 0, lat: 0},      // 信息窗口位置
    infoOff: false,     //  信息窗口显示
    infoCont:''   ,       // 信息窗口内容
    active: false,
    input:'',
    lat: '0.00000',
    lng: '0.00000',
   }
  },
  created(){
    this.getPoints()
    // console.log(this.points);
    // console.log(this.pointInfo);
    // console.log(this.pointInfo);
  },
  methods: {
   clickHandler (e) {
    alert(`单击点的坐标为：${e.point.lng}, ${e.point.lat}`);
   },
   submit() {
     // console.log('xyy');
     // console.log(this.input);
     axios({
       method: 'post',
       url: 'http://124.70.138.132:18080/api/service/model_resource/4',
       data:{
         Code: this.input,
       }
     }).then(res => {
       console.log(res.data);
       this.lat = res.data.Lat
       this.lng = res.data.Lon
       // console.log(res);
     }).catch(err => {
       console.log(err);
     })
   },
   showInfo({currentTarget, point, returnValue, target, type}){
     //console.log(point);
     this.infoOff = true
     this.infoPosition.lng = point.lng
     this.infoPosition.lat = point.lat
     // console.log(this.points);
     //console.log(this.pointInfo);
     //console.log(point);
     this.pointInfo.forEach(item => {   // 获取滑过标点窗体信息
          if(item.decoded_lat === point.lat && item.decoded_lng === point.lng ){
            this.infoCont = 'name: '+ item.name + '</br>' +  '状态: '+ item.status + '</br>' + '经度: '+ point.lng + '</br>' +  '纬度: '+ point.lat + '</br>' + '最新时间: '+ item.time + '</br>' +  '设备类型: '+ item.device_type
          }
     })
   },
   getPoints(){
    getAllDevices().then(res => {
      // console.log(res);
      let data = res.data.data
      for(let i = 0;i < data.length;i++){
      let obj = {}
      // obj.lng = data[i].recorded_lng
      // obj.lat = data[i].recorded_lat
        obj.lat = data[i].decoded_lat
        obj.lng = data[i].decoded_lng
      this.points.push(obj)
      this.pointInfo.push(data[i])
      }
    })
   },
   handler({BMap,map}) {
    // console.log(BMap, map);
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
    oriented(){
      let obj = {}
      obj.lat = this.lat
      obj.lng = this.lng
      let obj1 = {}
      obj1.recorded_lng = this.lng
      obj1.recorded_lat = this.lat
      // console.log(obj,obj1);
      this.points1.push(obj)
      this.pointInfo.push(obj1)
    }
  }
 }
</script>
<style scoped>
  /*.sample {
    width: 120px;
    height: 40px;
    line-height: 40px;
    background: rgba(0,0,0,0.5);
    overflow: hidden;
    box-shadow: 0 0 5px #000;
    color: #fff;
    text-align: center;
    padding: 10px;
    position: absolute;
  }
  .sample.active {
    background: rgba(0,0,0,0.75);
    color: #fff;
  }*/
  .map{
    position: relative;
    left: 4px;
    top: 6px;
  }
  .info{
    width: 300px;
  }
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
