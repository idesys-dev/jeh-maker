<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <JehMaker msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import JehMaker from '@/components/JehMaker.vue' // @ is an alias to /src

@Component({
  components: {
    JehMaker
  }
})
export default class Home extends Vue {}
</script>
