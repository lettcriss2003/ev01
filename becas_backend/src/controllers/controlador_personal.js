'use strict';

var personal = require('../models/modelo_personal');

exports.iniciar_sesion_personal = async function (req, res) {
    try {
        let { usuario, clave } = req.body;

        var personal_existe = await personal.findOne({ "credenciales.usuario": usuario });
        if (personal_existe == undefined) throw { mensaje: "Usuario incorrecto" }
        if (personal_existe.credenciales.clave != clave) throw { mensaje: "Clave incorrecto" }
        personal_existe.credenciales.clave = null;
        personal_existe = JSON.parse(JSON.stringify(personal_existe));
    
        var json ={
            data: personal_existe,
            mensaje: "Success"
        }
        console.log(personal_existe)
        res.status(200).json(json);
    } catch (error) {
        res.status(200).json(error);
    }

}

exports.crear_editar_personal = async function (req, res) {

    try {
        let { _id,nombre_apellido,rol,usuario,clave} = req.body;

        let credenciales = {
            clave: clave,
            usuario: usuario
        }
        var data = {nombre_apellido,rol,credenciales};

        if (nombre_apellido != undefined) data.nombre_apellido = nombre_apellido;
        if (rol != undefined) data.rol = rol;
        if (credenciales != undefined) data.credenciales = credenciales;

        if (_id != undefined) {
            var personal_existe = await personal.findOne({ _id: _id });
            if (personal_existe) {
                await personal.updateOne({ _id: _id }, data);
            }
            res.status(200).json("Actualizado correctamente");
        } else {
            var personal_db = await personal.create(data);
            res.status(200).json("Registrado correctamente");
        }

    } catch (error) {
        res.status(200).json(error);
    }
}


exports.eliminar_personal = async function(req,res){

    try{        
        let { _id} = req.body
        var personal_existe  = await personal.findOne({ _id:_id });
        if (personal_existe == undefined) throw { mensaje: "No existen registros" }
        await personal.findByIdAndDelete({_id:_id}) 
        res.status(200).json("Eliminado correctamente");   
    }catch(err){
        res.status(200).json(err);

    }
}

exports.listar_personal= async function(req,res){
    try{
        var personal_lista = await personal.find().populate("ficha");
        res.status(200).json(personal_lista);   
    }catch(err){
        console.log(err)
        res.status(200).send(err);
    }
}