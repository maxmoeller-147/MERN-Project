const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const helmet = require("helmet");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const userController = require("./controllers/UserController");
const path = require("path")



// Serve files from "public" folder
app.use(express.static(path.join(__dirname, "public")));


// Middleware Security Settings
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  })
);


// Allow requests only from this origins
let corsOption = { origin: [
    "http://localhost:5000",
    "https://DatingApp.com"
], optionsSuccessStatus: 200}
app.use(cors(corsOption));


// Json and form data
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Route to send the chat html page
app.get("/", (request,response) => {
    response.sendFile(path.join(__dirname, "public", "index.html"));
});


// Start the server on port 3000
server.listen(3000, () => {
  console.log('listening on *:3000');
});


// Import and use the websocket.js file
require('../sockets/websocket.js')(server);


// Route to check MongoDB status
app.get("/databaseHealth", (request, response) => {
    let databaseState = mongoose.connection.readyState;
    let databaseName = mongoose.connection.name;
    let databaseModels = mongoose.connection.modelNames();
    let databaseHost = mongoose.connection.host;

    response.json({
    readyState: databaseState,
    dbName: databaseName,
    dbModels: databaseModels,
    dbHost: databaseHost
    })
})


// User Routes
app.use("/users", userController)


// Error handler Middleware
app.use((error, request, response, next) => {
    response.json({
        error: error.message
    })
});


// 404 route  
app.all(/.*/, (request,response)=> {
    response.status(404).json({ message: " Route not found in this API",
    targetPath: request.path
    })
});


// Export the app
module.exports = { app };