require("dotenv").config();

require("./db");

const express = require("express");

const hbs = require("hbs");

const app = express();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

require("./config")(app);
require('./config/session.config')(app);

const projectName = "m2-project";
const capitalize = require("./utils/capitalize");

app.locals.appTitle = `${capitalize(projectName)}`;


//ROUTES!
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);


const tasksRoute = require('./routes/tasks.routes');
app.use('/', tasksRoute);


const authRouter = require('./routes/auth.routes');
app.use('/', authRouter); 




//ERRORS
require("./error-handling")(app);

module.exports = app;
