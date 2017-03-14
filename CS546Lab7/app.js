/* Matt Telker
 * CS 546
 * Lab 7 
 */


const express = require("express");
const bodyParser = require("body-parser");
let app = express();
let configRoutes = require("./routes");


app.use(bodyParser.json());
configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});