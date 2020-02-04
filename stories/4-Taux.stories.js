
import { withKnobs, object } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import Taux from '../src/components/Taux'
import { TauxObject } from '../src/types.ts'

export default {
  title: 'Taux',
  decorators: [withKnobs]
}

const defaultValueTaux = new TauxObject(39.04, 0.3116, 0.042, 0.1605, 0)

export const taux = () => ({
  components: { Taux },
  props: {
    t: {
      default: object('taux', defaultValueTaux)
    }
  },
  template: ' <Taux v-model="t" @input="inputEvent" />',
  methods: {
    inputEvent: action('change')
  }
})
