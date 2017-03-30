
/* Matt Telker
 * CS 546
 * Lab 8
 */


const express = require("express");
const router = express.Router();


/* This route loads the homepage. */
router.get("/", (req,res) => {
    res.render('layouts/main');
});



module.exports = router;    