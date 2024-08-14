const { Schema, model } = require("mongoose");

const becaSchema = new Schema({
    tipo: { type: String },
    estado: { type: String, default: "Solicitada" },
    monto: { type: String , default: "0"},
    fecha_inicio: { type: String, default: "Sin Definir"},
    fecha_fin: { type: String, default: "Sin Definir"},
    // Beca Bajos Recursos
    bajos_recursos: { 
      ingresos: { type: String },
      certificado_ingresos: { type: String },
    },
 // Beca Deportiva
    deportiva:{
      deporte: { type: String },
      certificado_deportivo: { type: String },
    },
    //Beca Academica
    academica:{
      record_academico: { type: String },
      promedio: { type: String },
    }
},
  {
    timestamps: true,
    versionKey: false,
  });


  module.exports = model("modelo_beca",becaSchema);
