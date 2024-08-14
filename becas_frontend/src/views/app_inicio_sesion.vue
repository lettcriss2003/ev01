<template>
  <v-app>
    <div class="w3layouts-main text-center">
      <v-row align="center" justify="center" id="bg-layer">
        <v-col cols="12" md="6" align-self="center">
          <v-container fluid>
            <v-card
              elevation="26"
              outlined
              shaped
              tile
              color=""
              style="color: #080707; max-width: 550px"
              class="header-main"
            >
              <v-toolbar
                width="100%"
                color="rgb(72, 73, 74)"
                class="text-center"
                height="100vh"
                style="border-bottom-right-radius: 100%"
              >
                <h1 class="titulo"><strong> Sistema de Becas </strong></h1>
              </v-toolbar>
              <v-row align="center" justify="center">
                <v-col cols="12" md="7" sm="7">
                  <v-container>
                    <div class="text-center" style="margin-top: 4vh">
                      <h1>Bienvenido,</h1>
                      Inicia sesión para continuar.
                    </div>
                    <br />
                    <form>
                      <v-text-field
                        append-icon="mdi-email"
                        v-model="email"
                        :error-messages="emailErrors"
                        label="Usuario/Correo"
                        required
                        color="blue"
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch()"
                      >
                      </v-text-field>
                      <br />
                      <v-text-field
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show ? 'text' : 'password'"
                        v-model="password"
                        :error-messages="passwordErrors"
                        label="Contraseña"
                        color="blue"
                        required
                        @click:append="show = !show"
                        @input="$v.password.$touch()"
                        @blur="$v.password.$touch()"
                      ></v-text-field>
                      <br />
                      <v-overlay :value="overlay" color="primary" fixed>
                        <v-progress-circular
                          :size="70"
                          :width="7"
                          color="black"
                          indeterminate
                        >
                        </v-progress-circular>
                      </v-overlay>
                      <v-row>
                        <v-col>
                          <v-btn
                            color="black"
                            x-large
                            @click.stop="iniciar_sesion_vista()"
                            rounded
                            width="100%"
                          >
                            <strong style="color: rgb(255, 255, 255)"
                              >Iniciar Sesión
                              <v-icon right> mdi-export </v-icon>
                            </strong>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </form>
                  </v-container>
                </v-col>
              </v-row>
              <v-footer color="transparent" dark>
                <v-col class="text-center" cols="12">
                  <p>
                    © {{ new Date().getFullYear() }}. Todos los derechos
                    reservados | Alex VJ
                  </p>
                </v-col>
              </v-footer>
            </v-card>
          </v-container>
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>

<script>
import controlador_personal from "../controladores/controlador_personal";
import controlador_estudiante from "../controladores/controlador_estudiante";
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import cookie from "../global/cookie";
export default {
  name: "app_inicio_sesion",
  mixins: [validationMixin],
  validations: {
    password: { required, minLength: minLength(4) },
    email: { required },
  },
  components: {},
  data: () => ({
    overlay: false,
    show: false,
    email: null,
    password: null,
  }),

  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength && errors.push("Minimo 4 caracteres.");
      !this.$v.password.required && errors.push("Contraseña es requerida.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push("Usuario o correo es requerido.");
      return errors;
    },
  },
  mounted() {
    var t = window.innerHeight;
    var elemento = document.getElementById("bg-layer");
    elemento.style.height = `${t + 12}px`;
  },
  methods: {
    async iniciar_sesion_vista() {
      var data = {
        usuario: this.email,
        clave: this.password,
      };

      this.$v.$touch();
      if (!this.$v.$invalid) {
        controlador_estudiante.iniciar_sesion(data, async (response) => {
          if (response.mensaje == "Success") {
            await cookie.set_usuario(response.data);
            this.$router.push({ name: "Estudiante" }).catch(() => {});
          } else if (response.mensaje !== "Success") {
            controlador_personal.iniciar_sesion_personal( data, async (response) => {
                if (response.mensaje == "Success") {
                  await cookie.set_usuario(response.data);
                  this.$router.push({ name: "Solicitudes" }).catch(() => {});
                } else {
                  this.$toast.open({
                    message: response.mensaje,
                    type: response.tipo,
                    duration: 5000,
                    position: "top-right",
                    pauseOnHover: true,
                  });
                }
              }
            );
          }else{
            this.$toast.open({
              message: response.mensaje,
              type: response.tipo,
              duration: 5000,
              position: "top-right",
              pauseOnHover: true,
            });
          }
        });
      }
    },
  },
};
</script>
<style scoped>
.b-img {
  width: 100%;
  min-height: 50px;
  max-height: 300px;
}

.titulo {
  color: #fff;
}

.w3layouts-main {
  background-repeat: repeat-x;
  /*animation: slideleft 20000s infinite linear;
    -webkit-animation: slideleft 20000s infinite linear;*/
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-attachment: fixed;
  position: relative;
  height: 100vh;
  min-width: 350px;
}

#bg-layer {
  background: rgba(0, 0, 0, 0.7);

  min-width: 350px;
}

/*-- //slide --*/
/*--header start here--*/
.w3ls-header {
  padding: 0em 0 0;
}

.text-input {
  color: #000000;
}

.header-main {
  /*max-width: 50vh;
    min-width: 335px;
    margin-top: 2vh;
    margin-bottom: 2vh;*/
  position: relative;
  background: #a40018;
  -webkit-box-shadow: -1px 4px 28px 0px rgba(247, 243, 243, 0.75);
  -moz-box-shadow: -1px 4px 28px 0px rgba(247, 243, 243, 0.75);
  box-shadow: -1px 4px 28px 0px rgba(247, 243, 243, 0.75);
}

.p-contenido-funcion {
  font-family: "Poppins-Regular" !important;
  font-size: 1.2em;
  margin-top: 2%;
  color: #000000;
}
</style>
