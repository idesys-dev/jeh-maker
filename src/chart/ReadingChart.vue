<template>
  <div class="reading-chart">
    <InternalChart
      :width="chartWidth"
      :height="chartHeight"
      :chart-data="chartData"
      :options="chartOptions()"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

// you need to ts-ignore this line or TS will complain about the lack of type definitions
// there could be a more elegant solution though
// @ts-ignore
import InternalChart from './InternalChart.js'

@Component({
  components: {
    InternalChart
  }
})
export default class ReadingChart extends Vue {
  @Prop() chartData: any;
  chartWidth:number = 200
  chartHeight:number = 200

  async mounted () {
    console.log('ReadingChart mounted', this.chartData)
    // this.refreshData()
  }

  @Watch('chartData')
  WatchChartData () {
    console.log('readeing chart watch chart data', this.chartData)
  }
  /*

  async refreshData () {
    // do an API call here and touch properties that will cause chartData() and chartOptions() to be called
    // Because of the reactiveProp mixin inside InternalChart.js, the chart will update automagically :)
  }

  chartData (): object {
    // chart js DATA object. See https://www.chartjs.org/docs/latest/getting-started/usage.html
    return {
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
  }
  */
  chartOptions (): object {
    // chart js OPTIONS object. See https://www.chartjs.org/docs/latest/getting-started/usage.html
    return {
      cutoutPercentage: 35,
      legend: {
        display: false
      },
      tooltips: {
        bodyFontSize: 20
      }
    }
  }
}
</script>

<style scoped lang="scss">
.reading-chart {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-around;
}
</style>
