<template>
  <section class="container" style="margin-top: -1%">
    <v-container class="margin">
      <v-card>
        <v-card-title
          class="text-h5 text-center"
          style="font-family: 'Roboto' !important; color: #a40018; height: 100%"
        >
          <v-spacer></v-spacer>
          Lista De Solicitudes
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-title>
          <v-btn
            color="black"
            dark
            class="mb-4"
            @click="abrir_formulario_crear_solicitud()"
          >
            Registrar Solicitud
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table
          :headers="cabecera"
          :items="solicitudes"
          :single-expand="true"
          :expanded.sync="expanded"
          item-key="_id"
          show-expand
        >
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <v-row>
                <v-col cols="6" md="2">
                  <v-btn-toggle borderless>
                    <v-btn
                      value="1"
                      small
                      @click="abrir_formulario_editar_solicitud(item)"
                      color="green"
                    >
                      <span class="hidden-sm-and-down" style="color: white"
                        >Actualizar</span
                      >
                      <v-icon right> mdi-pencil </v-icon>
                    </v-btn>
                  </v-btn-toggle>
                </v-col>
                <v-col cols="6" md="2">
                  <v-btn-toggle borderless>
                    <v-btn
                      value="1"
                      color="red"
                      small
                      @click="eliminar_solicitud(item)"
                    >
                      <span class="hidden-sm-and-down" style="color: white"
                        >Eliminar</span
                      >
                      <v-icon left> mdi-delete </v-icon>
                    </v-btn>
                  </v-btn-toggle>
                </v-col>

                <v-col>
                  <v-btn-toogle borderless>
                    <v-btn
                      value="1"
                      small
                      :to="{
                        name: 'Solicitud Informacion',
                        params: { menu: 1, id_solicitud: item._id },
                      }"
                    >
                      <span class="hidden-sm-and-down">Ver información</span>
                      <v-icon right> mdi-clipboard-arrow-right </v-icon>
                    </v-btn>
                  </v-btn-toogle>
                </v-col>
              </v-row>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
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
                <v-col cols="12" md="6">
                  <v-select
                    v-model="estudiante"
                    class="mx-4"
                    :items="estudiantes"
                    label="Estudiante"
                    item-text="ficha.nombres"
                    item-value="_id"
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="tipo"
                    class="mx-4"
                    :items="becas"
                    label="Beca"
                    item-text="tipo"
                    item-value="_id"
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="estado_solicitud"
                    class="mx-4"
                    :items="estados"
                    label="Estado Solicitud"
                    item-text="nombre"
                    item-value="nombre"
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    append-icon="mdi-head-question-outline"
                    class="mx-4"
                    flat
                    label="Monto"
                    v-model="monto"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="estado_beca"
                    class="mx-4"
                    :items="estados_beca"
                    label="Estado Beca"
                    item-text="nombre"
                    item-value="nombre"
                  >
                  </v-select>
                </v-col>
                <v-col >
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="fecha_inicio"
                        prepend-icon="mdi-calendar"
                        readonly
                        label="Fecha Inicio"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="fecha_inicio" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>

                <v-col >
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="fecha_fin"
                        label="Fecha Fin"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="fecha_fin" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>

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
                  <v-file-input
                    prepend-icon="mdi-file"
                    class="mx-4"
                    label="Record Academico"
                    v-model="file"
                  >
                  </v-file-input>
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
                  <v-file-input
                    prepend-icon="mdi-file"
                    class="mx-4"
                    label="Certificado Ingresos"
                    v-model="file"
                  >
                  </v-file-input>
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
                  <v-file-input
                    prepend-icon="mdi-file"
                    class="mx-4"
                    label="Certificado Deportivo"
                    v-model="file"
                  >
                  </v-file-input>
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
            <v-btn color="black" text @click="crear_editar_solicitud()"
              >Guardar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </section>
</template>
<script>
import controlador_solicitud from "../../controladores/controlador_solicitud.js";
import controlador_estudiante from "../../controladores/controlador_estudiante";
import moment from "moment";
import controlador_beca from "../../controladores/controlador_beca";
export default {
  data() {
    return {
      expanded: [],
      dialog_crear_editar_solicitud: false,
      cabecera: [
        {
          text: "Estudiante",
          sortable: false,
          value: "estudiante.ficha.nombres",
        },
        { text: "Fecha Solicitud", sortable: false, value: 'fecha' },
        { text: "Tipo Beca", sortable: false, value: "beca.tipo" },
        { text: "Estado", sortable: false, value: "estado" },
      ],
      solicitudes: [],
      estados:[{nombre:"Registrada"},{nombre:"En Revision"},{nombre:"Terminada"}],

      beca: "",
      becas: [
        {tipo:"Deportiva"},
        {tipo:"Academica"},
        {tipo:"Bajos Recursos"},],

      estados_beca:[{nombre:"Activa"},{nombre:"Inactiva"},{nombre:"Aceptada"},{nombre:"Rechazada"},{nombre:"Suspendida"},{nombre:"Solicitada"}],

      estudiantes: [],
      estudiante: "",
      dialog: false,
      estado_solicitud: "",
      id_solicitud: "",

      tipo:"",
      estado_beca:"",
      monto:"",
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      fecha_inicio:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      fecha_fin:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      ingresos:"",
      certificado_ingresos:"",
      deporte:"",
      certificado_deportivo:"",
      record_academico:"",
      promedio:"",

      id_beca:"",
      id_estudiante:"",
      menu: false,
      file:""
    };
  },
  methods: {
    crear_editar_solicitud() {
      try {

        let ruta;
        const fecha = new Date()
        const formData = new FormData();
        formData.append('file', this.file);

        var beca ={
          tipo:this.tipo,
          estado:this.estado_beca,
          monto:this.monto,
          fecha_inicio:this.fecha_inicio,
          fecha_fin:this.fecha_fin,
        }
        
        controlador_beca.subir_archivo(formData, async (response) => {
          ruta = response.path
         });


         if(this.tipo == "Academica"){
            beca.promedio = this.promedio
            beca.record_academico = ruta
          }
          if(this.tipo == "Bajos Recursos"){
            beca.ingresos = this.ingresos
            beca.certificado_ingresos = rita
          }
          if(this.tipo == "Deportiva"){
            beca.deporte = this.deporte
            beca.certificado_deportivo = ruta
          }

          if (this.id_beca!= undefined && this.id_beca.trim() != "") {
          beca._id = this.id_beca;
          }
        
        console.log("Beca", beca)
        controlador_beca.crear_editar_beca(beca, async (response) => {
          this.beca = response._id;
         
        var element = {
          estudiante: this.estudiante,
          beca: this.beca,
          estado: this.estado_solicitud,
          fecha: moment(fecha.toISOString()).format('LLL'),
        };

        if (this.id_solicitud != undefined && this.id_solicitud.trim() != "") {
          element._id = this.id_solicitud;
        }


        controlador_solicitud.crear_editar_solicitud(element, async (response) => {
          // if (response.tipo == "success") {
          this.listar_solicitudes();
          this.dialog_crear_editar_solicitud= false;
          //}
        });
          
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
          console.log(response);
          // if (response.tipo == "success") {
          this.listar_solicitudes();
          //}
        });
      } catch (error) {
        console.log(error);
      }
    },
    listar_solicitudes() {
      this.solicitudes = [];
      try {
        var data = {};
        controlador_solicitud.listar_solicitudes(data, async (response) => {
          // if (response.tipo == "success") {
          this.solicitudes = await response;
          //}
        });
      } catch (error) {
        console.log(error);
      }
    },
    listar_estudiantes() {
      this.estudiantes = [];
      try {
        var data = {};
        controlador_estudiante.listar_estudiantes(data, async (response) => {
          // if (response.tipo == "success") {
          this.estudiantes = await response;
          //}
        });
      } catch (error) {
        console.log(error);
      }
    },
    abrir_formulario_crear_solicitud() {
      this.dialog_crear_editar_solicitud= true;
      this.estudiante = "";
      this.beca = "";
      this.fecha = "";
      this.estado_solicitud = "";
      this.listar_estudiantes();

    },
    abrir_formulario_editar_solicitud(solicitud) {

      this.dialog_crear_editar_solicitud = true;

      this.id_solicitud = solicitud._id;
      this.estado_solicitud = solicitud.estado;
      this.estudiante = solicitud.estudiante;
      this.id_estudiante = solicitud.estudiante._id;
      this.beca = solicitud.beca;

      this.estado_beca = solicitud.beca.estado;
      this.tipo = solicitud.beca.tipo;
      this.monto = solicitud.beca.monto;
      this.fecha_inicio = solicitud.beca.fecha_inicio != "Sin Definir" ?  solicitud.beca.fecha_inicio : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
      this.fecha_fin = solicitud.beca.fecha_fin != "Sin Definir" ? solicitud.beca.fecha_fin : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);

      if(solicitud.beca.tipo == "Academica"){
        this.promedio = solicitud.beca.academica.promedio;
        this.record_academico = solicitud.beca.academica.record_academico;
      }

      if(solicitud.beca.tipo == "Bajos Recursos"){
        this.ingresos = solicitud.beca.bajos_recursos.ingresos;
        this.certificado_ingresos = solicitud.beca.bajos_recursos.certificado_ingresos;
      }

      if(solicitud.beca.tipo == "Deportiva"){
        this.deporte = solicitud.beca.deportiva.deporte;
        this.certificado_deportivo = solicitud.beca.deportiva.certificado_deportivo;
      }

      this.id_beca = solicitud.beca._id;
      this.listar_estudiantes();

    },
  },
  mounted() {
    this.listar_solicitudes();
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
