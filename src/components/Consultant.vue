<template>
  <div class="new-consultant-wrapper">
    <div class="ui left icon input">
      <input type="text" v-model="consultantName" v-on:keyup.enter="newConsultant">
      <i class="users icon"></i>
    </div>

    <button class="ui button" @click="newConsultant">
      Nouveau consultants
    </button>

    <div class="ui list consultant-list">
      <div v-for="(consultantName, idx) in consultants" :key="idx" class="item">
        <i class="times icon" @click="removeConsultant(consultantName)"></i>
        <div class="content">
          {{ consultantName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component({
  model: {
    prop: 'consultants',
    event: 'change'
  }
})
export default class Phase extends Vue {
  // Data
  consultants: string[] = []
  consultantName: string = ''

  // Lifecycle hood
  mounted () {
  }

  // Methods
  newConsultant () {
    if (this.consultantName) {
      this.consultants.push(this.consultantName)
      this.$emit('newConsultant', this.consultantName)
      this.consultantName = ''
    }
  }
  removeConsultant (consultantName) {
    this.consultants = this.consultants.filter(consultant => {
      return consultantName !== consultant
    })
    this.$emit('removeConsultant', consultantName)
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.new-consultant-wrapper * {
  margin: 6px;
}
.consultant-list {
  width: min-content;
  margin: auto;
  overflow: scroll;
  max-height: 125px;
  max-width: 180px;
}
</style>
