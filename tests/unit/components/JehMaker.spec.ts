import JehMaker from '@/components/JehMaker.vue'
import { PhaseObject, TauxObject } from '@/types'
import { shallowMount } from '@vue/test-utils'
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
  const routerPush = jest.fn()

  const factory = (): any => {
    return shallowMount(JehMaker, {
      localVue,
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
})
