import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import JehMaker from '@/components/JehMaker.vue'

describe('JehMaker.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(JehMaker, {
      propsData: { msg }
    })
    expect(wrapper.text()).to.include(msg)
  })
})
