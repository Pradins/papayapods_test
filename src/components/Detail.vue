<template>
  <div class="detail">
    <h1 class="notFound" v-if="$store.getters.notFound">Country not found</h1>  
    <h1 class="notFound" v-if="$store.getters.internalError">Internal service error</h1>  
    <h1 v-if="!$store.getters.notFound">Country information</h1>
    <p><img class="flagImage" v-bind:src="$store.getters.countryInfo.flag"></p>
    <p v-if="$store.getters.countryInfo.name"><strong>Name:</strong> {{ $store.getters.countryInfo.name }}</p>
    <p v-if="$store.getters.countryInfo.region"><strong>Region:</strong> {{ $store.getters.countryInfo.region }}</p>
    <p v-if="$store.getters.countryInfo.capital"><strong>Capital:</strong> {{ $store.getters.countryInfo.capital }}</p>
    <p v-if="$store.getters.countryInfo.languages"><strong>Language:</strong> {{ $store.getters.countryInfo.languages[0].name }}</p>    
  </div>
</template>

<script>
  var Vue = null

  if (window.Vue != null) {
    Vue = window.Vue
  } else {
    Vue = require('vue')
  }

  export default {
    name: 'detail',
    data () {
      return {
        countryInfo: '',
        notFound: false,
        internalError: false
      }
    },
    mounted () {
      var countryCode = this.$route.params.name

      var endpoint = 'https://restcountries.eu/rest/v2/alpha/' + countryCode
      Vue.default.axios.get(endpoint).then((response) => {
        if (response.data === undefined || response.data === null) {
          this.$store.commit('notFound', true)
        } else {
          this.$store.commit('notFound', false)
          this.$store.commit('countryInfo', response.data)
        }
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 404) {
          this.$store.commit('notFound', true)
        } else {
          this.$store.commit('internalError', true)
        }
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

.flagImage {
  height: 4em; 
  widht: 4em; 
}

.notFound {
  color: red;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
