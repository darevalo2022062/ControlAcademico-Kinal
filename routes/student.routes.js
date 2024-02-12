const { Router, body } = require('express');
const { studentPost } = require('../controllers/studen.controller');
const { check } = require('express-validator');

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