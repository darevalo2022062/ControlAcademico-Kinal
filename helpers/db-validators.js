const Student = require('../models/student');

const studentExists = async (correo = '') => {
    const correoExistente = await Student.findOne({ correo });
    if (correoExistente.correo == correo) {
        throw new Error(`El email ya fue registrado`);
    }
}

module.exports = {
    studentExists
}