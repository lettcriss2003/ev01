'use strict';


var beca = require('../models/modelo_beca');

exports.crear_editar_beca = async function (req, res) {

    try {
        let { _id, estado, monto, tipo, fecha_inicio, fecha_fin, ingresos,certificado_ingresos, deporte, certificado_deportivo, record_academico, promedio } = req.body;

        let bajos_recursos = {
             ingresos: ingresos, 
             certificado_ingresos: certificado_ingresos }

        let deportiva = {
            deporte: deporte,
            certificado_deportivo: certificado_deportivo }
            
        let academica = {
            record_academico: record_academico,
            promedio: promedio }
            
        var data = { estado, monto, tipo, fecha_inicio, fecha_fin, bajos_recursos,  deportiva, academica,}  
        if (estado != undefined) data.estado = estado;
        if (monto != undefined) data.monto = monto;
        if (tipo != undefined) data.tipo = tipo;
        if (fecha_inicio != undefined) data.fecha_inicio = fecha_inicio;
        if (fecha_fin != undefined) data.fecha_fin = fecha_fin;
        if (bajos_recursos != undefined) data.bajos_recursos = bajos_recursos;
        if (deportiva != undefined) data.deportiva = deportiva;
        if (academica != undefined) data.academica = academica;

        if (_id != undefined) {
            var beca_existe = await beca.findOne({ _id: _id });
            if (beca_existe) {
                await beca.updateOne({ _id: _id }, data);
            }
            res.status(200).json("Actualizado correctamente");
        } else {
                var beca_db = await beca.create(data);
                res.status(200).json(beca_db);
        }
    } catch (error) {
        console.log(error)
        res.status(200).json(error);
    }
}


exports.eliminar_beca = async function (req, res) {

    try {
        let { _id } = req.body
        var beca_existe = await beca.findOne({ _id: _id });
        if (beca_existe == undefined) throw { mensaje: "No existen registros" }
        await beca.findByIdAndDelete({ _id: _id })
        res.status(200).send("Eliminado correctamente");

    } catch (err) {
        console.log(err)
        res.status(200).send(error);

    }
}

exports.listar_becas = async function (req, res) {

    try {
        var becas_lista = await beca.find();
        res.status(200).json(becas_lista);
    } catch (err) {
        console.log(err)
        res.status(200).send(err);

    }
}
