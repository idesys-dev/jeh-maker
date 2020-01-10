
import { withKnobs, object } from "@storybook/addon-knobs";
import JehMaker from '../src/components/JehMaker';


export default {
  title: 'JehMaker',
  decorators: [withKnobs]
};

const defaultValueTaux = {
  urssafBase : 39.04,
  jeContrib : 0.30116,
  jepay : 0.042,
  consultantContrib : 0.1605,
  consultantPay : 0,
};


export const jehmaker = () => ({
  components: { JehMaker },
  props: {
    t: {
      default: object('taux', defaultValueTaux)
    }
  },
  template: ' <JehMaker :taux="t"/>'
});


