var cool = require('cool-ascii-faces');
var fs = require('fs');
var staticServer = require('http').createServer(HReqHandler);
var wsChatServer = require('./WsChat-node');
var port = 80;
var count = 0;
var targetFile = "";



function HReqHandler(request, response){
	if(request.url != "/favicon.ico"){
		count++;
		//console.log("request "+count+" coming");
		//console.log(request.method+" : "+request.url);
	}	

	if(request.url=='/')	targetFile = __dirname+"/index.html";
	else 					targetFile = __dirname+request.url;
	
	fs.readFile(targetFile,function(err, data){
		if(err) console.log(err);
		response.end(data);
	});
}

staticServer.listen(port, function(){
	console.log("staticServer is listening on: "+5566+" [wsChat is on...]");
});

wsChatServer.listen(staticServer);
