const Student = require('../models/student');
const argon2 = require('argon2');

//ENVIAR ->
const studentPost = async (req, res) => {
    console.log("LLEGa hasTA AQUi");
    var { nombre, correo, password } = req.body;
    var bandera = false;
    const pass = await argon2.hash(password);

    console.log(password, "  |  ", pass);

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

module.exports = {
    studentPost
}