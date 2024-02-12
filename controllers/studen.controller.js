const Student = require('../models/student');
const argon2 = require('argon2');

//ENVIAR ->
const studentPost = async (req, res) => {
    const { nombre, correo, password } = req.body;
    var bandera = false;
    const pass = await argon2.hash(password);
    var alumno = new Student({ nombre, correo, password, ...siguiente });

    do {
        if (pass !== passWord) {
            await alumno.save();
            bandera = false;
        } else {
            bandera = true;
        }
    } while (bandera == true);

    res.status(200).json({
        usuario
    });
}





module.exports = {
    studentPost
}