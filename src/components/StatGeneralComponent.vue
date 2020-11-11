<template>
  <div id="StatGeneral">
    <!-- <table class="ui small definition table unstackable" id="montableau">
      <tbody>
        <tr>
          <td class="two wide column">Particiption</td>
          <td>{{participations}} / 5</td>
        </tr>  
      </tbody>
    </table> -->
    <h4 id="trophees" class="ui horizontal divider header">Trophees</h4>
    <Trophee :id="user.id"></Trophee>
  </div>
</template>

<script>

import axios from'axios'

import Trophee from './TropheeComponent'
export default {
  name: 'StatGeneral',
  components:{Trophee},
  data() {
      return {
          user:{type:Object},
          tournois:[],
          gagne:{type:Object}
        }
    },
    props: {
        id:{
            type: Number
        }
    },
    created() {
        this.loadJoueur(this.id)
        this.loadTournois(this.id)
    },
    methods: {
        loadJoueur(id) {
            axios.get('http://cctprod-env.eba-qnvihvzw.us-east-2.elasticbeanstalk.com/Joueur/'+id).then((response)=> {
            this.user=response.data
            },(response) => {console.log('erreur',response)
        })
        },
        loadTournois(id) {
        axios.get('http://cctprod-env.eba-qnvihvzw.us-east-2.elasticbeanstalk.com/Joueur/Tournois/'+id).then((response)=> {
        this.tournois=response.data
        },(response) => {console.log('erreur',response)
        })
    }
    },
    computed : {
      participations : function() {
        let cpt=0;
        for(const i in this.tournois){
          if(i != null) {
            cpt++
          }
        }
        return cpt
      }
    },
    watch : {
      gagne: function() {
        this.$parent.gagne= this.gagne
      }
    }
}
</script>

<style scoped>

#StatGeneral {
    width:55%;
  margin-bottom: auto;
}
#montableau {
margin:0;
height: 55%;
    
}
#trophees {
    margin-top:5px;
    margin-bottom: 5px;
}

</style>
