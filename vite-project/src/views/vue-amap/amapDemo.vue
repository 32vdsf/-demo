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
    // 添加插件
    AMap.plugin(
      [
        "AMap.ToolBar",
        "AMap.Scale",
        "AMap.HawkEye",
        "AMap.Geolocation",
        "AMap.MapType",
        "AMap.MouseTool",
        "AMap.Polyline",
      ],
      function () {
        // animationMove();
        //异步同时加载多个插件
        // 添加地图插件
        // map.addControl(new AMap.ToolBar()) // 工具条控件;范围选择控件
        // map.addControl(new AMap.Scale()); // 显示当前地图中心的比例尺
        // map.addControl(new AMap.HawkEye()) // 显示缩略图
        // map.addControl(new AMap.Geolocation()) // 定位当前位置
        // map.addControl(new AMap.MapType()) // 实现默认图层与卫星图,实时交通图层之间切换
        // 以下是鼠标工具插件
        // const mouseTool = new AMap.MouseTool(map);
        // mouseTool.rule();// 用户手动绘制折线图,测量距离
        // mouseTool.measureArea() // 测量面积
      }
    );
    // console.log("AMap", AMap);

    const map = new AMap.Map("map", {
      mapStyle: "amap://styles/macaron",
      zoom: 12, //这个越大 地图越大 看的地图详细
      // center: [116.397428, 39.90923],
      center: [121.391382, 37.539297],
      // viewMode: "3D", //使用3D视图
    });
    // 实例化点标记
    // const marker = new AMap.Marker({
    //   icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
    //   position: [121.391382, 37.539297], // 这里我们通过上面的点击获取经纬度坐标,实时添加标记
    //   // 通过设置 offset 来添加偏移量
    //   offset: new AMap.Pixel(-26, -54),
    // });
    var blueIcon = new AMap.Icon({
      // size: new AMap.Size(50, 120), // 设置图标大小
      image: "https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png", // 设置图标样式
      imageOffset: new AMap.Pixel(0, 0), // 设置图标偏移
      imageSize: new AMap.Size(32, 50), // 设置图标尺寸
    });
    const marker = new AMap.Marker({
      map: map,
      position: [121.391382, 37.539297],
      icon: blueIcon,
      offset: new AMap.Pixel(-13, -26),
      draggable: true, // 设置 marker 可拖拽
      // imageSize: new AMap.Size(50, 50), // 设置图标尺寸
      // size: new AMap.Size(32, 32), // 设置图标大小
    });
    //这里监听标注点的点击事件，触发实现动画效果
    marker.on("click", function () {
      animationMove();
    });
    marker.setMap(map);
    function animationMove() {
      AMap.plugin("AMap.MoveAnimation", function () {
        var marker,
          lineArr = [
            [121.391382, 37.539297],
            [121.391483, 37.539315],
            [121.391584, 37.53942],
            [121.391685, 37.53953],
            [121.391686, 37.53966],
            [121.391787, 37.53978],
            [121.391888, 37.5398],
            [121.391986, 37.53992],
            [121.392082, 37.54],
            [121.402582, 37.545],
            // [121.391382, 37.s56],
            // [121.391382, 37.5795],
            // [121.391382, 37.582],
            // [121.391382, 37.584],
            // [121.391382, 37.586],
            // [121.391382, 37.588],
            // [121.391382, 37.5884],
            // [121.391382, 37.58662],
            // [121.391382, 37.58964],
          ];

        var map = new AMap.Map("map", {
          resizeEnable: true,
          center: [116.397428, 39.90923],
          zoom: 17,
        });
        var blueIcon = new AMap.Icon({
          // size: new AMap.Size(50, 120), // 设置图标大小
          image: "https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png", // 设置图标样式
          imageOffset: new AMap.Pixel(0, 0), // 设置图标偏移
          imageSize: new AMap.Size(32, 50), // 设置图标尺寸
        });
        marker = new AMap.Marker({
          map: map,
          position: [121.391382, 37.539297],
          icon: blueIcon,
          offset: new AMap.Pixel(-13, -26),
          draggable: true, // 设置 marker 可拖拽
          // imageSize: new AMap.Size(50, 50), // 设置图标尺寸
          // size: new AMap.Size(32, 32), // 设置图标大小
        });

        // 绘制轨迹
        var polyline = new AMap.Polyline({
          map: map,
          path: lineArr,
          showDir: true,
          strokeColor: "#28F", //线颜色
          // strokeOpacity: 1,     //线透明度
          strokeWeight: 6, //线宽
          // strokeStyle: "solid"  //线样式
        });

        var passedPolyline = new AMap.Polyline({
          map: map,
          strokeColor: "#AF5", //线颜色
          strokeWeight: 6, //线宽
        });

        // marker.on("moving", () => {
        //   passedPolyline.setPath(e.passedPath);
        //   map.setCenter(e.target.getPosition(), true);
        // });

        map.setFitView();
        marker.moveAlong(lineArr, {
          // 每一段的时长
          duration: 500, //可根据实际采集时间间隔设置
          // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
          autoRotation: true,
        });
      });
    }
    // });
    // 2.加载路线规划组件
    // AMap.plugin("AMap.Driving", function () {
    //   var toolbar = new AMap.ToolBar();
    //   map.addControl(toolbar);
    //   var driving = new AMap.Driving(); //驾车路线规划
    //   driving.search(/*参数*/);
    // });
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
  width: 2000px;
  height: 1000px;
}
#map {
  margin-top: -200px;
  width: 100%;
  /* width: 300px; */
  height: 100%;
  margin: auto;
}
.amap-icon {
  width: 50px;
}
</style>
