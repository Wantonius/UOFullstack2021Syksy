const express = require("express");

let router = express.Router()

let database = [];
let id = 100;

router.get("/shopping",function(req,res) {
	return res.status(200).json(database);
})

router.post("/shopping",function(req,res) {
	let item = {
		...req.body,
		id:id
	}
	id++;
	database.push(item);
	return res.status(201).json({message:"created"});
})

router.delete("/shopping/:id",function(req,res) {
	let tempId = parseInt(req.params.id,10);
	let tempDB = database.filter(item => item.id !== tempId);
	database = tempDB;
	return res.status(200).json({message:"success"});
})

router.put("/shopping/:id",function(req,res) {
	let tempId = parseInt(req.params.id,10);
	let item = {
		...req.body,
		id:tempId
	}
	for(let i=0;i<database.length;i++) {
		if(database[i].id === tempId) {
			database.splice(i,1,item);
			return res.status(200).json({message:"success"});
		}
	}
	return res.status(404).json({message:"not found"});
})

module.exports = router;