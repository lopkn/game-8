

// const http = require('http');

// // Create an instance of the http server to handle HTTP requests
// let app2 = http.createServer((req, res) => {
//     // Set a response type of plain text for the response
//     res.writeHead(200, {'Content-Type': 'text/plain'});

//     // Send back a response and end the connection
//     res.end('Hello World!\n');
// });

// // Start the server on port 3000
// // app.listen(3000, '127.0.0.1');
// console.log('Node server running on port 3000');





fs = require('fs')









//experimental
var express = require('express');
var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("server is opened")

var socket = require('socket.io');
var io = socket(server);
started = false

io.sockets.on('connection', newConnection)
option = {heal: true}


e = 1.582898426511603
console.log("now playing on seed:"+e)



function newConnection(socket){
	// console.log(started)

	console.log(socket.id + ' has connected')
	io.emit('seed',e)
	socket.on('toSer', mouseMSG)

	function start(){
		started = true
		io.emit('start')
	}
	function mouseMSG(data) {
		
		io.emit('toClient',data)

	}
	socket.on('toServerClick', toClientClick)
	socket.on('action', toClientAction)
	socket.on('toSerSave',serSave)
	socket.on('toserkd',toclientkd)

	socket.on('toSerSync',toClientSync)


	function serSave(packet){
		fs.writeFile("./save", ("-'"+JSON.stringify({"a":packet})+"'-"), function(err) {
			if(err) {
				return console.log(err);
			}
			console.log("The file was saved!");
		})
			// console.log(packet[0])
	}

	function toClientSync(syncPacket){
		// console.log(syncPacket[0][0])
		 io.emit('toClientSync',syncPacket)
	}

	function toclientkd(num){
		io.emit('tckd',num)
		// console.log(num)
	}

	function toClientClick(data){
		io.emit('toClientClick',data)
	}



	function toClientAction(toserver){
		if(toserver == "start"){
			started = true
			console.log("started!")
			// io.sockets.off('connection',newConnection)
		}
		if(toserver == 2){
			toclient = [toserver,Math.random()]
			io.emit('BackToClientAction',toclient)
		} else{
		// console.log("acknowledged")
		console.log("recieved input "+toserver+"!")
		toclient = [toserver]
		io.emit('BackToClientAction',toclient)}
	}


	socket.on('disconnect', function(){
		console.log(socket.id)
		io.sockets.emit('deletePlayer',socket.id)
	})
}


