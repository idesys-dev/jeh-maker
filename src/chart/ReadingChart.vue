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
import { Component, Vue, Prop } from 'vue-property-decorator'

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
