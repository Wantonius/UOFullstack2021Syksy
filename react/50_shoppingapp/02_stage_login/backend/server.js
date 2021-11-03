const express = require("express");
const routes = require("./routes/apiroutes");

let app = express();

app.use(express.json());

app.use((req,res,next) => {
	console.log("Hi, I am a middleware filter!");
	return next();
});


let port = process.env.PORT || 3001

app.use("/api",routes);

app.listen(port);

console.log("Running in port "+port);