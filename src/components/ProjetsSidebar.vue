<template>
  <SuiSidebar
    id="project-sidebar"
    animation="overlay"
    :visible="visible"
    width="very wide"
    direction="left"
  >
    <button @click="$emit('close')" id="btn__sidebar--close" class="btnmenu">
      <i class="icon close" />
    </button>
    <h1 is="sui-header" class="sidebar--header">Projets</h1>

    <div class="ui right action input">
      <input type="text" placeholder="Nom du projet" :value="projectName" @input="(s)=> $emit('input', s.target.value)" />
      <div class="ui secondary button" @click="$emit('save', projectName)">
        <i class="add icon"></i>
        Sauvegarder
      </div>
    </div>
    <div class="cards">
      <sui-card v-for="project in projects" :key="project.id">
        <sui-card-content
          class="card-content"
          @click="$emit('loadProject', project)"
        >
          <sui-card-header>
            {{ project.projectName }}
          </sui-card-header>
          <sui-card-meta>{{ project.updatedAt.toLocaleString() }}</sui-card-meta>
        </sui-card-content>
        <sui-card-content>
          <sui-card-meta slot="right">
            <sui-icon name="trash" @click="deleteProject(project)" />
          </sui-card-meta>
        </sui-card-content>
      </sui-card>
    </div>
  </SuiSidebar>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class ProjectSidebar extends Vue {
  @Prop({ required: true }) visible!: boolean;

  @Model('input') readonly projectName!: string;

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

<style lang="scss" scoped>
#project-sidebar{
  width: 400px;
  .cards{
    margin: 30px 0;
    display: grid;
    align-content: center;
    justify-content: center;
    row-gap: 1rem;
    .card{
      margin: 0
    }
  }

  .card-content {
    cursor: pointer;
  }

}
</style>
