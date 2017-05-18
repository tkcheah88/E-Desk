const express           = require("express");
const app               = express();
const bodyParder        = require("body-parser");
const port              = process.env.PORT || 3000;

app.use(bodyParder.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("landing");
});

app.listen(port, () => {
    console.log(`ITG_Next started at port ${port}`);
});