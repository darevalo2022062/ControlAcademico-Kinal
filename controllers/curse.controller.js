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
        var cursos = [];
        //Identifiacion Maestro/alumno
        if (!teacher) {
            const student = await Student.findById(uid);
            let cursosName = student.cursos;
            if (cursosName == 'NONE') {
                return res.status(400).json({
                    msg: "No te enceuntras asignado a ningun curso"
                });
            }
            for (const element of cursosName) {
                var query = { nombre: element, estado: true };
                cursoA = await Curse.findOne(query);
                const { nombre, descripcion, maestro, cantidadDeModulos, duracionTotal, fechaFinalizacion } = cursoA;
                cursos.push({ nombre, descripcion, maestro, cantidadDeModulos, duracionTotal, fechaFinalizacion });
            }


        } else if (teacher) {
            const maestro = teacher.nombre;
            const query = { maestro: maestro, estado: true };

            [cursos] = await Promise.all([
                Curse.find(query)
            ]);

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

const cursoDelete = async (req, res) => {
    const { curso } = req.body;
    const token = global.tokenAcces;
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const teacher = await Teacher.findById(uid);
    var bandera = false;

    const cursos = await Curse.find({ maestro: teacher.nombre, estado: true });
    cursos.forEach(element => {
        if (element.nombre == curso) {
            bandera = true;
        }
    });

    if (!bandera) {
        return res.status(400).json({
            msg: "Este curso No existe o no te pertenece"
        });
    } else {
        await Curse.updateOne({ maestro: teacher.nombre, nombre: curso }, { estado: false });
        res.status(200).json({
            msg: "ELIMINADO"
        });
    }

}

module.exports = {
    cursoPost,
    cursoGet,
    cursoDelete
}