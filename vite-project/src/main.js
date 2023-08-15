/**
 * @Author: yangmingyue
 * @Date: 2023-07-24 19:45:55
 * @LastEditors: yangmingyue
 * @LastEditTime: 2023-07-27 19:47:46
 * @Description: 
 * @
 * @copyright: Copyright (c) 2023 瑞康医药集团股份有限公司 (realcan.cn), All Rights Reserved.
 * @ ~***瑞康医药独有知识产权产品，禁止私自拷贝、禁止商用禁止提供任何代码功能设计文件给公司外部任何组织和个人,违者必究
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VueAmap from 'vue-amap'
import ElementPlus from 'element-plus'

const app = createApp(App)
app.config.productionTip = false
// app.initAmapApiLoader({
//     key:'1a0825a6e83dcdbfc6542cb44dbae5f0'
// })
// VueAmap.initAMapApiLoader({
//     // 高德key
//     key: '639d4746cedd0f218a1ce498f10d9559',
//     // 插件集合 （插件按需引入）
//     plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView',
//   'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.MarkerClusterer', 'AMap.MoveAnimation'],
//     v: '1.4.15',
//     uiVersion: '1.0.11'
//   })
app.use(VueAmap)

app.use(ElementPlus)
// var map = new AMap.Map('container');
app.mount('#app')
