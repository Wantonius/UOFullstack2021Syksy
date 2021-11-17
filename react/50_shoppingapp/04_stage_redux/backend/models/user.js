const mongoose = require("mongoose");

let schema = mongoose.Schema({
	username:{type:String,unique:true},
	password:String
})

module.exports = mongoose.model("User",schema);