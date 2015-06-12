var mongoose = require ("mongoose"); 
mongoose.connect("mongodb://localhost/musician_app");
mongoose.set("debug", true);
// pass all the models by exporting. 
// receiving Musician from musician.js.

module.exports.Musician = require("./musician"); 