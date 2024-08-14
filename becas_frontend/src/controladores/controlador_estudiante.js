import path from "../global/api";
import axios from "axios";
export default{
    async iniciar_sesion(data,call){
        try {
            var response = await axios.post(path.iniciar_sesion,data);
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
    async crear_editar_estudiante(data,call){
        try {
            var response = await axios.post(path.crear_editar_estudiante,data);
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
    async eliminar_estudiante(data,call){
        try {
            var response = await axios.post(path.eliminar_estudiante,data);
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
    async listar_estudiantes(data, call) {
        try {
            var response = await axios.get(path.listar_estudiantes, data);
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