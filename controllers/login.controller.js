const Login = require('../models/login');
const Teacher = require('../models/teacher');
const Student = require('../models/student');

const argon2 = require('argon2');

const loginGet = async (req, res = '') => {
    var { correo, password } = req.body;
    const query = { estado: true };
    var comproba = false;
    var log = '';
    var claveCorrecta = false;

    const [maestro] = await Promise.all([
        Teacher.find(query)
    ]);

    const [alumno] = await Promise.all([
        Student.find(query)
    ]);

    alumno.forEach(element => {
        claveCorrecta = argon2.verify(element.password, password);
        if (element.correo == correo && claveCorrecta == true) {
            comproba = true;
            log = 'Alumno';
        }
    });

    if (comproba == false) {
        maestro.forEach(element => {
            claveCorrecta = argon2.verify(element.password, password);
            if (element.correo == correo && claveCorrecta == true) {
                comproba = true;
                log = 'Maestro';
            }
        });
    }

    if (comproba) {
        res.status(200).json({
            msg: `SE INICIO SESION, BIENVENIDO ${log}`
        });
    } else {
        res.status(400).json({
            msg: `ALGUNO DE LOS DATOS NO ES CORRECTO`
        });
    }


}

module.exports = {
    loginGet
}

