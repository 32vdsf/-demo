<!--
 * @Author: yangmingyue
 * @Date: 2023-07-26 17:32:29
 * @LastEditors: yangmingyue
 * @LastEditTime: 2023-08-16 21:17:17
 * @Description: 
 * 
 * @copyright: Copyright (c) 2023 瑞康医药集团股份有限公司 (realcan.cn), All Rights Reserved.
 *  ~***瑞康医药独有知识产权产品，禁止私自拷贝、禁止商用禁止提供任何代码功能设计文件给公司外部任何组织和个人,违者必究
-->
<template>
  <div>
    <div id="container"></div>
    <div class="input-card-right-box">
      <!-- <div class="input-card-right">
        <div class="input-item">
          <input type="radio" name="func" checked="" value="marker" /><span
            class="input-text"
            >画点</span
          >
          <input type="radio" name="func" value="polyline" /><span
            class="input-text"
            >画折线</span
          >
          <input type="radio" name="func" value="polygon" /><span
            class="input-text"
            style="width: 5rem"
            >画多边形</span
          >
        </div>
        <div class="input-item">
          <input type="radio" name="func" value="rectangle" /><span
            class="input-text"
            >画矩形</span
          >
          <input type="radio" name="func" value="circle" /><span
            class="input-text"
            >画圆</span
          >
        </div>
        <div class="input-item">
          <input id="clear" type="button" class="btn" value="清除" />
          <input id="close" type="button" class="btn" value="关闭绘图" />
        </div>
      </div> -->
      <el-radio-group v-model="radio" @change="handleRadioChange">
        <el-radio label="marker">画点</el-radio>
        <el-radio label="polyline">画折线</el-radio>
        <el-radio label="polygon">画多边形</el-radio>
        <el-radio label="rectangle">画矩形</el-radio>
        <el-radio label="circle">画圆</el-radio>
      </el-radio-group>
    </div>
    <div>
      <!-- <el-button @click="handleClear">清空</el-button> -->
      <el-button @click="handleClearThings">关闭绘图</el-button>
    </div>
    <div class="input-card-left">
      <el-button @click="handleOpen" class="btn" style="margin-bottom: 5px">
        开始编辑
      </el-button>
      <el-button @click="handleClose" class="btn" style="margin-bottom: 5px">
        结束编辑
      </el-button>
    </div>
    <div>
      <el-button @click="handleLine">放置线条</el-button>
      <el-button @click="handleCar">放置小车</el-button>
      <el-button @click="animationMove">点击让小车开始运动</el-button>
      <el-button @click="pauseAnimation">暂停小车运动</el-button>
      <el-button @click="resumeAnimation">继续小车运动</el-button>
      <el-button @click="changeSpeed">改变小车速度</el-button>
    </div>
  </div>
</template>
<!-- <template/> -->
<script setup>
import { onMounted, ref, shallowRef } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader"; //地图
import { loadingMap } from "../../utiles/common";
const AMapObj = ref({});
const changePath = ref([]);
const map = ref([]);
const marker = ref("");
const polyEditor = ref("");
const radio = ref("marker");
const mouseTool = ref("");
const overlays = ref([]);
const path = ref([
  [121.391382, 37.539297],
  [121.392897, 37.538002],
  [121.391105, 37.53651],
  [121.393205, 37.53651],
]);
// 清空
// function handleClear() {
//   overlays.value = [];
// }
// 关闭绘图
function handleClearThings() {
  mouseTool.value.close(true); //关闭，并清除覆盖物
}
// 放置小车
function handleCar() {
  AMapObj.value.plugin("AMap.MoveAnimation", function () {
    var blueIcon = new AMapObj.value.Icon({
      image: "https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png", // 设置图标样式
      imageOffset: new AMap.Pixel(0, 0), // 设置图标偏移
      imageSize: new AMap.Size(32, 50), // 设置图标尺寸
    });
    let markerTest = "";
    markerTest = new AMapObj.value.Marker({
      map: map.value,
      position: [121.391382, 37.539297],
      icon: blueIcon,
      offset: new AMap.Pixel(-13, -26),
      draggable: true, // 设置 marker 可拖拽
    });
    marker.value = markerTest;
  });
}
// 放置线条
function handleLine() {
  var polyline = new AMapObj.value.Polyline({
    path: path.value,
    isOutline: true,
    outlineColor: "#ffeeff",
    borderWeight: 3,
    strokeColor: "#3366FF",
    strokeOpacity: 1,
    strokeWeight: 6,
    // 折线样式还支持 'dashed'
    strokeStyle: "solid",
    // strokeStyle是dashed时有效
    strokeDasharray: [10, 5],
    lineJoin: "round",
    lineCap: "round",
    zIndex: 50,
  });

  polyline.setMap(map.value);
  // 缩放地图到合适的视野级别
  map.value.setFitView([polyline]);
  polyEditor.value = new AMapObj.value.PolyEditor(map.value, polyline);
  // 获取最新路线
  polyEditor.value.on("adjust", function (event) {
    path.value = event.target.$x[0];
    console.log("path", path.value);
  });
}
// 切换单选按钮
function handleRadioChange(type) {
  switch (type) {
    case "marker": {
      mouseTool.value.marker({
        //同Marker的Option设置
      });
      break;
    }
    case "polyline": {
      mouseTool.value.polyline({
        strokeColor: "#80d8ff",
        //同Polyline的Option设置
      });
      break;
    }
    case "polygon": {
      mouseTool.value.polygon({
        fillColor: "#00b0ff",
        strokeColor: "#80d8ff",
        //同Polygon的Option设置
      });
      break;
    }
    case "rectangle": {
      mouseTool.value.rectangle({
        fillColor: "#00b0ff",
        strokeColor: "#80d8ff",
        //同Polygon的Option设置
      });
      break;
    }
    case "circle": {
      mouseTool.value.circle({
        fillColor: "#00b0ff",
        strokeColor: "#80d8ff",
        //同Circle的Option设置
      });
      break;
    }
  }
}
// 开始编辑按钮
function handleOpen() {
  polyEditor.value.open();
  polyEditor.value.on("adjust", function (event) {
    changePath.value = event.target.$x[0];
    console.log("changePath", changePath.value);
  });
}
// 结束编辑按钮
function handleClose() {
  polyEditor.value.close();
}
// 让小车开始移动按钮
function animationMove() {
  marker.value.moveAlong(path.value, {
    // 每一段的时长
    duration: 3000, //可根据实际采集时间间隔设置
    // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
    autoRotation: true,
  });
  var passedPolyline = new AMapObj.value.Polyline({
    map: map.value,
    strokeColor: "#AF5", //线颜色
    strokeWeight: 6, //线宽
  });
  //监听小车移动事件
  marker.value.on("moving", function (e) {
    //passedPath为Marker对象在moveAlong或者moveTo过程中已经走过的路径
    //通过passedPath 给passedPolyline 设置path 也就是让他开始画绿色的线
    passedPolyline.setPath(e.passedPath);
  });
}
// 暂停小车运动按钮
function pauseAnimation() {
  console.log("marker", marker.value);
  // 这是暂停动画 调用resumeMove 还能继续动
  marker.value.pauseMove();
}
// 继续小车运动按钮
function resumeAnimation() {
  // 继续执行的方法
  marker.value.resumeMove();
}
window.speed = 1;
// 改变小车速度按钮
function changeSpeed() {
  marker.value.pauseMove();
  //改变小车移动速度,这里要注意 需要暂停 再继续 不然会有小车倒退的问题出现
  window.speed = window.speed === 2 ? 1 : 2;
  marker.value.resumeMove();
}
onMounted(() => {
  loadingMap((AMap) => {
    AMapObj.value = AMap;
    map.value = new AMap.Map("container", {
      center: [121.391382, 37.539297],
      zoom: 14,
      resizeEnable: true,
    });

    map.value.setDefaultCursor("pointer"); //使用CSS默认样式定义地图上的鼠标样式（default/pointer/move/crosshair）
    // 比例尺控件
    map.value.addControl(new AMap.Scale()); //异步同时加载多个插件
    // 放大缩小控件
    map.value.addControl(new AMap.ToolBar());
    // 定位控件
    map.value.addControl(new AMap.Geolocation());
    //  这行代码创建了一个HawkEye控件的实例，并将其停靠位置设置为左上角（LT，意为左上）。HawkEye控件通常用于展示地图的缩略图，让用户快速导航和定位。
    let HawkEye = new AMap.HawkEye({
      position: "LT", //控件停靠位置（LT/RT/LB/RB）
    });
    // 创建的HawkEye控件添加到地图上，以便用户可以看到缩略图并进行导航。
    map.value.addControl(HawkEye);
    // 切换地图样式
    AMapLoader.load({
      //可多次调用load
      plugins: ["AMap.MapType"],
    })
      .then((AMap) => {
        map.value.addControl(new AMap.MapType());
      })
      .catch((e) => {
        console.error(e);
      });
    // animationMove();
    // function animationMove() {
    //   AMap.plugin("AMap.MoveAnimation", function () {
    //     var blueIcon = new AMap.Icon({
    //       image: "https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png", // 设置图标样式
    //       imageOffset: new AMap.Pixel(0, 0), // 设置图标偏移
    //       imageSize: new AMap.Size(32, 50), // 设置图标尺寸
    //     });
    //     let markerTest = "";
    //     markerTest = new AMap.Marker({
    //       map: map.value,
    //       position: [121.391382, 37.539297],
    //       icon: blueIcon,
    //       offset: new AMap.Pixel(-13, -26),
    //       draggable: true, // 设置 marker 可拖拽
    //     });
    //     marker.value = markerTest;
    // map.setFitView();
    // marker.moveAlong(lineArr, {
    //   // 每一段的时长
    //   duration: 3000, //可根据实际采集时间间隔设置
    //   // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
    //   autoRotation: true,
    // });
    // });
    // }
    // polyEditor.on("addnode", function (event) {
    //   console.log("触发事件：addnode");
    // });
    // 创建了一个高德地图的鼠标工具实例。这个工具可以帮助我们在地图上进行一些鼠标交互操作，例如绘制标记、绘制折线、绘制多边形等。其中，map 是一个地图对象，它表示我们要在其上使用鼠标工具的地图实例。通过这段代码，我们可以方便地在地图上进行各种绘制操作
    mouseTool.value = new AMap.MouseTool(map.value);
    // var overlays = [];
    mouseTool.value.on("handleRadioChange", function (e) {
      overlays.value.push(e.obj);
    });
  });
});
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
#container {
  width: 100vw;
  height: 100vh;
  /* width: 100%;
  height: 100%; */
}
.input-card-left {
  position: absolute;
  margin-top: -100px;
  z-index: 999;
  width: 120px;
  /* width: 220px; */
  background-color: white;
  border-radius: 10px;
}
.input-card-right-box {
  position: relative;
}
.input-card-right {
  position: absolute;
  float: right;
  margin-top: -100px;
  margin-left: 500px;
  z-index: 999;
  width: 220px;
  background-color: white;
  border-radius: 10px;
}
</style>