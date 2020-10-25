import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueLocalStorage from 'vue-localstorage'
import LoginComponent from './components/LoginComponent'
import MonProfil from './components/MonProfil'
import Joueur from './components/Joueur'
import ListeJoueur from './components/ListeJoueur.vue'
import ListeTournoi from './components/ListeTournoi.vue'
import Options from './components/Options.vue'

Vue.use(VueLocalStorage)

Vue.use(VueRouter)

const router =  new VueRouter({
  mode: 'history',
  routes: [
      {
          path: '/',
          redirect: {
              name: "login"
          }
      },
      {
          path: "/login",
          name: "login",
          component: LoginComponent
      },
      {
        path: "/MonProfil",
        name: "MonProfil",
        component: MonProfil
    },
    {
      path: "/ListeJoueur",
      name: "ListeJoueur",
      component: ListeJoueur
  },
    {
      path: "/Joueur/:id",
      name: "Joueur",
      component: Joueur
  },
  {
    path: "/ListeTournoi",
    name: "ListeTournoi",
    component: ListeTournoi
  },
  {
    path: "/Options",
    name: "Options",
    component: Options
  }
  ]
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
