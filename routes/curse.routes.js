const { Router } = require('express');
const { check } = require('express-validator');
const { cursoPost, cursoGet } = require('../controllers/curse.controller');
const { validar } = require('../middlewares/validar-campos');
const { validarToken } = require('../middlewares/validar-jwt');
const { validarMaestro } = require('../middlewares/validar-role');
const { curseNameExists } = require('../helpers/db-validators');
const router = Router();

//Creación de Curso
router.post(
    '/',
    [
        validarToken,
        validarMaestro,
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("nombre").custom(curseNameExists),
        check("descripcion", "La descripción del curso es obligatoria").not().isEmpty(),
        check("cantidadDeModulos", "La cantidad de modulos del curso es obligatoria").not().isEmpty(),
        validar,
    ], cursoPost
);

router.get(
    '/misCursos',
    [
        validarToken,
        validar
    ], cursoGet
);



module.exports = router;