'use strict';

var solicitud = require('../models/modelo_solicitud');

exports.crear_editar_solicitud = async function (req, res) {
    try {
        let { _id, fecha,estado, estudiante,beca } = req.body;
        var data = {fecha,estado,estudiante,beca};
        if(fecha != undefined) data.fecha= fecha;
        if(estado != undefined) data.estado = estado;
        if(estudiante != undefined) data.estudiante = estudiante;
        if(beca != undefined) data.beca = beca;

        if (_id != undefined) {
            console.log(_id)
            var solicitud_existe = await solicitud.findOne({ _id: _id });
            if (solicitud_existe) {
                var solicitud_actualizada = await solicitud.updateOne({ _id: _id }, data);
            }
            res.status(200).json("Actualizado correctamente");
        } else {
            var solicitud_db = await solicitud.create(data);
            res.status(200).send("Registrado correctamente");
        }
    } catch (error) {
        console.log(error)
        res.status(200).json(error);
    }
}


exports.eliminar_solicitud = async function(req,res){

    try{        
        let { _id} = req.body
        var solicitud_existe  = await solicitud.findOne({ _id:_id });
        if (solicitud_existe == undefined) throw { mensaje: "No existen registros" }
        await solicitud.findByIdAndDelete({_id:_id}) 
        res.status(200).send("Eliminado correctamente");

    }catch(err){
        console.log(err)
        res.status(200).send(error);
    }
}

exports.listar_solicitudes= async function(req,res){

    try{
        var solicitud_lista = await solicitud.find().populate('estudiante').populate('beca');
        res.status(200).json(solicitud_lista);
    }catch(err){
        console.log(err)
        res.status(200).send(err);

    }
}

exports.obtener_solicitud= async function(req,res){
    try{
    
        let { id_solicitud } = req.body
        var solicitud_item = await solicitud.findById(id_solicitud).populate('estudiante').populate('beca');
        res.status(200).json(solicitud_item);
    }catch(err){
        console.log(err)
        res.status(200).send(err);

    }
}

exports.obtener_solicitud_estudiante= async function(req,res){
    try{
    
        let { id_estudiante } = req.body
        var solicitud_item = await solicitud.findOne({estudiante:id_estudiante}).populate('estudiante').populate('beca');
        var json={
            mensaje: "sucess",
            data: solicitud_item
        }
        res.status(200).json(json);
    }catch(err){
        console.log(err)
        res.status(200).send(err);

    }
}