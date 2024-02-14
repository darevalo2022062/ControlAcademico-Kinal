const express = require('express');
const { dbConnection } = require('../db/config');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT_NUMBER;
        this.studentRoute = '/api/student';
        this.curseRoute = '/api/curse'
        this.conectDB();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    starServer() {
        this.app.listen(this.port, () => {
            console.log("SERVIDO INICIADO");
        });
    }

    routes() {
        this.app.use(this.studentRoute, require('../routes/student.routes'));
        this.app.use(this.curseRoute, require('../routes/curse.routes'));
    }

    async conectDB() {
        await dbConnection();
    }

}

module.exports = Server;