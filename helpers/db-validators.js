const { response } = require('express');
const Student = require('../models/student');
const Teacher = require('../models/teacher');

const studentExists = async (correo = '') => {
    const correoExistente = await Student.findOne({ correo });
    if (correoExistente) {
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

const 

const tipoRole = async (req, res = "") => {
    const query = { estado: true };
    var bandera = false;
    global.nameTeacher = "";
    const [teacher] = await Promise.all([
        Teacher.find(query)
    ]);

    teacher.forEach(element => {
        console.log("Global session es igual = " + global.sesion);
        if (global.sesion == element.correo && element.role == "TEACHER_ROLE") {
            //SE TIENE ACCESO DE ADMIN/MAESTRO
            global.nameTeacher = element.nombre;
            bandera = true;
        }
    });

    if (bandera == false) {
        throw new Error(`SOLO LOS MAESTROS TIENE ACCESO A CURSOS`);
    }

}

module.exports = {
    studentExists,
    teacherNameExists,
    teacherExists,
    tipoRole
}