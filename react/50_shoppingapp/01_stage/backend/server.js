const express = require("express");

let app = express();

app.use(express.json());

app.use((req,res,next) => {
	console.log("Hi, I am a middleware filter!");
	return next();
});

// DATABASE

let database = [];
let id = 100;
let port = process.env.PORT || 3001

//REST API

app.get("/api/shopping",function(req,res) {
	return res.status(200).json(database);
})

app.post("/api/shopping",function(req,res) {
	let item = {
		...req.body,
		id:id
	}
	id++;
	database.push(item);
	return res.status(201).json({message:"created"});
})

app.delete("/api/shopping/:id",function(req,res) {
	let tempId = parseInt(req.params.id,10);
	let tempDB = database.filter(item => item.id !== tempId);
	database = tempDB;
	return res.status(200).json({message:"success"});
})

app.listen(port);

console.log("Running in port "+port);