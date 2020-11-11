<template>
  <div id="Joueur" class="container">
    <div class="" id="partieHaut">
        <div class="ui fluid card " id="partieAvatar">
            <div class="image">
                <img :src="setImageUrl()">
            </div>              
            <div class="header" style="text-align:center;">
                <h3>{{user.username}}</h3>
            </div>
            <div class="description" v-if="this.gagne.annee!=null" >
                <i class="far fa-star"></i> {{gagne.annee}}
            </div>
        </div>
        <Stat :id="this.$route.params.id"></Stat>
    </div>
    <div class="ui inverted divider"></div>
    <div id="partieTournoi" class="container">
        <BoutonTournoi :tournoi="tournois" :showTitre="true" :statPerso="true"></BoutonTournoi> 
    </div>
    <div id="resultat" class="container" v-if="tournoisSelected!=null && tournoisSelected.annee!=null">
        <ResultatTournoi :id="tournoisSelected.id" :idJoueur="user.id"></ResultatTournoi>
    </div>
  </div>
</template>
<script>

import Stat from './StatGeneralComponent'
import BoutonTournoi from './BoutonTournoi'
import ResultatTournoi from './ResultatTournoiJoueur'
import axios from 'axios'

export default {
  name: 'Joueur',
  components:{Stat,BoutonTournoi,ResultatTournoi},
  data() {
      return {
        user:{type: Object},
        tournois:[],
        gagne:{type:Object},
        tournoisSelected:{type:Object},
        }
    },
    mounted() {
        this.loadJoueur(this.$route.params.id)
        this.loadTournois(this.$route.params.id)
    },
    methods: {
        loadJoueur(id) {
            axios.get('http://cctprod-env.eba-qnvihvzw.us-east-2.elasticbeanstalk.com/Joueur/'+id).then((response)=> {
            this.user=response.data
            },(response) => {console.log('erreur',response)
            })
        },
        loadTournois(id) {
            axios.get('http://cctprod-env.eba-qnvihvzw.us-east-2.elasticbeanstalk.com/Joueur/Tournois/'+id).then((response)=> {
            this.tournois=response.data
            },(response) => {console.log('erreur',response)
            })
        },
        setTournoiSelect(id) {
            this.tournoisSelected = id
        },
        setImageUrl() {
            return 'http://cctprod-env.eba-qnvihvzw.us-east-2.elasticbeanstalk.com/filesByJoueur/'+this.user.id;
        }
    }
}
</script>

<style scoped>
#Joueur {
    margin-bottom: 50px;
    display: inline-block;
}
#partieHaut {
    display:flex;
    justify-content: space-between;
    margin-top:5px;
}
#partieAvatar{
  box-sizing: content-box;
  width: 40%;
  float:left;
  margin-bottom: auto;
}
#partieStats{
    width:65%;
    float:right;
}
#resultat {
    margin-top: 20px;
    padding-left: 0px;
}
</style>
