import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
const app = createApp(App);
app.use(ElementPlus)


//具有bootstrap js的功能
import 'bootstrap/dist/js/bootstrap.min'
//引用bootstrap css的功能

import 'bootstrap/dist/css/bootstrap.css'


createApp(App).mount('#app')
