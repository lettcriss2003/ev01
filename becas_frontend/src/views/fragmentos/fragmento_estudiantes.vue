<template>
  <section class="container" style="margin-top: -1%">
    <v-container class="margin">
      <v-card>
        <v-card-title
          class="text-h5 text-center"
          style="font-family: 'Roboto' !important; color: #a40018; height: 100%"
        >
          <v-spacer></v-spacer>
          Lista De Estudiantes
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-title>
          <v-btn
            color="black"
            dark
            class="mb-4"
            @click="abrir_formulario_crear_estudiante()"
          >
            Registrar Estudiante
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table
          :headers="cabecera"
          :items="estudiantes"
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
                      @click="abrir_formulario_editar_estudiante(item)"
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
                      @click="eliminar_estudiante(item)"
                    >
                      <span class="hidden-sm-and-down" style="color: white"
                        >Eliminar</span
                      >
                      <v-icon left> mdi-delete </v-icon>
                    </v-btn>
                  </v-btn-toggle>
                </v-col>
              </v-row>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
    <v-dialog
      v-model="dialog_crear_editar_estudiante"
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
              <strong>!INFORMACIÓN ESTUDIANTE</strong>
            </h6>
            <br />
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <br />
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    append-icon="mdi-head-question-outline"
                    class="mx-4"
                    flat
                    label="Nombres"
                    v-model="nombres"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    append-icon="mdi-head-question-outline"
                    class="mx-4"
                    flat
                    label="Apellidos"
                    v-model="apellidos"
                  >
                  </v-text-field>
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
                        v-model="date"
                        label="Picker in menu"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title scrollable>
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
                <v-col cols="12" md="6">
                  <v-text-field
                    append-icon="mdi-head-question-outline"
                    class="mx-4"
                    flat
                    hide-details
                    label="Edad"
                    v-model="edad"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    append-icon="mdi-head-question-outline"
                    class="mx-4"
                    flat
                    label="Telefono"
                    v-model="telefono"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    append-icon="mdi-head-question-outline"
                    class="mx-4"
                    flat
                    label="Email"
                    v-model="email"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    append-icon="mdi-head-question-outline"
                    class="mx-4"
                    flat
                    label="Direccion"
                    v-model="direccion"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    append-icon="mdi-head-question-outline"
                    class="mx-4"
                    flat
                    label="Usuario"
                    v-model="usuario"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    append-icon="mdi-head-question-outline"
                    class="mx-4"
                    flat
                    hide-details
                    label="Contraseña"
                    v-model="clave"
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
              @click="dialog_crear_editar_estudiante = false"
              >Cancelar</v-btn
            >
            <v-btn color="black" text @click="crear_editar_estudiante()"
              >Guardar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </section>
</template>
<script>
import controlador_estudiante from "../../controladores/controlador_estudiante.js";
export default {
  data() {
    return {
      expanded: [],
      dialog_crear_editar_estudiante: false,
      cabecera: [
        { text: "Nombres", sortable: false, value: "ficha.nombres" },
        { text: "Apellidos", sortable: false, value: "ficha.apellidos" },
        {
          text: "Fecha Nacimiento",
          sortable: false,
          value: "ficha.fecha_nacimiento",
        },
        { text: "Edad", sortable: false, value: "ficha.edad" },
        { text: "Telefono", sortable: false, value: "ficha.telefono" },
        { text: "Email", sortable: false, value: "ficha.email" },
        { text: "Direccion", sortable: false, value: "ficha.direccion" },
        { text: "Usuario", sortable: false, value: "credenciales.usuario" },
        { text: "Clave", sortable: false, value: "credenciales.clave" },
        { text: "", value: "data-table-expand" },
      ],
      estudiantes: [],
      dialog: false,
      usuario: "",
      clave: "",
      nombres: "",
      apellidos: "",
      edad: "",
      email: "",
      telefono: "",
      direccion: "",
      id_estudiante: "",
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
    };
  },
  methods: {
    crear_editar_estudiante() {
      try {
        var element = {
          usuario: this.usuario,
          clave: this.clave,
          nombres: this.nombres,
          apellidos: this.apellidos,
          fecha_nacimiento: this.fecha_nacimiento,
          edad: this.edad,
          email: this.email,
          telefono: this.telefono,
          direccion: this.direccion,
        };
        if (
          this.id_estudiante != undefined &&
          this.id_estudiante.trim() != ""
        ) {
          element._id = this.id_estudiante;
        }

        controlador_estudiante.crear_editar_estudiante(
          element,
          async (response) => {
            // if (response.tipo == "success") {
            this.listar_estudiantes();
            this.dialog_crear_editar_estudiante = false;
            //}
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
    eliminar_estudiante(estudiante) {
      try {
        var data = {
          _id: estudiante._id,
        };
        controlador_estudiante.eliminar_estudiante(data, async (response) => {
          console.log(response);
          // if (response.tipo == "success") {
          this.listar_estudiantes();
          console.log(this.estudiantes);
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
          console.log(response);
          // if (response.tipo == "success") {
          this.estudiantes = await response;
          console.log(this.estudiantes);
          //}
        });
      } catch (error) {
        console.log(error);
      }
    },
    abrir_formulario_crear_estudiante() {
      this.dialog_crear_editar_estudiante = true;
      this.id_estudiante = "";
      this.nombres = "";
      this.apellidos = "";
      this.edad = "";
      this.email = "";
      this.telefono = "";
      this.direccion = "";
    },
    abrir_formulario_editar_estudiante(estudiante) {
      this.dialog_crear_editar_estudiante = true;
      this.id_estudiante = estudiante._id;
      this.nombres = estudiante.ficha.nombres;
      this.apellidos = estudiante.ficha.apellidos;
      this.date = estudiante.ficha.fecha_nacimiento;
      this.edad = estudiante.ficha.edad;
      this.email = estudiante.ficha.email;
      this.telefono = estudiante.ficha.telefono;
      this.direccion = estudiante.ficha.direccion;
      this.usuario = estudiante.credenciales.usuario;
      this.clave = estudiante.credenciales.clave;
    },
  },
  mounted() {
    this.listar_estudiantes();
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
