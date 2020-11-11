<template>
  <div id="Options" class="container">
    <h2>OPTIONS</h2>
    <br/>
    <div>
        <p>
          <button class="ui red button" @click="setChangePassword()">
          Changer le mot de passe <i class="fas fa-key"></i>
          </button>
        </p> 
        <div v-if="this.passwordUpdate==true" class="ui success message">
          Mot de Passe mis à jour
        </div>
        <div v-if="this.passwordWrong==true" class="ui alert message">
          Les mots de passe ne correspondent pas
        </div>
        <div v-if="this.changePassword==true" class="ui input">
          <input type="password" v-model="input.newPassword" placeholder="Nouveau mot de passe" />
          <br/>
        </div>
        <div v-if="this.changePassword==true" class="ui input">
          <input type="password" v-model="input.newPasswordConfirm" placeholder="Confirmez" />
          <br/>
        </div>
        <div v-if="this.changePassword==true">
          <p>
              <button class="ui primary button" @click="checkValidation()">Valider</button>
          </p>
        </div>
        <br/>   
        <p>
          <button class="ui green button" @click="setChangePhoto()">
              Changer la photo de profil <i class="fas fa-portrait"></i>
          </button>
        </p>  
        <div v-if="this.changePhoto==true">
            <input type="file" accept="image/*" @change="uploadImage($event)" id="file-input">
        </div>
        <div v-if="this.isUpdate==true" class="ui success message"> Photo update ! 
        </div>
        <div v-if="this.isErreur==true" class="ui alert message"> Photo non update ! 
        </div>
    </div>
  </div>
</template>
<script>

import axios from 'axios'

export default {
  name: 'Options',
  data() {
        return {
            changePhoto:false,
            changePassword:false,
            isUpdate:false,
            isErreur:false,
            passwordUpdate : false,
            passwordWrong : false,
            input: {
              actualPassword: "",
              newPassword: "",
              newPasswordConfirm: "",
            },
        }
    },

  methods: {

    uploadImage(event) {

      const URL = 'http://cctprod-env.eba-qnvihvzw.us-east-2.elasticbeanstalk.com/update/'+this.$localStorage.get('idUser'); 
      let data = new FormData();
      data.append('file',event.target.files[0]);
      let config = {
        header : {
          'Content-Type' : 'multipart/form-data'
        }
      }
      axios.post(
        URL, 
        data,
        config
      ).then(
        response => {
          console.log('image upload response > ', response)
          this.isUpdate=true,this.changePhoto=false
        }
      ).catch(err => {this.isErreur=true
        console.log(err);
      })
    },
    setChangePhoto() {
        this.changePhoto =!this.changePhoto;
        this.isUpdate = false;
        this.changePassword = false;
        this.passwordUpdate = false;
        this.passwordWrong=false;
    },
    setChangePassword() {
      this.changePassword = !this.changePassword;
      this.changePhoto = false;
      this.isUpdate = false;
      this.passwordUpdate = false;
      this.passwordWrong=false;
    },
    checkValidation() {
      if(this.input.newPassword !="" && this.input.newPasswordConfirm!="" 
      && this.input.newPasswordConfirm == this.input.newPassword){
        this.passwordUpdate = true;
        this.passwordWrong=false;
        this.uploadPassword();
      } else {
        this.passwordWrong=true;
      }
    },
      uploadPassword() {
        const URL = 'http://cctprod-env.eba-qnvihvzw.us-east-2.elasticbeanstalk.com/Joueur/UpdatePassword/'+this.$localStorage.get('idUser')+'/'+this.input.newPasswordConfirm; 
        let data = new FormData();
        axios.post(
          URL, 
          data
        ).then(
          response => {
            console.log('password update', response)
            this.changePassword=false;
            this.passwordUpdate=true;
          }
        ).catch(err => {this.isErreur=true
          console.log(err);
        })
      }
  }
}

</script>

<style scoped>

</style>
