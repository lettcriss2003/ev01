import path from '../global/api.js';
import axios from 'axios';

export default {    
    async crear_editar_beca(data,call){
        try {
            var response = await axios.post(path.crear_editar_beca,data);
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
    async listar_becas(data, call) {
        try {
            var response = await axios.get(path.listar_becas, data);
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
    async eliminar_beca(data, call) {
        try {
            var response = await axios.post(path.eliminar_beca, data);
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
    async subir_archivo(data, call) {
        try {
            var response = await axios.post(path.subir_archivo, data);
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
}