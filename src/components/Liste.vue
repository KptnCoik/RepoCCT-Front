<template>
  <div id="Liste" class="container">
      Liste
      <div v-for="item in liste" :key="item.id">
          <router-link :to="{name: 'Joueur', params: {id : item.id }}">
              Joueur => {{item.nom}}
          </router-link>
      </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Liste',
  data() {
      return {
          liste:[]
        }
    },
    mounted() {
        axios.get('http://localhost:9090/Joueur/all/').then((response)=> {
        this.liste=response.data
        },(response) => {console.log('erreur',response)
        })
    }
}
</script>

<style scoped>

</style>
