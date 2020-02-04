
import { withKnobs, object } from '@storybook/addon-knobs'
import JehMaker from '../src/components/JehMaker'
import { TauxObject } from '../src/types.ts'

export default {
  title: 'JehMaker',
  decorators: [withKnobs]
}

const defaultValueTaux = new TauxObject(39.04, 0.3116, 0.042, 0.1605, 0)

export const jehmaker = () => ({
  components: { JehMaker },
  props: {
    t: {
      default: object('taux', defaultValueTaux)
    }
  },
  template: ' <JehMaker :taux="t"/>'
})
