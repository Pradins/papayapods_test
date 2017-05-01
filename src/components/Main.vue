<template>
  <div class="main">
    <h1>{{ message }}</h1>
    <input type="text" placeholder="Country name" v-model="countryName">
    <h1 class="notFound" v-if="$store.getters.internalError">Internal service error</h1>
    <h1 class="notFound" v-if="$store.getters.notFound">No countries found</h1>  

    <ul v-if="!$store.getters.notFound" id="countriesList">
      <li style="display: block" v-for="country in $store.getters.countryList">
        <a v-bind:href="'/detail/' + country.alpha3Code">{{ country.name }}, {{country.alpha3Code}}</a>
      </li>
    </ul>

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
    name: 'main',
    data () {
      return {
        countryName: '',
        message: 'Search for any country to see its details'
      }
    },
    watch: {
      countryName: function (val, oldVal) {
        if (val.length >= 3) {
          var endpoint = 'https://restcountries.eu/rest/v2/name/' + this.countryName
          Vue.default.axios.get(endpoint).then((response) => {
            this.$store.commit('notFound', false)
            this.$store.commit('countryList', response.data)
          })
          .catch((error) => {
            if (error.response.status === 400 || error.response.status === 404) {
              this.$store.commit('notFound', true)
            } else {
              this.$store.commit('internalError', true)
            }
            this.$store.commit('countryList', [])
          })
        } else {
          this.$store.commit('countryList', [])
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
