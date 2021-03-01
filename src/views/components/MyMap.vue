<template>
  <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler"  @click="getClickInfo" :scroll-wheel-zoom='true'>
    <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
    <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
<!--    <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>-->
    <bm-panorama></bm-panorama>
  </baidu-map>
</template>
<script>
  import { BmGeolocation,BmScale,BmCityList,BmPanorama } from 'vue-baidu-map'
  export default {
    name: 'TestBaiDu',
    props:{
      center:{
        type:Object,
        default:{lng: 116.404, lat: 39.915}
      },
      zoom:{
        type:Number,
        default: 17
      }
    },
    components:{
      BmGeolocation,
      BmScale,
      BmCityList,
      BmPanorama,
    },
    data() {
      return {
      }
    },
    mounted() {
      // console.log(this.center);
    },
    methods: {
      handler({BMap, map}) {
        var point = new BMap.Point(this.center.lng, this.center.lat)
        map.centerAndZoom(point, this.zoom)
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
     /* baiduMap(){
        var map=new BMap.Map('map');
        var point=new BMap.Point(114.065537,22.553321);
        var marker=new BMap.Marker(point);
        map.addOverlay(marker);//添加一个标注
        map.centerAndZoom(point,10);//添加初始化中心点及地图层级
        map.enableScrollWheelZoom();//开启鼠标滚轮缩放功能。仅对PC上有效
        map.enableContinuousZoom();//启用连续缩放效果，默认禁用
      }*/
    }
  }
</script>
<style>
  .map{
    width: 1230px;
    height: 670px;
    position: absolute;
    left: -15px;
    right: 0;
    bottom: 0;
    top: -15px;
    margin: auto;

  }
  .BMap_cpyCtrl {
    display: none;
  }
  .anchorBL {
    display: none;
  }
</style>
