import Vue from 'vue'
import Main from '@/components/Main'

describe('Main.vue', () => {
  it('sets the correct default data', () => {
    const defaultData = Main.data()
    expect(defaultData.countryName).to.equal('')
  })

  it('sets the correct default message', () => {
    const defaultData = Main.data()
    expect(defaultData.message).to.equal('Search for any country to see its details')
  })

  // Inspect the component instance on mount
  it('correctly sets the message when created', () => {
    const vm = new Vue(Main).$mount()
    expect(vm.message).to.equal('Search for any country to see its details')
  })
})
