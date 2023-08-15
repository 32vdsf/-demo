<!--
 * @Author: error: git config user.name & please set dead value or install git
 * @Date: 2023-07-26 14:26:17
 * @LastEditors: yangmingyue
 * @LastEditTime: 2023-08-11 10:33:28
 * @Description: 
 * 
 * @copyright: Copyright (c) 2023 瑞康医药集团股份有限公司 (realcan.cn), All Rights Reserved.
 *  ~***瑞康医药独有知识产权产品，禁止私自拷贝、禁止商用禁止提供任何代码功能设计文件给公司外部任何组织和个人,违者必究
-->
<template>
  <div class="container">
    <!-- <div class="container"></div> -->
    <!-- <template> -->
    <!-- 地图 -->
    <el-button type="priamary" @click="addMarker">点击添加标记点</el-button>
    <el-button type="primary" plain @click="removeMarker">删除标记点</el-button>

    <div id="map"></div>
    <div class="info">
      <h4>获取地图级别与中心点坐标</h4>
      <p>当前级别：<span id="map-zoom">11</span></p>
      <p>当前中心点：<span id="map-center">121.498586,31.239637</span></p>
    </div>
    <div class="input-card">
      <h4>鼠标左键获取经纬度：</h4>
      <div class="input-item">
        <input type="text" readonly="true" id="lnglat" />
      </div>
    </div>
    <!-- </template> -->
    <!-- </div> -->
    <!-- </template> -->
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader"; //地图
// const map = shallowRef(null)

// 初始化地图
function initMap() {
  AMapLoader.load({
    key: "e6cf30fd79d7b556ee881ddd0281e8d0", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [
      "AMap.Scale", //工具条，控制地图的缩放、平移等
      "AMap.ToolBar", //比例尺，显示当前地图中心的比例尺
      "AMap.Geolocation", //定位，提供了获取用户当前准确位置、所在城市的方法
      "AMap.HawkEye", //鹰眼，显示缩略图
    ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      let map = new AMap.Map("map", {
        //设置地图容器id
        zoom: 5, //初始化地图层级
        viewMode: "3D", //是否为3D地图模式
        center: [116.397436, 39.909165], //初始化地图中心点位置
        dragEnable: true, //禁止鼠标拖拽
        scrollWheel: true, //鼠标滚轮放大缩小
        doubleClickZoom: true, //双击放大缩小
        keyboardEnable: true, //键盘控制放大缩小移动旋转
      });
      map.setDefaultCursor("pointer"); //使用CSS默认样式定义地图上的鼠标样式（default/pointer/move/crosshair）
      map.addControl(new AMap.Scale()); //异步同时加载多个插件
      map.addControl(new AMap.ToolBar());
      map.addControl(new AMap.Geolocation());
      let HawkEye = new AMap.HawkEye({
        position: "LT", //控件停靠位置（LT/RT/LB/RB）
      });
      map.addControl(HawkEye);
      map.add(
        new AMap.Marker({
          position: map.getCenter(),
        })
      );
      // map.add(marker); // 地图添加标记
      AMapLoader.load({
        //可多次调用load
        plugins: ["AMap.MapType"],
      })
        .then((AMap) => {
          map.addControl(new AMap.MapType());
        })
        .catch((e) => {
          console.error(e);
        });
      // 显示地图层级与中心点信息
      function logMapinfo() {
        let zoom = map.getZoom(); //获取当前地图级别
        let center = map.getCenter(); //获取当前地图中心位置
        document.querySelector("#map-zoom").innerText = zoom;
        document.querySelector("#map-center").innerText = center.toString();
      }
      //绑定地图移动与缩放事件
      map.on("moveend", logMapinfo);
      map.on("zoomend", logMapinfo);
      //为地图注册click事件获取鼠标点击出的经纬度坐标
      map.on("click", function (e) {
        document.getElementById("lnglat").value =
          e.lnglat.getLng() + "," + e.lnglat.getLat();
      });
      let infoWindow = new AMap.InfoWindow({
        //创建信息窗体
        isCustom: false, //使用自定义窗体
        anchor: "top-right", //信息窗体的三角所在位置
        content: `<h4>信息窗体</h4>`, //信息窗体的内容可以是任意html片段
        offset: new AMap.Pixel(16, -45),
      });
      infoWindow.open(map, [121.939253, 29.905078]); //填写想要窗体信息指示的坐标
    })
    .catch((e) => {
      console.log(e);
    });
}

// 调用地图初始化函数：onMounted 函数会在 DOM 初始化完成后调用，建议在 mounted 函数中调用地图初始化方法
onMounted(() => {
  initMap();
});

// return { map, initMap };ß
</script>
<style scoped>
.container {
  width: 100vw;
  height: 100vh;
}
#map {
  margin-top: -200px;
  width: 100%;
  /* width: 300px; */
  height: 100%;
  margin: auto;
}
</style>