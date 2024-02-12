const express = require('express');
const { dbConnection } = require('../db/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT_NUMBER;
        this.conectDB();
    }

    starServer() {
        this.app.listen(this.port, () => {
            console.log("SERVIDO INICIADO");
        });
    }

    async conectDB() {
        await dbConnection();
    }

}

module.exports = Server;