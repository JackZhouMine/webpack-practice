/*
 * @Description: vue 入口文件
 * @Date: 2020-06-18 01:25:40
 * @Author: JackChouMine
 * @LastEditTime: 2020-06-21 05:00:06
 * @LastEditors: JackChouMine
 */

import Vue from 'vue'
import App from './App'
import './scss/example.scss'
import { library } from '@fortawesome/fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import brands from '@fortawesome/fontawesome-free-brands'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import createImg from './createImg'
createImg()
library.add(solid)
library.add(regular)
library.add(brands)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  el: '#hello',
  render: (h) => h(App),
})
