var mysql = require("mysql");
const express = require("express");
const { path } = require("express/lib/application");
var paths = require('path');
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
app.use("/css",express.static("css"));
var p = paths.join(__dirname, "..", "/css");
app.use("/css", express.static(p));

var connection = mysql.createConnection({
    host: 'localhost',
    database: '424project',
    user: 'root',
    password: 'Castaic062499$'
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("Connected!");
});

app.get("/", function(req, res){
	var x = paths.join(__dirname, '..','/index.html')
	res.sendFile(x)
});

app.post("/", encoder, function(req,res){
	console.log("in post method")
	var username = req.body.username;
	var password = req.body.password;
	connection.query("SELECT * FROM user WHERE email = ? AND password = ?",[username,password],function(error,results,fields){
		if(results.length > 0){
			res.redirect("/webpage");
			console.log("Login Successful!!")
		}else{
			res.redirect("/");
		}
		res.end();
	})
})
//login success
app.get("/webpage",function(req,res){
	var sql = "SELECT "
	res.sendFile(paths.join(__dirname, "..", "webpage.html"))
})

app.get("/register",function(req,res){
	res.sendFile(paths.join(__dirname, "..", "register.html"))
})

 app.listen(4500);


module.exports = connection;

