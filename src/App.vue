<template>
  <div id="app" class="container">
<!--             <img class="ui tiny image" src="./assets/Logo-VueCCT.png">
 -->
 <div class="barremenu">
      <div class="ui four item compact menu fixed-bottom" v-if="authenticated">
        <router-link to="/MonProfil">
          <a class="nav-link">
            <i class="user icon"></i> Profil
          </a>
        </router-link>
        <router-link to="/ListeJoueur">
          <a class="nav-link">
            <i class="fas fa-users"></i> Joueurs
          </a>
        </router-link>
        <router-link to="/ListeTournoi">
          <a class="nav-link">
            <i class="fas fa-swords"></i> Classement
          </a>
        </router-link>
        <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>
          <a class="nav-link" >
            <i class="sign out alternate icon"></i>Deconnexion</a>
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
      authenticated: false
    }
  },
  methods : {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    logout() {
      this.authenticated = false;
      localStorage.clear()
    }
  }
}
</script>

<style>
body {
  background-color: #39CCCC;
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

</style>
