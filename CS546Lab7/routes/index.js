const recipesRoutes = require("./recipes");
const commentsRoutes = require("./comments");

const constructorMethod = (app) => {
    app.use("/recipes", recipesRoutes);
    app.use("/comments", commentsRoutes);

    app.use("*", (req, res) => {
        res.status(404).json({error: "Route Not Found"});
    });

};


module.exports = constructorMethod;