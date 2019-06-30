<template>
  <tr>
    <td :class="[{warning: warningMessage}, {error: errorJeh}, {error: errorPrice}]">
      <a :title="errorPrice"><i v-if="errorPrice" class="exclamation triangle icon"></i></a>
      <a :title="errorJeh"><i v-if="errorJeh" class="exclamation triangle icon"></i></a>
      <a :title="warningMessage"><i v-if="warningMessage" class="info circle icon"></i></a>
    </td>
    <td>{{ phase.id }}</td>
    <td>
      <div class="ui input">
        <input type="text" v-model="phase.title" />
      </div>
    </td>
    <td>
      <div class="ui verysmall input" :class="{'error': errorPrice}">
        <input @change="calculateByPrice" type="text" v-model="price" />
      </div>
    </td>
    <td>
      <div class="ui verymini input" :class="{'error': errorJeh}">
        <input type="text" v-model="nbConsultant" />
      </div>
    </td>
    <td>
      <div class="ui verymini input">
        <input type="text" v-model="margin" />
      </div>
    </td>
    <td class="right aligned">{{ phase.jeh }}</td>
    <td class="right aligned" :class="{'error': errorJeh}">{{ phase.nbJeh }}</td>
    <td class="right aligned">{{ phase.urssafJE | euro }}</td>
    <td class="right aligned">{{ phase.marginJE | percentage }}</td>
    <td class="right aligned">{{ phase.pay | euro }}</td>
    <td class="right aligned">{{ phase.urssafConsultant | euro }}</td>
    <!-- <td class="right aligned">{{ phase.netConsultant | euro }}</td> -->
    <td>
      <div class="ui verysmall input">
        <input @change="calculateByPrice" type="text" v-model="netConsultant" />
      </div>
    </td>
    <td class="right aligned">{{ phase.netByConsultant | euro }}</td>
    <td @click="deletePhaseEvent"><i class="icon close"></i></td>
  </tr>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

import PhaseObject from '../types'
import round from '../utils'

@Component
export default class Phase extends Vue {
  // Props
  @Prop() private phase!: PhaseObject;
  @Prop() private contributions!: any;

  // Data
  errorJeh: string = ''; // not enough JEH for every concultant
  errorPrice: string = ''; // price under 80 €
  warningMessage: string = ''; // some consultant will have less JEH than other
  price: string = '0'; // variable (v-model)
  margin: string = '0'; // variable (v-model)
  nbConsultant: string = '0'; // variable (v-model)
  netConsultant: string = '0'; // variable (v-model)
  deleted: boolean = false; // true when the phase is deleting

  // Lifecycle hood
  created () {
    this.updateProps()
    this.calculateByPrice()
  }
  updated () {
    this.updateProps()
    if (this.deleted) { // calculate only when the phase has been deleted, otherwise infinite loop on calculate
      this.calculateByPrice()
      this.deleted = false
    }
  }

  // Watchers
  @Watch('price')
  Watchprice (price_) {
    console.log('Phase watch price', this.price, price_)
    let price = this.toInt(this.price)
    console.log(price)
    if (!isNaN(price)) {
      this.phase.price = price
      this.calculateByPrice()
      this.price = price.toString()
    }
  }
  @Watch('nbConsultant')
  WatchnbConsultant () {
    console.log('Phase watch nbConsultant', this.nbConsultant)
    let nbConsultant = this.toInt(this.nbConsultant)
    if (!isNaN(nbConsultant)) {
      this.phase.nbConsultant = nbConsultant
      this.calculateByPrice()
      this.nbConsultant = nbConsultant.toString()
    }
  }
  @Watch('margin')
  Watchmargin () {
    console.log('Phase watch margin', this.margin)
    let margin = this.toInt(this.margin)
    if (!isNaN(margin)) {
      this.phase.margin = margin
      this.calculateByPrice()
      this.margin = margin.toString()
    }
  }
  /*
  @Watch('netConsultant')
  WatchnetConsultant () {
    console.log('Phase watch netConsultant', this.netConsultant)
    let netConsultant = this.toInt(this.netConsultant)
    if (!isNaN(netConsultant)) {
      this.calculateByPay()
      this.phase.netConsultant = netConsultant
      this.netConsultant = netConsultant.toString()
    }
  }
  */

  // Methods

  calculateByPay () {
    console.log('calculateByPay')

    this.phase.netByConsultant = round(this.phase.netConsultant / this.phase.nbConsultant)
    console.log(this.phase.netByConsultant)
    //
    // // optimize : maximize the jeh to 400 €
    // if (this.phase.jeh < this.phase.price) {
    //   if (this.phase.price >= 400) {
    //     this.phase.jeh = 400;
    //   }
    //   else {
    //     this.phase.jeh = this.phase.price;
    //   }
    // }
    //
    // // compute data
    // this.phase.nbJeh = this.phase.price / this.phase.jeh;
    // this.phase.pay = round(this.phase.price - (this.phase.price * this.phase.margin / 100));
    // this.phase.urssafJE = round(this.phase.nbJeh * this.contributions.urssafBase * this.contributions.jeContrib +
    //   this.phase.pay * this.contributions.jepay);
    // this.phase.marginJE = round((this.phase.price - this.phase.pay - this.phase.urssafJE) / this.phase.price * 100);
    // this.phase.urssafConsultant = round(this.phase.nbJeh * this.contributions.urssafBase * this.contributions.ConsultantContrib +
    //   this.phase.pay * this.contributions.ConsultantPay);
    // this.phase.pcConsultant = round(this.phase.netByConsultant / this.phase.price * 100);
    //
    // // optimize : if the number of JEH is not integer,
    // // then we need to increase the number of JEH and drecrease the amount of each JEH.
    // if (!Number.isInteger(this.phase.nbJeh)) {
    //   this.phase.nbJeh = Math.floor(this.phase.nbJeh) + 1;
    //   this.phase.jeh = this.phase.price / this.phase.nbJeh;
    // }
    //
    // this.netConsultant = this.phase.netConsultant;
    //
    // // error handling
    // if (this.phase.jeh < 80) {
    //   this.phase.jeh = 80;
    // }
    // if (this.phase.price < 80) {
    //   this.errorPrice = 'Prix inférieur à 80 €';
    //   this.errorJeh = '';
    //   this.warningMessage = '';
    // }
    // else {
    //   this.errorPrice = '';
    //   if (this.phase.nbConsultant > this.phase.nbJeh) {
    //     this.errorJeh = 'Pas assez de JEH pour les intervenants.';
    //   }
    //   else {
    //     this.errorJeh = '';
    //     if (!Number.isInteger(this.phase.nbJeh / this.phase.nbConsultant)) {
    //       this.warningMessage =  'Les JEH ne sont pas réparties équitablement entre les intervenants.';
    //     }
    //     else {
    //       this.warningMessage = '';
    //     }
    //   }
    // }
    //
    // // save signal
    // this.$emit('save', this.phase); // send the modified phase to the parent for totals and averages
  }
  calculateByPrice () {
    // console.log(this.$parent);
    console.log('calculateByPrice', this.phase.price, this.price)

    // optimize : maximize the jeh to 400 €
    if (this.phase.jeh < this.phase.price) {
      if (this.phase.price >= 400) {
        this.phase.jeh = 400
      } else {
        this.phase.jeh = this.phase.price
      }
    }

    // compute data
    this.phase.nbJeh = this.phase.price / this.phase.jeh
    this.phase.pay = round(this.phase.price - (this.phase.price * this.phase.margin / 100))
    this.phase.urssafJE = round(this.phase.nbJeh * this.contributions.urssafBase * this.contributions.jeContrib +
      this.phase.pay * this.contributions.jepay)
    this.phase.marginJE = round((this.phase.price - this.phase.pay - this.phase.urssafJE) / this.phase.price * 100)
    this.phase.urssafConsultant = round(this.phase.nbJeh * this.contributions.urssafBase * this.contributions.ConsultantContrib +
      this.phase.pay * this.contributions.ConsultantPay)
    this.phase.netConsultant = round(this.phase.pay - this.phase.urssafConsultant)
    this.phase.netByConsultant = round(this.phase.netConsultant / this.phase.nbConsultant)
    this.phase.pcConsultant = round(this.phase.netByConsultant / this.phase.price * 100)

    // optimize : if the number of JEH is not integer,
    // then we need to increase the number of JEH and drecrease the amount of each JEH.
    if (!Number.isInteger(this.phase.nbJeh)) {
      this.phase.nbJeh = Math.floor(this.phase.nbJeh) + 1
      this.phase.jeh = this.phase.price / this.phase.nbJeh
    }

    console.log('this.netConsultant', this.netConsultant)
    this.netConsultant = this.phase.netConsultant.toString()

    // error handling
    if (this.phase.jeh < 80) {
      this.phase.jeh = 80
    }
    if (this.phase.price < 80) {
      this.errorPrice = 'Prix inférieur à 80 €'
      this.errorJeh = ''
      this.warningMessage = ''
    } else {
      this.errorPrice = ''
      if (this.phase.nbConsultant > this.phase.nbJeh) {
        this.errorJeh = 'Pas assez de JEH pour les intervenants.'
      } else {
        this.errorJeh = ''
        if (!Number.isInteger(this.phase.nbJeh / this.phase.nbConsultant)) {
          this.warningMessage = 'Les JEH ne sont pas réparties équitablement entre les intervenants.'
        } else {
          this.warningMessage = ''
        }
      }
    }

    // save signal
    this.$emit('save', this.phase) // send the modified phase to the parent for totals and averages
  }
  reset () { // called by toInt
    this.phase.nbJeh = 0
    this.phase.pay = 0
    this.phase.urssafJE = 0
    this.phase.marginJE = 0
    this.phase.urssafConsultant = 0
    this.phase.netConsultant = 0
    this.phase.netByConsultant = 0
    this.phase.pcConsultant = 0
  }
  // toInt(strnb): [number, string] { // convert to integer and if possible then call calculate, otherwise call reset
  toInt (strnb: string): number { // convert to integer and if possible then call calculate, otherwise call reset
    let nb = parseInt(strnb)
    if (isNaN(nb)) {
      this.reset()
    }
    return nb
  }
  deletePhaseEvent () {
    this.deleted = true
    this.$emit('delete', this.phase.id)
  }
  updateProps () { // called bu created and updated
    this.price = this.phase.price.toString()
    this.margin = this.phase.margin.toString()
    this.nbConsultant = this.phase.nbConsultant.toString()
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.verymini {
  width: 60px;
}
.verysmall {
  width: 80px;
}
.container {
  margin-top: 20px;
  margin-bottom: 20px;
}
.scrollable {
  overflow: scroll;
}
</style>
