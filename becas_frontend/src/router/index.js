import Vue from 'vue'
import VueRouter from 'vue-router'
import InicioView from '../views/app_inicio_sesion.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: InicioView
  },
  {
    path: "/app",
    name: "App",
    component: () => import("../views/app_principal.vue"),
    children: [
      {
        path: "/app/inicio",
        name: "Solicitudes",
        props: true,
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import(
             "../views/fragmentos/fragmento_solicitudes.vue"
          ),
      },
      {
        path: "/app/estudiantes",
        name: "Estudiantes",
        props: true,
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/fragmentos/fragmento_estudiantes.vue"
          ),
      },
      {
        path: "/app/solicitud/informacion/:menu/:id_solicitud",
        name: "Solicitud Informacion",
        props: true,
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/fragmentos/fragmento_informacion_beca.vue"
          ),
      },{
        path: "/app/estudiante",
        name: "Estudiante",
        props: true,
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/fragmentos/fragmento_inicio_estudiante.vue"
          ),
      },{
        path: "/app/estudiante/solicitud",
        name: "Mi Solicitud",
        props: true,
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/fragmentos/fragmento_mi_solicitud.vue"
          ),
      }
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
