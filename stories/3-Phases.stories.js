
import { withKnobs, object } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import Phase from '../src/components/Phase'
import { TauxObject } from '../src/types'

const tableDeco = () => {
  return {
    template: '<table class="ui table" style="max-width:900px"><story/></table>'
  }
}
export default {
  title: 'Phase',
  decorators: [withKnobs, tableDeco]
}

const defaultValueTaux = new TauxObject(39.04, 0.3116, 0.042, 0.1605, 0)
const defaultValuePhase = {
  'id': 1,
  'title': 'Title',
  'price': 810,
  'jeh': 270,
  'nbConsultant': 1,
  'margin': 55,
  'nbJeh': 3,
  'pay': 364.5,
  'urssafJE': 0,
  'marginJE': 55,
  'urssafConsultant': 0,
  'netConsultant': 364.5,
  'netByConsultant': 364.5,
  'pcConsultant': 45
}

export const phases = () => ({
  components: { Phase },
  props: {
    phase: {
      default: object('phase', defaultValuePhase)
    },
    taux: {
      default: object('taux', defaultValueTaux)
    }
  },
  template: ' <tr is="Phase"  :phase="phase"  :taux="taux"  @delete="deleteEvent"  @save="saveEvent"  ref="refPhase"></tr>',
  methods: {
    deleteEvent: action('delete'),
    saveEvent: action('save')
  }
})
