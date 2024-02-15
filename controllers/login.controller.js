const Login = require('../models/login');
const Teacher = require('../models/teacher');
const Student = require('../models/student');

const argon2 = require('argon2');

const loginGet = async (req, res = '') => {
    var { correo, password } = req.body;
    console.log(`Datos que llegan: ${correo} | ${password}`);
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

    for (const element of alumno) {
        claveCorrecta = await argon2.verify(element.password, password);
        console.log("Clave correinte: " + claveCorrecta);
        if (element.correo == correo && claveCorrecta == true) {
            comproba = true;
            log = 'Alumno';
            console.log("Es correcto en un alumno");
        }
    }

    if (comproba == false) {
        console.log("Ingresa a Maestro");
        for (const element of maestro) {
            claveCorrecta = await argon2.verify(element.password, password);
            if (element.correo == correo && claveCorrecta == true) {
                comproba = true;
                log = 'Maestro';
                console.log("Es correcto en un maestro");

            }
        }

    }

    if (comproba) {
        res.status(200).json({
            msg: `SE INICIO SESION, BIENVENIDO ${log}`
        });
        localStorage.setItem("Sesión_actual", correo);
    } else {
        res.status(400).json({
            msg: `ALGUNO DE LOS DATOS NO ES CORRECTO`
        });
    }


}

module.exports = {
    loginGet
}

