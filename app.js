const express           = require("express");
const app               = express();
const helmet            = require("helmet");
const bodyParder        = require("body-parser");
const mongoose          = require("mongoose");
const passport          = require("passport");
const flash             = require("connect-flash");
const LocalStrategy     = require("passport-local");
const methodOverride    = require("method-override");
const expressSession    = require("express-session");
const User              = require("./models/user");
const indexRoutes       = require("./routes/index");
const port              = process.env.PORT || 3000;
const mongoConnection   = process.env.MONGO_CONNECT_STRING || "mongodb://localhost/itg_next";
const secretKey         = process.env.SECRETKEY || "somerandomsecretkey";

mongoose.connect(mongoConnection);
app.use(helmet());
app.use(bodyParder.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

app.use(expressSession({
    secret: secretKey,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.warning = req.flash("warning");
    res.locals.info = req.flash("info");
    next();
});

app.use("/", indexRoutes);

app.listen(port, () => {
    console.log(`E-Desk started at port ${port}`);
});