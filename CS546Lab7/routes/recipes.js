
/* Matt Telker
 * CS 546
 * Lab 7
 */


const express = require("express");
const router = express.Router();
const data = require("../data");
const recipesData = data.recipes;

/* This route retrieves a requested recipe */
router.get("/:id", (req,res) => {
    recipesData.getRecipe(req.params.id).then((recipe) => {
        res.json(recipe);
    }).catch(() => {
        res.status(404).json({ error: "Recipe not found" });
    });
});

/* This route retrieves all recipes */
router.get("/", (req,res) => {
    recipesData.getAllRecipes().then((recipeList) => {
        res.json(recipeList);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

/* This route adds a new recipe */
router.post("/", (req, res) => {
    let recipePostData = req.body;

    recipesData.addRecipe(recipePostData.title, recipePostData.ingredients, recipePostData.steps)
        .then((newRecipe) => {
            res.json(newRecipe);
        }).catch((e) => {
            res.status(500).json({error: e});
        });
});

/* This route updates a recipe with the given information */
router.put("/:id", (req, res) => {
    let updatedData = req.body;

    let getRecipe = recipesData.getRecipe(req.params.id);

    getRecipe.then(() => {
        return recipesData.updateRecipe(req.params.id, updatedData)
            .then((updatedRecipe) => {
                res.json(updatedRecipe);
            }).catch((e) => {
                res.status(500).json({ error: e });
            }); 
    }).catch(() => {
        res.status(404).json({ error: "Recipe not found" });
    });

});

/* This route deletes a recipe */
router.delete("/:id", (req, res) => {
    let recipe = recipesData.getRecipe(req.params.id).then(() => {
        return recipesData.deleteRecipe(req.params.id)
            .then(() => {
                res.sendStatus(200);
            }).catch(() => {
                res.sendStatus(500);
            });

    }).catch((err) => {
        console.log(err);
        res.status(404).json({ error: "Recipe not found" });
    });
});


module.exports = router;    