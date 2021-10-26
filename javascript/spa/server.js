const express = require("express");


let app = express();

app.use(express.static("public"));
app.use(express.json())

//database

let database = []
let id = 100

app.get("/api/shopping",function(req,res) {
	res.status(200).json(database);
})

app.post("/api/shopping",function(req,res) {
	let item = {
		id:id,
		type:req.body.type,
		count:req.body.count,
		price:req.body.price
	}
	id++;
	database.push(item);
	res.status(200).json({message:"success!"})
});

app.listen(3000);

console.log("Running in port 3000!");