<template>
    <div id="ResultatEpreuve" class="container">
        <div id="titre">
            <h3>{{epreuve.nom}}</h3>
        </div>
        <div id="detail">
            <b>
            <p>Position : {{position}}</p>
            <p>Points : {{points}}</p>
            <div v-if="epreuve.id==leBonus.id">
                <i class="far fa-thumbs-up" id="bonusMalus">Bonus</i>
            </div>
            <div v-else-if="epreuve.id==leMalus.id">
                <i class="far fa-thumbs-down" id="bonusMalus">Malus</i>
            </div>
            </b>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'ResultatEpreuve',
  data() {
      return {
          points:{type:Number},
          position:{type:Number}
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
        },
        leMalus: {
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
            axios.get('http://localhost:9090/Joueur/PositionEpreuveIndividuel/'+this.idJoueur+'/'+ id).then((response)=> 
                {   this.position = response.data
                },(response) => {console.log('erreur position',response)
                })
        }
    },
    mounted() {
        this.loadPoints(this.epreuve.id)
        this.loadPosition(this.epreuve.id)
    },
    watch : {
        epreuve(){
            this.loadPoints(this.epreuve.id)
            this.loadPosition(this.epreuve.id)
        }
    }
}
</script>

<style scoped>
#detail {
    margin-top:23px;
}
#bonusMalus {
    font-size:22px;
}
</style>
