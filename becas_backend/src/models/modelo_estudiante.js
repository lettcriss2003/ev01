const { Schema, model } = require("mongoose");

const estudianteSchema = new Schema({
  rol: { type: String, default: "ESTUDIANTE" },
  credenciales: {
    usuario: { type: String },
    clave: { type: String },
  },
  ficha: {
    nombres: { type: String },
    apellidos: { type: String },
    fecha_nacimiento: { type: String },
    edad: { type: String },
    email: { type: String },
    telefono: { type: String },
    direccion: { type: String }
  }
},
  {
    timestamps: true,
    versionKey: false,
  });

module.exports = model("modelo_estudiante",estudianteSchema);
