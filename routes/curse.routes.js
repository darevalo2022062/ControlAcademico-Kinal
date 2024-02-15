const { Router } = require('express');
const { check } = require('express-validator');
const { cursoPost } = require('../controllers/curse.controller');
const { tipoRole } = require('../helpers/db-validators')
const { validar } = require('../middlewares/validar-campos');
const router = Router();

//Creación de Curso
router.post(
    '/',
    [
        check().custom(tipoRole),
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("descripcion", "La descripción del curso es obligatoria").not().isEmpty(),
        check("cantidadDeModulos", "La cantidad de modulos del curso es obligatoria").not().isEmpty(),
        validar
    ], cursoPost
);



module.exports = router;