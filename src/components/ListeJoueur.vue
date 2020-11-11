<template>
  <div id="ListeJoueur" class="container">
      <h2>Tout les participants du CCT</h2>
        <div class="ui cards" v-for="item in liste" :key="item.id" id="listeNom">
            <div class="card">
                <div class="content">
                    <router-link :to="{name: 'Joueur', params: {id : item.id }}">
                        <img class="left floated tiny ui image" :src="setImageUrl(item.id)">
                    </router-link>
                    <div class="header">
                        <router-link :to="{name: 'Joueur', params: {id : item.id }}">
                            <a class="header">{{item.username}}</a>
                        </router-link>
                        <div class="description" id="tropheJoueur">
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
  name: 'ListeJoueur',
  components:{Trophee},
  data() {
      return {
          liste:[],

        }
    },
    mounted() {
        axios.get('http://cctprod-env.eba-qnvihvzw.us-east-2.elasticbeanstalk.com/Joueur/all/').then((response)=> {
        this.liste=response.data
        },(response) => {console.log('erreur',response)
        })
    },
    methods : {
        setImageUrl(id) {
            return 'http://cctprod-env.eba-qnvihvzw.us-east-2.elasticbeanstalk.com/filesByJoueur/'+id;
        }
    }
}
</script>

<style scoped>
#ListeJoueur{
    display: inline-block;
    margin-bottom:100px;
    margin-left:auto;
    margin-right: auto;
    
}


#tropheJoueur {
    margin-left:90px;
}
</style>
