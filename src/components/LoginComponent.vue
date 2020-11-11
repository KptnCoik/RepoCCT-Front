<template>
  <div id="login">
      <img alt="Vue logo" src="../assets/Logo-VueCCT.png">
     <div class="ui form" id="inputConnexion">
            <div class="field">
            <!-- <label>Username</label> -->
            <div class="ui left icon input">
                <input type="text" name="username" v-model="input.username" v-on:keyup.enter="login()" placeholder="Username" />
                <i class="user icon"></i>
            </div>
            </div>
            <div class="field">
            <!-- <label>Password</label> -->
            <div class="ui left icon input">
                <input type="password" name="password" v-model="input.password" v-on:keyup.enter="login()" placeholder="Password" />
                <i class="lock icon"></i>
            </div>
            </div>
            <button class="ui primary button"  v-on:click="login()">Login</button>
        </div>
        <div v-if="this.refus==true" class="ui negative message" id="inputConnexion">
            <div class="header">
                Acces refusé
            </div>
        </div>
        <div v-else-if="this.accept==true" class="ui success message" id="inputConnexion">
            <div class="header">
                Acces OK
            </div>
        </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'login',
  data() {
      return {
        input: {
            username: "",
            password: "",
            },
        refus:false,
        accept:false
        }
    },
    methods: {
        login() {
            if(this.input.username != "" && this.input.password != "") {
                axios.get('http://cctprod-env.eba-qnvihvzw.us-east-2.elasticbeanstalk.com/Joueur/SignInS/'+ this.input.username+'/'+ this.input.password).then((response)=> {
                    this.$localStorage.set('user', JSON.stringify(response.data))
                    this.$localStorage.set('idUser', JSON.stringify(response.data.id))
                    this.refus=false
                    this.accept=true
                    setTimeout(() => {
                        this.$router.replace({ name: "MonProfil" });
                        this.$emit("authenticated", true);
                    }, 1300);
                },(response) => {
                    console.log('erreur',response)
                    this.refus=true
                })
            } else {
                console.log("A username and password must be present");
                this.refus=true
            }
        }
    }
}
</script>

<style scoped>
#login {

}
#inputConnexion {
    width: 50%;
    margin-left:auto;
    margin-right:auto;
}
</style>
