<!--
 * @Author: yangmingyue
 * @Date: 2023-07-26 17:32:29
 * @LastEditors: yangmingyue
 * @LastEditTime: 2023-08-15 09:51:07
 * @Description: 
 * 
 * @copyright: Copyright (c) 2023 瑞康医药集团股份有限公司 (realcan.cn), All Rights Reserved.
 *  ~***瑞康医药独有知识产权产品，禁止私自拷贝、禁止商用禁止提供任何代码功能设计文件给公司外部任何组织和个人,违者必究
-->
<template>
  <div>
    <div id="container"></div>
    <div class="input-card-right-box">
      <div class="input-card-right">
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
      </div>
    </div>

    <div class="input-card-left">
      <!-- {{ polyEditor }} -->
      <el-button id="openEditor" class="btn" style="margin-bottom: 5px">
        开始编辑
      </el-button>
      <el-button id="closeEditor" class="btn" style="margin-bottom: 5px">
        结束编辑
      </el-button>
      <!-- <button class="btn" onclick="polyEditor.close()">结束编辑</button> -->
    </div>
  </div>
</template>
<!-- <template/> -->
<script setup>
import { onMounted, ref, shallowRef } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader"; //地图
import { loadingMap } from "../../utiles/common";
const AMap = ref({});
const changePath = ref([]);
function open() {
  console.log("AMap.value", AMap.value);
  AMapLoader.load({
    key: "639d4746cedd0f218a1ce498f10d9559",
    version: "2.0",
    plugins: ["AMap.PolyEditor"],
  }).then((AMap) => {
    console.log("AMap", AMap);
    const map = new AMap.Map("container", {
      center: [121.391382, 37.539297],
      zoom: 14,
    });
    var path = [
      [121.391382, 37.539297],
      [121.392897, 37.538002],
      [121.391105, 37.53651],
      [121.393205, 37.53651],
    ];
    var polyline = new AMap.value.Polyline({
      path: path,
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
    polyline.setMap(map);
    // 缩放地图到合适的视野级别
    map.setFitView([polyline]);

    var polyEditor = new AMap.PolyEditor(map, polyline);
    polyEditor.open();
    polyEditor.on("adjust", function (event) {
      changePath.value = event.target.$x[0];
    });
    polyEditor.on("addnode", function (event) {
      console.log("触发事件：addnode");
    });

    polyEditor.on("adjust", function (event) {
      console.log("触发事件：adjust");
    });

    polyEditor.on("removenode", function (event) {
      console.log("触发事件：removenode");
    });
  });
}
function close() {
  AMapLoader.load({
    key: "639d4746cedd0f218a1ce498f10d9559",
    version: "2.0",
    plugins: ["AMap.PolyEditor"],
  }).then((AMap) => {
    var map = new AMap.Map("container", {
      center: [121.391382, 37.539297],
      zoom: 14,
    });
    var polyEditor = new AMap.PolyEditor(map, polyline);
    // polyEditor.open();
    polyEditor.close();
    var changedPath = changePath.value;
    var polyline = new AMap.Polyline({
      path: changedPath,
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
    polyline.setMap(map);
    polyEditor.close();
    polyEditor.on("end", function (event) {
      console.log("触发事件： end");
      console.log("event.target", event.target);
      // event.target 即为编辑后的折线对象
    });
    // });
  });
}
// const polyEditor = ref("");
onMounted(() => {
  // AMapLoader.load({
  //   key: "639d4746cedd0f218a1ce498f10d9559",
  //   version: "2.0",
  //   plugins: [
  //     "AMap.PolyEditor",
  //     "AMap.Scale", //工具条，控制地图的缩放、平移等
  //     "AMap.ToolBar", //比例尺，显示当前地图中心的比例尺
  //     "AMap.Geolocation", //定位，提供了获取用户当前准确位置、所在城市的方法
  //     "AMap.HawkEye", //鹰眼，显示缩略图
  //     "AMap.MouseTool",
  //   ],
  // }).then((AMap) => {
  loadingMap((AMap) => {
    console.log("AMap111111111111", AMap);
    // });
    // console.log("test", test);
    // AMap.value = AMap;
    // console.log("AMap", AMap.value);
    const map = new AMap.Map("container", {
      center: [121.391382, 37.539297],
      zoom: 14,
      resizeEnable: true,
    });

    map.setDefaultCursor("pointer"); //使用CSS默认样式定义地图上的鼠标样式（default/pointer/move/crosshair）
    // 比例尺控件
    map.addControl(new AMap.Scale()); //异步同时加载多个插件
    // 放大缩小控件
    map.addControl(new AMap.ToolBar());
    // 定位控件
    map.addControl(new AMap.Geolocation());
    //  这行代码创建了一个HawkEye控件的实例，并将其停靠位置设置为左上角（LT，意为左上）。HawkEye控件通常用于展示地图的缩略图，让用户快速导航和定位。
    let HawkEye = new AMap.HawkEye({
      position: "LT", //控件停靠位置（LT/RT/LB/RB）
    });
    // 创建的HawkEye控件添加到地图上，以便用户可以看到缩略图并进行导航。
    map.addControl(HawkEye);
    // 切换地图样式
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
    //  [121.391382, 37.539297]
    var path = [
      [121.391382, 37.539297],
      [121.392897, 37.538002],
      [121.391105, 37.53651],
      [121.393205, 37.53651],
      // [121.391945, 37.54663],
    ];
    animationMove();
    // });
    // marker.setMap(map);
    function animationMove() {
      AMap.plugin("AMap.MoveAnimation", function () {
        var marker,
          lineArr = [
            [121.391382, 37.539297],
            [121.392897, 37.538002],
            [121.391105, 37.53651],
            [121.393205, 37.53651],
          ];

        // var map = new AMap.Map("container", {
        //   resizeEnable: true,
        //   center: [116.397428, 39.90923],
        //   zoom: 17,
        // });
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
        // var polyline = new AMap.Polyline({
        //   map: map,
        //   path: lineArr,
        //   showDir: true,
        //   strokeColor: "#28F", //线颜色
        //   // strokeOpacity: 1,     //线透明度
        //   strokeWeight: 6, //线宽
        //   // strokeStyle: "solid"  //线样式
        // });

        // var passedPolyline = new AMap.Polyline({
        //   map: map,
        //   strokeColor: "#AF5", //线颜色
        //   strokeWeight: 6, //线宽
        // });

        // map.setFitView();
        marker.moveAlong(lineArr, {
          // 每一段的时长
          duration: 3000, //可根据实际采集时间间隔设置
          // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
          autoRotation: true,
        });
      });
    }
    var polyline = new AMap.Polyline({
      path: path,
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

    polyline.setMap(map);
    // 缩放地图到合适的视野级别
    map.setFitView([polyline]);
    var polyEditor = new AMap.PolyEditor(map, polyline);
    polyEditor.on("addnode", function (event) {
      console.log("触发事件：addnode");
    });
    // 创建了一个高德地图的鼠标工具实例。这个工具可以帮助我们在地图上进行一些鼠标交互操作，例如绘制标记、绘制折线、绘制多边形等。其中，map 是一个地图对象，它表示我们要在其上使用鼠标工具的地图实例。通过这段代码，我们可以方便地在地图上进行各种绘制操作
    var mouseTool = new AMap.MouseTool(map);
    var overlays = [];
    mouseTool.on("draw", function (e) {
      overlays.push(e.obj);
    });
    function draw(type) {
      switch (type) {
        case "marker": {
          mouseTool.marker({
            //同Marker的Option设置
          });
          break;
        }
        case "polyline": {
          mouseTool.polyline({
            strokeColor: "#80d8ff",
            //同Polyline的Option设置
          });
          break;
        }
        case "polygon": {
          mouseTool.polygon({
            fillColor: "#00b0ff",
            strokeColor: "#80d8ff",
            //同Polygon的Option设置
          });
          break;
        }
        case "rectangle": {
          mouseTool.rectangle({
            fillColor: "#00b0ff",
            strokeColor: "#80d8ff",
            //同Polygon的Option设置
          });
          break;
        }
        case "circle": {
          mouseTool.circle({
            fillColor: "#00b0ff",
            strokeColor: "#80d8ff",
            //同Circle的Option设置
          });
          break;
        }
      }
    }
    var radios = document.getElementsByName("func");
    for (var i = 0; i < radios.length; i += 1) {
      radios[i].onchange = function (e) {
        draw(e.target.value);
      };
    }
    draw("marker");

    document.getElementById("clear").onclick = function () {
      // map.remove(n'm'p);
      overlays = [];
    };
    document.getElementById("openEditor").onclick = function () {
      polyEditor.open();
      polyEditor.on("adjust", function (event) {
        changePath.value = event.target.$x[0];
      });
    };
    document.getElementById("closeEditor").onclick = function () {
      polyEditor.close();
      polyEditor.on("end", function (event) {
        // event.target 即为编辑后的折线对象
      });
    };
    document.getElementById("close").onclick = function () {
      mouseTool.close(true); //关闭，并清除覆盖物
      for (let i = 0; i < radios.length; i += 1) {
        radios[i].checked = false;
      }
      // }
    };
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