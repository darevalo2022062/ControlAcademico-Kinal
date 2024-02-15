const { response } = require('express');
const Teacher = require('../models/teacher');
const Curse = require('../models/curse');

const cursoPost = async (req, res) => {
    const { nombre, descripcion, cantidadDeModulos, duracionTotal, fechaFinalizacion } = req.body;
    var maestro = '';
    const curse = new Curse({ nombre, descripcion, maestro, cantidadDeModulos, duracionTotal, fechaFinalizacion });
    await curse.save();

    res.status(200).json({
        curse
    });
}

module.exports = {
    cursoPost
}