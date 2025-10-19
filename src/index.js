const PORT = process.env.PORT || 3000;

// DATABASE CONNECTION


// EXPRESS SERVER ACTIVATION
const {app} = require("./server.js");

app.listen(PORT, () => {console.log("The server is running in port:" + PORT);});