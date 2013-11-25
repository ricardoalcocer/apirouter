var express = require("express");
var _ = require('lodash');
var parseActions=require('./lib/lilacsmod.js').parseActions;

//var ejs = require('ejs');

var app = express();
var port = 3700;

app.configure(function() {
    app.use(express.bodyParser());
    //app.use(express.static('./static/'));
    app.use(express.static(__dirname + '/public')); // where are static files located?
    app.use(app.router);
});

//app.set('view engine', 'ejs');
//app.set('view options', {
//   layout: false
//});
 
app.get('/api/*', function(req, res) {
//	res.render('index', {
//	    message : 'De groeten'
//	});
	var fullPath=req.path.replace(/^\/|\/$/g,'').split('/');
	//res.json(500, { error: 'message' })
	res.send(fullPath);
});
 
app.listen(port);
console.log("Listening on port " + port);