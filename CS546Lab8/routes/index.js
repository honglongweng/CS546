/* Matt Telker
 * CS 546
 * Lab 7
 */

const palindromeRoutes = require("./palindromes");


const constructorMethod = (app) => {
    app.use("/", palindromeRoutes);

    app.use("*", (req, res) => {
        res.status(404).json({error: "Route Not Found"});
    });

};


module.exports = constructorMethod;