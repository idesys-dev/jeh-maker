<template>
  <tr class="center aligned">
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
    <td>
      <div class="ui verysmall input">
        <input
        type="text"
        v-model="pay"
        @focus="mode = 'pay'"
        />
      </div>
    </td>
    <td class="right aligned">{{ phase.urssafConsultant | euro }}</td>
    <td class="right aligned">{{ phase.netConsultant | euro }}</td>
    <td class="right aligned">{{ phase.netByConsultant | euro }}</td>
    <td @click="deletePhaseEvent"><i class="icon close"></i></td>
    <!-- <td>{{ mode }}</td> -->
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

  mode: string = 'price' // 'price' or 'pay' (avoid infinite loop cause by watch and calculations)

  // Lifecycle hood
  mounted () {
    this.calculate()
  }

  // Watchers
  @Watch('price')
  Watchprice () {
    console.log('Phase watch price', this.price, this.mode)
    this.update('price')
  }
  @Watch('pay')
  WatchnetConsultant () {
    console.log('Phase watch pay', this.pay, this.mode)
    this.update('pay')
  }
  @Watch('nbConsultant')
  WatchnbConsultant () {
    console.log('Phase watch nbConsultant', this.nbConsultant, this.mode)
    this.update('nbConsultant')
  }
  @Watch('margin')
  Watchmargin () {
    console.log('Phase watch margin', this.margin, this.mode)
    this.update('margin')
  }

  // Methods
  update (name: string) {
    console.log('update', name)
    let val = this.toInt(this[name])
    if (!isNaN(val)) {
      this.phase[name] = val
      this.calculate()
      this[name] = val.toString()
    }
  }
  calculate () {
    // console.log('calculate', this.phase)
    if (this.mode === 'pay') {
      this.phase = optimizeByPay(this.phase)
    } else if (this.mode === 'price') {
      this.phase = optimizeByPrice(this.phase)
    }

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

    this.price = this.phase.price.toString()
    this.margin = this.phase.margin.toString()
    this.nbConsultant = this.phase.nbConsultant.toString()
    this.pay = this.phase.pay.toString()

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
    this.$emit('delete', this.phase.id)
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
td {
  min-width: min-content !important;
  padding: 0 !important;
  padding-right: 6px !important;
}
</style>
