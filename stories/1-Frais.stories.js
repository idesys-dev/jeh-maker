
import { withKnobs, number } from '@storybook/addon-knobs'
import Frais from '../src/components/Frais'

export default {
  title: 'Frais',
  decorators: [withKnobs]
}

export const frais = () => ({
  components: { Frais },
  props: {
    totalPrice: {
      default: number('Prix Total', 1000)
    }
  },
  template: '<Frais value="50" :totalPrice="totalPrice" />'
})
