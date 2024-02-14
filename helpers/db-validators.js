const Student = require('../models/student');
const Teacher = require('../models/teacher');

const studentExists = async (correo = '') => {
    const correoExistente = await Student.findOne({ correo });
    if (correoExistente.correo == correo) {
        throw new Error(`El email ya fue registrado`);
    }
}

const teacherNameExists = async (nombre = '') => {
    var teacherExiste = await Teacher.findOne({ nombre });
    if (teacherExiste.nombre.isEmpty()) {
        console.log("ESE MAESTRO NO EXISTE: " + teacherExiste);
    }
}

const teacherExists = async (correo = '') => {
    var correoExistente = await Teacher.findOne({ correo });
    if (correoExistente) {
        throw new Error(`El email ya fue registrado`);
    }
}

module.exports = {
    studentExists,
    teacherNameExists,
    teacherExists
}