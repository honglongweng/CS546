const recipesRoutes = require("./recipes");
const commentsRoutes = require("./comments");

const constructorMethod = (app) => {
    app.use("/about", aboutRoutes);
    app.use("/education", educationRoutes);

    app.use("*", (req, res) => {
        res.status(404).json({error: "Route Not Found"});
    });

};


module.exports = constructorMethod;