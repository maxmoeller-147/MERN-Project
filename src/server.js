const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const userController = require("./controllers/UserController")


app.use(helmet());


let corsOption = { origin: [
    "http://localhost:5000",
    "https://DatingApp.com"
], optionsSuccessStatus: 200}
app.use(cors(corsOption));


app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/", (request,response) => {
    response.json({message: " Welcome to Dating App"});
});

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

app.use("/users", userController)

app.use((error, request, response, next) => {
    response.json({
        error: error.message
    })
});



app.all(/.*/, (request,response)=> {
    response.status(404).json({ message: " Route not found in this API",
    targetPath: request.path
    })
});

module.exports = {
    app
}