const { Router } = require('express');
const { studentPost } = require('../controllers/studen.controller');
const { check, body } = require('express-validator');

const router = Router();

router.post(
    "/",
    [
        body('username').notEmpty(),
        body('correo').isEmail(),
        body('password').notEmpty().isLength({ min: 5 })
    ], studentPost
);

module.exports = router;