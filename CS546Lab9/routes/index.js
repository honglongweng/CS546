/* Matt Telker
 * CS 546
 * Lab 9
 */

const passportRoutes = require("./users");


const constructorMethod = (app) => {
    app.use("/", passportRoutes);

    app.use("*", (req, res) => {
        res.status(404).json({error: "Route Not Found"});
    });

};


module.exports = constructorMethod;