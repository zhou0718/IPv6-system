
<template>
    <baidu-map class="map" :center="{lng: 105.404, lat: 29.915}" :zoom="5" :scroll-wheel-zoom="true">
    <bml-curve-line :points="test" :editing="true" @lineupdate="update"></bml-curve-line>
<!--    <bm-point-collection :points="points" shape="BMAP_POINT_SHAPE_STAR" color="red" size="BMAP_POINT_SIZE_BIG" @click="clickHandler"></bm-point-collection>-->
    <bm-point-collection :points="points" shape="BMAP_POINT_SHAPE_STAR" color="#0923D9" size="BMAP_POINT_SIZE_BIG"  @mouseover="showInfo"></bm-point-collection>
    <bm-point-collection :points="repoint" shape="BMAP_POINT_SHAPE_STAR" color="#0923D9" size="BMAP_POINT_SIZE_BIG"  @mouseover="showInfo"></bm-point-collection>
    <bm-point-collection :points="test" shape="BMAP_POINT_SHAPE_STAR" color="#0923D9" size="BMAP_POINT_SIZE_BIG"  @click="t_showInfo"></bm-point-collection>
    <!-- 信息窗体 -->
    <bm-info-window :position="infoPosition" title="节点信息：" :show="infoOff" @close="infoWindowClose" @open="infoWindowOpen" style="width:300px">
      <p v-html="infoCont"></p>
    </bm-info-window>
      <bm-info-window :position="t_pos" title="节点信息：" :show="t_show" @close="infoWindowClose1" @open="infoWindowOpen1" style="width:300px">
        <p v-html="t_info"></p>
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
              v-for="(point,index) of test"
              :key="index"
              pane="labelPane"
              class="logo"
              @draw="draw(point, $event.map, $event.el)"
              @mouseover.native="active = true"
              @mouseleave.native="active = false">
        <div><img src="../../assets/image/ceshi.jpg"  alt="" ></div>
      </bm-overlay>
      <bm-overlay
              v-for="(point,index) of repoint"
              :key="index"
              pane="labelPane"
              class="logo"
              @draw="draw(point, $event.map, $event.el)"
              @mouseover.native="active = true"
              @mouseleave.native="active = false">
        <div><img src="../../assets/image/ulogo.jpg"  alt="" ></div>
      </bm-overlay>
  </baidu-map>
</template>

<script>
 import MyMap from "../components/MyMap"
 import {getAllDevices} from "../../network/requestDeviceAll"
 import {BmOverviewMap, BmPointCollection , BmInfoWindow, BmOverlay,BmlCurveLine} from 'vue-baidu-map'
  export default {
    name: "priMap",
    components:{
      MyMap,
      BmOverviewMap,
      BmInfoWindow,
      BmPointCollection,
      BmOverlay,
      BmlCurveLine,
    },
    data() {
      return {
        points: [],
        repoint:[], // 记录经纬度重复的点
        pointInfo:[],
        repointInfo:[],
        start_time: '',
        end_time: '',
        infoPosition: {lng: 0, lat: 0},      // 信息窗口位置
        infoOff: false,     //  信息窗口显示
        infoCont:''   ,       // 信息窗口内容
        t_pos: {lat: 0, lng: 0},
        t_show: false,
        t_info: '',
        active: false,
        val: 0,
        row:{},
        test:[],
      }
    },
    created(){
      if(this.$route.query.row) {
        this.row = this.$route.query.row
        // let obj = {...this.row}
        // let obj1 = {...this.row}
        let obj = {}
        let obj1 = {}
        obj.name = this.row.name
        obj1.name = this.row.name
        obj.lat = this.row.recorded_lat
        obj.lng = this.row.recorded_lng
        obj1.lat = this.row.decoded_lat
        obj1.lng = this.row.decoded_lng
        this.test.push(obj)
        this.test.push(obj1)
        console.log('obj', obj);
        console.log('obj1', obj1);
        console.log('row', this.row);
        // console.log(1,this.test);
        // console.log(2,this.pointInfo);
      }

    },
    mounted(){
      this.getPoints()
    },
    methods: {
      // el-switch状态改变时的回调函数
      changeValue(value) {
        if(!value){
          this.dialogFormVisible = true
        }
      },
      getPoints(){
        getAllDevices(this.start_time,this.end_time).then(res => {
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
          for(let i = 0;i <this.points.length;i++) {
            for(let j = i + 1;j<this.points.length;j++){
              if(this.points[i].lat === this.points[j].lat){
                this.repoint.push(this.points[j])
                this.points.splice(j,1)
              }
            }
          }
          for(let i = 0;i <this.pointInfo.length;i++) {
            for(let j = i + 1;j<this.pointInfo.length;j++){
              if(this.pointInfo[i].decoded_lat === this.pointInfo[j].decoded_lat){
                this.repointInfo.push(this.pointInfo[j])
                this.pointInfo.splice(j,1)
              }
            }
          }
          for(let i = 0;i < this.repointInfo.length;i++){
            this.repointInfo[i].decoded_lat += 0.001
            this.repointInfo[i].decoded_lng += 0.001
          }
          this.pointInfo.push(...this.repointInfo)
         for(let i = 0;i < this.repoint.length;i++){
           this.repoint[i].lat += 0.001
           this.repoint[i].lng += 0.001
         }
          // console.log(this.points);
          // console.log(this.repoint);
          // console.log(this.repointInfo);
          // console.log(this.pointInfo);
        })

      },
      showInfo({currentTarget, point, returnValue, target, type}){
        this.infoOff = true
        this.infoPosition.lng = point.lng
        this.infoPosition.lat = point.lat
        // console.log(point);
        // console.log('info',this.pointInfo);
        this.pointInfo.forEach(item => {   // 获取滑过标点窗体信息 && item.recorded_lng === point.lng
          if(item.decoded_lat === point.lat && item.decoded_lng === point.lng){
            this.infoCont = 'name: '+ item.name + '</br>' +  '状态: '+ item.status + '</br>' + '经度: '+ point.lat + '</br>' +  '纬度: '+ point.lng + '</br>' + '最新时间: '+ item.time + '</br>' +  '设备类型: '+ item.device_type
          }
        })
      },
      t_showInfo({currentTarget, point, returnValue, target, type}) {
        this.t_show = true
        this.t_pos.lat = point.lat
        this.t_pos.lng = point.lng
        this.test.forEach(item => {   // 获取滑过标点窗体信息 && item.recorded_lng === point.lng
          if(item.lat === point.lat && item.lng === point.lng){
            // this.t_info = 'name: '+ item.name + '</br>' +  '状态: '+ item.status + '</br>' + '经度: '+ point.lat + '</br>' +  '纬度: '+ point.lng + '</br>' + '最新时间: '+ item.time + '</br>' +  '设备类型: '+ item.device_type
            this.t_info = 'name: ' + item.name + '</br>' + '经度: '+ point.lat + '</br>' +  '纬度: '+ point.lng + '</br>'
          }
        })
      },
      infoWindowClose (e) {
        this.infoOff = false
      },
      infoWindowOpen (e) {
        this.infoOff = true
      },
      infoWindowClose1 (e) {
        this.t_show = false
      },
      infoWindowOpen1 (e) {
        this.t_show = true
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
      update (e) {
        this.points = e.target.cornerPoints
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .map{
    position: relative;
    left: -3px;
    top: 6px;
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
