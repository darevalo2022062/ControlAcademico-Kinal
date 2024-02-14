const { Router } = require('express');
const { check } = require('express-validator');
const { cursoPost } = require('../controllers/curse.controller');
const { validar } = require('../middlewares/validar-campos');
const router = Router();

//Creación de Curso
router.post(
    '/',
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("descripcion","La descripción del curso es obligatoria").not().isEmpty(),
        //check("maestro").custom(),
        check("cantidadDeModulos","La cantidad de modulos del curso es obligatoria").not().isEmpty(),
        //check("fechaFinalizacion").custom(),
        validar
    ], cursoPost
);



module.exports = router;