<template>
    <div id="ResultatEpreuveEquipe" class="container">
        <h3>{{epreuve.nom}}</h3>
        <div id="detail">
            <b>
                <p>Position : {{position}}</p>
                <p>Points : {{points}}</p>
                <div v-if="epreuve.id==leBonus.id">
                    <i class="far fa-thumbs-up" id="bonusMalus">Bonus</i>
                </div>
            </b>
            <div id="equipe">
                <h4>Equipe</h4>
                <div class="ui horizontal list" v-for="item in equipe" :key="item.id">
                    <div class="item" id="equipiers">
                        <img class="ui avatar image" 
                        src="../assets/boy.png">{{item.nom}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'ResultatEpreuveEquipe',
  data() {
      return {
          points:{type:Number},
          position:{type:Number},
          equipe:[]
         }
    },
    props: {
        epreuve: {
            type: Object
        },
        idJoueur: {
            type: Number
        },
        leBonus: {
            type:Object
        }
    },
    methods:{
        loadPoints(id) {
               axios.get('http://localhost:9090/Joueur/PointsEpreuve/'+this.idJoueur+'/'+id).then((response)=> 
            {   this.points = response.data
            },(response) => {console.log('erreur points',response)
            })
        },
        loadPosition(id) {
            axios.get('http://localhost:9090/Joueur/PositionEpreuveEquipe/'+this.idJoueur+'/'+ id).then((response)=> 
                {   this.position = response.data
                },(response) => {console.log('erreur position',response)
                })
        },
        loadEquipe(id) {
            axios.get('http://localhost:9090/Joueur/EquipeEpreuve/'+this.idJoueur+'/'+ id).then((response)=> 
                {   this.equipe = response.data
                },(response) => {console.log('erreur bonus',response)
                })
        }
    },
    mounted() {
        this.loadPoints(this.epreuve.id)
        this.loadPosition(this.epreuve.id)
        this.loadEquipe(this.epreuve.id)
    },
    watch : {
        epreuve(){
            this.loadPoints(this.epreuve.id)
            this.loadPosition(this.epreuve.id)
            this.loadEquipe(this.epreuve.id)
        }
    }
}
</script>

<style scoped>
#ResultatEpreuveEquipe{
    margin-bottom:50px;
}
#detail {
    margin-top:23px;
}
#bonusMalus {
    font-size:22px;
}
#equipe{
    margin-top:30px;
}
#equipiers{
    margin:7px;
}
</style>
