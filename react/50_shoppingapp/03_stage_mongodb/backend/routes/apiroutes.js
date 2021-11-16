const express = require("express");
const itemModel = require("../models/item");

let router = express.Router()


router.get("/shopping",function(req,res) {
	let query = {"user":req.session.user}
	itemModel.find(query,function(err,items) {
		if(err) {
			return res.status(500).json({message:"Internal server error"})
		}
		return res.status(200).json(items);
	})
})

router.post("/shopping",function(req,res) {
	let item = new itemModel({
		...req.body,
		user:req.session.user
	})
	item.save(function(err) {
		if(err) {
			return res.status(500).json({message:"Internal server error"})
		}
		return res.status(201).json({message:"created"});		
	})
	
})

router.delete("/shopping/:id",function(req,res) {
	itemModel.deleteOne({"_id":req.params.id,"user":req.session.user}, function(err){
		if(err) {
			return res.status(500).json({message:"Internal server error"})
		}
		return res.status(200).json({message:"success!"})
	})
})

router.put("/shopping/:id",function(req,res) {
	let item = {
		...req.body,
		user:req.session.user
	}
	itemModel.replaceOne({"_id":req.params.id,"user":req.session.user},item,function(err,response) {
		if(err) {
			return res.status(500).json({message:"Internal server error"})
		}
		if(!response.nModified) {
			return res.status(404).json({message:"Not found!"})
		}
		return res.status(200).json({message:"success!"})
	})
})

module.exports = router;