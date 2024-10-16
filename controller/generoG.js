const { Genero } = require("../models");

const obtenerGenero = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    //const query = { estado: true };
  
    try {
      const [total, Genero] = await Promise.all([
        Genero.countDocuments(),
        Genero.find({})
          .skip(Number(desde))
          .sort({nombre:1})
          //.limit(Number(limite)),
      ]);
  
      res.json({ Ok: true, total: total, resp: heroes });
    } catch (error) {
      res.json({ Ok: false, resp: error });
    }
  };

  module.exports={obtenerGenero}