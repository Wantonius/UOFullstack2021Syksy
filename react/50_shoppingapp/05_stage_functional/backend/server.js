const express = require("express");
const routes = require("./routes/apiroutes");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const sessionModel = require("./models/session");

let app = express();

app.use(express.json());

//LOGIN DATABASES

mongoose.connect("mongodb+srv://"+process.env.MONGOCLOUD_USER+":"+process.env.MONGOCLOUD_PASSWORD+"@"+process.env.MONGOCLOUD_URL+"/uoshopping?retryWrites=true&w=majority").then(
	() => console.log("Connected to Mongo Cloud"),
	(error) => console.log("Failed to connect to Mongo Cloud",error)
)


const time_to_live_diff = 3600000;

//HELPERS

createToken = () => {
	let token = crypto.randomBytes(128);
	return token.toString("hex");
}

isUserLogged = (req,res,next) => {
	if(!req.headers.token) {
		return res.status(403).json({message:"Forbidden 2"})
	}
	sessionModel.findOne({"token":req.headers.token},function(err,session) {
		if(err) {
			return res.status(403).json({message:"Internal server error"})
		}
		if(!session) {
			return res.status(403).json({message:"Forbidden 1"})
		}
		let now = Date.now();
		if(session.ttl < now) {
			sessionModel.deleteOne({"_id":session._id}, function(err) {
				if(err) {
					console.log("Failed to delete session:",session._id)
				}
				return res.status(403).json({message:"Forbidden 3"})
			})
		} else {
			req.session = {};
			req.session.user = session.user;
			session.ttl = now+time_to_live_diff;
			session.save(function(err) {
				if(err) {
					console.log("Failed to update session");
				}
				return next();
			})
		}
	})
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
	bcrypt.hash(req.body.password,14,function(err,hash) {
		if(err) {
			return res.status(500).json({message:"Server error"})
		}
		let user = new userModel({
			username:req.body.username,
			password:hash
		})
		user.save(function(err,newuser) {
			console.log(err);
			if(err) {
				console.log("Failed to register new user");
				if(err.code === 11000) {
					return res.status(409).json({message:"Username already in use"})
				}
				return res.status(500).json({message:"Internal server error"})
			}
			if(!newuser) {
				return res.status(500).json({message:"Internal server error"})
			}
			return res.status(201).json({message:"New user created!"});
		})
		
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
	userModel.findOne({"username":req.body.username}, function(err,user){
		if(err) {
			console.log("Failed to find user. Reason:",err);
			return res.status(500).json({message:"Internal Server Error"})
		}
		if(!user) {
			return res.status(401).json({message:"Unauthorized"})
		}
		bcrypt.compare(req.body.password,user.password,function(err,success) {
			if(err) {
				return res.status(500).json({message:"Internal Server Error"})
			}
			if(!success) {
				return res.status(401).json({message:"Unauthorized"})
			}
			let token = createToken();
			let now = Date.now();
			let session = new sessionModel({
				token:token,
				user:user.username,
				ttl:now+time_to_live_diff
			})
			session.save(function(err) {
				if(err) {
					return res.status(500).json({message:"Internal Server Error"})
				}	
				return res.status(200).json({token:token})
			})
		})
	})
})

app.post("/logout",function(req,res) {
	let token = req.headers.token
	if(!token) {
		console.log("No session found");
		return res.status(404).json({message:"not found"})
	}
	sessionModel.deleteOne({"token":token},function(err) {
		if(err) {
			console.log("Failed to remove session with token",token,err)
		}
		return res.status(200).json({message:"logged out"})
	})
})


let port = process.env.PORT || 3001

app.use("/api",isUserLogged,routes);

app.listen(port);

console.log("Running in port "+port);