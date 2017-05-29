const express = require("express");
const router = express.Router();
const middleware = require("../middleware/index");

router.get("/profile/:username", middleware.isLoggedIn, (req,res) => {
    var username = req.params.username;
    res.render("profile/userProfile");
});

module.exports = router;