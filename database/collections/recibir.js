const mongoose = require("../connect");
var recibirSchema = {
  nameoffood : String,
  description : String,
  ingredients : String
};
var recibir = mongoose.model("detalles de la comida", recibirSchema);
module.exports = recibir;
