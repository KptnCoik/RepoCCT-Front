<template>
    <div id="ResultatTournoiJoueur" class="container">
        <div class="ui unstackable vertical menu" id="partieTableau">
            <div class="item">
                <div class="header"><a>General</a></div>
            </div>
            <div class="item">
                <div class="header">Epreuves</div>
                <div class="menu" v-for="item in epreuves" :key="item.id">
                <a class="item">{{item.nom}}</a>
                </div>
            </div>
        </div>
        <div id="partieResultat">
            <p>Position: {{position}} / {{nbrJoueur}}</p>
            <p>Points: {{points}}</p>
            <p>Bonus: {{bonus.nom}}</p>
            <p>Malus: {{malus.nom}}</p>
        </div>
    </div>
</template>
<script>

import axios from 'axios'

export default {
  name: 'ResultatTournoiJoueur',
  data() {
      return {
          tournoi:{type: Object},
          points:{type: Number},
          position:{type:Number},
          epreuves:[],
          trophees:[],
          nbrJoueur:{type:Object},
          bonus:{type:Object},
          malus:{type:Object}
        }
    },
    props: {
        id:{
            type: Number
        },
        idJoueur: {
            type: Number
        }
    },
    methods: {
        loadTournoi(id) {
            axios.get('http://localhost:9090/Tournoi/'+id).then((response)=> 
            {   this.tournoi = response.data
            },(response) => {console.log('erreur points',response)
            })
        },
        loadPoints(id,joueur) {
               axios.get('http://localhost:9090/Joueur/PointsTournoi/'+joueur+'/'+id).then((response)=> 
            {   this.points = response.data
            },(response) => {console.log('erreur points',response)
            })
        },
        loadPosition(id,joueur) {
            axios.get('http://localhost:9090/Joueur/PositionTournoi/'+joueur+'/'+ id).then((response)=> 
                {   this.position = response.data
                },(response) => {console.log('erreur position',response)
                })
        }, loadTrophee(id,joueur) {
            axios.get('http://localhost:9090/Trophee/ParJoueur/'+id+'/'+ joueur).then((response)=> 
                {   this.trophees = response.data
                },(response) => {console.log('erreur position',response)
                })
        }, loadEpreuves(id) {
            axios.get('http://localhost:9090/Tournoi/Epreuves/'+id).then((response)=> 
                {   this.epreuves = response.data
                this.$emit("loadEpreuves", response.data);
                },(response) => {console.log('erreur epreuves',response)
                })
                
        }, loadNbrJoueur(id) {
            axios.get('http://localhost:9090/Tournoi/NombreJoueur/'+id).then((response)=> 
                {   this.nbrJoueur = response.data
                },(response) => {console.log('erreur epreuves',response)
                })
        },loadBonus(id,joueur) {
            axios.get('http://localhost:9090/Joueur/Bonus/'+joueur+'/'+id).then((response)=> 
                {   this.bonus = response.data
                },(response) => {console.log('erreur bonus',response)
                })
        },loadMalus(id,joueur) {
            axios.get('http://localhost:9090/Joueur/Malus/'+joueur+'/'+id).then((response)=> 
                {   this.malus = response.data
                },(response) => {console.log('erreur malus',response)
                })
        }
    },
    mounted() {
        this.loadTournoi(this.id)
        this.loadPosition(this.id,this.idJoueur)
        this.loadPoints(this.id,this.idJoueur)
        this.loadTrophee(this.id,this.idJoueur)
        this.loadEpreuves(this.id)
        this.loadNbrJoueur(this.id)
        this.loadBonus(this.id,this.idJoueur)
        this.loadMalus(this.id,this.idJoueur)
    },
    watch : {
        id(){
            this.loadTournoi(this.id)
            this.loadPosition(this.id,this.idJoueur)
            this.loadPoints(this.id,this.idJoueur)
            this.loadTrophee(this.id,this.idJoueur)
            this.loadEpreuves(this.id)
            this.loadNbrJoueur(this.id)
            this.loadBonus(this.id,this.idJoueur)
            this.loadMalus(this.id,this.idJoueur)
        }
    }

}
</script>

<style scoped>
#ResultatTournoiJoueur{
    padding-left: 0px;
    padding-right: 0px;
    display: flex;
    justify-content: space-between;
}
#partieTableau{
    width: 33%;
    float:left;
    padding: 3px;
    max-height: 300px;
    overflow-y: scroll;
}
#partieTableau::-webkit-scrollbar {
  display: none;
}
#partieResultat{
    width: 62%;
    text-align: left;
    padding-left: 10px;
}
</style>
