<template>
  <div>
    <div is="sui-container">
      <h1 is="sui-header" >JEH Maker</h1>
      <p>Marge opérationnelle : {{ opMargin | euro}} ({{averageMarginJe}} %)</p>
      <sui-grid :columns="2">
        <sui-grid-row>
          <sui-grid-column>
            <table class="ui celled collapsing table">
              <tr>
                <td>Frais</td>
                <td>
                  <div class="ui verysmall input">
                    <input type="text" v-model.number="fee" />
                  </div>
                  €
                </td>
              </tr>
              <tr>
                <td>Total HT</td>
                <td>{{ totalPrice + fee | euro }}</td>
              </tr>
              <tr>
                <td>Total TTC</td>
                <td>{{ (totalPrice + fee) * 1.2 | round | euro }}</td>
              </tr>
            </table>
          </sui-grid-column>
          <sui-grid-column>
            <div class="chart">
              <DistributionChart :chartData="chartData"></DistributionChart>
            </div>
          </sui-grid-column>
        </sui-grid-row>
      </sui-grid>
      <button class="ui button" @click="newPhase">Nouvelle phase</button>
    </div>
    <div class="ui fluid container scrollable">
      <table class="ui small celled table">
      <!-- <table class="cell"> -->
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th colspan="4" class="center aligned">Description des phases</th>
            <th colspan="2" class="center aligned">JEH</th>
            <th colspan="2" class="center aligned">Part JE</th>
            <th colspan="4" class="center aligned">Part intervenant(s)</th> <!-- todo: s que si plusieurs intervenants -->
            <th></th>
          </tr>
          <tr>
            <th></th>
            <th></th>
            <th>Intitulé</th>
            <th>Prix</th>
            <th>Nb intervenant</th>
            <th>Marge</th>
            <th>Montant JEH</th>
            <th>Nombre JEH</th>
            <th>URSSAF</th>
            <th>marge</th>
            <th>Rémunération</th>
            <th>URSSAF</th>
            <th>net</th>
            <th>net / intervenant</th>
            <th></th>
          </tr>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th class="center aligned">{{ totalPrice | euro }}</th>
            <th class="center aligned">{{ totalConsultant }}</th>
            <th class="center aligned">{{ averageMargin | percentage }}</th>
            <th class="center aligned">{{ averageJeh | euro }}</th>
            <th class="center aligned">{{ totalNbJeh }}</th>
            <th class="center aligned">{{ totalUrssafJe | euro }}</th>
            <th class="center aligned">{{ averageMarginJe | percentage }}</th>
            <th class="center aligned">{{ totalPay | euro }}</th>
            <th class="center aligned">{{ totalUrssafConsultant | euro }}</th>
            <th class="center aligned">{{ totalNetConsultant | euro }}</th>
            <th class="center aligned">{{ totalNetByConsultant | euro }}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr is="Phase"
            :phase="phase"
            v-for="phase in phases" :key="phase.id"
            @delete="deleteEvent"
            @save="saveEvent"
          >
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

// import DistributionChart from './DistributionChart'
import DistributionChart from '../chart/ReadingChart.vue'
import PhaseObject from '../types'
import Phase from './Phase.vue'
import round from '../utils'

@Component({
  components: { Phase, DistributionChart }
})
export default class JehMaker extends Vue {
  // Props
  @Prop() private msg!: string

  // Data
  phases: PhaseObject[] = []
  totalPrice:number = 0
  averageJeh:number = 0
  totalConsultant:number = 0
  averageMargin:number = 0
  totalNbJeh:number = 0
  totalPay:number = 0
  totalUrssafJe:number = 0
  averageMarginJe:number = 0
  totalUrssafConsultant:number = 0
  totalNetConsultant:number = 0
  totalNetByConsultant:number = 0
  averagePcConsultant:number = 0
  fee:number = 100
  opMargin:number = 0
  chartData: any = {
    labels: ['JE', 'URSSAF', 'Intervenants'],
    datasets: [{
      data: [55, 5, 45],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)'
      ]
    }]
  }

  // Watchers
  @Watch('fee')
  WatchFee () {
    console.log('JEHMAKER watch fee')
    this.updateChart()
  }

  // LifeCycle hood
  created () {
    this.newPhase()
  }

  // Methods
  newPhase () {
    let newPhase = {
      id: this.phases.length + 1,
      title: '',
      price: 800,
      jeh: 400,
      nbConsultant: 1,
      margin: 55,
      nbJeh: 0,
      pay: 0,
      urssafJE: 0,
      marginJE: 0,
      urssafConsultant: 0,
      netConsultant: 0,
      netByConsultant: 0,
      pcConsultant: 0
    }
    this.phases.push(newPhase)
  }
  deleteEvent (idPhase: number) {
    let prefix = this.phases.slice(0, idPhase - 1)
    let suffix = this.phases.slice(idPhase, this.phases.length)
    let i = 1
    this.phases = prefix
    this.phases.push(...suffix)
    this.phases.forEach(function (p) {
      p.id = i
      i++
    })
    if (!this.phases.length) { // auto add new phase when delete the last phase
      this.newPhase()
    }
  }
  saveEvent (phase: PhaseObject) {
    this.phases[phase.id - 1].title = phase.title
    this.phases[phase.id - 1].price = phase.price
    this.phases[phase.id - 1].jeh = phase.jeh
    this.phases[phase.id - 1].nbConsultant = phase.nbConsultant
    this.phases[phase.id - 1].margin = phase.margin
    this.phases[phase.id - 1].nbJeh = phase.nbJeh
    this.phases[phase.id - 1].pay = phase.pay
    this.phases[phase.id - 1].urssafJE = phase.urssafJE
    this.phases[phase.id - 1].marginJE = phase.marginJE
    this.phases[phase.id - 1].urssafConsultant = phase.urssafConsultant
    this.phases[phase.id - 1].netConsultant = phase.netConsultant
    this.phases[phase.id - 1].netByConsultant = phase.netByConsultant
    this.phases[phase.id - 1].pcConsultant = phase.pcConsultant
    this.calculate()
  }
  calculate () {
    this.reset()
    let this_ = this
    let averageJeh = 0
    let averageMargin = 0
    let averageMarginJe = 0
    let averagePcConsultant = 0
    this.phases.forEach(function (v) {
      this_.totalPrice += v.price
      averageJeh += v.jeh
      this_.totalConsultant += v.nbConsultant
      averageMargin += v.margin
      this_.totalNbJeh += v.nbJeh
      this_.totalPay += v.pay
      this_.totalUrssafJe += v.urssafJE
      averageMarginJe += v.marginJE
      this_.totalUrssafConsultant += v.urssafConsultant
      this_.totalNetConsultant += v.netConsultant
      this_.totalNetByConsultant += v.netByConsultant
      averagePcConsultant += v.pcConsultant
    })
    this.averageJeh = round(averageJeh / this.phases.length)
    this.averageMargin = round(averageMargin / this.phases.length)
    this.averageMarginJe = round(averageMarginJe / this.phases.length)
    this.averagePcConsultant = round(averagePcConsultant / this.phases.length)
    this.totalNetConsultant = round(this.totalNetConsultant) // round needed otherwise 24.0000000000001 sometimes
    this.totalNetByConsultant = round(this.totalNetByConsultant)
    this.totalUrssafConsultant = round(this.totalUrssafConsultant)
    this.totalUrssafJe = round(this.totalUrssafJe)
    this.opMargin = round(this.totalPrice - this.totalUrssafJe - this.totalPay)
    this.updateChart()
  }
  reset () {
    this.totalPrice = 0
    this.averageJeh = 0
    this.totalConsultant = 0
    this.averageMargin = 0
    this.totalNbJeh = 0
    this.totalPay = 0
    this.totalUrssafJe = 0
    this.averageMarginJe = 0
    this.totalUrssafConsultant = 0
    this.totalNetConsultant = 0
    this.totalNetByConsultant = 0
    this.averagePcConsultant = 0
  }
  updateChart () {
    console.log('JEHMAKER updateChart')
    let newChartData = {
      labels: ['JE', 'URSSAF', 'Intervenants'],
      datasets: [{
        data: [
          this.opMargin + this.fee,
          round(this.totalUrssafJe + this.totalUrssafConsultant),
          this.totalNetConsultant
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ]
      }]
    }
    this.chartData = newChartData
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
.chart {
  width: auto;
  height: 200px;
}
</style>
