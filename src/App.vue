<template>
  <div id="app" class="container">
<!--             <img class="ui tiny image" src="./assets/Logo-VueCCT.png">
 -->
 <div class="barremenu">
      <div class="ui item compact menu fixed-bottom" v-if="authenticated" id="menuBar">
        <router-link to="/MonProfil">
          <a class="nav-link" @click="setUserActive()">
            <i v-if="isUserActive==false" class="fas fa-user"></i>
            <i v-if="isUserActive==true" class="far fa-user"></i>
            Profil
          </a>
        </router-link>
        <router-link to="/ListeJoueur">
          <a class="nav-link" @click="setUsersActive()">
            <i v-if="isUsersActive==false" class="fas fa-users"></i>
            <i v-if="isUsersActive==true" class="far fa-users"></i> 
            Joueurs
          </a>
        </router-link>
        <router-link to="/ListeTournoi">
          <a class="nav-link" @click="setClassementActive()">
            <i v-if="isClassementActive==false" class="fas fa-swords"></i>
            <i v-if="isClassementActive==true" class="far fa-swords"></i> 
            Tournois
          </a>
        </router-link>
        <router-link to="/Options">
          <a class="nav-link" @click="setOptionsActive()">
            <i v-if="isOptionsActive==false" class="fas fa-users-cog"></i>
            <i v-if="isOptionsActive==true" class="far fa-users-cog"></i>
            Options
          </a>
        </router-link>
        <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>
          <a class="nav-link" @click="resetActive()">
            <i class="sign out alternate icon"></i>Sortie</a>
        </router-link>
      </div>
    </div>
    <router-view @authenticated="setAuthenticated"/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      authenticated: false,
      isUserActive : true,
      isUsersActive : false,
      isClassementActive: false,
      isOptionsActive: false
    }
  },
  methods : {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    logout() {
      this.authenticated = false;
      localStorage.clear()
    },
    setUserActive() {
      this.isUsersActive = false;
      this.isClassementActive = false;
      this.isUserActive = true;
      this.isOptionsActive = false;
    },
    setUsersActive() {
      this.isUsersActive = true;
      this.isClassementActive = false;
      this.isUserActive = false;
      this.isOptionsActive = false;
    },
    setClassementActive() {
      this.isUsersActive = false;
      this.isClassementActive = true;
      this.isUserActive = false;
      this.isOptionsActive = false;
    },
    setOptionsActive() {
      this.isUsersActive = false;
      this.isClassementActive = false;
      this.isUserActive = false;
      this.isOptionsActive = true;
    },
    resetActive() {
      this.isUserActive = true;
      this.isUsersActive = false;
      this.isClassementActive = false;
      this.isOptionsActive = false;
    }
  }
}
</script>

<style>
body {
  background-color: #39CCCC;
  
  background-size: cover; 
  
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width:600px;
  margin-top:20px;
  margin-left:auto;
  margin-right:auto;
}

#menuBar {
  display:inline-flex;
}

</style>
