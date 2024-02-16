const Teacher = require('../models/teacher');
const jwt = require("jsonwebtoken");
const Curse = require('../models/curse');

const cursoPost = async (req, res = "") => {
    console.log("Entra a CursoPost");
    const { descripcion, nombre, cantidadDeModulos, duracionTotal, fechaFinalizacion } = req.body;
    const token = global.tokenAcces;
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const teacher = await Teacher.findById(uid);
        const maestro = teacher.nombre;
        const curse = new Curse({ nombre, descripcion, maestro, cantidadDeModulos, duracionTotal, fechaFinalizacion });
        await curse.save();
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            msg: "Ocurrio un error inesperado"
        });
    }

    res.status(200).json({
        msg: "Curso Creado"
    });


}

module.exports = {
    cursoPost
}