var express = require('express');
var router = express.Router();
var Recibir = require("../../../database/collections/recibir");

//Crud create, post, put, get, delete, patch
//crear un plato
router.post("/recibir", (req, res) => {
  //ejemplo de validacion
  if(req.body.nameoffood == "" && req.body.ingredients == ""){
    res.status(400).json({
      "msn" : "formato incorrecto"
    });
    return;
  }
  var recibir = {
    nameoffood : req.body.nameoffood,
    description : req.body.description,
    ingredients : req.body.ingredients
  }
  var recibirData = new Recibir(recibir);
  console.log(recibir);
  recibirData.save().then( (err) => {
    res.status(200).json({
      "msn" : "plato de comida registrada exitosamente"
    });
  });
});

//ver todos los platos
router.get("/recibir", (req, res, next) => {
  Recibir.find({}).exec( (error, docs) => {
    res.status(200).json(docs);
  })
});

//leer solo un plato
router.get(/recibir\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Recibir.findOne({_id : id}).exec( (error, docs) => {
    if (docs != null) {
        res.status(200).json(docs);
        return;
    }
    res.status(200).json({
      "msn" : "No existe el plato"
    });
  })
});

//eliminar un plato
router.delete(/recibir\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Recibir.find({_id : id}).remove().exec( (err, docs) => {
      res.status(200).json(docs);
  });
});

//actualizar campos que se envian al plato (keys)
router.patch(/recibir\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var recibir = {};
  for (var i = 0; i < keys.length; i++) {
    recibir[keys[i]] = req.body[keys[i]];
  }
  Recibir.findOneAndUpdate({_id: id}, recibir, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "Error no se pudo actualizar el plato"
        });
        return;
      }
      res.status(200).json(params);
      return;
  });
});

//actualizar todos los campos de un plato
router.put(/recibir\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys  = Object.keys(req.body);
  var oficialkeys = ['nameoffood', 'description', 'ingredients'];
  var result = _.difference(oficialkeys, keys);
  if (result.length > 0) {
    res.status(400).json({
      "msn" : "Existe un error en el formato de envio puede hacer uso del metodo patch si desea editar solo un fragmentode la informacion"
    });
    return;
  }

  var recibir = {
    nameoffood : req.body.nameoffood,
    description : req.body.description,
    ingredients : req.body.ingredients
  };
  Recibir.findOneAndUpdate({_id: id}, recibir, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "Error no se pudo actualizar los datos"
        });
        return;
      }
      res.status(200).json(params);
      return;
  });
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
