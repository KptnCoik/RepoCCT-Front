<template>
    <div id="buttonTournoi">
        <h3 v-if="showTitre">Tournois</h3>
        <div id="bouton" v-for="item in tournoi" :key="item.id">
        <button v-if="isTournoisSelected==item.id" @click="setTournoiSelected(item)"
        class="circular mini ui button" id="boutonAnnee">{{item.annee}}</button>
        <button v-else @click="setTournoiSelected(item)"
        class="circular mini ui button" >{{item.annee}}</button>
        </div>
    </div>
</template>

<script>
export default {
    name:"buttonTournoi",
    data() {
        return {
            tournois:[],
            tournoisSelected:{type:Object}
        }
    },
    props : {
        tournoi:{
            type: Array
        },
        showTitre:{
            type:Boolean
        }
    },
    computed : {
        particip () {
            return this.tournoi
        },
        isTournoisSelected() {
            return this.tournoisSelected.id
        }
    },
    methods : {
        setTournoiSelected(id) {
            if(this.tournoisSelected.id == id.id){
                this.tournoisSelected = 99
                this.$parent.tournoisSelected = null
            } else {
            this.tournoisSelected = id
            this.$parent.tournoisSelected = id 
            this.$parent.showEpreuvesClassement = true           
            }
        }
    },
    watch : {
        isTournoisSelected() {
            this.$parent.loadEpreuves(this.isTournoisSelected)
        }
    }
}
</script>

<style scoped>
#buttonTournoi {
    margin-left: auto;
    margin-right: auto;
}
#bouton{
    display:inline;
    padding:3px;
}

#boutonAnnee{
background-color:rgb(27, 145, 4);
}
</style>