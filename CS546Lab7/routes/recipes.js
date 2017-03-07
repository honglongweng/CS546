
/* Matt Telker
 * CS 546
 * Lab 7
 */


const express = require("express");
const router = express.Router();
const data = require("../data");
const recipesData = data.recipes;

router.get("/:id", (req,res) => {
    //TODO
});


module.exports = router;