const Student = require('../models/student');
const Teacher = require('../models/teacher');

const studentExists = async (correo = '') => {
    const correoExistente = await Student.findOne({ correo });
    if (correoExistente.correo == correo) {
        throw new Error(`El email ya fue registrado`);
    }
}

const tipoRole = async () => {

    Teacher.forEach(element => {
        if (localStorage.getItem("Sesión_actual") == element.correo && element.role == "") {

        }
    });


}

module.exports = {
    studentExists,
    tipoRole
}