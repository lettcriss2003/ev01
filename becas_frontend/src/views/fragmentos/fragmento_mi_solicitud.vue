<template>
  <section class="container" style="margin-top: -5%">
    <v-container class="margin">
      <v-card>
        <v-card-title class="title-table">
          INFORMACIÓN DE SOLICITUD
          <v-spacer></v-spacer>
        </v-card-title>
        <v-row>
          <v-col cols="12" md="12"> </v-col>
          <v-col cols="12" md="12">
            <v-container>
              <v-row>
                <v-col cols="12" md="4">
                  <v-spacer>
                    <span class="text-h7">Informacion Estudiante</span>
                  </v-spacer>
                  <strong>Fecha Solicitud : </strong>
                  <v-container>{{
                    solicitud ? solicitud.fecha : ""
                  }}</v-container>
                  <strong>Estudiante solicitante : </strong>
                  <v-container>
                    {{ solicitud ? solicitud.estudiante.ficha.nombres : "" }}
                    {{ solicitud ? solicitud.estudiante.ficha.apellidos : "" }}
                  </v-container>
                  <strong>Fecha Nacimiento: </strong>
                  <v-container>
                    {{
                      solicitud
                        ? solicitud.estudiante.ficha.fecha_nacimiento
                        : ""
                    }}
                  </v-container>

                  <strong>Edad : </strong>
                  <v-container>
                    {{ solicitud ? solicitud.estudiante.ficha.edad : "" }}
                  </v-container>

                  <strong>Email: </strong>
                  <v-container>
                    {{ solicitud ? solicitud.estudiante.ficha.email : "" }}
                  </v-container>

                  <strong>Telefono : </strong>
                  <v-container>
                    {{ solicitud ? solicitud.estudiante.ficha.telefono : "" }}
                  </v-container>

                  <strong>Dirección : </strong>
                  <v-container>
                    {{ solicitud ? solicitud.estudiante.ficha.direccion : "" }}
                  </v-container>
                </v-col>
                <v-col cols="12" md="4">
                  <v-spacer>
                    <span class="text-h7">Datos de la Beca</span>
                  </v-spacer>

                  <strong>Tipo de Beca : </strong>
                  <v-container
                    >{{ solicitud ? solicitud.beca.tipo : "" }}
                  </v-container>

                  <strong>Estado : </strong>
                  <v-container
                    >{{ solicitud ? solicitud.beca.estado : "" }}
                  </v-container>

                  <strong>Monto : </strong>
                  <v-container
                    >{{ solicitud ? solicitud.beca.monto : "" }}
                  </v-container>

                  <strong>Fecha Inicio : </strong>
                  <v-container
                    >{{ solicitud ? solicitud.beca.fecha_inicio : "" }}
                  </v-container>

                  <strong>Fecha Fin: </strong>
                  <v-container
                    >{{ solicitud ? solicitud.beca.fecha_fin : "" }}
                  </v-container>
                </v-col>
                <v-col cols="12" md="4">
                  <strong>Estado : </strong>
                  <v-container>
                    <v-chip
                      class="ma-2"
                      :color="
                        ticket
                          ? solicitud.estado == 'Registrada'
                            ? 'success'
                            : solicitud.estado == 'En Revisión'
                            ? 'primary'
                            : solicitud.estado == 'Finalizada'
                            ? 'error'
                            : ''
                          : ''
                      "
                      label
                      text-color="black"
                    >
                      {{ solicitud ? solicitud.estado : "" }}
                    </v-chip>
                  </v-container>
                </v-col>
                <v-col cols="12" md="4">
                  <v-btn-toggle borderless>
                    <v-btn
                      value="1"
                      color="red"
                      small
                      @click="eliminar_solicitud()"
                    >
                      <span class="hidden-sm-and-down" style="color: white"
                        >Cancelar</span
                      >
                      <v-icon left> mdi-delete </v-icon>
                    </v-btn>
                  </v-btn-toggle>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </section>
</template>

<script>
import api from "../../global/api";
import { validationMixin } from "vuelidate";
import controlador_solicitud from "../../controladores/controlador_solicitud.js";
import cookie from "@/global/cookie";
export default {
  name: "fragmento_mi_solicitud",
  mixins: [validationMixin],
  data: () => ({
    ticket: null,
    path: api.path,
    is_movil: false,
    solicitud: null,
  }),
  methods: {
    obtener_solicitud_estudiante() {
      try {
        var data = {
          id_estudiante: cookie.get_usuario_iniciado()._id,
        };
        controlador_solicitud.obtener_solicitud_estudiante(data,async (response) => {
          
            this.solicitud = await response.data

            console.log(this.solicitud);
          }
        );
      } catch (error) {
        console.log(error);
      }
    }, eliminar_solicitud() {
      try {
        var data = {
          _id: this.solicitud._id,
        };
        controlador_solicitud.eliminar_solicitud(data, async (response) => {
          console.log(response);
          // if (response.tipo == "success") {
          this.listar_solicitudes();
          //}
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.obtener_solicitud_estudiante();
  },
};
</script>
<style scoped>
.btn-dialog {
  position: absolute;
  z-index: 1;
  color: black;
}

.margin {
  margin-top: 5%;
}

.title-table {
  font-family: "Poppins-Bold" !important;
  color: #a40018;
  height: 100%;
}

.title-table {
  font-family: "Poppins-Bold" !important;
  color: #a40018;
  height: 100%;
}

.quitar_archivo {
  position: absolute;
  margin-left: 40px;
  margin-top: -10px;
  z-index: 1;
  color: black;
  cursor: pointer;
}
</style>
