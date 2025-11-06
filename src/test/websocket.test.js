const http = require('http');
const { io: Client } = require('socket.io-client');
const initSocketServer = require('../sockets/websocket');
const { MessageModel } = require('../database/entities/Message');
const { create } = require('domain');
const { io } = require('socket.io-client');
const { disconnect, emit } = require('process');
const { promises } = require('dns');
const { resolve } = require('path');


jest.mock('../middleware/jwtFunctions', () => ({
  validateJWT: jest.fn().mockResolvedValue({ id: 1, name: 'TestUser' }),
}));


// Avoids calls to the Database 
jest.mock('../database/entities/Message', () =>({
  
  MessageModel: {
    create: jest.fn().mockImplementation(async (msg) => ({
      ...msg, id: Date.now(),
    })),
  },
}));


describe('Websocket Test', () => {
  let httpServer;
  let clientSocket;
  let io;
  
  
  // Start the server for testing
  beforeAll((done) => {
    httpServer = http.createServer();
    io = initSocketServer(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client (`http://localhost:${httpServer.address().port}`, {
      auth: { token: 'FAKE_TOKEN' }, 
    });
    
    clientSocket.on('connect', done);
   });
  });

  // Close io and server
  afterAll(async () => {
    if (clientSocket?.connected) {
      await new Promise((resolve) => {
        clientSocket.once('disconnect', resolve);
        clientSocket.disconnect();
      });
    }
    await new Promise((resolve) => io.close(() => httpServer.close(resolve)));
  });
  
  // TESTS
  
  test('connection', () => {
    expect(clientSocket.connected).toBe(true);
  });


  test('broadcast "Message" event', (done) => {
    const msg = { text: 'Hello' };
    clientSocket.on('Message', (received) => {
      expect(received.text).toBe(msg.text);
      done();
    });
    clientSocket.emit('Message', msg);
  });
    

  test('emit typing event', (done) => {
    const data = {user: 'Jack', typing: true};

    // Second client
    const secondSocket = new Client(`http://localhost:${httpServer.address().port}`);

    secondSocket.on('connect', () => {
      secondSocket.on('userTyping', (payload) => {
        expect(payload).toEqual(data);
        secondSocket.close();
        done();
      });

      clientSocket.emit('typing', data);
    });
  });



  test('send and receive room messages', (done) =>{
    const roomId = 'test-room';
    const msg = { text: 'room message'};

    const secondSocket = new Client(`http://localhost:${httpServer.address().port}`);

    secondSocket.on('connect', () => {
      clientSocket.emit('joinRoom', roomId);
      secondSocket.emit("joinRoom", roomId);

      secondSocket.on('roomMessage', (message) => {
        expect(message.text).toBe(msg.text);
        secondSocket.close();
        done();
      });

      clientSocket.emit('roomMessage', {roomId, msg});
    });
  });
});




