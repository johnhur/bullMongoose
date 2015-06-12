var mongoose = require("mongoose"); 

var musicianSchema = new mongoose.Schema({
	name: {type: String, required: true},
	birth: String,
	genre: String,
	photo: String
})

var Musician = mongoose.model("Musician", musicianSchema);
module.exports = Musician; 
