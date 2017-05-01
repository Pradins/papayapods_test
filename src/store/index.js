import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const options = {
  state: {
    stateFlags: {
      notFound: false,
      internalError: false
    },
    countryVariables: {
      info: '',
      list: []
    }
  },
  getters: {
    notFound: state => {
      return state.stateFlags.notFound
    },
    internalError: state => {
      return state.stateFlags.internalError
    },
    countryInfo: state => {
      return state.countryVariables.info
    },
    countryList: state => {
      return state.countryVariables.list
    }
  },
  mutations: {
    notFound (state, notFound) {
      state.stateFlags.notFound = notFound
    },
    internalErrorState (state, internalError) {
      state.stateFlags.internalError = internalError
    },
    countryInfo (state, countryInfo) {
      state.countryVariables.info = countryInfo
    },
    countryList (state, countryList) {
      state.countryVariables.list = countryList
    }
  }
}

export default new Vuex.Store(options)
export { options }
