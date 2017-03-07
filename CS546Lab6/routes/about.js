const express = require("express");
const router = express.Router();
router.get("/", (req,res) => {
    res.json({
        "name":"Matt Telker",
        "biography":"<p>I am Matthew David Telker, a 5/5 senior at Stevens Institute of Technology. I am currently employed as a developer at SPHERE Technology Solutions, a cybersecurity firmlocated in Jersey City, New Jersey. I gained my interest in computers when I was young. After I got my original Xbox and my love for gaming began to grow, I needed to know what exactly was going on behind the scenes to make it all happen. In elementary school at the time, I was unable to really wrap my head around it; however, as I grew older, I was able to tackle the challenge. Starting with small pet projects and web fiddling, and assisted by my education at Stevens, I was able to develop reasonable proficiency. I was also fortunate enough to leverage that experience and secure a full time job after graduation.</p> <p> I also have some passions outside of school and work. I have been a brother of the Lodge since my first year at Stevens. Growing up I was a fan of mostly punk rock like Blink-182 and, strangely, Dave Matthews Band, the latter I've seen live over 20 times. After becoming close with my brothers my tastes expanded into the world of electronic music. When I get the opportunity, I enjoy DJing an event or two. One thing that hasn't changed since my youth is my love for gaming. Sadly, I don't get to dedicate as much time to gaming as I used to, but I make some free time when I need to.</p>",
        "favoriteShows": ["Breaking Bad", "Silicon Valley", "Westworld", "Rick & Morty", "South Park"],
        "hobbies": ["Attending Concerts", "Gaming", "DJing", "Traveling", "Drinking"
        ]});
    }, () => {
    //Something went wrong!
    res.status(500).send();
});

module.exports = router;