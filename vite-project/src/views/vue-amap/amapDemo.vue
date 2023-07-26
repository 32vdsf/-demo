<template>
  <div class="container">
    <!-- <div class="container"></div> -->
    <!-- <template> -->
    <!-- 地图 -->
    <el-button type="priamary" @click="addMarker">点击添加标记点</el-button>
    <el-button type="primary" plain @click="removeMarker">删除标记点</el-button>

    <div id="map"></div>
    <!-- </template> -->
    <!-- </div> -->
    <!-- </template> -->
  </div>
</template>
<!-- <script setup>
// var map = new AMap.Map("container");
window.onLoad = function () {
  var map = new AMap.Map("container", {
    zoom: 11, //级别
    center: [116.397428, 39.90923], //中心点坐标
    viewMode: "3D", //使用3D视图);
  });
};

 
function initMap() {
    let that = this
    this.map = new AMap.Map('track-map', {
        zoom: 11,//级别
        center: [116.397428, 39.90923],//中心点坐标
        resizeEnable: true,
        zoom: 12,
    });
    // 插件
    AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
        that.map.addControl(new AMap.ToolBar())
        that.ma
    })
}
onMounted(){
    initMap()
  }
</script> -->
<script setup lang="ts">
import { onMounted, ref } from "vue";
// import { useRoute } from "vue-router";
// import { getMedicalOrderLogistics } from "@/api/order";
// import type { Logistics } from "@/types/order";
import AMapLoader from "@amap/amap-jsapi-loader"; //地图
// import startImg from "@/assets/start.png";
// import endImg from "@/assets/end.png";
// import carImg from "../../assets/vue.svg";
// window._AMapSecurityConfig = {
//   securityJsCode: "7713f4ba19ee015c27a7a23bd34bf1b8",
// };

// 获取物流信息
// const logistics = ref<Logistics>();
// const route = useRoute();
function addMarker() {
  AMapLoader.load({
    key: "639d4746cedd0f218a1ce498f10d9559",
    version: "2.0",
  }).then((AMap) => {
    const map = new AMap.Map("map", {
      mapStyle: "amap://styles/macaron",
      zoom: 11, //这个越大 地图越大 看的地图详细
      // center: [116.397428, 39.90923],
      center: [121.391382, 37.539297],
      viewMode: "3D", //使用3D视图
    });
    var marker = new AMap.Marker({
      position: [121.391382, 37.539297], //位置
    });
    map.add(marker); //添加到地图
  });
}
function removeMarker() {
  AMapLoader.load({
    key: "639d4746cedd0f218a1ce498f10d9559",
    version: "2.0",
  }).then((AMap) => {
    const map = new AMap.Map("map", {
      mapStyle: "amap://styles/macaron",
      zoom: 11, //这个越大 地图越大 看的地图详细
      // center: [116.397428, 39.90923],
      center: [121.391382, 37.539297],
      viewMode: "3D", //使用3D视图
    });
    var marker = new AMap.Marker({
      position: [121.391382, 37.539297], //位置
    });
    map.remove(marker);
  });
}
onMounted(() => {
  //   const res = await getMedicalOrderLogistics(route.params.id as string);
  //   logistics.value = res.data;
  // 一、普通地图
  //   操作map地图元素
  // AMapLoader.load({
  //   key: "639d4746cedd0f218a1ce498f10d9559",
  //   version: "2.0",
  // }).then((AMap) => {
  //   // 1.使用 Amap 初始化地图
  //   const map = new AMap.Map("map", {
  //     mapStyle: "amap://styles/macaron",
  //     zoom: 11, //这个越大 地图越大 看的地图详细
  //     // center: [116.397428, 39.90923],
  //     center: [121.391382, 37.539297],
  //     viewMode: "3D", //使用3D视图
  //   });
  //   var trafficLayer = new AMap.TileLayer.Traffic({
  //     zIndex: 10,
  //   });
  //   map.add(trafficLayer); //添加图层到地图
  // 二、3d
  // var buildings = new AMap.Buildings({
  //   zooms: [10, 14],
  //   zIndex: 10,
  //   heightFactor: 2, //2倍于默认高度，3D下有效
  // }); //楼块图层
  // var map = new AMap.Map("map", {
  //   center: [121.391382, 37.539297],
  //   viewMode: "3D",
  //   pitch: 60,
  //   rotation: -35,
  //   features: ["bg", "road", "point"], //隐藏默认楼块
  //   mapStyle: "amap://styles/light",
  //   layers: [
  //     new AMap.TileLayer.Satellite(), //高德默认标准图层
  //     buildings,
  //   ],
  //   zoom: 16,
  // });
  //
  //三、
  AMapLoader.load({
    key: "639d4746cedd0f218a1ce498f10d9559",
    version: "2.0",
  }).then((AMap) => {
    const map = new AMap.Map("map", {
      mapStyle: "amap://styles/macaron",
      zoom: 11, //这个越大 地图越大 看的地图详细
      // center: [116.397428, 39.90923],
      center: [116.481181, 39.989792],
      viewMode: "3D", //使用3D视图
    });
    var marker = new AMap.Marker({
      position: [116.481181, 39.989792], //位置
    });
    map.add(marker); //添加到地图
    var infoWindow = new AMap.InfoWindow({
      //创建信息窗体
      isCustom: true, //使用自定义窗体
      content: "<div>信息窗体</div>", //信息窗体的内容可以是任意html片段
      offset: new AMap.Pixel(16, -45),
    });
    var onMarkerClick = function (e) {
      infoWindow.open(map, e.target.getPosition()); //打开信息窗体
      //e.target就是被点击的Marker
    };
    marker.on("click", onMarkerClick); //绑定click事件
    // });
    // 2.加载路线规划组件
    AMap.plugin("AMap.Driving", function () {
      var toolbar = new AMap.ToolBar();
      map.addControl(toolbar);
      var driving = new AMap.Driving(); //驾车路线规划
      driving.search(/*参数*/);
    });
    //         // 初始化路线规划对象
    //         const driving = new AMap.Driving({
    //             map: map, //在那个地图上规划
    //             showTraffic: false, //隐藏路途拥堵状态
    //             hideMarkers: true, //隐藏覆盖物 标记点(但是此时起点终点的标记也没有了，需要自己绘制)
    //         });
    //         let latitude = '31.93182'
    //         let longitude = '118.633415'
    //         // 使用经纬度数组中的第一个数据：起始坐标
    //         // 使用经纬度数组中的最后一个数据：终点坐标
    //         //   if (logistics.value && logistics.value?.logisticsInfo.length >= 2) {
    //         //     const list = [...logistics.value.logisticsInfo];
    //         // [
    //         //   ({ latitude: '30.454012', longitude: '114.42659' },
    //         //   { latitude: '31.93182', longitude: '118.633415' })
    //         // ]
    //         // 起点
    //         // const start = list.shift();
    //         // 绘制起点图标
    //         var startMarker = new AMap.Marker({
    //             //   icon: startImg,
    //             position: [{ latitude: '30.454012', longitude: '114.42659' }],
    //         });
    //         map.add(startMarker); // 单独将点标记添加到地图上
    //         // 终点
    //         // const end = list.pop();
    //         // 绘制终点图标
    //         var endMarker = new AMap.Marker({
    //             //   icon: endImg,
    //             position: [{ latitude: '31.93182', longitude: '118.633415' }],
    //         });
    //         map.add(endMarker); // 单独将点标记添加到地图上
    //         // 此时list就剩下 路途中经过的经纬度对象
    //         //四个参数： 起始点，终点，路途中的经纬度，规划好之后的回调函数
    //         // driving.search(
    //         //   [start?.longitude, start?.latitude],
    //         //   [end?.longitude, end?.latitude],
    //         //   { waypoints: list.map((item) => [item.longitude, item.latitude]) },
    //         function (status: string, result: object) {
    //             //未出错时候，result就是对应的路线规划完的方案
    //             // 等路径规划完才能看到途径的位置图标在哪里显示
    //             // 绘制运输中货车的位置
    //             var currentMarker = new AMap.Marker({
    //                 //   icon: carImg,
    //                 position: [
    //                     '31.93182', '118.633415'
    //                 ],
    //                 anchor: "center", //调整货车图片的定位
    //             });
    //             map.add(currentMarker);
    //             // 3s后定位到货车，放大到地图，看的详细你现在运送到哪了
    //             setTimeout(() => {
    //                 map.setFitView([currentMarker]);
    //                 map.setZoom(10); //缩放级别
    //             }, 3000);
    //         }
    //     }
    //     );
  });
});
</script>
 

<style scoped>
.container {
  width: 1000px;
  height: 250px;
}
#map {
  margin-top: -200px;
  width: 100%;
  /* width: 300px; */
  height: 100%;
  margin: auto;
}
</style>
