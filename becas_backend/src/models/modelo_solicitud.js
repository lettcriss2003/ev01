const { Schema, model } = require("mongoose");

const solicitudSchema = new Schema({
    fecha: { type: String },
    estado:{type:String, default:"Registrada"},
    estudiante: {
    type: Schema.ObjectId,
    ref: 'modelo_estudiante'},
    beca: {
    type: Schema.ObjectId,
    ref: 'modelo_beca',
    }
},
  {
    timestamps: true,
    versionKey: false,
  });

module.exports = model("modelo_solicitud",solicitudSchema);