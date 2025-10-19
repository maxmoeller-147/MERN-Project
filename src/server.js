const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");


app.use(helmet());


let corsOption = { origin: [
    "http://localhost:5000",
    "https://DatingApp.com"
], optionsSuccessStatus: 200}
app.use(cors(corsOption));


app.use(express.json());


app.get("/", (request,response) => {
    response.json({message: " Welcome to Dating App"});
});


app.all(/.*/, (request,response)=> {
    response.status(404).json({ message: " Route not found in this API",
        targetPath: request.path
    })
})

module.exports = {
    app
}