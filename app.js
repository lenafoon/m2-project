require("dotenv").config();

require("./db");

const express = require("express");

const hbs = require("hbs");

const app = express();

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const projectName = "m2-project";

const capitalize = require("./utils/capitalize");



app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.use(express.static('public'));
app.use(express.json());

require("./config")(app);
require('./config/session.config')(app);

app.locals.appTitle = `${capitalize(projectName)}`;



//ROUTES!
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);


const tasksRoute = require('./routes/tasks.routes');
app.use('/', tasksRoute);//?


const authRouter = require('./routes/auth.routes');
app.use('/', authRouter); 

const catRoutes = require("./routes/categories.routes");
app.use('/', catRoutes);

const challengeRoutes = require('./routes/challenges.routes');
app.use('/challenges', challengeRoutes);


require("./error-handling")(app);

module.exports = app;
