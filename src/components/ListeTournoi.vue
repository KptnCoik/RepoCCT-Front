<template>
  <div id="ListeTournoi" class="container">
      <h2>Tous les CCT</h2>
      <BoutonTournoi v-bind:tournoi="tournois"></BoutonTournoi>
      <div id="resultat" class="container" v-if="tournoisSelected!=null && tournoisSelected.annee!=null">
        <BoutonEpreuves v-bind:tournoi="tournoisSelected"></BoutonEpreuves>
    </div>
    <div v-if="epreuveSelected != null && epreuveSelected.id != null && epreuveSelected.type == 'Individuel'">
        <ClassementEpreuveIndividuelle v-bind:epreuve="epreuveSelected">
        </ClassementEpreuveIndividuelle>
    </div>
  </div>
</template>

<script>
import axios from'axios'
import BoutonTournoi from './BoutonTournoi'
import BoutonEpreuves from './BoutonEpreuves'
import ClassementEpreuveIndividuelle from './ClassementEpreuveIndividuelle'

export default {
  name: 'ListeTournoi',
  components:{BoutonTournoi,BoutonEpreuves,ClassementEpreuveIndividuelle},
  data() {
      return {
          tournois:[],
          epreuves:[],
          tournoisSelected:{type:Object},
          epreuveSelected:{type:Object}
        }
    },
    methods: {
        loadTournois() {
            axios.get('http://localhost:9090/Tournoi').then((response)=> 
            {   this.tournois = response.data
            },(response) => {console.log('erreurTournois',response)
            })
        },
        loadEpreuves(id) {
            axios.get('http://localhost:9090/Tournoi/Epreuves/'+ id).then((response)=> 
            {   this.epreuves = response.data
            },(response) => {console.log('error',response)
            })
        }
    },
    mounted() {
        this.loadTournois()
    },
    watch : {
        tournoisSelected () {
            this.epreuveSelected = null
        }
    }
}
</script>

<style scoped>

</style>
