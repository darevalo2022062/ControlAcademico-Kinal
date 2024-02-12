const express = require('express');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT_NUMBER;
    }

    starServer() {
        this.app.listen(this.port, () => {
            console.log("SERVIDO INICIADO");
        });
    }

}

module.exports = Server;