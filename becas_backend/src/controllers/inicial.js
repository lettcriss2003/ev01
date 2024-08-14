'use strict';
//var jwt = require('jsonwebtoken');
var personal = require('../models/modelo_personal');

module.exports.crear_admin = async function () {
    try {
        // Comprobar si existe el admin
        const admin = await personal.findOne({
            rol: "ADMINISTRADOR",
        });
        if (!admin) {

            // crear usuario admin
            await personal.create({
                nombre_apellido: "ADMIN",
                rol: "ADMINISTRADOR",
                credenciales: {
                    usuario: "admin",
                    clave: "admin"
                },
            });
            console.log("Addministrador creado con éxito!");
        }
    } catch (error) {
        console.error(error);
    }
}
