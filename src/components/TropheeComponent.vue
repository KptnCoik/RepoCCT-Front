<template>
<div id="TropheeComponent">
    {{joueurCharge}} {{gagneCharge}} {{perdCharge}}
    
    <i id="items" v-for="item in trophees" :key="item.id" :class="item.icone" 
    @click="setShowDetail(item)">
    </i>
    
    <i id="tropheeSpecial" v-if="tournoiGagne.annee!=null" class="fas fa-trophy-alt"
     @click="setShowVictory()"></i>

     <i id="tropheeSpecial" v-if="tournoiPerd.annee!=null" class="fas fa-poo"
     @click="setShowLoose()"></i>
    
    <p class="modal-mask" v-if="showDetail==true">
        <b> {{selectedItem.detail}}</b>
    </p>
    
    <p class="modal-mask" v-if="showVictory==true">
        <b> Vainqueur CCT {{tournoiGagne.annee}}</b>
    </p>

    <p class="modal-mask" v-if="showLoose==true">
        <b> Looser CCT {{tournoiPerd.annee}}</b>
    </p>
</div>
</template>

<script>

import axios from'axios'

export default {
  name: 'TropheeComponent',
  data() {
      return {
          trophees:[],
          showDetail:false,
          showVictory:false,
          showLoose:false,
          tournoiGagne:{type:Object},
          tournoiPerd:{type: Object},
          selectedItem:{type:Object}
        }
    },
    props: {
        id:{
            type: Number
        }
    },
    computed: {
        joueurCharge() {
            return this.loadTrophees(this.id)
        },
        gagneCharge () {
            return this.loadTournoiGagne(this.id)
        },
        perdCharge () {
            return this.loadTournoiPerd(this.id)
        },
        isModalVisible () {
        return this.selectedItem !== null
      }       
    },
    methods: {
        loadTrophees(id) {
        axios.get('http://localhost:9090/Trophee/Joueur/'+id).then((response)=> {
        this.trophees=response.data
        },(response) => {console.log('erreur',response)
        })
        },
        loadTournoiGagne(id) {
        axios.get('http://localhost:9090/Joueur/TournoiGagne/'+id).then((response)=> {
        this.tournoiGagne=response.data
        if(response.data.annee!=null) {
            this.$parent.gagne=response.data
            console.log('reponse',response.data.annee)
        }
        },(response) => {console.log('erreur',response)
        })
        },
        loadTournoiPerd(id) {
        axios.get('http://localhost:9090/Joueur/TournoiPerd/'+id).then((response)=> {
        this.tournoiPerd=response.data
        if(response.data.annee!=null) {
            this.$parent.perd=response.data
            console.log('reponse',response.data.annee)
        }
        },(response) => {console.log('erreur',response)
        })
        },
        setShowDetail(id) {
            this.showVictory=false
            this.showLoose=false
            if(this.selectedItem==id){
                this.selectedItem=id
                this.showDetail=!this.showDetail
            } else {
                this.selectedItem=id
                this.showDetail=true
            }
        },
        setShowVictory() {
            this.showDetail=false
            this.showLoose=false
            this.showVictory = !this.showVictory
        },
        setShowLoose() {
            this.showDetail=false
            this.showVictory=false
            this.showLoose = !this.showLoose
        }         
    },
    
}
</script>

<style scoped>
#TropheeComponent{
    margin-bottom: auto;
    margin-top: auto;
}

#items{
    margin:8px;
}

#tropheeSpecial{
    font-size:23px;
}
</style>
