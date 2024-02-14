const { Schema, model } = require('mongoose');

const LoginSchema = Schema({
    correo: {
        type: String,
        require: [true, 'No puedes iniciar sin completar el dato correo']
    },
    password: {
        type: String,
        require: [true, 'No puedes iniciar sin completar el dato password']
    },
    estadoLogin: {
        type: Boolean,
        default: false
    }
});

module.exports = model('Login', LoginSchema);