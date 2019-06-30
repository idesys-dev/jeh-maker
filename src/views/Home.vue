<template>
  <div class="home">
    <JehMaker/>
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
