const express = require("express"); // levanta servicio de express

const mongoconnection = require("../database/connection");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.pathsMongo = {
      genero: "/Genero",
      artista: "/Artista",
      cancion: "/Cancion"
    };

    this.mongoconnection();
    //Routes
    this.routesM();
  }

  async mongoconnection() {
    await mongoconnection();
  }

  routesM() {
    //this.app.use(this.pathsMongo.genero, require("../routes/Genero"));
    //this.app.use(this.pathsMongo.artista, require("../routes/Artista"));
    this.app.use(this.pathsMongo.cancion, require("../routes/cancion"));
    
  }


  listen() {
    this.app.listen(this.port, () => {
      console.log("SERVIDOR CORRIENDO EN PUERTO", this.port);
    });
  }
}

module.exports = Server;