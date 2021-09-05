<template>
  <tr class="right aligned">
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
    <td>{{ phase.jeh }}</td>
    <td :class="{'error': errorJeh}">{{ phase.nbJeh }}</td>
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
    <td>{{ phase.marginJE | percentage }}</td>
    <td>{{ phase.urssafJE | euro }}</td>
    <td>
      <multiple-select
        :options="consultants"
      ></multiple-select>
    </td>
    <td>
      <div class="ui verysmall input">
        <input
        type="text"
        v-model="pay"
        @focus="mode = 'pay'"
        />
      </div>
    </td>
    <td>{{ phase.urssafConsultant | euro }}</td>
    <td>{{ phase.netConsultant | euro }}</td>
    <td>{{ phase.netByConsultant | euro }}</td>
    <td @click="deletePhaseEvent"><i class="icon close"></i></td>
  </tr>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

import { PhaseObject, TauxObject } from '../types'
import { optimizeByPay, optimizeByPrice } from '../services/optimizePhase'
import MultipleSelect from './MultipleSelect.vue'

@Component({
  components: { MultipleSelect }
})
export default class Phase extends Vue {
  // Props
  @Prop() private phase!: PhaseObject
  @Prop() private consultants!: string[]
  @Prop() private taux!: TauxObject

  // Data
  errorJeh: string = '' // not enough JEH for every concultant
  errorPrice: string = '' // price under 80 €
  warningMessage: string = '' // some consultant will have less JEH than other

  price: string = '0' // variable (v-model)
  margin: string = '0' // variable (v-model)
  nbConsultant: string = '0' // variable (v-model)
  pay: string = '0' // variable (v-model)

  mode: string = 'price' // 'price' or 'pay' (avoid infinite loop cause by watch and calculations)

  consultant: string = '';

  // Lifecycle hood
  mounted () {
    this.calculate()
    if (this.consultants.length) {
      this.consultant = this.consultants[0]
    }
  }

  // Watchers
  @Watch('price')
  Watchprice () {
    this.update('price')
  }
  @Watch('pay')
  WatchnetConsultant () {
    this.update('pay')
  }
  @Watch('nbConsultant')
  WatchnbConsultant () {
    this.update('nbConsultant')
  }
  @Watch('margin')
  Watchmargin () {
    this.update('margin')
  }

  // Methods
  update (name: string) {
    let val = this.toInt(this[name])
    if (!isNaN(val)) {
      this.phase[name] = val
      this.calculate()
      this[name] = val.toString()
    }
  }
  calculate () {
    if (this.mode === 'pay') {
      this.phase = optimizeByPay(this.phase, this.taux)
    } else if (this.mode === 'price') {
      this.phase = optimizeByPrice(this.phase, this.taux)
    }

    // error handling
    if (this.phase.jeh < 80) {
      this.phase.jeh = 80
    }
    // maybe lowerBound should be an error handled with this.phase.jeh
    const lowerBound = 80 * this.phase.nbConsultant
    if (this.phase.price < lowerBound) {
      this.errorPrice = `Prix inférieur à ${lowerBound} €`
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
