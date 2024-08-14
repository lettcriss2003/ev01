<template>
  <v-main>
    <v-layout row wrap>
      <template v-for="beca in becas">
        <v-flex xs4 pa-3>
          <v-card>
            <v-img :src="beca.imagen" height="300" :aspect-ratio="16 / 9">
            </v-img>
            <v-card-title>{{ beca.tipo }} </v-card-title>
            <v-card-text class="pt-4" style="position: relative">
              <v-btn v-if="solicitud.data === null"
                absolute
                color="green"
                class="white--text"
                medium
                right
                bottom
                @click="()=>{dialog_crear_editar_solicitud = true, tipo = beca.tipo }"
              >
                <v-icon>mdi-check-decagram</v-icon> Solicitar Beca
              </v-btn>
              <v-btn v-else
                absolute
                color="red"
                class="white--text"
                medium
                right
                bottom
              >
                <v-icon>mdi-check-decagram</v-icon> No Disponible
              </v-btn>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-dialog
          v-model="dialog_crear_editar_solicitud"
          persistent
          max-width="800px"
          transition="dialog-bottom-transition"
        >
          <v-form>
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
                  <strong>!INFORMACIÓN SOLICITUD !</strong>
                </h6>
                <br />
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-container>
                  <br />
                  <v-row>

                    <v-col v-if="tipo == 'Academica'" cols="12" md="6">
                      <v-text-field
                        append-icon="mdi-head-question-outline"
                        class="mx-4"
                        flat
                        label="Promedio"
                        v-model="promedio"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col v-if="tipo == 'Academica'" cols="12" md="6">
                      <v-text-field
                        append-icon="mdi-head-question-outline"
                        class="mx-4"
                        flat
                        label="Record Academico"
                        v-model="record_academico"
                      >
                      </v-text-field>
                    </v-col>

                    <v-col v-if="tipo == 'Bajos Recursos'" cols="12" md="6">
                      <v-text-field
                        append-icon="mdi-head-question-outline"
                        class="mx-4"
                        flat
                        label="Ingresos"
                        v-model="ingresos"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col v-if="tipo == 'Bajos Recursos'" cols="12" md="6">
                      <v-text-field
                        append-icon="mdi-head-question-outline"
                        class="mx-4"
                        flat
                        label="Cerificado de ingresos"
                        v-model="certificado_ingresos"
                      >
                      </v-text-field>
                    </v-col>

                    <v-col v-if="tipo == 'Deportiva'" cols="12" md="6">
                      <v-text-field
                        append-icon="mdi-head-question-outline"
                        class="mx-4"
                        flat
                        label="Deporte"
                        v-model="deporte"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col v-if="tipo == 'Deportiva'" cols="12" md="6">
                      <v-text-field
                        append-icon="mdi-head-question-outline"
                        class="mx-4"
                        flat
                        label="Certificado deportivo"
                        v-model="certificado_deportivo"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary_app"
                  text
                  @click="dialog_crear_editar_solicitud = false"
                  >Cancelar</v-btn
                >
                <v-btn color="black" text @click="()=>{crear_editar_solicitud(), obtener_solicitud_estudiante()}"
                  >Guardar</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </template>
    </v-layout>
  </v-main>
</template>
<script>
import controlador_solicitud from "../../controladores/controlador_solicitud.js";
import controlador_beca from "../../controladores/controlador_beca";
import moment from "moment";
import cookie  from "@/global/cookie";

export default {
  data() {
    return {
    
      usuario: cookie.get_usuario_iniciado(),
      becas: [
        { tipo: "Academica",
          imagen:"https://cdn.republica.gt/022023/1675360319367.webp?cw=698&ch=500&extw=jpg",
        },
        {
          tipo: "Bajos Recursos",
          imagen: "https://www.eltiempo.com/files/image_640_428/files/crop/uploads/2020/01/27/5e2f104e88756.r_1582081596526.198-1087-1497-1732.jpeg",
        },
        {
          tipo: "Deportiva",
          imagen:  "https://images.ctfassets.net/szez98lehkfm/5clJY4cm9cmVREejIvIc3R/1b4bbd357aa2b1f59b1d92ebabe4afed/MyIC_Article_112704?fm=webp",
        },
      ],
      expanded: [],
      dialog_crear_editar_solicitud: false,

      beca: "",
      estado_solicitud: "",
      tipo: "",

      ingresos: "",
      certificado_ingresos: "",

      deporte: "",
      certificado_deportivo: "",

      record_academico: "",
      promedio: "",

      id_beca: "",
      id_estudiante: "",
      solicitud: null,
    };
  },
  methods: {
    crear_editar_solicitud() {
        console.log(this.usuario)
      try {
        const fecha = new Date();
        var beca = {
          tipo: this.tipo,
          estado: this.estado_beca,
        };

        if (this.tipo == "Academica") {
          beca.promedio = this.promedio;
          beca.record_academico = this.record_academico;
        }
        if (this.tipo == "Bajos Recursos") {
          beca.ingresos = this.ingresos;
          beca.certificado_ingresos = this.certificado_ingresos;
        }
        if (this.tipo == "Deportiva") {
          beca.deporte = this.deporte;
          beca.certificado_deportivo = this.certificado_deportivo;
        }

        if (this.id_beca != undefined && this.id_beca.trim() != "") {
          beca._id = this.id_beca;
        }

        controlador_beca.crear_editar_beca(beca, async (response) => {
          this.beca = response._id;

          var element = {
            estudiante: this.usuario._id,
            beca: this.beca,
            estado: this.estado_beca,
            fecha: moment(fecha.toISOString()).format("LLL"),
          };

          if (
            this.id_solicitud != undefined &&
            this.id_solicitud.trim() != ""
          ) {
            element._id = this.id_solicitud;
          }

          controlador_solicitud.crear_editar_solicitud(
            element,
            async (response) => {
              // if (response.tipo == "success") {
              this.dialog_crear_editar_solicitud = false;
              //}
            }
          );
        });
      } catch (error) {
        console.log(error);
      }
    },
    eliminar_solicitud(solicitud) {
      try {
        var data = {
          _id: solicitud._id,
        };
        controlador_solicitud.eliminar_solicitud(data, async (response) => {
        });
      } catch (error) {
        console.log(error);
      }
    },
    obtener_solicitud_estudiante() {
      try {
        var data = {
          id_estudiante: cookie.get_usuario_iniciado()._id,
        };
        controlador_solicitud.obtener_solicitud_estudiante(data,async (response) => {          
            this.solicitud = await response
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
    abrir_formulario_crear_solicitud() {
      this.dialog_crear_editar_solicitud = true;
      this.estudiante = "";
      this.beca = "";
      this.fecha = "";
      this.estado_solicitud = "";
    },

  },
  mounted() {
    this.obtener_solicitud_estudiante();
    this.drawer = false;
  },
};
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
.v-card h3.display-1 {
  font-size: 24px !important;
}
</style>
