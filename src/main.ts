import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入element-plus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


// 引入echarts
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'
import {CanvasRenderer} from 'echarts/renderers'
import {BarChart} from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
use([
  CanvasRenderer, BarChart, GridComponent, TooltipComponent,
])


const app = createApp(App)


app.use(router)

app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.component('ECharts', ECharts)

app.mount('#app')
