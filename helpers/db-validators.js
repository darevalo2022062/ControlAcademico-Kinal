const Student = require('../models/student');

const studentExists = async (correo = '') => {

    const correoExistente = await Student.findOne({ correo });

    console.log("Este es correo mandado: " + correo + "\n Este es el correo de DB: " + correoExistente.correo);
    console.log(correoExistente.correo == correo);
    if (correoExistente.correo == correo) {
        throw new Error(`El email ${correo} ya fue registrado`);
    }
}

module.exports = {
    studentExists
}