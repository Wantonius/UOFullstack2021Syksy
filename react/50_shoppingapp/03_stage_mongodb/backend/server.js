const express = require("express");
const routes = require("./routes/apiroutes");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mongoose = require("mongoose");

let app = express();

app.use(express.json());

//LOGIN DATABASES

mongoose.connect("mongodb+srv://"+process.env.MONGOCLOUD_USER+":"+process.env.MONGOCLOUD_PASSWORD+"@"+process.env.MONGOCLOUD_URL+"/uoshopping?retryWrites=true&w=majority").then(
	() => console.log("Connected to Mongo Cloud"),
	(error) => console.log("Failed to connect to Mongo Cloud",error)
)

let registeredUsers = [];
let loggedSessions = [];
const time_to_live_diff = 3600000;

//HELPERS

createToken = () => {
	let token = crypto.randomBytes(128);
	return token.toString("hex");
}

isUserLogged = (req,res,next) => {
	if(!req.headers.token) {
		return res.status(403).json({message:"Forbidden"})
	}
	for(let i=0;i<loggedSessions.length;i++) {
		if(req.headers.token === loggedSessions[i].token) {
			let now = Date.now();
			if(now > loggedSessions[i].ttl) {
				loggedSessions.splice(i,1);
				return res.status(403).json({message:"Forbidden"})
			}
			loggedSessions[i].ttl = now + time_to_live_diff;
			req.session = {};
			req.session.user = loggedSessions[i].user;
			return next();
		}	
	}
	return res.status(403).json({message:"Forbidden"})
}
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

app.post("/login",function(req,res) {
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
		if(registeredUsers[i].username === req.body.username) {
			bcrypt.compare(req.body.password,registeredUsers[i].password, function(err,success) {
				if(err) {
					return res.status(500).json({message:"Server error"})
				}
				if(!success) {
					return res.status(403).json({message:"Forbidden"})
				}
				let token = createToken();
				let now = Date.now();
				let session = {
					user:req.body.username,
					ttl:now+time_to_live_diff,
					token:token
				}
				loggedSessions.push(session);
				return res.status(200).json({token:token})
			})
			return;
		}
	}
	return res.status(403).json({message:"Forbidden"})
})

app.post("/logout",function(req,res) {
	let token = req.headers.token
	if(!token) {
		console.log("No session found");
		return res.status(404).json({message:"not found"})
	}
	for(let i=0;i<loggedSessions.length;i++) {
		if(token === loggedSessions[i].token) {
			loggedSessions.splice(i,1)
			return res.status(200).json({message:"success"})
		}
	}
	console.log("No session found");
	return res.status(404).json({message:"not found"})
})


let port = process.env.PORT || 3001

app.use("/api",isUserLogged,routes);

app.listen(port);

console.log("Running in port "+port);