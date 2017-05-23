const express           = require("express");
const app               = express();
const bodyParder        = require("body-parser");
const mongoose          = require("mongoose");
const passport          = require("passport");
const LocalStrategy     = require("passport-local");
const methodOverride    = require("method-override");
const User              = require("./models/user");
const port              = process.env.PORT || 3000;
const mongoConnection   = process.env.MONGO_CONNECT_STRING || "mongodb://localhost/itg_next";
const secretKey         = process.env.SECRETKEY;

const indexRoutes       = require("./routes/index");


mongoose.connect(mongoConnection);
app.use(bodyParder.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

app.use(require("express-session")({
    secret: "somerandomsecretkey",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", indexRoutes);

app.listen(port, () => {
    console.log(`E-Desk started at port ${port}`);
});