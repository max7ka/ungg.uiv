import Vue from 'vue'
import App from './App.vue'
import router from './router'

// import VueBootstrapTable from '../public/plugins/vue-bootstrap-table.min'
// Vue.use(VueBootstrapTable)
// import { Grid } from "gridjs";
// import "gridjs/dist/theme/mermaid.css";
// Vue.use(Grid)

import * as uiv from 'uiv'
import locale from 'uiv/src/locale/lang/ru-RU'
Vue.use(uiv, { locale })

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
