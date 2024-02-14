const { Router } = require('express');
const { studentPost } = require('../controllers/student.controller');
const { check, body } = require('express-validator');
const { studentExists } = require('../helpers/db-validators')
const { validar } = require('../middlewares/validar-campos');

const router = Router();

router.post(
    "/",
    [
        body('username').notEmpty(),
        body('correo').isEmail(),
        body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
        check('correo').custom(studentExists),
        validar
    ], studentPost
);

module.exports = router;