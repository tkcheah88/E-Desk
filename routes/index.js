const express       = require("express");
const router        = express.Router();
const passport      = require("passport");
const User          = require("../models/user");
const middleware    = require("../middleware/index");

router.get("/", (req,res) => {
    //prevents logged-in users from redirecting to the landing via url manipulation
    if(req.user){
        return res.redirect("/home");
    }
    res.render("landing");
});

router.get("/home", middleware.isLoggedIn, (req,res) => {
    res.render("home");
});

router.post("/register", (req,res) => {
    var email = req.body.email;
    User.findOne({email:email}, (err, found) => {
        if(err){
            req.flash("error", err.message);
            return res.redirect("/");
        }
        if(found){
            req.flash("error", "That email you entered is already associated with an existing account");
            return res.redirect("/");
        }
        var newUser = new User({username:req.body.username, email:email});
        User.register(newUser, req.body.password, (err, user) => {
            if(err){
                req.flash("error", err.message);
                return res.redirect("/");
            }
            passport.authenticate("local")(req, res, () => {
                res.redirect("/home");
            });
        });
    });
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/",
    failureFlash: "Invalid username or password, kindly try again."
}), (req, res) => {
    //this callback is not doing anything
});

router.get("/logout", (req,res) => {
    req.logout();
    res.redirect("/");
});

module.exports = router;