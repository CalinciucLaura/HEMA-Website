
const net = require('net');

const client = net.createConnection({ port: 5000, host: 'localhost' }, () => {
  console.log('connected to server!');
  client.write('Hello from client!');
});

client.on('data', (data) => {
  console.log(data.toString());
});

client.on('end', () => {
  console.log('disconnected from server');
});