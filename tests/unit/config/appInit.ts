import filters from '@/plugins/filters'
import VueClipboard from 'vue-clipboard2'
import SuiVue from 'semantic-ui-vue'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

export default function appInit () {
  const localVue = createLocalVue()
  localVue.use(filters)
  localVue.use(SuiVue)
  localVue.use(VueClipboard)
  localVue.use(Vuex)
  return localVue
}
