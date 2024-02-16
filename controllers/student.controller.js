const Student = require('../models/student');
const argon2 = require('argon2');
const jwt = require("jsonwebtoken");

//ENVIAR ->
const studentPost = async (req, res) => {
    var { nombre, correo, password } = req.body;
    var bandera = false;
    const pass = await argon2.hash(password);

    do {
        if (pass !== password) {
            password = pass;
            var alumno = new Student({ nombre, correo, password });
            await alumno.save();
            bandera = false;
        } else {
            bandera = true;
        }
    } while (bandera == true);

    res.status(200).json({
        alumno
    });
}

//ASIGNARME A CURSOS
const asignarmeCurso = async (req, res) => {
    console.log('LLEGA a ASiGNARMECURSO');
    var { curso } = req.body;
    const token = global.tokenAcces;

    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const student = await Student.findById(uid);
    var cursosAlumno = [];
    cursosAlumno = student.cursos;
    var cursosNew = '';

    

    if (cursosAlumno == 'NONE') {
        console.log('Entra si es NONE');
        cursosNew = curso;
        console.log(uid);
        await Student.findByIdAndUpdate(uid, {cursos:cursosNew});

    } else if (cursosAlumno.length < 4) {
        console.log('Entra si es <4');
        cursosNew = student.cursos;
        cursosNew.push(curso);
        await Student.findByIdAndUpdate(uid, {cursos:cursosNew});

    }

    res.status(200).json({
        msg: "Actualzado"
    });




    //const cursosAlumno = [{ curso }];



}

module.exports = {
    studentPost,
    asignarmeCurso
}