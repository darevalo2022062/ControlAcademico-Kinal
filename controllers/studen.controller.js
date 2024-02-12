const Student = require('../models/student');

const studentPost = async (req, res) => {
    const { nombre, correo, password } = req.body;
    var alumno = new Student({ nombre, correo, password, ...siguiente });

    await alumno.save();

    res.status(200).json({
        usuario
    });

}