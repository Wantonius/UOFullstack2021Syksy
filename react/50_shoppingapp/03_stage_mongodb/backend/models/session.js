const mongoose = require("mongoose");

let schema = mongoose.Schema({
	user:String,
	token:String,
	ttl:Number
})

module.exports = mongoose.model("Session",schema);