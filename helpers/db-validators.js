const Student = require('../models/student');
const Teacher = require('../models/teacher');

const studentExists = async (correo = '') => {
    const correoExistente = await Student.findOne({ correo });
    if (correoExistente.correo == correo) {
        throw new Error(`El email ya fue registrado`);
    }
}

const tipoRole = async () => {
    if(localStorage.getItem(""));
}

module.exports = {
    studentExists,
    tipoRole
}