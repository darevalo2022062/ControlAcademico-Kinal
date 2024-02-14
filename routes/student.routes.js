const { Router } = require('express');
const { studentPost } = require('../controllers/studen.controller');
const { check, body } = require('express-validator');
const { studentExists } = require('../helpers/db-validators')
const { validar } = require('../middlewares/validar-campos');

const router = Router();

router.post(
    "/",
    [
        check("nombre","No puede quedarse el campo vacío").not().isEmpty(),
        check('correo').isEmail(),
        check('correo').custom(studentExists),
        validar
    ], studentPost
);

module.exports = router;