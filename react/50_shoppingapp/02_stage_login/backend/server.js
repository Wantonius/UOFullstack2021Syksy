const express = require("express");
const routes = require("./routes/apiroutes");
const bcrypt = require("bcrypt");

let app = express();

app.use(express.json());

//LOGIN DATABASES

let registeredUsers = [];
let loggedSessions = [];
const time_to_live_diff = 3600000;

//LOGIN API

app.post("/register",function(req,res) {
	if(!req.body) {
		return res.status(400).json({message:"Bad Request"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({message:"Bad Request"});
	}
	if(req.body.username.length < 4 ||req.body.password.length < 8) {
		return res.status(400).json({message:"Bad Request"});	
	}
	for(let i=0;i<registeredUsers.length;i++) {
		if(req.body.username === registeredUsers[i].username) {
			return res.status(409).json({message:"Username is already in use"})
		}
	}
	bcrypt.hash(req.body.password,14,function(err,hash) {
		if(err) {
			return res.status(500).json({message:"Server error"})
		}
		let user = {
			username:req.body.username,
			password:hash
		}
		registeredUsers.push(user);
		console.log(registeredUsers);
		return res.status(201).json({message:"New user created!"});
	})
})

let port = process.env.PORT || 3001

app.use("/api",routes);

app.listen(port);

console.log("Running in port "+port);