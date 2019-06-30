import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  data: function () {
    return {
      options: {
        cutoutPercentage: 35,
        legend: {
          display: false
        },
        tooltips: {
          bodyFontSize: 15
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
