const PATH  = 'http://localhost:3000';
console.log('FRONTEND : ', PATH)
export default {
   path: PATH,
   iniciar_sesion: PATH + '/iniciar/sesion',
   crear_editar_estudiante: PATH + '/crear/editar/estudiante',
   crear_editar_ficha: PATH + '/crear/editar/ficha',
   eliminar_estudiante: PATH + '/eliminar/estudiante',
   eliminar_beca: PATH + '/eliminar/beca',
   listar_estudiantes: PATH +'/listar/estudiantes',
   crear_editar_beca: PATH + '/crear/editar/beca',
   listar_becas: PATH +'/listar/becas',
   eliminar_solicitud: PATH + '/eliminar/solicitud',
   listar_solicitudes: PATH +'/listar/solicitudes',
   crear_editar_solicitud: PATH + '/crear/editar/solicitud',
   obtener_solicitud: PATH + '/obtener/solicitud',

   crear_editar_personal: PATH + '/crear/editar/personal',
   listar_personal: PATH +'/listar/personal',
   eliminar_personal: PATH + '/eliminar/personal',
   iniciar_sesion_personal: PATH + '/iniciar/sesion/personal',

   obtener_solicitud_estudiante: PATH + '/obtener/solicitud/estudiante',

   subir_archivo: PATH + '/subir/archivo',
}