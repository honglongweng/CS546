
/* Matt Telker
 * CS 546
 * Lab 9
 * I pledge my honor that I have abided by the Stevens honor System.
 */

const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt-nodejs");
//require("./pass");


var users =  [
  { _id: "1245325124124", username: "masterdetective123", hashedPassword: "$2a$06$GpI8ffRxvuPq/nWYrI/tTu8RV9wJYEZQcRBxwndLg6UaJXTa0X1j.", firstName: "Sherlock", lastName: "Holmes", profession: "Detective", bio:"Sherlock Holmes (/ˈʃɜːrlɒk ˈhoʊmz/) is a fictional private detective created by British author Sir Arthur Conan Doyle. Known as a \"consulting detective\" in the stories, Holmes is known for a proficiency with observation, forensic science, and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, including Scotland Yard." },
  { _id: "723445325124124", username: "lemon", hashedPassword: "$2a$06$SagJO.YW8T7c7Fzh.0VaIuYaAetQKsU2PbmI.VzzjjfWKA8yyLbQe", firstName: "Elizabeth", lastName: "Lemon", profession: "Writer", bio:"Elizabeth Miervaldis \"Liz\" Lemon is the main character of the American television series 30 Rock. She created and writes for the fictional comedy-sketch show The Girlie Show or TGS with Tracy Jordan." },
  { _id: "123413245", username: "theboywholived", hashedPassword:"$2a$06$Sm1mE0ale6vltQvfuJ0EtuLABSBQsR.8wMWjhWrzLz0QBQpIa6QL2", firstName:"Harry", lastName:"Potter", profession:"Student", bio:"Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the life of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry . The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic, and subjugate all wizards and Muggles." }
]

function findUser(givenUser){
    return users.username === givenUser;
}

/* looks through the users object array for a given id, returns all properties */
function findUserById(id){
    return new Promise((resolve, reject) =>{
        var currentUser = users.filter(function ( obj ) {
            return obj._id === id;
        })[0];
        if (currentUser === undefined){
            return reject();
        } else {
            return resolve(currentUser);
        }
    })
}

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    findUserById(id).then((currentUser) =>{
        done(null, currentUser);
    });
});

/* function to pass to the private route to ensure user is logged in */
function isLoggedIn(req, res ,next) {
    if (req.isAuthenticated())
        return next();
    res.sendStatus(401);
}

/* function utilizing bcrypt to check if the password is correct */
function comparePasswords(password, hashedPassword){
    return new Promise((resolve, reject) => {
        var result = bcrypt.compareSync(password, hashedPassword);

        if (result) {
            return resolve();
        } else{
            return reject();
        }
    });
}

/* similar as finduserById, except operates based on a username vs an id */
function findUser(username){
    return new Promise((resolve, reject) =>{
        var currentUser = users.filter(function ( obj ) {
            return obj.username === username;
        })[0];
        if (currentUser === undefined){
            return reject();
        } else {
            return resolve(currentUser);
        }
    })
}


passport.use('local', new LocalStrategy(
    function (username, password, done) {
        findUser(username).then((currentUser) => {
            comparePasswords(password, currentUser.hashedPassword).then(() =>{
                return done(null, currentUser);
            }).catch(() => {
                return done(null, false, {"message": "Password incorrect"});
            });
        }).catch(() =>{
            return done(null, false, {"message": "User not found."});
        });
    })
);


/* This route loads the homepage. */
router.get("/", (req,res) => {
    if (req.isAuthenticated()){
        return res.render('layouts/private',{user: req.user});
    } else {
        var error = req.flash('error');
        res.render('layouts/login', {errors: error});
    }
});

/* This route processes the login form from the root, delivers back home 
 * if authentication fails or to the private page if it is successful */
router.post('/login', passport.authenticate('local', {
      successRedirect: "/private",
      failureRedirect: "/",
      failureFlash: true}));


router.get("/private", isLoggedIn, function(req, res) {
    res.render("layouts/private", {user: req.user});
});

module.exports = router;