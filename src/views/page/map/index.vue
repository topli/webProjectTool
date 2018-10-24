<template>
  <div id="screenfullBox" style="width: 100%;height: 100%">
    <div id="mapBox" style="width: 100%;height: 100%">
    </div>
    <el-button type="success" @click="click" style="position: absolute; top: 0;left: 0;">全屏</el-button>
  </div>
</template>

<script>
  import BMap from 'BMap';
  import screenfull from 'screenfull';

  export default {
    components: {},
    mixins: [],
    data() {
      return {
        map: null
      };
    },
    mounted() {
      this.initMap();
    },
    methods: {
      initMap() {
        this.map = new BMap.Map('mapBox', { enableMapClick: false });
        this.map.centerAndZoom(new BMap.Point(106.530635013, 29.5446061089), 12);  // 地图默认定位到重庆
      },
      click() {
        const el = document.getElementById('screenfullBox');
        if (screenfull.enabled) {
          screenfull.request(el);
        }
      }
    }
  };
</script>

<style scoped>

</style>
