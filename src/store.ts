import Vue from 'vue'
import Vuex from 'vuex'
import IndexedDBServices from './services/IndexedDBServices'

Vue.use(Vuex)

export const state = {
  projects: [] as any[]
}

export const mutations = {
  setProjects (state, projects) {
    state.projects = projects
  }
}
export const actions = {
  async loadProjects ({ commit }) {
    await IndexedDBServices.loadDb()
    const projects = await IndexedDBServices.getAllProjects()

    commit('setProjects', projects)
  },

  async addProject ({ dispatch }, project) {
    const id = await IndexedDBServices.addProject(project)
    dispatch('loadProjects')
    return id
  },

  async updateProject ({ dispatch }, project) {
    await IndexedDBServices.updateProject(project)
    dispatch('loadProjects')
  },

  async deleteProject ({ dispatch }, project) {
    await IndexedDBServices.deleteProject(project)
    dispatch('loadProjects')
  }

}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
