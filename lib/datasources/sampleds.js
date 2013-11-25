// these are the actions that matter to this module.  Add as many as you know you'll need.
var qsActions=['get','order','page','per_page','limit','skip','columns','near','table'];

// constructor
var sampleds=function(){}
//

// this method is required to tell the engine which actions to get from the URL
sampleds.prototype.getActions=function(){
	return qsActions;
}

// these are the REST methods
sampleds.prototype.GET=function(args,callback){
	/*
		args contains something like:
		{
			"get": "all",
			"order": null,
			"page": null,
			"per_page": null,
			"limit": null,
			"skip": null,
			"columns": null,
			"near": null,
			"table": "employees"
		}

		You are the module, so you should know how to use these to call your data provider and return a JSON string
		that will be sent at an argument to the callback
	*/

	var flags=getFlags(args);
	
	var output=flags; // returning flags during debugging to know which arguments were recieved
	//var output={}; // this would be the output to be sent to callback
	callback(output);
}

sampleds.prototype.POST=function(args,callback){
	var output={"message":"this was the post with " + JSON.stringify(args)}; // this would be the output to be sent to callback
	callback(output);
}

sampleds.prototype.PUT=function(args,callback){
	var output={"message":"this was the put with " + JSON.stringify(args)}; // this would be the output to be sent to callback
	callback(output);
}

sampleds.prototype.DELETE=function(args,callback){
	var output={"message":"this was the delete with " + JSON.stringify(args)}; // this would be the output to be sent to callback
	callback(output);
}

// based on qsActions, get a nice object with actions and their values
function getFlags(parsedActions){
	var _ = require('lodash'); // for the _find function
	var obj={};
	
	qsActions.forEach(function(action){
		obj[action]=_.find(parsedActions,{'action': action}).value
	});

	return obj;
}

exports.sampleds=sampleds;