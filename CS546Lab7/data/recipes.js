/* Matt Telker
 * CS 546
 * Lab 7
 */

const mongoCollections = require("../config/mongoCollections");
const recipes = mongoCollections.recipes;
const uuidV4 = require('uuid/v4');


let exportedMethods = {
    /* This method retrieves an existing recipe */
    getRecipe(id) {
        if (!id)
            return Promise.reject("You must provide an id to search for");

        return recipes().then((recipeCollection) => {
            return recipeCollection.findOne({ _id: id });
        })
            .then((result) => {
                if (result === null) {
                    return Promise.reject(`No recipe with id ${id} was found.`);
                }
                else {
                    return result;
                }
            })
    },
    /* This method retrieves all recipes */
    getAllRecipes() {
        return recipes().then((recipeCollection) => {
            return recipeCollection.find({}, { title: 1 }).toArray();
        });
    },
    /* This method adds a new recipe based on the provided data */
    addRecipe(title, ingredients, steps) {
        if (!title)
            return Promise.reject("You must provide a name for your recipe.");

        if (!steps || !Array.isArray(steps))
            return Promise.reject("You must provide an array of steps for your recipe.");

        if (!ingredients || !ingredients[0].name || !ingredients[0].amount)
            return Promise.reject("You must supply ingredients with keys 'name' and 'amount'");

        return recipes().then((recipeCollection) => {
            let newRecipe = {
                _id: uuidV4(),
                title: title,
                ingredients: ingredients,
                steps: steps,
                comments: []
            };

            return recipeCollection
                .insertOne(newRecipe)
                .then((newInsertInformation) => {
                    return newInsertInformation.insertedId;
                })
                .then((newId) => {
                    return this.getRecipe(newId);
                });
        });
    },
    /* This method updates an existing recipe with only the provided information */
    updateRecipe(id, updatedRecipe) {
        return recipes().then((recipeCollection) => {
            let updatedRecipeData = {};

            if (updatedRecipe.title) {
                updatedRecipeData.title = updatedRecipe.title;
            }

            if (updatedRecipe.ingredients && (updatedRecipe.ingredients[0].name) && updatedRecipe.ingredients[0].amount) {
                updatedRecipeData.ingredients = updatedRecipe.ingredients;
            }

            if (updatedRecipe.steps && Array.isArray(updatedRecipe.steps)) {
                updatedRecipeData.steps = updatedRecipe.steps;
            }

            let updateCommand = {
                $set: updatedRecipeData
            };

            return recipeCollection.updateOne({
                _id: id
            }, updateCommand).then((result) => {
                return this.getRecipe(id);
            });
        });
    },
    /* This method deletes a recipe or rejects if it cant find one with the given id */
    deleteRecipe(id) {
        return recipes().then((recipeCollection) => {
            return recipeCollection.removeOne({ _id: id }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    return Promise.reject(`Could not delete recipe with id of ${id}`);
                }
            });
        });
    },

    /* This method adds a comment to an existing recipe or rejects */
    addComment(id, poster, comment) {
        if (!poster)
            return Promise.reject("You must supply a name.");

        if (!comment)
            return Promise.reject("You must supply a comment.");
        let newId = uuidV4();

        return recipes().then((recipeCollection) => {

            return recipeCollection.findOneAndUpdate(
                { _id: id },
                {
                    $addToSet: {
                        "comments": {
                            _id: newId,
                            poster: poster,
                            comment: comment
                        }
                    }
                }, {
                    returnNewDocument: true,
                    projection: { "comments": { $slice: -1 } }
                });
        }).then((result) => {
            return {
                "_id": result.value.comments[0]._id,
                "poster": result.value.comments[0].poster,
                "comment": result.value.comments[0].comment
            };
        });
    },

    /* This method retrives the requested comment */
    getComment(id) {
        if (!id)
            return Promise.reject("You must supply an id");

        return recipes()
            .then((recipeCollection) => {
                return recipeCollection.findOne({
                    "comments": {
                        $elemMatch: {
                            _id: id
                        }
                    }
                });
            }).then((recipe) => {
                if (recipe === null)
                    return Promise.reject(`No comment with id ${id} was found.`);

                var response = {
                    "_id": recipe.comments[0]._id,
                    "recipeId": recipe._id,
                    "recipeTitle": recipe.title,
                    "poster": recipe.comments[0].poster,
                    "comment": recipe.comments[0].comment
                };

                return response;
            });

    },
    /* This method deletes the given comment */
    deleteComment(id) {
        if (!id)
            return Promise.reject("You must supply an id to delete");

        return recipes()
            .then((recipeCollection) => {
                return recipeCollection.update({}, { $pull: { "comments": { "_id": id } } }).then((updateInfo) => {
                    if (updateInfo.nModified === 0) {
                        return Promise.reject(`Could not delete comment with id of ${id}`);
                    }
                });
            })
    },
    
    /* This method updates an existing comment */
    updateComment(recipeId, commentId, updatedComment) {
        let updatedCommentData = {};

        
        if (updatedComment.poster)
            updatedCommentData["comments.$.poster"] = updatedComment.poster;

        if (updatedComment.comment)
            updatedCommentData["comments.$.comment"] = updatedComment.comment;

        let updateCommand = {
            $set: updatedCommentData
        }
        return recipes()
            .then((recipeCollection) => {
                return recipeCollection.findAndModify({"_id": recipeId,
                            "comments": {
                                $elemMatch: {
                                    "_id": commentId
                                }
                            }},
                            [],
                    updateCommand,
                    {new: true}
                );
            })
            .then((updatedRecipe) => {
                return this.getComment(commentId);
            });

    },
    /* This method gets all comments for a recipe. */
    getAllComments(recipeId) {
        if (!recipeId)
            return Promise.reject("You must supply an id to delete");

        return recipes()
            .then((recipeCollection) => {
                return recipeCollection.findOne({
                    _id: recipeId
                });
            }).then((recipe) => {
                var response = [];
                for (i = 0; i < recipe.comments.length; i++) {
                    response.push({
                        "_id": recipe.comments[i]._id,
                        "recipeId": recipe._id,
                        "recipeTitle": recipe.title,
                        "poster": recipe.comments[i].poster,
                        "comment": recipe.comments[i].comment
                    });
                }
                return response;
            });
    }
};


module.exports = exportedMethods;

