<template>
  <div id="MonProfil" class="container">
    <div class="" id="partieHaut">
        <div class="ui fluid card " id="partieAvatar">
            <div class="image">
                <img :src="this.lienImage" id="imageAvatar">
            </div>              
            <div class="header" style="text-align:center;" id="test">
                <h3>{{user.pseudo}}</h3>
            </div>
            <div class="description" v-if="this.gagne.annee!=null" >
                <i class="far fa-star"></i> {{gagne.annee}}
            </div>
        </div>
        <Stat :id="user.id"></Stat>
    </div>
    <div class="ui inverted divider"></div>
    
    <div id="boutonTournoi" class="container">
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
  name: 'MonProfil',
  components:{Stat,BoutonTournoi,ResultatTournoi},
  data() {
      return {
          user:{type: Object},
          gagne:{type:Object},
          tournoisSelected:{type:Object},
          tournois:[],
          lienImage:{type: String},
          images:{type: Object}
        }
    },
    created() {
        const todos = JSON.parse(this.$localStorage.get('user'))
        if (todos) {
            this.user = todos
        }
    },
    mounted() {
        axios.get('http://cctprod-env.eba-qnvihvzw.us-east-2.elasticbeanstalk.com/Joueur/Tournois/'+this.user.id).then((response)=> {
        this.tournois=response.data
        },(response) => {console.log('erreur',response)
        })
        axios.get('http://cctprod-env.eba-qnvihvzw.us-east-2.elasticbeanstalk.com/filesByJoueur/'+this.user.id).then((response)=> {
        this.images=response.data
        },(response) => {console.log('erreur',response)
        })
        this.lienImage = 'http://cctprod-env.eba-qnvihvzw.us-east-2.elasticbeanstalk.com/filesByJoueur/'+this.user.id
    },
    methods : {
        setTournoiSelect(id) {
            this.tournoisSelected = id
        }
    }
}
</script>

<style scoped>
#MonProfil{
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
#boutonTournoi{
    display:flex;
    justify-content: space-between;
    text-align: center;

}
#resultat {
    margin-top: 20px;
    padding-left: 0px;
    padding-right:0px;
}
#imageAvatar {
overflow: hidden;
height: 130px;
 width: 125px;
  
}
</style>
