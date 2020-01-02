<template>
  <baidu-map
    class="map"
    ak="BcFOSdgOOD2ie0nSulgGGRC3hrLrFQcX"
    :center="center"
    :zoom="zoom"
    @ready="handler"
  >
    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
    <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
    <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
    <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true"></bm-overview-map>
    <bm-marker :position="{lng: 116.276429, lat: 40.192449}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" @click="clickHandler">
      <bm-label content="1#施肥机" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}" />
    </bm-marker>
    <bm-marker :position="{lng: 116.2777, lat: 40.192704}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" @click="clickHandler">
      <bm-label content="2#施肥机" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}" />
    </bm-marker>
  </baidu-map>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
export default {
  data () {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 3
    }
  },
  methods: {
    clickHandler (e) {
      alert(`单击点的坐标为：${e.point.lng}, ${e.point.lat}`)
    },
    handler ({ BMap, map }) {
      // console.log(BMap, map)
      this.center.lng = 116.27667165
      this.center.lat = 40.19271592
      this.zoom = 18
    }
  },
  components: {
    BaiduMap
  }
}
</script>

<style lang="less" scoped>
.map {
  width: 100%;
  height: 80%;

  /deep/ .anchorBL {
    display: none;
  }
}
</style>
