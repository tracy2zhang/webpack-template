import Vue from 'vue'
import Start from './Start'
import { add } from './Math'

// reset样式
import './assets/style/reset.less'

console.log(add(1, 2))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<Start/>',
  components: { Start }
})
