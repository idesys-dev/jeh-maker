import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  // props: ['chartData'],
  mixins: [reactiveProp],
  data: function () {
    return {
      options: {
        cutoutPercentage: 35,
        legend: {
          display: false
        },
        tooltips: {
          bodyFontSize: 20
        }
      }
    }
  },
  watch: {
    chartData () {
      console.log('watch internal chart chart data', this.chartData)
    }
  },
  mounted () {
    console.log('internal chart mounted', this.chartData)
    this.renderChart(this.chartData, this.options)
  }
}
