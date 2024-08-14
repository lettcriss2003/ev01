<template>
  <v-app>
    <!-- Menu principal -->
    <v-navigation-drawer app v-model="drawer" color="primary_app">
      <template v-slot:prepend>
        <div>
          <v-card class="fondo-user-logo">
            <v-list three-line style="width: 100%">
              <v-list-item dark>
                <v-list-item-avatar size="80" color="white">
                </v-list-item-avatar>

                <v-list-item-content max-width="100">
                  <v-list-item-title>
                    {{
                      usuario.nombre_apellido
                        ? usuario.nombre_apellido
                        : usuario.ficha.nombres
                    }}</v-list-item-title
                  >
                  <v-list-item-subtitle style="color: white">{{
                    usuario.rol
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </div>
      </template>
      <v-divider color="#fff"></v-divider>

      <!-- Opciones -->
      <v-list>
        <v-list-item-group v-model="menu_seleccionado" dark>
          <v-list-item
            v-for="(item, i) in menu_permitido"
            :key="i"
            link
            :to="{ name: item.name }"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon" color="black"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="titulo_opciones">
                <strong v-text="item.text"></strong>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <template v-slot:append>
        <v-footer class="text-center" color="black">
          <v-btn
            tile
            color="primary_app"
            dark
            @click.stop="dialog_cerrar_sesion = true"
            width="100%"
            style="border-radius: 10px"
          >
            <v-icon left> mdi-logout-variant </v-icon>
            Cerrar Sesión
          </v-btn>
        </v-footer>
      </template>
    </v-navigation-drawer>

    <v-app-bar app color="black" dark elevate-on-scroll class="app_bar" fixed>
      <v-app-bar-nav-icon @click="drawer = !drawer">
        <v-icon>mdi-menu-open</v-icon>
      </v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      Gestion de Becas
      <v-spacer></v-spacer>
    </v-app-bar>

    <!-- contenido de fragmentos -->
    <v-main app>
      <router-view> </router-view>

      <v-dialog v-model="dialog_cerrar_sesion" persistent max-width="500px">
        <v-card>
          <v-toolbar
            width="100%"
            color="black"
            class="text-center"
            height="100vh"
            style="border-bottom-right-radius: 50%"
          >
            <v-avatar
              color="primary_app"
              size="80"
              style="margin-bottom: -9vh"
              fab
            >
              <v-icon x-large color="white"> mdi-alert-decagram</v-icon>
            </v-avatar>
            <br />
            <v-spacer></v-spacer>

            <h6 style="color: white">
              <strong>¿ESTAS APUNTO DE CERRAR SESIÓN?</strong>
            </h6>
            <br />

            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <center>
                <br /><br />

                <h4>
                  ¡Si deseas salir haz clic en <strong>Cerrar Sesión</strong> o
                  en <strong>Cancelar</strong> para continuar trabajando!
                </h4>
              </center>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="dialog_cerrar_sesion = false"
              >Cancelar</v-btn
            >
            <v-btn color="black" text @click="cerrar_sesion()"
              >Cerrar Sesión</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
    <div v-if="scY > 125">
      <v-btn
        class="btn-inicio"
        large
        fab
        @click="toTop()"
        title="¿Volver al inicio?"
      >
        <v-icon color="primary_app">mdi-arrow-up-bold</v-icon>
      </v-btn>
    </div>
  </v-app>
</template>
<script>
import cookie from "../global/cookie";
export default {
  name: "app_principal",
  data: () => ({
    id: "",
    usuario: cookie.get_usuario_iniciado(),
    dialog_cerrar_sesion: false,
    drawer: false,
    menu_seleccionado: [],
    lista_menu: [
      {
        n: 1,
        text: "Inicio",
        icon: "mdi-home",
        name: "Solicitudes",
        roles: ["ADMINISTRADOR"],
      },
      {
        n: 2,
        text: "Estudiantes",
        icon: "mdi-account-group",
        name: "Estudiantes",
        roles: ["ADMINISTRADOR"],
      },
      {
        n: 3,
        text: "Inicio",
        icon: "mdi-home",
        name: "Estudiante",
        roles: ["ESTUDIANTE"],
      },
      {
        n: 4,
        text: "Mi Solicitud",
        icon: "mdi-account-group",
        name: "Mi Solicitud",
        roles: ["ESTUDIANTE"],
      },
    ],
    menu_permitido: [],
    scTimer: 0,
    scY: 0,
  }),
  methods: {
    async perfil_iniciado() {
      try {
        this.usuario = await cookie.get_usuario_iniciado();
        var rol_iniciado = this.usuario.rol;
        this.lista_menu.forEach((item) => {
          const rol_existe = item.roles.find((rol) => rol_iniciado == rol);
          console.log(rol_existe);
          if (rol_existe) {
            const itemsOP = this.menu_permitido.indexOf(item);
            if (itemsOP == -1) {
              this.menu_permitido.push(item);
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    cerrar_sesion() {
      cookie.borrar_usuario();
      this.$router.push({ name: "Login" }).catch(() => {});
    },
    handleScroll() {
      if (this.scTimer) return;
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY;
        clearTimeout(this.scTimer);
        this.scTimer = 0;
      }, 100);
    },
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  mounted() {
    this.perfil_iniciado();
    window.addEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.titulo_opciones {
  color: black;
}
.btn-inicio {
  background: transparent;
  position: fixed;
  bottom: 15px;
  right: 15px;
  animation: rebote 0.5s alternate infinite ease-in;
}
.fondo-user-logo {
  background: linear-gradient(181deg, #000 37%, rgba(255, 3, 3, 0) 100%);
}

@keyframes rebote {
  0% {
    transform: translateY(-10%);
  }
}
</style>
