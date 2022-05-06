// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalized = require("./utils/capitalized");
const projectName = "My Personal Trainer";

app.locals.appTitle = `${(projectName)}`;

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const clientRoutes = require("./routes/client.routes");
app.use("/client", clientRoutes);

const instructorRoutes = require("./routes/instructor.routes");
app.use("/instructor", instructorRoutes);

const workoutRoutes = require("./routes/workouts.routes");
app.use("/workout", workoutRoutes);

const exercisesRoutes = require("./routes/exercises.routes");
app.use("/exercises", exercisesRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/user", userRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
