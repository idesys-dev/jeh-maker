<template>
  <SuiSidebar id="sidebar" animation="overlay" :visible="visible" width="very wide" direction="left">

      <button @click="$emit('close')"  id="btn__sidebar--close"   class="btnmenu"><i class="icon close"/></button>
     <h1 is="sui-header" class="sidebar--header">Projets</h1>
   <sui-card v-for="project in projects" :key="project.id">
        <sui-card-content class="card-content" @click="$emit('loadProject', project)" >
          <sui-card-header>
            {{project.projectName}}
          </sui-card-header>
          <sui-card-meta>{{project.updatedAt.toLocaleString()}}</sui-card-meta>
        </sui-card-content>
        <sui-card-content>
          <sui-card-meta slot="right">
            <sui-icon name="trash" @click="deleteProject(project)" />
          </sui-card-meta>
        </sui-card-content>
      </sui-card>
</SuiSidebar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class ProjectSidebar extends Vue {
  @Prop({ required: true }) visible!: boolean;

  async mounted () {
    await this.$store.dispatch('loadProjects')
  }

  get projects () {
    return this.$store.state.projects
  }

  deleteProject (project) {
    this.$store.dispatch('deleteProject', project)
  }
}

</script>

<style lang="scss">
.card-content{
  cursor: pointer
}
</style>
