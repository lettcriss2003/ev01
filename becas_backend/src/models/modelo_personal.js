const { Schema, model } = require("mongoose");

const personalSchema = new Schema({
    nombre_apellido: { type: String },
    rol: { type: String},
    credenciales:{
        usuario: { type: String },
        clave: { type: String },
    }
},
  {
    timestamps: true,
    versionKey: false,
  });

module.exports = model("modelo_personal",personalSchema);