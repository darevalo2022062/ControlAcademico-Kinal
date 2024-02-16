const jwt = require("jsonwebtoken");
const Teacher = require("../models/teacher");

const validarMaestro = async (req, res, next) => {
    const token = global.tokenAcces;
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const teacher = await Teacher.findById(uid);

        if (!teacher) {
            return res.status(401).json({
                msg: "Solo los MAESTROS tienen acceso a esta accion"
            });
        }

    } catch (e) {
        return res.status(400).json({
            msg: "Ocurrio un error inesperado"
        });
    }

    next();

}

module.exports = {
    validarMaestro
}