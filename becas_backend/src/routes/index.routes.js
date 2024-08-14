var express = require('express');
var router = express.Router();
const {upload} = require('../config/enviroment/index');

const controlador_estudiante = require('../controllers/controlador_estudiante');
const controlador_beca = require('../controllers/controlador_beca');
const controlador_solicitud = require('../controllers/controlador_solicitud');
const controlador_personal = require('../controllers/controlador_personal');
const util = require('../controllers/utilities');

router.post('/iniciar/sesion', controlador_estudiante.iniciar_sesion);
router.post('/crear/editar/estudiante',controlador_estudiante.crear_editar_estudiante);
router.post('/eliminar/estudiante',controlador_estudiante.eliminar_estudiante);
router.get('/listar/estudiantes',controlador_estudiante.listar_estudiantes);
router.post('/crear/editar/beca',controlador_beca.crear_editar_beca);
router.get('/listar/becas',controlador_beca.listar_becas);
router.post('/eliminar/beca',controlador_beca.eliminar_beca);
router.post('/eliminar/solicitud',controlador_solicitud.eliminar_solicitud);
router.get('/listar/solicitudes',controlador_solicitud.listar_solicitudes);
router.post('/obtener/solicitud',controlador_solicitud.obtener_solicitud);

router.post('/obtener/solicitud/estudiante',controlador_solicitud.obtener_solicitud_estudiante);
router.post('/crear/editar/solicitud',controlador_solicitud.crear_editar_solicitud);

router.get('/listar/personal',controlador_personal.listar_personal);
router.post('/eliminar/personal',controlador_personal.eliminar_personal);
router.post('/crear/editar/personal',controlador_personal.crear_editar_personal);
router.post('/iniciar/sesion/personal', controlador_personal.iniciar_sesion_personal);

router.post('/subir/archivo',upload.single('file') , util.subir_archivo);
module.exports = router;