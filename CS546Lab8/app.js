/* Matt Telker
 * CS 546
 * Lab 8
 */


const express = require("express");
const static = express.static(__dirname+'/public');
let app = express();
let configRoutes = require("./routes");
const exphbs = require('express-handlebars');

app.use("/public", static);
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});