
import { withKnobs, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Taux from '../src/components/Taux';

export default {
  title: 'Taux',
  decorators: [withKnobs]
};

const defaultValueTaux = {
  urssafBase : 39.04,
  jeContrib : 0.30116,
  jepay : 0.042,
  consultantContrib : 0.1605,
  consultantPay : 0,
};

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
});


