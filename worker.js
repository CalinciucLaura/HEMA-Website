const { parentPort } = require('worker_threads');

parentPort.on("message", (serverData) => {
    console.log('Received data from server:', serverData);

    // Do some processing on the data...
    let processedData = serverData;

    // Send the processed data back to the server
    parentPort.postMessage(processedData);
});
