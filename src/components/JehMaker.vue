<template>
  <div>
    <div is="sui-container">
     <MargesDetails
        :opMargin="opMargin"
        :totalPrice="totalPrice"
        :averageMarginJe="averageMarginJe"
        :totalPay="totalPay"
        :totalUrssafJe="totalUrssafJe"
     />
      <sui-grid :columns="3">
        <sui-grid-row>
          <sui-grid-column>
              <Frais v-model="fee" :totalPrice="totalPrice"/>
          </sui-grid-column>
          <sui-grid-column>
            <!-- <consultants
              @newConsultant="onNewConsultant"
              @removeConsultant="onRemoveConsultant"
              :consultants="consultants"
              >
            </consultants> -->
          </sui-grid-column>
          <sui-grid-column>
              <DistributionChart :chartData="chartData"></DistributionChart>
          </sui-grid-column>
        </sui-grid-row>
      </sui-grid>
      <button class="ui primary button" @click="newPhase">Nouvelle phase</button>
      <button class="ui positive button" @click="exportUrl">Export</button>
      <div class="ui action input">
        <input type="text" v-model="urlImport" v-on:keyup.enter="importUrl" placeholder="https://">
        <button class="ui button" v-on:click="importUrl">Importer</button>
      </div>
       <sui-modal v-model="openExportPopup" basic>
          <div class="ui icon header">
            <i class="clipboard icon"></i>
            <sui-modal-header> Un lien a été enregistré dans votre presse-papier</sui-modal-header>
          </div>
          <div class="content centered">
              <sui-input v-model="url" disabled id="inputUrl" />
          </div>
          <sui-modal-actions>
              <sui-button class="ui green ok inverted button" positive @click.native="toggleExportPopup" >
                OK
              </sui-button>
          </sui-modal-actions>
      </sui-modal>
    </div>
    <div class="ui fluid container scrollable">
      <table class="ui small celled table">
      <!-- <table class="cell"> -->
        <thead>
          <tr class="center aligned">
            <th></th>
            <th></th>
            <th colspan="2" class="center aligned">Description des phases</th>
            <th colspan="2" class="center aligned">JEH</th>
            <th colspan="2"></th>
            <th colspan="2" class="center aligned">Part JE</th>
            <th colspan="4" class="center aligned">Part intervenant(s)</th> <!-- todo: s que si plusieurs intervenants -->
            <th></th>
          </tr>
          <tr class="center aligned">
            <th></th>
            <th></th>
            <th>Intitulé</th>
            <th>Prix</th>
            <th>Montant JEH
              <p class="bold-normal">Moyenne : {{ averageJeh | euro }}</p>
            </th>
            <th>Nombre JEH</th>
            <th>Nb intervenant</th>
            <th>Marge <p class="bold-normal">brute</p></th>
            <th>Marge<p class="bold-normal">opérationnelle</p>
              <!-- <p class="bold-normal">Moyenne : {{ averageMarginJe | percentage }}</p> -->
            </th>
            <th>URSSAF</th>
            <!-- <th>Intervenants</th> -->
            <th>Rémunération</th>
            <th>URSSAF</th>
            <th>net</th>
            <th>net / intervenant</th>
            <th></th>
          </tr>
          </thead>
        <tbody>
          <tr is="Phase"
            :phase="phase"
            :taux="taux"
            :consultants="consultants"
            v-for="phase in phases" :key="phase.id"
            @delete="deleteEvent"
            @save="saveEvent"
            ref="refPhase"
          >
          </tr>
        </tbody>
        <tfoot>
          <tr class="right aligned">
            <th></th>
            <th></th>
            <th>Total</th>
            <th>{{ totalPrice | euro }}</th>
            <th></th>
            <th >{{ totalNbJeh }}</th>
            <th></th>
            <th></th>
            <th></th>
            <th>{{ totalUrssafJe | euro }}</th>
            <!-- <th></th> -->
            <th>{{ totalPay | euro }}</th>
            <th>{{ totalUrssafConsultant | euro }}</th>
            <th>{{ totalNetConsultant | euro }}</th>
            <th></th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

// import DistributionChart from './DistributionChart'
import DistributionChart from '../chart/ReadingChart.vue'
import { PhaseObject, TauxObject } from '../types'
import Phase from './Phase.vue'
import Consultants from './Consultant.vue'
import Frais from './Frais.vue'
import MargesDetails from './MargesDetails.vue'
import { round, utf8ToB64, b64ToUtf8 } from '../utils'

@Component({
  components: { Phase, DistributionChart, Consultants, MargesDetails, Frais }
})
export default class JehMaker extends Vue {
  @Prop() taux!: TauxObject;

  // Data
  phases: PhaseObject[] = []
  totalPrice:number = 0
  averageJeh:number = 0
  averageMargin:number = 0
  totalNbJeh:number = 0
  totalPay:number = 0
  totalUrssafJe:number = 0
  averageMarginJe:number = 0
  totalUrssafConsultant:number = 0
  totalNetConsultant:number = 0
  averagePcConsultant:number = 0
  fee:number = 100
  opMargin:number = 0

  consultants: string[] = []

  openExportPopup:boolean = false;
  url:string= '';
  urlImport:string= '';

  get chartData ():Object {
    return {
      labels: ['JE', 'URSSAF', 'Intervenants'],
      datasets: [{
        data: [
          this.opMargin,
          this.totalUrssafJe,
          this.totalPay
        ],
        backgroundColor: [
          'rgba(231, 76, 60, 1)',
          'rgba(52, 73, 94, 1)',
          'rgba(208, 216, 232, 1)'
        ]
      }]
    }
  }
  // LifeCycle hood
  created () {
    if (this.$route && this.$route.params && this.$route.params.phases) {
      this.importFromB64(this.$route.params.phases)
    } else {
      this.newPhase()
    }
  }

  @Watch('phase')
  phasesWatcher () {
    this.setUrl()
  }

  @Watch('fee')
  feeWatcher () {
    this.setUrl()
  }

  // Methods
  setUrl () {
    let json = { fee: this.fee, phases: this.phases }
    this.$router.push({ name: 'phases', params: { phases: utf8ToB64(JSON.stringify(json)) } })
  }

  newPhase () {
    let newPhase = {
      id: this.phases.length + 1,
      title: '',
      price: 900,
      jeh: 450,
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
    if (!(this.phases.length - 1)) { // keep at least one phase
      return
    }
    let prefix = this.phases.slice(0, idPhase - 1)
    let suffix = this.phases.slice(idPhase, this.phases.length)
    let i = 1
    this.phases = prefix
    this.phases.push(...suffix)
    this.phases.forEach(function (p) {
      p.id = i
      i++
    })
    this.calculate()
    Vue.nextTick(() => {
      // calculate all the other phases update,
      // after the deleted phase is really removed (nextTick)
      if(this.$refs && this.$refs.refPhase))
        Object.keys(this.$refs.refPhase).forEach((phaseCoponent: any) => {
            this.$refs.refPhase[phaseCoponent].update('margin')
        })
    })
  }
  saveEvent (phase: PhaseObject) {
    this.phases[phase.id - 1] = phase
    this.calculate()
  }
  onNewConsultant (consultant: string) {
    this.consultants.push(consultant)
  }
  onRemoveConsultant (consultant: string) {
    this.consultants = this.consultants.filter(consultantName => {
      return consultantName !== consultant
    })
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
      averageMargin += v.margin
      averageMarginJe += v.marginJE
      this_.totalNbJeh += v.nbJeh
      this_.totalPay += v.pay
      this_.totalUrssafJe += v.urssafJE
      this_.totalUrssafConsultant += v.urssafConsultant
      this_.totalNetConsultant += v.netConsultant
      averagePcConsultant += v.pcConsultant
    })
    this.averageJeh = round(averageJeh / this.phases.length)
    this.averageMargin = round(averageMargin / this.phases.length)
    this.averageMarginJe = round(averageMarginJe / this.phases.length)
    this.averagePcConsultant = round(averagePcConsultant / this.phases.length)
    this.totalNetConsultant = round(this.totalNetConsultant) // round needed otherwise 24.0000000000001 sometimes
    this.totalUrssafConsultant = round(this.totalUrssafConsultant)
    this.totalUrssafJe = round(this.totalUrssafJe)
    this.opMargin = round(this.totalPrice - this.totalUrssafJe - this.totalPay)
  }

  reset () {
    this.totalPrice = 0
    this.averageJeh = 0
    this.averageMargin = 0
    this.totalNbJeh = 0
    this.totalPay = 0
    this.totalUrssafJe = 0
    this.averageMarginJe = 0
    this.totalUrssafConsultant = 0
    this.totalNetConsultant = 0
    this.averagePcConsultant = 0
  }

  exportUrl () {
    this.url = window.location.href
    this.$copyText(this.url)
    this.openExportPopup = true
  }

  toggleExportPopup () {
    this.openExportPopup = !this.openExportPopup
  }

  private importFromB64 (b64) {
    let jsonImported = JSON.parse(b64ToUtf8(b64))
    this.fee = jsonImported.fee
    this.phases = jsonImported.phases
  }

  importUrl () {
    let urlSplit = this.urlImport.split('/')
    if (urlSplit.length > 2 && urlSplit[urlSplit.length - 2] === 'p') {
      this.importFromB64(urlSplit[urlSplit.length - 1])
    }
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
  overflow-x: scroll;
}
.chart {
  width: auto;
  height: 200px;
}
.bold-normal {
  font-weight: 400;
}

#inputUrl{
  width: 100%;
}
</style>
