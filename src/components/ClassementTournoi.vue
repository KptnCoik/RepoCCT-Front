<template>
    <div id="ClassementTournoi">
    <table class="ui unstackable basic table">
        <thead>
            <tr>
                <th>Participant</th>
                <th>Points</th>
                <th>Position</th>
            </tr>
        </thead>
        <tbody v-for="(item,index) in classement" :key="item.id">
            <tr v-if="index==0">
            <td>
                <h4 class="ui image header">
                <div v-if="item.id == userId" class="content" id="user">
                    {{item.username}} 
                </div>
                <div v-else class="content">
                    {{item.username}}
                </div>
            </h4></td>
            <td>
                {{points[index]}}
            </td>
                    <td>
                {{index+1}}
            </td>
            </tr>
            <tr v-else-if="points[index-1]==points[index]">
            <td>
                <h4 class="ui image header">
                <div v-if="item.id == userId" class="content" id="user">
                    {{item.username}} 
                </div>
                <div v-else class="content">
                    {{item.username}}
                </div>
            </h4></td>
            <td>
                {{points[index]}}
            </td>
                    <td>
                {{index}}
            </td>
            </tr>
            <tr v-else>
            <td>
                <h4 class="ui image header">
                <div v-if="item.id == userId" class="content" id="user">
                    {{item.username}} 
                </div>
                <div v-else class="content">
                    {{item.username}}
                </div>
            </h4></td>
            <td>
                {{points[index]}}
            </td>
                    <td>
                {{index+1}}
            </td>
            </tr>
        </tbody>
    </table>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:"ClassementTournoi",
    data() {
        return {
            classement: [],
            points:[],
            userId : {type:Number}
            }
    },
    props : {
        tournoi:{
            type: Object
        }
    },
    methods : {
        loadClassement(tournoi) {
        axios.get('http://192.168.1.12:9090/Tournoi/Classement/'+tournoi).then((response)=> {
        this.classement=response.data
        },(response) => {console.log('erreur',response)
        })
        }, loadPoints(tournoi) {
        axios.get('http://192.168.1.12:9090/Tournoi/ListePoints/'+ tournoi).then((response)=> 
            {   this.points = response.data
            },(response) => {console.log('erreurTournois',response)
            })
      }
    },
    mounted() {
        this.loadClassement(this.tournoi.id)
        this.loadPoints(this.tournoi.id)
        this.userId = this.$localStorage.get('idUser')
    },
    watch : {
        epreuve() {
            this.loadClassement(this.tournoi.id)
            this.loadPoints(this.tournoi.id)
        }
    }  
}
</script>

<style scoped>
#ClassementTournoi {
    display:inline-block;
    margin-top : 30px;
    margin-bottom : 70px;
}
#user {
background-color: lightgrey;
  color: blue;
}
</style>