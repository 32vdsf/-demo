import AMapLoader from "@amap/amap-jsapi-loader"; //地图
export function loadingMap(callback) {
    AMapLoader.load({
        key: "639d4746cedd0f218a1ce498f10d9559",
        version: "2.0",
        plugins: [
          "AMap.PolyEditor",
          "AMap.Scale", //工具条，控制地图的缩放、平移等
          "AMap.ToolBar", //比例尺，显示当前地图中心的比例尺
          "AMap.Geolocation", //定位，提供了获取用户当前准确位置、所在城市的方法
          "AMap.HawkEye", //鹰眼，显示缩略图
          "AMap.MouseTool",
        ],
    }).then((AMap) => { 
        callback(AMap)
    })
}
// export default {loadingMap}