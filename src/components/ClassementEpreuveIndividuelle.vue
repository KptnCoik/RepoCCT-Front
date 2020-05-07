<template>
    <div id="ClassementEpreuveIndividuelle">
    <table class="ui unstackable basic table">
        <thead>
        </thead>
        <tbody>
            <tr v-for="(item,index) in classement" :key="item.id">
            <td>
                <h4 class="ui image header">
                <div v-if="item.id == userId" class="content" id="user">
                    {{item.nom}} 
                </div>
                <div v-else class="content">
                    {{item.nom}}
                </div>
                <div v-if="bonus[index]==true" class="sub header">
                    Bonus
                </div>
                <div v-if="malus[index]==true"  class="sub header">
                    Malus
                </div>
            </h4></td>
            <td>
                {{points[index]}}
            </td>
                    <td>
                {{position[index]}}
            </td>
            </tr>
        </tbody>
    </table>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:"ClassementEpreuveIndividuelle",
    data() {
        return {
            classement: [],
            points:[],
            position:[],
            malus:[],
            bonus:[],
            userId : {type:Number}
            }
    },
    props : {
        epreuve:{
            type: Object
        }
    },
    methods : {
        loadClassement(epreuve) {
        axios.get('http://localhost:9090/Epreuve/Classement/'+epreuve).then((response)=> {
        this.classement=response.data
        },(response) => {console.log('erreur',response)
        })
        }, loadPoints(epreuve) {
        axios.get('http://localhost:9090/Epreuve/ListPointsIndividuel/'+ epreuve).then((response)=> 
            {   this.points = response.data
            },(response) => {console.log('erreurTournois',response)
            })
      },loadPosition(epreuve) {
        axios.get('http://localhost:9090/Epreuve/ListPositionEpreuveIndividuelle/'+ epreuve).then((response)=> 
            {   this.position = response.data
            },(response) => {console.log('erreurTournois',response)
            })
      }, loadBonus(epreuve) {
        axios.get('http://localhost:9090/Epreuve/ListBonusEpreuve/'+ epreuve).then((response)=> 
            {   this.bonus = response.data
            },(response) => {console.log('erreur bonus',response)
            })
      }, loadMalus(epreuve) {
        axios.get('http://localhost:9090/Epreuve/ListMalusEpreuve/'+ epreuve).then((response)=> 
            {   this.malus = response.data
            },(response) => {console.log('erreur malus',response)
            })
      } 
    },
    mounted() {
        this.loadClassement(this.epreuve.id)
        this.loadPoints(this.epreuve.id)
        this.loadPosition(this.epreuve.id)
        this.loadBonus(this.epreuve.id)
        this.loadMalus(this.epreuve.id)
        this.userId = this.$localStorage.get('idUser')
    },
    watch : {
        epreuve() {
            this.loadClassement(this.epreuve.id)
            this.loadPoints(this.epreuve.id)
            this.loadPosition(this.epreuve.id)
            this.loadBonus(this.epreuve.id)
            this.loadMalus(this.epreuve.id)
        }
    }  
}
</script>

<style scoped>
#ClassementEpreuveIndividuelle {
    margin-top : 30px;
    margin-bottom : 70px;
}
#user {
background-color: lightgrey;
  color: blue;
}
</style>