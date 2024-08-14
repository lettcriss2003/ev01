import Cookies from "js-cookie";


export default {
    async set_usuario(data) {
        Cookies.set("usuario", JSON.stringify(data));
    },
    get_usuario_iniciado() {
        var data =  JSON.parse(Cookies.get('usuario'));
        return data;
    },
    borrar_usuario() {
        Cookies.remove('usuario')
    },
    usuario_iniciado() {
        if (Cookies.get('usuario') != undefined) {
            return true;
        } else {
            return false;
        }
    },

};