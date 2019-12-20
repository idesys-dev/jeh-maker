
import { withKnobs, number } from "@storybook/addon-knobs";
import MargesDetails from '../src/components/MargesDetails';



export default {
  title: 'MargesDetails',
  decorators: [withKnobs]
};


export const marges = () => ({
  components: { MargesDetails },
  props: {
    opMargin: {
      default: number('Marge Op', 1000)
    },
    totalPrice: {
      default: number('Prix Total', 1000)
    },
    averageMarginJe: {
      default: number('Prix Total', 1000)
    },
    totalPay: {
      default: number('Remunération Total', 1000)
    },
    totalUrssafJe: {
      default: number('Prix Total', 1000)
    }
  },
  template: '<MargesDetails  :opMargin="opMargin"  :totalPrice="totalPrice"  :averageMarginJe="averageMarginJe"  :totalPay="totalPay"  :totalUrssafJe="totalUrssafJe" />',
});


