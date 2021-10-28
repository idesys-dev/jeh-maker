import JehMaker from '@/components/JehMaker.vue'
import { PhaseObject, TauxObject } from '@/types'
import { shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import appInit from '../config/appInit'

const localVue = appInit()
const getPhase = (id: number): PhaseObject => ({
  id,
  title: '',
  price: 900,
  jeh: 450,
  nbConsultant: 1,
  margin: 55,
  nbJeh: 0,
  pay: 0,
  urssafJE: 0,
  marginJE: 0,
  urssafConsultant: 0,
  netConsultant: 0,
  netByConsultant: 0,
  pcConsultant: 0
})

describe('JehMaker.vue', () => {
  const routerPush = jest.fn(() => ({ catch: () => {} }))
  const store = new Vuex.Store({
    actions: {
      addProject: jest.fn(),
      updateProject: jest.fn()
    }
  })

  const factory = (): any => {
    return shallowMount(JehMaker, {
      localVue,
      store,
      propsData: {
        taux: new TauxObject()
      },
      mocks: {
        $router: {
          push: routerPush
        }
      }
    })
  }

  it('watch: phase should call setUrl', async () => {
    const wrapper = factory()
    const spy = jest.spyOn(wrapper.vm, 'setUrl')
    await wrapper.setData({
      phases: [
        getPhase(1),
        getPhase(2)
      ]
    })

    expect(spy).toHaveBeenCalled()
  })

  it('watch: fee should call setUrl', async () => {
    const wrapper = factory()
    const spy = jest.spyOn(wrapper.vm, 'setUrl')
    await wrapper.setData({
      fee: 200
    })

    expect(spy).toHaveBeenCalled()
  })

  it('methods setUrl: should push in router', () => {
    const wrapper = factory()
    wrapper.vm.setUrl()
    expect(routerPush).toBeCalled()
  })

  it('method: loadProject should set project info in data', () => {
    const wrapper = factory()
    wrapper.vm.loadProject({
      projectName: 'projet Toto',
      phases: [],
      fee: 123,
      id: 32
    })

    expect(wrapper.vm.projectName).toEqual('projet Toto')
    expect(wrapper.vm.phases).toEqual([])
    expect(wrapper.vm.fee).toEqual(123)
    expect(wrapper.vm.id).toEqual(32)
  })

  it('method: save should save object', async () => {
    const wrapper = factory()

    const dispatchSpy = jest.spyOn(wrapper.vm.$store, 'dispatch')

    await wrapper.vm.save()

    expect(dispatchSpy).toHaveBeenCalledWith('addProject', expect.anything())
  })

  it('method: save should update object', async () => {
    const wrapper = factory()

    wrapper.setData({
      id: 22
    })

    const dispatchSpy = jest.spyOn(wrapper.vm.$store, 'dispatch')

    await wrapper.vm.save()

    expect(dispatchSpy).toHaveBeenCalledWith('updateProject', expect.anything())
  })

  it('method: openProjectSidebar should set data true', () => {
    const wrapper = factory()

    expect(wrapper.vm.isOpenProjectSidebar).toBeFalsy()
    wrapper.vm.openProjectSidebar()

    expect(wrapper.vm.isOpenProjectSidebar).toBeTruthy()
  })

  it('method: closeProjectSidebar should set data false', () => {
    const wrapper = factory()
    wrapper.setData({
      isOpenProjectSidebar: true
    })
    wrapper.vm.closeProjectSidebar()

    expect(wrapper.vm.isOpenProjectSidebar).toBeFalsy()
  })
})
