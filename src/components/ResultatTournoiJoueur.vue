<template>
    <div id="ResultatTournoiJoueur" class="container">
        <div class="ui unstackable vertical menu" id="partieTableau">
            <div class="item">
                <div class="header"><a @click="showClassementGeneral()">General</a></div>
            </div>
            <div class="item">
                <div class="header">Epreuves</div>
                <div class="menu" v-for="item in epreuves" :key="item.id">
                <a class="item" @click="setShowEpreuve(item)">{{item.nom}}</a>
                </div>
            </div>
        </div>
        <div v-if="afficheDetailTournoi" id="partieResultat"><b>
            <p v-if="gagnant.id==idJoueur">Victoire
                <i class="fas fa-trophy-alt" id="tropheeSpecial"></i>
            </p>
            <p v-else>Position: {{position}} / {{nbrJoueur}}</p>
            <p>Points: {{points}}</p>
            <p>Bonus: {{bonus.nom}}</p>
            <p>Malus: {{malus.nom}}</p></b>
            <div v-if="trophees.length != 0" id="tropheeDetail">
                <h3>Trophee</h3>
                <i v-for="item in trophees" :key="item.id" 
                :class="item.icone" id="tropheeTournoi"
                @click="setShowDetail(item)"></i>
            </div>
            <div v-if="trophees.length == 0" id="tropheeDetail">
                <h3> Pas de Trophee</h3>
                <i class="far fa-thumbs-down" id="tropheeTournoi"></i>
            </div>
            <p class="modal-mask" v-if="showDetail==true">
                <b> {{selectedItem.detail}}</b>
            </p>
        </div>
        <div v-if="afficheDetailEpreuve" id="partieResultat">
            <Epreuve v-if="selectedEpreuve.type==='Individuel'" 
            :epreuve="selectedEpreuve" v-bind:idJoueur="idJoueur"
            :leBonus="bonus" :leMalus="malus">
            </Epreuve>
            <EpreuveEquipe v-else :epreuve="selectedEpreuve" 
            v-bind:idJoueur="idJoueur"
            :leBonus="bonus"></EpreuveEquipe>
        </div>
    </div>
</template>
<script>

import axios from 'axios'
import Epreuve from './ResultatEpreuve.vue'
import EpreuveEquipe from './ResultatEpreuveEquipe.vue'

export default {
  name: 'ResultatTournoiJoueur',
  components:{Epreuve,EpreuveEquipe},
  data() {
      return {
          tournoi:{type: Object},
          points:{type: Number},
          position:{type:Number},
          gagnant:{type: Object},
          perdant:{type:Object},
          epreuves:[],
          trophees:[],
          nbrJoueur:{type:Object},
          bonus:{type:Object},
          malus:{type:Object},
          showDetail:false,
          selectedItem:{type:Object},
          selectedEpreuve:{type:Object},
          afficheDetailTournoi:true,
          afficheDetailEpreuve:false
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
            axios.get('http://localhost:9090/Trophee/'+id+'/'+ joueur).then((response)=> 
                {   this.trophees = response.data
                },(response) => {console.log('erreur position',response)
                })
        }, loadEpreuves(id) {
            axios.get('http://localhost:9090/Tournoi/Epreuves/'+id).then((response)=> 
                {   this.epreuves = response.data
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
        },loadGagnant(id){
                axios.get('http://localhost:9090/Tournoi/Gagnant/'+id).then((response)=> 
                {   this.gagnant = response.data
                },(response) => {console.log('erreur malus',response)
                }) 
        }, loadPerdant(id) {
            axios.get('http://localhost:9090/Tournoi/Perdant/'+id).then((response)=> 
                {   this.perdant = response.data
                },(response) => {console.log('erreur malus',response)
                }) 
        },
        setShowDetail(id) {
            if(this.selectedItem.id == id.id){
                this.showDetail = !this.showDetail
            } else {
            this.selectedItem = id
            this.showDetail = true
            }

        },
        setShowEpreuve(id) {
            this.selectedEpreuve = id
            this.showDetail=false
            this.afficheDetailTournoi = false
            this.afficheDetailEpreuve = true
        },
        showClassementGeneral() {
            this.afficheDetailTournoi = true
            this.afficheDetailEpreuve = false
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
        this.loadPerdant(this.id)
        this.loadGagnant(this.id)
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
            this.loadPerdant(this.id)
            this.loadGagnant(this.id)
            this.showDetail=false
            this.afficheDetailEpreuve=false
            this.afficheDetailTournoi=true
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
    max-height: 320px;
    overflow-y: scroll;
}
#partieTableau::-webkit-scrollbar {
  display: none;
}
#partieResultat{
    width: 62%;
    text-align: left;
    padding-left: 20px;
    padding-top: 10px;
}
#tropheeTournoi{
    padding: 10px;
    
}

#tropheeDetail{
    padding-top:30px;
    font-size:20px;
}
#tropheeSpecial{
    font-size:25px;
}
</style>
