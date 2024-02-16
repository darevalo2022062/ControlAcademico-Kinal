const { Router } = require('express');
const { check } = require('express-validator');
const { cursoPost } = require('../controllers/curse.controller');
const { validar } = require('../middlewares/validar-campos');
const { validarToken } = require('../middlewares/validar-jwt');
const { validarMaestro } = require('../middlewares/validar-role');
const router = Router();

//Creación de Curso
router.post(
    '/',
    [
        validarToken,
        validarMaestro,
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("descripcion", "La descripción del curso es obligatoria").not().isEmpty(),
        check("cantidadDeModulos", "La cantidad de modulos del curso es obligatoria").not().isEmpty(),
        validar
    ], cursoPost
);



module.exports = router;