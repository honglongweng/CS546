/* Matt Telker
 * CS 546
 * Lab 7
 */


const express = require("express");
const router = express.Router();
const data = require("../data");
const recipesData = data.recipes;

/* This route returns the comments of the recipe requested. */
router.get("/recipe/:recipeId", (req, res) => {
    recipesData.getAllComments(req.params.recipeId).then((comments) => {
        res.json(comments);
    }).catch((e) => {
        res.status(404).json({ error: "Recipe not found" });
    })
});

/* This route returns the comment requested */
router.get("/:commentId", (req, res) => {
    recipesData.getComment(req.params.commentId).then((comment) => {
        res.json(comment);
    }).catch((e) => {
        res.status(404).json({ error: e });
    })
});

/* This method adds a new comment to the recipe given */
router.post("/:recipeId", (req, res) => {
    let commentPostData = req.body;
    let recipeID = req.params.recipeId;

    recipesData.addComment(recipeID, commentPostData.poster, commentPostData.comment)
        .then((newComment) => {
            res.json(newComment);
        }).catch((e) => {
            res.status(500).json({ error: e });
        });
});

/* This method updates the given comment for the given recipe */
router.put("/:recipeId/:commentId", (req, res) => {
    let updatedData = req.body;
    let getRecipe = recipesData.getRecipe(req.params.recipeId);
    let getComment = recipesData.getComment(req.params.commentId);
    getRecipe.then(() => {
        getComment.then(() => {
            return recipesData.updateComment(req.params.recipeId, req.params.commentId, updatedData)
                .then((updatedComment) => {
                    res.json(updatedComment);
                }).catch((e) => {
                    res.status(500).json({ error: e });
                });
        }).catch(() => {
            res.status(404).json({ error: "Comment not found" });
        });

    }).catch(() => {
        res.status(404).json({ error: "Recipe not found." });
    })

});

/* This method deletes the given comment */
router.delete("/:id", (req, res) => {
    let comment = recipesData.getComment(req.params.id).then(() => {
        return recipesData.deleteComment(req.params.id)
            .then(() => {
                res.sendStatus(200);
            }).catch(() => {
                res.sendStatus(500);
            });
    }).catch(() => {
        res.status(404).json({ error: "Comment not found" });
    })
});

module.exports = router;