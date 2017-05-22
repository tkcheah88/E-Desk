const express       = require("express");
const router        = express.Router();
const passport      = require("passport");
const User          = require("../models/user");
const middleware    = require("../middleware/index");

router.get("/", (req,res) => {
    //prevents logged-in users from redirecting to the landing via url manipulation
    if(req.user){
        res.redirect("/home");
    }
    res.render("landing");
});

router.get("/home", middleware.isLoggedIn, (req,res) => {
    res.render("home");
});

router.post("/register", (req,res) => {
    var newUser = new User({username:req.body.username, email:req.body.email});
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            console.log(err.message);
            return res.redirect("/");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/home");
        });
    });
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/"
}), (req, res) => {
    //this callback is not doing anything
});

router.get("/logout", (req,res) => {
    req.logout();
    res.redirect("/");
});

router.get("/profile", middleware.isLoggedIn, (req,res) => {
    res.render("profile/userProfile");
});

module.exports = router;