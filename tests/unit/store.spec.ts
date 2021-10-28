import IndexedDBServices from '@/services/IndexedDBServices'
import { state, mutations, actions } from '@/store'
jest.mock('@/services/IndexedDBServices', () => {
  return {
    loadDb: jest.fn(),
    getAllProjects: jest.fn(() => []),
    addProject: jest.fn(),
    updateProject: jest.fn(),
    deleteProject: jest.fn()
  }
})

const project = {
  id: 1,
  name: 'test',
  createdAt: '2020-01-01',
  updatedAt: '2020-01-01',
  phases: [{
    id: 1,
    name: 'test'
  }]
}

describe('store.ts', () => {
  it('mutations: setProjects, should be defined projects', () => {
    const stateInternal = state

    expect(stateInternal.projects).toHaveLength(0)
    const projects = [project]

    mutations.setProjects(stateInternal, projects)

    expect(stateInternal.projects).toEqual(projects)
  })
  it('actions: addProject, should call addProject IndexedDb', async () => {
    const commit = jest.fn()

    await actions.loadProjects({ commit })

    expect(IndexedDBServices.getAllProjects).toHaveBeenCalled()
    expect(commit).toHaveBeenCalledWith('setProjects', expect.any(Array))
  })

  it('actions: addProject, should call addProject IndexedDb', async () => {
    const dispatch = jest.fn()

    await actions.addProject({ dispatch }, project)

    expect(IndexedDBServices.addProject).toHaveBeenCalledWith(project)
    expect(dispatch).toHaveBeenCalledWith('loadProjects')
  })

  it('actions: updateProject, should call updateProject IndexedDb', async () => {
    const dispatch = jest.fn()

    await actions.updateProject({ dispatch }, project)

    expect(IndexedDBServices.updateProject).toHaveBeenCalledWith(project)
    expect(dispatch).toHaveBeenCalledWith('loadProjects')
  })

  it('actions: deleteProject, should call deleteProject IndexedDb', async () => {
    const dispatch = jest.fn()

    await actions.deleteProject({ dispatch }, project)

    expect(IndexedDBServices.deleteProject).toHaveBeenCalledWith(project)
    expect(dispatch).toHaveBeenCalledWith('loadProjects')
  })
})
