const users    = require("./routes/scheduleRoutes");
const express  = require("express");
const mongoose = require("mongoose");
const { PORT } = require("./environment_variables/environment_variables");
const app      = express();
const sendMail = require('./core/sendMail')

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/email-db", { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Route
app.use("/email", users);
setInterval(sendMail, 60000);

const port = PORT;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
