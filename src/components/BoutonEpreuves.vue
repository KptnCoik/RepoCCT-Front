<template>
    <div id="buttonEpreuves">
        <div id="bouton" v-for="item in epreuves" :key="item.id">
            <button v-if="item.id == isEpreuveSelected" @click="setEpreuveSelected(item)"
            class="circular mini ui button" >{{item.nom}}</button>
            <button v-else @click="setEpreuveSelected(item)"
            class="circular mini ui button" id="boutonEpreuve">{{item.nom}}</button>
        </div>
        <div>
            <button @click="setShowClassement()" class="circular mini ui button"
             id="ClassementGeneral">Classement Général</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:"buttonEpreuves",
    data() {
        return {
            epreuves:[],
            epreuveSelected:{type:Object}
            }
    },
    props : {
        tournoi:{
            type: Object
        }
    },
    computed : {
        isEpreuveSelected() {
            if (this.epreuveSelected != null){
                return this.epreuveSelected.id
            } else return null
        }
    },
    methods : {
        loadEpreuves(epreuve) {
        axios.get('http://cctprod-env.eba-qnvihvzw.us-east-2.elasticbeanstalk.com/Tournoi/Epreuves/'+epreuve).then((response)=> {
        this.epreuves=response.data
        },(response) => {console.log('erreur',response)
        })
        }, 
        setEpreuveSelected(id) {
            if (this.epreuveSelected == null){
            this.epreuveSelected = id 
            this.$parent.epreuveSelected = id 
            this.$parent.showClassement = false
            }
            else if(id.id == this.epreuveSelected.id){
                this.epreuveSelected = null
                this.$parent.epreuveSelected = null
                this.$parent.showClassement = false
            } else {
            this.epreuveSelected = id 
            this.$parent.epreuveSelected = id 
            this.$parent.showClassement = false
            }
            
        },
        setShowClassement() {
            this.epreuveSelected = null
            this.$parent.epreuveSelected = null
            this.$parent.showClassement = !this.$parent.showClassement
        }
    },
    mounted() {
        this.loadEpreuves(this.tournoi.id)
    },
    watch : {
        tournoi() {
            this.loadEpreuves(this.tournoi.id)
            this.epreuveSelected = null
        }
    }  
}
</script>

<style scoped>
#buttonEpreuves {
    margin-top : 20px;
}
#bouton {
    display:inline-table;
    padding:4px;   
}
#boutonEpreuve { 
background-color:rgb(10, 99, 182);
color: azure;
}
#ClassementGeneral {
background-color:rgb(16, 189, 88);
margin-top: 15px;
color:azure;
}
</style>