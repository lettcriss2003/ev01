import path from '../global/api.js';
import axios from 'axios';

export default {    
    async crear_editar_solicitud(data,call){
        try {
            var response = await axios.post(path.crear_editar_solicitud,data);
            if (call != undefined) call(response.data);
            return response.data.data;
        } catch (error) {
            var res = {
                tipo: "error",
                mensaje: "Error desconocido",
                mensaje_alterno: error,
            };
            if (call != undefined) call(res);
            return res;
        }
    },    
    async listar_solicitudes(data, call) {
        try {
            var response = await axios.get(path.listar_solicitudes, data);
            if (call != undefined) call(response.data);
            return response.data.data;
        } catch (error) {
            var res = {
                tipo: "error",
                mensaje: "Error desconocido",
                mensaje_alterno: error,
            };
            if (call != undefined) call(res);
            return res;
        }

    },
    async eliminar_solicitud(data, call) {
        try {
            var response = await axios.post(path.eliminar_solicitud, data);
            if (call != undefined) call(response.data);
            return response.data.data;
        } catch (error) {
            var res = {
                tipo: "error",
                mensaje: "Error desconocido",
                mensaje_alterno: error,
            };
            if (call != undefined) call(res);
            return res;
        }

    },
    async obtener_solicitud(data, call) {
        try {
            var response = await axios.post(path.obtener_solicitud, data);
            if (call != undefined) call(response.data);
            return response;
        } catch (error) {
            console.log(error)
            var res = {
                tipo: "error",
                mensaje: "Error desconocido",
                mensaje_alterno: error,
            };
            if (call != undefined) call(res);
            return res;
        }

    },
    async obtener_solicitud_estudiante(data, call) {
        try {
            var response = await axios.post(path.obtener_solicitud_estudiante, data);
            if (call != undefined) call(response.data);
            return response;
        } catch (error) {
            console.log(error)
            var res = {
                tipo: "error",
                mensaje: "Error desconocido",
                mensaje_alterno: error,
            };
            if (call != undefined) call(res);
            return res;
        }

    }
}