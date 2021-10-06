<template>
<div>
  <Sidebar :visible="v" @toogle="toogleSibebar"/>
  <div class="home ui vertical stripe segment">
      <button @click="toogleSibebar" id="btn__sidebar--open" class="btnmenu"><i class="info circle icon"/></button>
      <h1 is="sui-header">JEH Maker</h1>
      <JehMaker :taux="taux"/>
      <Taux v-model="taux" />
  </div>
    <div id="footer" class="ui inverted  footer segment">
      Fait avec ♥ par <a href="https://idesys.org">IdéSYS</a>
    </div>
</div>
</template>

<script lang="ts">
import { PhaseObject, TauxObject } from '../types'
import { Component, Vue } from 'vue-property-decorator'
import JehMaker from '@/components/JehMaker.vue' // @ is an alias to /src
import Taux from '@/components/Taux.vue' // @ is an alias to /src
import Sidebar from '@/components/Sidebar.vue' // @ is an alias to /src

@Component({
  components: {
    JehMaker,
    Taux,
    Sidebar
  }
})
export default class Home extends Vue {
  taux:TauxObject = new TauxObject()
  v:boolean = false

  toogleSibebar () {
    this.v = !this.v
  }
}
</script>

<style>
.home.ui.vertical.segment{
  height: 100%;
  padding-bottom: 5rem;
}
#footer{
  position: fixed;
  bottom: 0;
  margin: 0;
  margin-top: 2%;
  width: 100%;
  border-radius: 0;
}
.btnmenu{
  font-size: 2.5em;
  background: none;
  border: none;
  color: #acadaf;
  position: absolute;
  right: 0;
  cursor: pointer;
}
</style>
