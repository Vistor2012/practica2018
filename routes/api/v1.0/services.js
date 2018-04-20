var express = require('express');
var router = express.Router();
var User = require("../../../database/collections/user");

//Crud create, post, put, get, delete, patch
//create users
router.post("/user", (req, res) => {
  //ejemplo de validacion
  if(req.body.name == "" && req.body.ingredientes == ""){
    res.status(400).json({
      "msn" : "formato incorrecto"
    });
    return;
  }
  var user = {
    name : req.body.name,
    descripcion : req.body.descripcion,
    ingredientes : req.body.ingredientes
  }
  var userData = new User(user);

  userData.save().then( () => {
    //content-type
    res.status(200).json({
      "msn" : "usuario registrado con exito"
    });
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
