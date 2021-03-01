<template>
  <baidu-map class="map" :center="center" :zoom="17" :scroll-wheel-zoom="true">
    <bml-curve-line :points="handled_points" :editing="true" @lineupdate="update"></bml-curve-line>
    <bml-curve-line :points="handled_points1" :editing="true" @lineupdate="update1" :strokeColor="color"></bml-curve-line>
    <bm-point-collection :points="handled_points" shape="BMAP_POINT_SHAPE_STAR" color="#0923D9" size="BMAP_POINT_SIZE_BIG"  @mouseover="showInfo"></bm-point-collection>
    <bm-point-collection :points="handled_points1" shape="BMAP_POINT_SHAPE_STAR" color="#0923D9" size="BMAP_POINT_SIZE_BIG"  @mouseover="showInfo"></bm-point-collection>
    <bm-info-window :position="infoPosition" title="节点信息：" :show="infoOff" @close="infoWindowClose" @open="infoWindowOpen" style="width: 300px">
      <p v-html="infoCont"></p>
    </bm-info-window>
    <bm-overlay
            v-for="(point,index) of handled_points"
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
    name: "WuHan",
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
        // center:{lng: 102.76076211117798, lat: 28.952929447642415},
        center:{lng:114.369212,lat:30.54415},
        points:[],
        handled_points:[],
        points1:[],
        handled_points1:[],
        color:'#f00',
        pointInfo:[],
        infoPosition: {lng: 0, lat: 0},      // 信息窗口位置
        infoOff: false,     //  信息窗口显示
        infoCont:''   ,       // 信息窗口内容
        start_time: '2020-08-28 09:00:00',
        end_time:'2020-08-28 23:35:00',
      }
    },
    async mounted() {
     /*axios({
        method:'post',
        url:'http://203.91.121.228:12864/queryDeviceInfoTrace',
        data:{
          name:'loc-ap-10',
          start_time: this.start_time,
          end_time: this.end_time
          // start_time:"",
          // end_time:"",
        }
      }).then(res => {
       console.log(res);
       let data = res.data.data
        for(let item of data){
          let obj = {}
          obj.lat = item.recorded_lat
          obj.lng = item.recorded_lng
          this.points.push(obj)
          this.pointInfo.push(item)
          // let test = this.inLocation(obj)
          // this.points.push(test)
          // if(test.lat === item.recorded_lat)
          //     this.pointInfo.push(item)
          // else {
          //   item.recorded_lat = test.lat
          //   item.recorded_lng = test.lng
          //   this.pointInfo.push(item)
          // }
        }
      //  axios({
      //   method:'post',
      //   url: 'http://39.104.103.169:7071/',
      //   data:{
      //     data_list_raw: this.points
      //   }
      // }).then(res => {
      //   console.log('处理后的数据',res);
      // })
    })*/
     // const result = await this.getPoints()
     //  console.log('result',result);
      /*axios({
        method:'post',
        url:'http://203.91.121.228:12864/queryDeviceInfoTrace',
        data:{
          name:'loc-ap-11',
          start_time: this.start_time,
          end_time: this.end_time
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
          // let test = this.inLocation(obj)
          // this.points1.push(test)
          // if(test.lat === item.recorded_lat)
          //   this.pointInfo.push(item)
          // else {
          //   item.recorded_lat = test.lat
          //   item.recorded_lng = test.lng
          //   this.pointInfo.push(item)
          // }
        }
        // console.log(this.points);
      })*/
      const result = await this.getPoints()
      let data = result.data.data
      for(let item of data) {
        let obj = {}
        obj.lat = item.recorded_lat
        obj.lng = item.recorded_lng
        this.points.push(obj)
        this.pointInfo.push(item)
      }
      let finalres = await this.handled_p()
      this.handled_points = finalres.data.data
      for(let i = 0; i < this.handled_points.length;i++) {
        this.pointInfo[i].recorded_lat = this.handled_points[i].lat
        this.pointInfo[i].recorded_lng = this.handled_points[i].lng
      }
      let length = this.pointInfo.length
      const result1 = await this.getPoints1()
      let data1 = result1.data.data
      // console.log(data);
      for(let item of data1) {
        let obj = {}
        obj.lat = item.recorded_lat
        obj.lng = item.recorded_lng
        this.points1.push(obj)
        this.pointInfo.push(item)
      }
     let finalres1 = await this.handled_p1()
      this.handled_points1 = finalres1.data.data
      let j = 0
      for(let i = length; i < this.handled_points1.length + length;i++) {
        this.pointInfo[i].recorded_lat = this.handled_points1[j].lat
        this.pointInfo[i].recorded_lng = this.handled_points1[j].lng
        j++;
      }
    },
    methods:{
      getPoints() {
        return new Promise((resolve, reject) => {
          axios({
            method:'post',
            url:'http://203.91.121.228:12864/queryDeviceInfoTrace',
            data:{
              name:'loc_ap_14',
              start_time: this.start_time,
              end_time: this.end_time
              // start_time:"",
              // end_time:"",
            }
          }).then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        })
      },
      getPoints1() {
        return new Promise((resolve, reject) => {
          axios({
            method:'post',
            url:'http://203.91.121.228:12864/queryDeviceInfoTrace',
            data:{
              name:'loc_ap_17',
              start_time: this.start_time,
              end_time: this.end_time
              // start_time:"",
              // end_time:"",
            }
          }).then(res => {
            // console.log(res);
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        })
      },
      handled_p() {
        return new Promise((resolve, reject) => {
          axios({
            method: 'post',
            url: 'http://39.104.103.169:7071/',
            data:{
              raw_data:this.points
            }
          }).then(res => resolve(res)).catch(err => reject(err))
        })
      },
      handled_p1() {
        return new Promise((resolve, reject) => {
          axios({
            method: 'post',
            url: 'http://39.104.103.169:7071/',
            data:{
              raw_data:this.points1
            }
          }).then(res => resolve(res)).catch(err => reject(err))
        })
      },
      update (e) {
        // this.points = e.target.cornerPoints
        this.handled_points = e.target.cornerPoints
      },
      update1 (e) {
        // this.points1 = e.target.cornerPoints
        this.handled_points1 = e.target.cornerPoints
      },
      showInfo({currentTarget, point, returnValue, target, type}){
        // console.log(this.val);
        // console.log(point);
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
          if(item.recorded_lat === point.lat && item.recorded_lng === point.lng){
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

      // 判断点是否在指定的范围之内,如果不在,则随机生成一个范围内的点
      /*inLocation(point){
        let lng1 = 114.365459
        let lng2 = 114.37092
        let lat1 = 30.532972
        let lat2 = 30.542366
        if((point.lng > lng1 && point.lng < lng2) && (point.lat > lat1 && point.lat < lat2)){
          return point
        }else{
          let obj = {lng: 0, lat: 0}
          // let min = Math.ceil(lng1);
          // let max = Math.floor(lng2);
          // let min1 = Math.ceil(lat1);
          // let max1 = Math.floor(lat2);
          obj.lng =  Math.random() * (lng2 - lng1) + lng1; //不含最大值，含最小值
          obj.lat = Math.random() * (lat2 - lat1) + lat1; //不含最大值，含最小值
          console.log(obj);
          return obj
        }
      }*/
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
