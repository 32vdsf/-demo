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
<script setup>
import { onMounted, ref } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader"; //地图
const initMap = () => {
  AMapLoader.load({
    key: "key", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.moveAnimation"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    AMapUI: {
      // 是否加载 AMapUI，缺省不加载
      version: "1.1", // AMapUI 版本
      plugins: [], // 需要加载的 AMapUI ui插件
    },
  })
    .then((AMap) => {
      const map = new AMap.Map("container", {
        //设置地图容器id
        viewMode: "3D", //是否为3D地图模式
        zoom: 13, //初始化地图级别
        center: current_position.value, //初始化地图中心点位置
        mapStyle: "amap://styles/fresh",
      });
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
          //异步同时加载多个插件
          // 添加地图插件
          // map.addControl(new AMap.ToolBar()) // 工具条控件;范围选择控件
          map.addControl(new AMap.Scale()); // 显示当前地图中心的比例尺
          // map.addControl(new AMap.HawkEye()) // 显示缩略图
          // map.addControl(new AMap.Geolocation()) // 定位当前位置
          // map.addControl(new AMap.MapType()) // 实现默认图层与卫星图,实时交通图层之间切换

          // 以下是鼠标工具插件
          const mouseTool = new AMap.MouseTool(map);
          // mouseTool.rule();// 用户手动绘制折线图,测量距离
          // mouseTool.measureArea() // 测量面积
        }
      );
      // 实例化点标记
      const marker = new AMap.Marker({
        icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
        position: current_position.value, // 这里我们通过上面的点击获取经纬度坐标,实时添加标记
        // 通过设置 offset 来添加偏移量
        offset: new AMap.Pixel(-26, -54),
      });
      //这里监听标注点的点击事件，触发实现动画效果
      marker.on("click", function () {
        animationMove();
      });
      marker.setMap(map);

      // 历史轨迹动画
      function animationMove() {
        AMap.plugin("AMap.MoveAnimation", function () {
          var marker,
            lineArr = [
              [116.478935, 39.997761],
              [116.478939, 39.997825],
              [116.478912, 39.998549],
              [116.478912, 39.998549],
              [116.478998, 39.998555],
              [116.478998, 39.998555],
              [116.479282, 39.99856],
              [116.479658, 39.998528],
              [116.480151, 39.998453],
              [116.480784, 39.998302],
              [116.480784, 39.998302],
              [116.481149, 39.998184],
              [116.481573, 39.997997],
              [116.481863, 39.997846],
              [116.482072, 39.997718],
              [116.482362, 39.997718],
              [116.483633, 39.998935],
              [116.48367, 39.998968],
              [116.484648, 39.999861],
            ];

          var map = new AMap.Map("container", {
            resizeEnable: true,
            center: [116.397428, 39.90923],
            zoom: 17,
          });

          marker = new AMap.Marker({
            map: map,
            position: [116.478935, 39.997761],
            icon: "https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png",
            offset: new AMap.Pixel(-13, -26),
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

          marker.on("moving", () => {
            passedPolyline.setPath(e.passedPath);
            map.setCenter(e.target.getPosition(), true);
          });

          map.setFitView();
          marker.moveAlong(lineArr, {
            // 每一段的时长
            duration: 500, //可根据实际采集时间间隔设置
            // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
            autoRotation: true,
          });
        });
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
initMap();
</script>