
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Sidebar from '../src/components/Sidebar';

export default {
  title: 'Sidebar',
  decorators: [withKnobs]
};



export const sidebar = () => ({
  components: { Sidebar },
  props: {
    v: {
      default: boolean("Visible", true)
    },
  },
  template: '<Sidebar :visible="v" @toogle="toogleSibebar"/>',
  methods: {
    toogleSibebar: action('toogleSibebar')
  }
});


