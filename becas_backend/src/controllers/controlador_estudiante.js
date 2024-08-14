'use strict';

var estudiante = require('../models/modelo_estudiante');

exports.iniciar_sesion = async function (req, res) {
    try {
        let { usuario, clave } = req.body;

        var estudiante_existe = await estudiante.findOne({ "credenciales.usuario": usuario }).populate("ficha");
        console.log("Estudiante: ",estudiante_existe)

        if (estudiante_existe == undefined) throw { mensaje: "Usuario incorrecto" }
        if (estudiante_existe.credenciales.clave != clave) throw { mensaje: "Clave incorrecto" }
        estudiante_existe.credenciales.clave = null;
        estudiante_existe = JSON.parse(JSON.stringify(estudiante_existe));

        var json ={
            data: estudiante_existe,
            mensaje: "Success"
        }
        res.status(200).json(json);
    } catch (error) {
        res.status(200).json(error);
    }

}

exports.crear_editar_estudiante = async function (req, res) {

    try {
        let { _id, usuario,clave,nombres,apellidos,fecha_nacimiento,edad,telefono,email,direccion} = req.body;

        let credenciales = {
            clave: clave,
            usuario: usuario
        }
        let ficha ={
            nombres: nombres,
            apellidos: apellidos,   
            fecha_nacimiento: fecha_nacimiento,
            edad: edad,
            telefono: telefono,
            email: email,
            direccion: direccion
        }

        var data = {credenciales, ficha};

        if (credenciales != undefined) data.credenciales = credenciales;
        if (ficha != undefined) data.ficha = ficha;

        if (_id != undefined) {
            var estudiante_existe = await estudiante.findOne({ _id: _id });
            if (estudiante_existe) {
                await estudiante.updateOne({ _id: _id }, data);
            }

            var json={
                mensaje: "Actualizado correctamente",
                data: estudiante_existe
            }
            res.status(200).json(json);
        } else {

            var estudiante_db = await estudiante.create(data);
            var json={
                mensaje: "Registrado correctamente",
                data: estudiante_db
            }
            res.status(200).json(json);
        }

    } catch (error) {
        console.log(error)
        res.status(200).json(error);
    }
}


exports.eliminar_estudiante = async function(req,res){

    try{        
        let { _id} = req.body
        var estudiante_existe  = await estudiante.findOne({ _id:_id });
        if (estudiante_existe == undefined) throw { mensaje: "No existen registros" }
        await estudiante.findByIdAndDelete({_id:_id}) 
        res.status(200).json("Eliminado correctamente");   
    }catch(err){
        res.status(200).json(err);

    }
}

exports.listar_estudiantes= async function(req,res){
    try{
        var estudiante_lista = await estudiante.find().populate("ficha");
        res.status(200).json(estudiante_lista);   
    }catch(err){
        console.log(err)
        res.status(200).send(err);
    }
}