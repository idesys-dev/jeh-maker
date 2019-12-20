<template>
  <div class="home ui vertical stripe segment" >
    <div>
      <h1 is="sui-header">JEH Maker</h1>
      <JehMaker :taux="this.taux"/>
      <Taux v-model="this.taux" />
    </div>
    <div id="footer" class="ui inverted  footer segment">
      Made with ♥ by <a href="https://idesys.org">IdéSYS</a>
    </div>
  </div>
</template>

<script lang="ts">
import { PhaseObject, TauxObject } from '../types'
import { Component, Vue } from 'vue-property-decorator'
import JehMaker from '@/components/JehMaker.vue' // @ is an alias to /src
import Taux from '@/components/Taux.vue' // @ is an alias to /src

@Component({
  components: {
    JehMaker,
    Taux
  }
})
export default class Home extends Vue {
  taux:TauxObject = new TauxObject()
}
</script>

<style scoped>
.home{
  height: 100%;
}
#footer{
  position: absolute;
  bottom: 0;
  margin: 0%;
  width: 100%;
}

</style>
