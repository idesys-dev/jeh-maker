import { configure } from '@storybook/vue';

import 'semantic-ui-css/semantic.min.css'
import Vue from 'vue'
import SuiVue from 'semantic-ui-vue'
import Filters from '../src/plugins/filters'

Vue.use(Filters)
Vue.use(SuiVue)


// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module);
