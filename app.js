require("dotenv").config();

// create mongo instance
require("./db");

// generate the express app
const express = require("express");
const app = express();

// include the external configs and send the generated app
require("./config")(app);
require("./config/session.config")(app);

// const { isLoggedIn, isLoggedOut } = require('./middleware/route-guard')

//ROUTES!
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const tasksRoute = require('./routes/tasks.routes');
app.use('/', tasksRoute);

const authRouter = require('./routes/auth.routes');
app.use('/', authRouter);

const catRoutes = require("./routes/categories.routes");
app.use('/', catRoutes);

const challengeRoutes = require('./routes/challenges.routes');
app.use('/challenges', challengeRoutes);


require("./error-handling")(app);

module.exports = app;
