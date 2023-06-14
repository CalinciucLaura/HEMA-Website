const net = require('net');
const { Worker } = require('worker_threads');

let clientCount = 0;


console.log("Server started");

const server = net.createServer((socket) => {
    clientCount++;
    console.log('Client ' + clientCount + ' connected');
   
    const worker = new Worker('./worker.js');

    socket.on("data", (clientData) => {
        console.log("Data received from client " +  clientCount +  ":" + clientData);
        
        // Send the client's data to the worker for processing
        worker.postMessage("Hello from server");
    });

    worker.on("message", (workerResponse) => {
        console.log("Worker response for client  " +  clientCount +  ":" +  workerResponse);
        socket.write("Worker says to client " +  clientCount +  ":" +  workerResponse);
    });

    worker.on('error', function(error) {
        console.error('Worker error for client' +  clientCount , error);
    });

    socket.on("end", () => {
        console.log('Client ' + clientCount + ' disconnected');
        worker.terminate();
    });
});

server.listen(5000, "localhost");
