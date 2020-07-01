import Vue from 'vue'
import App from './App'
//引入上拉加载,下拉刷新,导航栏等组件
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
import MescrollEmpty from '@/components/mescroll-uni/components/mescroll-empty.vue';
import msDropdownMenu from '@/components/ms-dropdown/dropdown-menu.vue'
import msDropdownItem from '@/components/ms-dropdown/dropdown-item.vue'
import vCustom from '@/components/custom/custom'
import uCharts from '@/components/u-charts/component.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
import loading from '@/components/loading/loading.vue'
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)
Vue.component('mescroll-empty', MescrollEmpty)
Vue.component('ms-dropdown-menu', msDropdownMenu)
Vue.component('ms-dropdown-item', msDropdownItem)
Vue.component('u-charts', uCharts)
Vue.component('v-custom', vCustom)
Vue.component('uniPopup', uniPopup)
Vue.component('uniPopupMessage', uniPopup)
Vue.component('loading', loading)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
