<template>
    <div id="ClassementEpreuveEquipe">
    <table class="ui unstackable basic table">
        <thead>
            <tr>
                <th>Participant</th>
                <th>Points</th>
                <th>Position</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in classement" :key="item.id">
            <td>
                <h4 class="ui image header">
                <div v-if="item.id == userId" class="content" id="user">
                    {{item.username}} 
                </div>
                <div v-else class="content">
                    {{item.username}}
                </div>
                <div v-if="bonus[index]==true" class="sub header">
                    Bonus
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
    name:"ClassementEpreuveEquipe",
    data() {
        return {
            classement: [],
            points:[],
            position:[],
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
        axios.get('http://cctprod-env.eba-qnvihvzw.us-east-2.elasticbeanstalk.com/Epreuve/Classement/'+epreuve).then((response)=> {
        this.classement=response.data
        },(response) => {console.log('erreur',response)
        })
        }, loadPoints(epreuve) {
        axios.get('http://cctprod-env.eba-qnvihvzw.us-east-2.elasticbeanstalk.com/Epreuve/ListPointsEquipe/'+ epreuve).then((response)=> 
            {   this.points = response.data
            },(response) => {console.log('erreurTournois',response)
            })
      },loadPosition(epreuve) {
        axios.get('http://cctprod-env.eba-qnvihvzw.us-east-2.elasticbeanstalk.com/Epreuve/ListPositionEpreuveEquipe/'+ epreuve).then((response)=> 
            {   this.position = response.data
            },(response) => {console.log('erreurTournois',response)
            })
      }, loadBonus(epreuve) {
        axios.get('http://cctprod-env.eba-qnvihvzw.us-east-2.elasticbeanstalk.com/Epreuve/ListBonusEpreuve/'+ epreuve).then((response)=> 
            {   this.bonus = response.data
            },(response) => {console.log('erreur bonus',response)
            })
      }
    },
    mounted() {
        this.loadClassement(this.epreuve.id)
        this.loadPoints(this.epreuve.id)
        this.loadPosition(this.epreuve.id)
        this.loadBonus(this.epreuve.id)
        this.userId = this.$localStorage.get('idUser')
    },
    watch : {
        epreuve() {
            this.loadClassement(this.epreuve.id)
            this.loadPoints(this.epreuve.id)
            this.loadPosition(this.epreuve.id)
            this.loadBonus(this.epreuve.id)

        }
    }  
}
</script>

<style scoped>
#ClassementEpreuveEquipe {
        display: inline-block;
    margin-top : 30px;
    margin-bottom : 70px;
}
#user {
background-color: lightgrey;
  color: blue;
}
</style>