const { response } = require('express');
const Curse = require('../models/curse');

const cursoPost = async (req, res) => {
    const { nombre, descripcion, maestro, cantidadDeModulos, duracionTotal, fechaFinalizacion } = req.body;
    const curse = new Curse({ nombre, descripcion, maestro, cantidadDeModulos, duracionTotal, fechaFinalizacion });
    await curse.save();

    res.status(200).json({
        curse
    });
}

module.exports = {
    cursoPost
}