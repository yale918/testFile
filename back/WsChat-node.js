var socketio = require('socket.io');
var connListener;

var tempName = ["Kenny","Yale","Leaf","Wade","Curry"];
var randNum;
var userName = {};
var currentRoom = {};
var guestNumber = 0;

exports.listen = function(server){
	
	connListener = socketio.listen(server);
	connListener.sockets.on('connection', function(socket){
		
		//connTest(socket);
		
		joinRoom(socket,'Lobby');
		
		changeRoom(socket);
		
		assignGuestName(socket);
		
		userMessage(socket);
		/*
		sysMsg(socket);
		
		changeName(socket);
		
		disconnect(socket);
		*/
	});
}
function userMessage(socket){
	socket.on('chatMessage',function(data){
		console.log(data.message);
		socket.broadcast.to(currentRoom[socket.id]).emit('chatMessage',{message: userName[socket.id]+": "+data.message});
		
	});
	
}


function connTest(socket){
	console.log("new connection...");
	socket.emit('toClient', "hello Client");
		socket.on('toServer', function(data){
			console.log("Client: " + data);
		});	
}

function assignGuestName(socket){
	guestNumber++;
	randNum = Math.floor(Math.random()*10)%5;
	//userName[socket.id] = "guest"+guestNumber;
	userName[socket.id] = tempName[randNum];
	socket.emit('assignName', userName[socket.id]);
}

function joinRoom(socket,room){
	socket.join(room,function(){
		currentRoom[socket.id] = room;
		socket.emit('joinResult', {room: room});
		console.log(userName[socket.id]+" in "+room);
		socket.broadcast.to(room).emit('roomMessage',
			{message: userName[socket.id] + ' has joined '+ room
		});
	});
}

function changeRoom(socket){
	socket.on('changeToRoom1',function(data){
		//console.log(userName[socket.id]+" in "+data.room);
		socket.leave(currentRoom[socket.id]);
		joinRoom(socket,data.room);
	});
}



function sysMsg(socket){

}



function changeName(socket){

}

function disconnect(socket){

}