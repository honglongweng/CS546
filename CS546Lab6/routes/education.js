const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
    res.json([{
        "schoolName": "Jonathan Law High School",
        "degree": "High School Diploma",
        "favoriteClass": "TV Production",
        "favoriteMemory": "Hosting Eagle Eye News in the mornings."
    },
    {
        "schoolName": "Stevens Institute of Technology",
        "degree": "Bachelors of Science",
        "favoriteClass": "Computers & Society",
        "favoriteMemory": "Winning a sorority sponsored DJ competition wit a brother of mine."
    }
    ]);
}, () => {
    //Something went wrong!
    res.status(500).send();
});

module.exports = router;