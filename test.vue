<template>
  <baidu-map class="map" :center="{lng: 118.454, lat: 32.955}" :zoom="5">
    <bml-curve-line :points="points" :editing="true" @lineupdate="update"></bml-curve-line>
    <bml-curve-line :points="test" :editing="true" @lineupdate="update"></bml-curve-line>
  </baidu-map>
</template>

<script>
  import MyMap from "./src/views/components/MyMap";
  import {BmlCurveLine} from 'vue-baidu-map'
  export default {
    components: {
      BmlCurveLine
    },
    methods: {
      update (e) {
        this.points = e.target.cornerPoints
      }
    },
    data () {
      return {
        points: [
          {lng: 116.432045, lat: 39.910683},
          {lng: 120.129721, lat: 30.314429},
          // {lng: 121.491121, lat: 25.127053}
        ],
        test:[
          {lng: 116.432045, lat: 39.910683},
          //{lng: 120.129721, lat: 30.314429},
          {lng: 121.491121, lat: 25.127053}
        ]
      }
    }
  }
</script>
<!--
<template>
  <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="5" :scroll-wheel-zoom="true">
    <bm-polyline :path="polylinePath" stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="2" :editing="true" @lineupdate="updatePolylinePath"></bm-polyline>
  </baidu-map>
</template>

<script>
  import MyMap from "./src/views/components/MyMap";
  export default {
    data () {
      return {
        polylinePath: [
          {lng: 116.432045, lat: 39.910683},
          {lng: 120.129721, lat: 30.314429},
          {lng: 121.491121, lat: 25.127053}
        ]
      }
    },
    methods: {
      updatePolylinePath (e) {
        this.polylinePath = e.target.getPath()
      },
      addPolylinePoint () {
        this.polylinePath.push({lng: 116.404, lat: 39.915})
      }
    }
  }
</script>
-->
