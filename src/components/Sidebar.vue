<template>
<SuiSidebar animation="overlay" :visible="visible" width="very wide" direction="right">

      <button @click="toogleSibebar"  class="btnmenu"><i class="icon close"/></button>
      <h1 is="sui-header">Hello</h1>

</SuiSidebar>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Sidebar extends Vue {
  @Prop() visible!:boolean

  toogleSibebar () {
    this.$emit('toogle')
  }
}
</script>
<style scoped>
.btnmenu{
  padding: 14px;
  left: 0;
}
</style>
