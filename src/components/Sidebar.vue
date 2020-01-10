<template>
<SuiSidebar id="sidebar" animation="overlay" :visible="visible" width="very wide" direction="right">
      <button @click="toogleSibebar"  class="btnmenu"><i class="icon close"/></button>
      <h1 is="sui-header" class="sidebar--header">Hello 👋</h1>
      <p>
        Cet outil a pour objectif de faciliter la budgétisation pour les Junior-Entreprises.
        Cet outil à pour vocation de comprendre et contrôler la structure de revenus et de coûts de sa Junior-Entreprise, notamment pour piloter la marge opérationnelle globale définie en début de mandat pour guider l'activité commerciale.
      </p>
      <p>L'outil s'inspire du JEH Maker VBA réalisé par IÉSEG Conseil.</p>

      <h2>Formules clés : </h2>
      <p>
        <b>MARGE BRUTE (%)</b> = (Prix de Vente HT- Rémunérations) / Prix de Vente HT
      </p>
      <p>
        <b>MARGE OPERATIONNELLE (%)</b> = (Prix de Vente HT- Rémunérations - Cotisations) / Prix de Vente HT
      </p>
      <p>
        <b>MARGE URSSAF (%)</b> = Cotisations / Prix de Vente HT
      </p>

      <h2>Remarque/Suggestion : </h2>

      <p>Par mail : <a href="mailto:jeh-maker@idesys.org">jeh-maker@idesys.org</a></p>
      <p>Issue Github : <a href="https://github.com/idesys-dev/jeh-maker/issues">https://github.com/idesys-dev/jeh-maker/issues</a></p>

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

#sidebar{
  min-width: 40%;
  text-align: justify;
  padding: 0 1%;
  font-size: 16px;
}
.sidebar--header{
  text-align: center
}
</style>
