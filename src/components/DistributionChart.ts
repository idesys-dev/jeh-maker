import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

@Component({
  mixins: [reactiveProp]
})
export default class DistributionChart extends Doughnut {
  @Prop() chartData!: any;

  options: any = {
    cutoutPercentage: 35,
    legend: {
      display: false
    },
    tooltips: {
      bodyFontSize: 20
    }
  }

  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
