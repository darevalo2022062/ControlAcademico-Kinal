const Teacher = require('../models/teacher');
const jwt = require("jsonwebtoken");
const Curse = require('../models/curse');
const Student = require('../models/student');

const cursoPost = async (req, res = "") => {

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

const cursoGet = async (req, res) => {
    try {
        const token = global.tokenAcces;
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const teacher = await Teacher.findById(uid);
        var [cursos] = '';
        //Identifiacion Maestro/alumno
        if (!teacher) {
            const student = await Student.findById(uid);
            cursos = student.cursos;

        } else if (teacher) {
            const maestro = teacher.nombre;
            const query = { maestro: maestro, estado: true };

            [cursos] = await Promise.all([
                Curse.find(query)
            ]);

            /*cursos.forEach(element => {
                cursos.push(element.nombre);
            });*/
        }

        if (cursos == '') {
            cursos = ['NO HAY CURSOS PARA TI'];
        }

        res.status(200).json({
            msg: `Estos son sus cursos`,
            cursos
        });

    } catch (e) {
        console.log(e);
        return res.status(400).json({
            msg: "Ocurrio un error inesperado"
        });
    }

}

module.exports = {
    cursoPost,
    cursoGet
}