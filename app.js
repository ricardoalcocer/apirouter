/*
API Normalizer
*/
var fs = require('fs');
var express = require("express");
var app = express();
var port = 8080;

app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/public')); // where are static files located?
    app.use(app.router);
});

// ##################################################################
// :: HTTP GET :: 
// URL Format: http://yourhost.com/api/salesforce/flag/value/flag/value
app.get('/api/*', function(req, res) {
	var fullPath=req.path.replace(/^\/|\/$/g,'').split('/');
	// example fullPath: [ 'api', 'salesforce', 'get', 'all', 'table', 'employees' ]

	if (fullPath.length >=3){ // we have datasource and at least one value-pair
		var dataSourceName=fullPath[1].toLowerCase();

		fs.exists('./lib/datasources/' + dataSourceName + '.js', function (exists) {
			if (exists){
				var DS=require('./lib/datasources/' + dataSourceName + '.js')[dataSourceName];
				var dataSource=new DS();

				var parseActionsMod=require('./lib/lilacsmod.js').parseActions;

				// based on the arguments required by the module, extract all from URL as an 
				// array of objects like {"action":"get","value":"all"}
				var parsedActions=parseActionsMod(fullPath,dataSource.getActions()); 

				if (parsedActions !== null){
					try{
						dataSource.GET(parsedActions,function(data){
							res.json(data);
						});
					}catch(e){
						res.json({"message":"Invalid data source"});
					}						
				}else{
					res.json({"message":"Malformed URL"});	
				}
		  	}else{
		  		res.json({"message":"Module [" + dataSourceName + "] is invalid."});	
		  	}
		});
	}else{
		res.json({"message":"Need to provide Data-Store name and Actions"});
	}
});

// ##################################################################
// :: HTTP POST :: 
// URL Format: http://yourhost.com/api/oracle
// Takes 'rec' variable 
app.post('/api/*',function(req, res, next){
	var fullPath=req.path.replace(/^\/|\/$/g,'').split('/');

	if (fullPath.length === 2){ // we have api and datasource
		var dataSourceName=fullPath[1].toLowerCase();
		var DS=require('./lib/datasources/' + dataSourceName + '.js')[dataSourceName];
		var dataSource=new DS();
		var args={
			rec:req.body.rec
		};

		dataSource.POST(args,function(data){
			res.send(data);
		});
	}else{
		res.json({"message":"Need to provide data source name"});
	}
});

// ##################################################################
// :: HTTP PUT :: 
// URL Format: http://yourhost.com/api/oracle
// Takes 'rec' and 'id' variables
app.put('/api/*',function(req, res, next){
	var fullPath=req.path.replace(/^\/|\/$/g,'').split('/');

	if (fullPath.length === 2){ // we have api and datasource
		var dataSourceName=fullPath[1].toLowerCase();
		var DS=require('./lib/datasources/' + dataSourceName + '.js')[dataSourceName];
		var dataSource=new DS();
		var args={
			id:req.body.id,
			rec:req.body.rec
		};

		dataSource.PUT(args,function(data){
			res.send(data);
		});
		res.json({"message":"putted"});
	}else{
		res.json({"message":"Need to provide data source name"});
	}
});

// ##################################################################
// :: HTTP DELETE :: 
// URL Format: http://yourhost.com/api/oracle/1
// Where 1 is the id of the record to delete
app.delete('/api/:datasource/:id',function(req, res, next){
	var fullPath=req.path.replace(/^\/|\/$/g,'').split('/');
	
	if (fullPath.length === 3){ // we have api,datasource and recid
		var dataSourceName=req.params.datasource;
		var DS=require('./lib/datasources/' + dataSourceName + '.js')[dataSourceName];
		var dataSource=new DS();
		var args={
			id:req.params.id
		};

		dataSource.DELETE(args,function(data){
			res.send(data);
		});
		res.json({"message":"deleted"});
	}else{
		res.json({"message":"Need to provide record to delete"});
	}
});
 
app.listen(port);
console.log("Listening on port " + port);