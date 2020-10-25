<template>
  <div id="Options" class="container">
    <h2>OPTIONS</h2>
    <br/>
    <div>
        <p><button class="ui red button">Changer le mot de passe <i class="fas fa-key"></i></button></p> 
        <br/>
        <p><button class="ui orange button">Changer le pseudo <i class="fas fa-user-lock"></i></button></p>    
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
            isUpdate:false,
            isErreur:false,
        }
    },

methods: {

  uploadImage(event) {

    const URL = 'http://192.168.1.12:9090/update/'+this.$localStorage.get('idUser'); 

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
    // what now?
    console.log(err);
})
  },
  setChangePhoto() {
      this.changePhoto =!this.changePhoto;
      this.isUpdate = false;
  }
}
}
</script>

<style scoped>

</style>
