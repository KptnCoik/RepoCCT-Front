import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueLocalStorage from 'vue-localstorage'
import LoginComponent from './components/LoginComponent'
import MonProfil from './components/MonProfil'
import Joueur from './components/Joueur'
import Liste from './components/Liste'

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
      path: "/Liste",
      name: "Liste",
      component: Liste
  },
    {
      path: "/Joueur/:id",
      name: "Joueur",
      component: Joueur
  }
  ]
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
