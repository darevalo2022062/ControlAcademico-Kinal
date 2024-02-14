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
        check('password').isLength({ min: 6 }),
        check('correo').custom(studentExists),
        validar
    ], studentPost
);

module.exports = router;