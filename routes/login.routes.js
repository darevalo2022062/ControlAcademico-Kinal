const { Router } = require('express');
const { check } = require('express-validator');
const { validar } = require('../middlewares/validar-campos');
const { loginGet } = require('../controllers/login.controller');
const router = Router();

router.get(
    "/",
    [
        check("correo", "Ingrese un correo valido").isEmail(),
        check("password").not().isEmpty(),
        validar
    ], loginGet
);

module.exports = router;