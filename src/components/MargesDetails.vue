<template>
     <table class="ui celled table center aligned segment">
        <thead>
          <tr>
            <th>Marge opérationnelle</th>
            <th>Marge brute</th>
            <th>Part URSSAF</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ opMargin | euro}} ({{averageMarginJe}} %)</td>
            <td>{{ totalPrice - totalPay | round | euro}} ({{margeBrut.toFixed(2)}}  %)</td>
            <td>{{ totalUrssafJe | euro}} ({{margeOp.toFixed(2)}} %)</td>
          </tr>
        </tbody>
      </table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class MargesDetails extends Vue {
    @Prop() opMargin!:number;
    @Prop() totalPrice!:number;
    @Prop() averageMarginJe!:number;
    @Prop() totalPay!:number;
    @Prop() totalUrssafJe!:number;

    get margeBrut (): number {
      return (this.totalPrice - this.totalPay) / this.totalPrice * 100
    }
    get margeOp (): number {
      return (this.totalUrssafJe / this.totalPrice * 100)
    }
}
</script>
