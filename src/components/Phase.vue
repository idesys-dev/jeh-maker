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
        <input
        type="text"
        v-model="price"
        @change="calculateByPrice"
        @focus="mode = 'price'"
        />
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
    <!-- <td class="right aligned">{{ phase.pay | euro }}</td> -->
    <td>
      <div class="ui verysmall input">
        <input
        type="text"
        v-model="pay"
        @change="calculateByPay"
        @focus="mode = 'pay'"
        />
      </div>
    </td>
    <td class="right aligned">{{ phase.urssafConsultant | euro }}</td>
    <td class="right aligned">{{ phase.netConsultant | euro }}</td>
    <!-- <td>
      <div class="ui verysmall input">
        <input
        type="text"
        v-model="netConsultant"
        @change="calculateByPay"
        @focus="mode = 'pay'"
        />
      </div>
    </td> -->
    <td class="right aligned">{{ phase.netByConsultant | euro }}</td>
    <td @click="deletePhaseEvent"><i class="icon close"></i></td>
  </tr>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

import PhaseObject from '../types'
import { optimizeByPay, optimizeByPrice } from '../services/optimizePhase'

@Component
export default class Phase extends Vue {
  // Props
  @Prop() private phase!: PhaseObject
  @Prop() private contributions!: any

  // Data
  errorJeh: string = '' // not enough JEH for every concultant
  errorPrice: string = '' // price under 80 €
  warningMessage: string = '' // some consultant will have less JEH than other
  price: string = '0' // variable (v-model)
  margin: string = '0' // variable (v-model)
  nbConsultant: string = '0' // variable (v-model)
  pay: string = '0' // variable (v-model)
  // netConsultant: string = '0' // variable (v-model)
  deleted: boolean = false // true when the phase is deleting
  mode: string = 'price' // 'price' or 'pay' (avoid infinite loop cause by watch and calculations)

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
  Watchprice () {
    console.log('Phase watch price', this.price, this.mode)
    if (this.mode === 'pay') {
      return
    }
    let price = this.toInt(this.price)
    if (!isNaN(price)) {
      this.phase.price = price
      this.calculateByPrice()
      this.price = price.toString()
    }
  }
  @Watch('pay')
  WatchnetConsultant () {
    console.log('Phase watch pay', this.pay, this.mode)
    if (this.mode === 'price') {
      return
    }
    let pay = this.toInt(this.pay)
    if (!isNaN(pay)) {
      this.phase.pay = pay
      this.calculateByPay()
      this.pay = pay.toString()
    }
  }
  // @Watch('nbConsultant')
  // WatchnbConsultant () {
  //   console.log('Phase watch nbConsultant', this.nbConsultant, this.mode)
  //   let nbConsultant = this.toInt(this.nbConsultant)
  //   if (!isNaN(nbConsultant)) {
  //     this.phase.nbConsultant = nbConsultant
  //     this.calculateByPrice()
  //     this.nbConsultant = nbConsultant.toString()
  //   }
  // }
  // @Watch('margin')
  // Watchmargin () {
  //   console.log('Phase watch margin', this.margin, this.mode)
  //   let margin = this.toInt(this.margin)
  //   if (!isNaN(margin)) {
  //     this.phase.margin = margin
  //     this.calculateByPrice()
  //     this.margin = margin.toString()
  //   }
  // }
  // @Watch('netConsultant')
  // WatchnetConsultant () {
  //   console.log('Phase watch netConsultant', this.netConsultant, this.mode)
  //   if (this.mode === 'price') {
  //     return
  //   }
  //   let netConsultant = this.toInt(this.netConsultant)
  //   if (!isNaN(netConsultant)) {
  //     this.phase.netConsultant = netConsultant
  //     this.calculateByPay()
  //     this.netConsultant = netConsultant.toString()
  //   }
  // }

  // Methods

  calculateByPay () {
    console.log('calculateByPay', this.phase.netConsultant, this.mode)

    this.phase = optimizeByPay(this.phase)

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
  calculateByPrice () {
    console.log('calculateByPrice', this.phase.price, this.mode)

    this.phase = optimizeByPrice(this.phase)

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

    this.pay = this.phase.pay.toString()

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
