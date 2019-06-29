import { percentage, euro } from './filters'
import { round } from '../../utils'

export default {
  install (Vue: any): any {
    Vue.filter('percentage', percentage)
    Vue.filter('euro', euro)
    Vue.filter('round', round)
  }
}
