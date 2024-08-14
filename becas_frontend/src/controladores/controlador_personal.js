import path from "../global/api";
import axios from "axios";
export default{
    async iniciar_sesion_personal(data,call){
        try {
            var response = await axios.post(path.iniciar_sesion_personal,data);
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
    async crear_editar_personal(data,call){
        try {
            var response = await axios.post(path.crear_editar_personal,data);
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
    async eliminar_personal(data,call){
        try {
            var response = await axios.post(path.eliminar_personal,data);
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
    async listar_personal(data, call) {
        try {
            var response = await axios.get(path.listar_personal, data);
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