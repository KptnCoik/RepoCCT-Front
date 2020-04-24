<template>
  <div id="Liste" class="container">
      <h2>Tout les participants du CCT</h2>
      <!-- <div v-for="item in liste" :key="item.id">
          <router-link :to="{name: 'Joueur', params: {id : item.id }}">
              Joueur => {{item.nom}}
          </router-link>
      </div> -->
        <div class="ui cards" v-for="item in liste" :key="item.id" id="listeNom">
            <div class="card">
                <div class="content">
                    <router-link :to="{name: 'Joueur', params: {id : item.id }}">
                        <img class="left floated tiny ui image" src="../assets/boy.png">
                    </router-link>
                    <div class="header">
                        <router-link :to="{name: 'Joueur', params: {id : item.id }}">
                            <a class="header">{{item.nom}}</a>
                        </router-link>
                        <div class="description">
                            <Trophee :id="item.id"></Trophee>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>

import axios from 'axios'
import Trophee from './TropheeComponent'

export default {
  name: 'Liste',
  components:{Trophee},
  data() {
      return {
          liste:[],

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
#Liste{
    margin-bottom:50px;
    
}
</style>
