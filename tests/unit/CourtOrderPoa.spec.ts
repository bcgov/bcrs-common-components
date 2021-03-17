import Vue from 'vue'
import Vuetify from 'vuetify'
import { createLocalVue, mount, Wrapper } from '@vue/test-utils'

import { CourtOrderPoa } from '@/components/CourtOrderPoa'
import VueRouter from 'vue-router'

Vue.use(Vuetify)

let vuetify = new Vuetify({})

const localVue = createLocalVue()
localVue.use(VueRouter)

/**
 * Creates and mounts a component, so that it can be tested.
 *
 * @param validate The validation prompt.
 * @returns a Wrapper<CourtOrderPoa> object with the given parameters.
 */
function createComponent (validate: boolean = false): Wrapper<CourtOrderPoa> {
  return mount(CourtOrderPoa, {
    propsData: { validate: validate },
    vuetify,
    localVue
  })
}

describe('Court Order and Plan of Arrangement component', () => {
  it('Loads the component', async () => {
    const wrapper: Wrapper<CourtOrderPoa> = createComponent()
    expect(wrapper.findComponent(CourtOrderPoa).exists()).toBe(true)

    wrapper.destroy()
  })

  it('validates if poa is selected', async () => {
    const wrapper: Wrapper<CourtOrderPoa> = createComponent()

    // Verify checkbox is NOT selected
    expect(wrapper.vm.$data.planOfArrangement).toBe(false)

    // Select checkbox
    const checkBox = wrapper.find('#plan-of-arrangement-checkbox')
    checkBox.trigger('click')
    await Vue.nextTick()

    // Verify checkbox is selected
    expect(wrapper.vm.$data.planOfArrangement).toBe(true)

    // Prompt validates through prop
    wrapper.setProps({ validate: true })
    await Vue.nextTick()

    expect(wrapper.find('#court-num-form').text()).toContain('A Court Order number is required')

    wrapper.destroy()
  })

  it('does NOT validate if poa is NOT selected', async () => {
    const wrapper: Wrapper<CourtOrderPoa> = createComponent()

    // Verify checkbox is NOT selected
    expect(wrapper.vm.$data.planOfArrangement).toBe(false)

    // Prompt validates through prop
    wrapper.setProps({ validate: true })
    await Vue.nextTick()

    expect(wrapper.find('#court-num-form').text()).toBe('Court Order Number')

    wrapper.destroy()
  })

  it('validates if the court number is too small', async () => {
    const wrapper: Wrapper<CourtOrderPoa> = createComponent()

    // Verify checkbox is NOT selected
    expect(wrapper.vm.$data.planOfArrangement).toBe(false)

    // Select checkbox
    const checkBox = wrapper.find('#plan-of-arrangement-checkbox')
    checkBox.trigger('click')
    await Vue.nextTick()

    // Verify checkbox is selected
    expect(wrapper.vm.$data.planOfArrangement).toBe(true)

    // Input text into text-field
    const input = wrapper.find('#court-order-number-input')
    input.setValue('Test')
    await Vue.nextTick()

    // Prompt validates through prop
    wrapper.setProps({ validate: true })
    await Vue.nextTick()

    expect(wrapper.find('#court-num-form').text()).toContain('Court order number is invalid')

    wrapper.destroy()
  })

  it('validates if the court number is too large', async () => {
    const wrapper: Wrapper<CourtOrderPoa> = createComponent()

    // Verify checkbox is NOT selected
    expect(wrapper.vm.$data.planOfArrangement).toBe(false)

    // Select checkbox
    const checkBox = wrapper.find('#plan-of-arrangement-checkbox')
    checkBox.trigger('click')
    await Vue.nextTick()

    // Verify checkbox is selected
    expect(wrapper.vm.$data.planOfArrangement).toBe(true)

    // Input text into text-field
    const input = wrapper.find('#court-order-number-input')
    input.setValue('Testing for an invalid character length court order number')
    await Vue.nextTick()

    // Prompt validates through prop
    wrapper.setProps({ validate: true })
    await Vue.nextTick()

    expect(wrapper.find('#court-num-form').text()).toContain('Court order number is invalid')

    wrapper.destroy()
  })

  it('validates if the court number correctly', async () => {
    const wrapper: Wrapper<CourtOrderPoa> = createComponent()

    // Verify checkbox is NOT selected
    expect(wrapper.vm.$data.planOfArrangement).toBe(false)

    // Select checkbox
    const checkBox = wrapper.find('#plan-of-arrangement-checkbox')
    checkBox.trigger('click')
    await Vue.nextTick()

    // Verify checkbox is selected
    expect(wrapper.vm.$data.planOfArrangement).toBe(true)

    // Input text into text-field
    const input = wrapper.find('#court-order-number-input')
    input.setValue('mockCorrectNumber')
    await Vue.nextTick()

    // Prompt validates through prop
    wrapper.setProps({ validate: true })
    await Vue.nextTick()

    expect(wrapper.find('#court-num-form').text()).toContain('Court Order Number')
    expect(wrapper.vm.$data.valid).toBe(true)
    expect(wrapper.emitted('emitValid').pop()[0]).toEqual(true)

    wrapper.destroy()
  })
})
