const mongoose = require("../connect");
var userSchema = {
  name : String,
  descripcion : String,
  ingredientes : String
};
var user = mongoose.model("user", userSchema);
module.exports = user;
