const { Router } = require('express');
const { studentPost } = require('../controllers/studen.controller');
const { check, body } = require('express-validator');
const { studentExists } = require('../helpers/db-validators')

const router = Router();

router.post(
    "/",
    [
        body('username').notEmpty(),
        body('correo').isEmail(),
        check('correo').custom(studentExists),
    ], studentPost
);

module.exports = router;