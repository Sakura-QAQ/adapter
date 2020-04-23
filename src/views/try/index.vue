<template>
<div class="cotainer">
  <!-- <div>
    <button @click="add">添加施肥机</button>
    <button @click="del">删除施肥机</button>
    <button @click="addvalve">添加电磁阀</button>
    <button @click="delvalve">删除电磁阀</button>
    <label>关键词：<input v-model="keyword"></label>
    <label>地区：<input v-model="location"></label>
    <button @click="resetBtn">关闭</button>
  </div> -->
  <baidu-map
    class="map"
    ak="BcFOSdgOOD2ie0nSulgGGRC3hrLrFQcX"
    :center="center"
    :zoom="zoom"
    @ready="handler"
  >
    <bm-local-search class="search" :keyword="keyword" :pageCapacity="5" :auto-viewport="true" :location="location"></bm-local-search>

    <bml-marker-clusterer :averageCenter="true">
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-map-type
        :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
        anchor="BMAP_ANCHOR_TOP_LEFT"
      ></bm-map-type>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true"></bm-overview-map>
      <bm-marker
        v-for="(marker, i) of markers"
        :key="i"
        :icon="{url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif', size: {width: 200, height: 125}}"
        :position="{lng: marker.lng, lat: marker.lat}"
        :dragging="true"
        @click="clickHandler"
      >
        <bm-label
          :content = "i+1+'#施肥机'"
          :labelStyle="{color: 'red', fontSize : '14px'}"
          :offset="{width: -18, height: 30}"
        />
        <!-- <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen">{{i}}施肥机</bm-info-window> -->
      </bm-marker>
      <bm-marker
        v-for="(valve, i) of valves"
        :key="i + '-only'"
        :position="{lng: valve.lng, lat: valve.lat}"
        :dragging="true"
        @click="clickHandler"
      >
        <bm-label
          :content = "i+1+'#电磁阀'"
          :labelStyle="{color: 'blue', fontSize : '14px'}"
          :offset="{width: -18, height: 30}"
        />
        <!-- <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen">{{i}}施肥机</bm-info-window> -->
      </bm-marker>
    </bml-marker-clusterer>
  </baidu-map>
</div>
</template>

<script>
import { BmlMarkerClusterer } from 'vue-baidu-map'
export default {
  data () {
    return {
      location: '',
      keyword: '',
      markers: [],
      valves: [],
      center: { lng: 0, lat: 0 },
      zoom: 5,
      i: 1,
      show: false
    }
  },
  methods: {
    add () {
      const position = {
        lng: 116.276429,
        lat: 40.192602
      }
      // if (this.markers.length === 5) {
      //   return false
      // } else {
      //   this.markers.push(position)
      // }
      this.markers.push(position)
    },
    del () {
      this.markers.splice(this.markers.indexOf(this.markers), 1)
    },
    addvalve () {
      const valve = {
        lng: 116.276429,
        lat: 40.192602
      }
      this.valves.push(valve)
    },
    delvalve () {
      this.valves.splice(this.valves.indexOf(this.valves), 1)
    },
    handler ({ BMap, map }) {
      this.center.lng = 116.27667165
      this.center.lat = 40.19271592
      this.zoom = 20
    },
    clickHandler (e) {
      alert(`当前施肥机坐标为：${e.point.lng}, ${e.point.lat}`)
    },
    resetBtn ({ BMap, map }) {
      this.location = ''
      this.keyword = ''
    }
  },
  components: {
    BmlMarkerClusterer
  }
}
</script>

<style lang="less" scoped>
.cotainer {
  width: 100%;
  height: 100%;
  .map {
    position: relative;
    width: 100%;
    height: 92%;

    /deep/ .anchorBL {
      display: none;
    }
    .search {
      position: absolute;
      top: 0;
    }
  }
}
</style>
