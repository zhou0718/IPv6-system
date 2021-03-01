<!--
<template>
  <my-map :center="center"></my-map>
</template>
<script>
  import MyMap from '../components/MyMap'
  export default {
    name: 'TestBaiDu',
    components:{
      MyMap,
    },
    data() {
      return {
        center: {lng: 116.333752, lat: 40.008645},
        zoom: 13
      }
    },
    mounted() {
    },
    methods: {
      handler({BMap, map}) {
        var point = new BMap.Point(this.center.lng, this.center.lat)
        map.centerAndZoom(point, 10)
        var marker = new BMap.Marker(point) // 创建标注
        map.addOverlay(marker) // 将标注添加到地图中
        var circle = new BMap.Circle(point, 6, {
          strokeColor: 'Red',
          strokeWeight: 6,
          strokeOpacity: 1,
          Color: 'Red',
          fillColor: '#f03'
        })
        map.addOverlay(circle)
      },
      getClickInfo(e) {
        console.log(e.point.lng)
        console.log(e.point.lat)
        this.center.lng = e.point.lng
        this.center.lat = e.point.lat
      },
      baiduMap(){
        var map=new BMap.Map('map');
        var point=new BMap.Point(114.065537,22.553321);
        var marker=new BMap.Marker(point);
        map.addOverlay(marker);//添加一个标注
        map.centerAndZoom(point,10);//添加初始化中心点及地图层级
        map.enableScrollWheelZoom();//开启鼠标滚轮缩放功能。仅对PC上有效
        map.enableContinuousZoom();//启用连续缩放效果，默认禁用
      }
    }
  }
</script>
<style>

</style>
-->
<template>
  <baidu-map class="map" :center="center" :zoom="17" :scroll-wheel-zoom="true">
    <bml-curve-line :points="points" :editing="true" @lineupdate="update"></bml-curve-line>
    <bml-curve-line :points="points1" :editing="true" @lineupdate="update1" :strokeColor="color"></bml-curve-line>
    <bml-curve-line :points="points2" :editing="true" @lineupdate="update2" :strokeColor="color2"></bml-curve-line>
    <bm-point-collection :points="points" shape="BMAP_POINT_SHAPE_STAR" color="#0923D9" size="BMAP_POINT_SIZE_BIG"  @mouseover="showInfo"></bm-point-collection>
    <bm-point-collection :points="points1" shape="BMAP_POINT_SHAPE_STAR" color="#0923D9" size="BMAP_POINT_SIZE_BIG"  @mouseover="showInfo"></bm-point-collection>
    <bm-point-collection :points="points2" shape="BMAP_POINT_SHAPE_STAR" color="#0923D9" size="BMAP_POINT_SIZE_BIG"  @mouseover="showInfo"></bm-point-collection>
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
    name: "Tsinghua",
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
        // center:{lng: 104.89273965690515, lat:  26.578343850019767},
        center:{lng:116.333752,lat:40.008645},
        points:[],
        points1:[],
        points2:[],
        color: '#f00',
        color2:'orange',
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
          name:'loc-ap-4',
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
      axios({
        method:'post',
        url:'http://203.91.121.228:12864/queryDeviceInfoTrace',
        data:{
          name:'loc_ap_18',
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
          this.points2.push(obj)
          this.pointInfo.push(item)
        }
        // console.log(this.points);
      })
      axios({
        method:'post',
        url:'http://203.91.121.228:12864/queryDeviceInfoTrace',
        data:{
          name:'loc-ap-8',
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
    },
    methods:{
      update (e) {
        this.points = e.target.cornerPoints
      },
      update1 (e) {
        this.points = e.target.cornerPoints
      },
      update2 (e) {
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
