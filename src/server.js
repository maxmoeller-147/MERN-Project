const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const helmet = require("helmet");
const cors = require("cors");


app.use(helmet());

app.use(express.static(__dirname + '/public'));


let corsOption = { origin: [
    "http://localhost:5000",
    "https://DatingApp.com"
], optionsSuccessStatus: 200}
app.use(cors(corsOption));


app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/", (request,response) => {
    response.sendFile(__dirname + '/index.html');
});

require('../sockets/websocket.js')(server);

server.listen(3000, () => {
  console.log('listening on *:3000');
});


app.all(/.*/, (request,response)=> {
    response.status(404).json({ message: " Route not found in this API",
        targetPath: request.path
    })
})

module.exports = { app };