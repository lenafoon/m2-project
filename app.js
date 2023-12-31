require("dotenv").config();

// create mongo instance
require("./db");

// generate the express app
const express = require("express");
const app = express();
const authMiddleware=require("./middleware/route-guard").isAuthenticated

// include the external configs and send the generated app
require("./config")(app);
require("./config/session.config")(app);

// const { isLoggedIn, isLoggedOut } = require('./middleware/route-guard')
app.use(authMiddleware)
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
app.use('/', challengeRoutes);

const booksRoutes = require('./routes/books.routes');
app.use('/', booksRoutes);

require("./error-handling")(app);

module.exports = app;
