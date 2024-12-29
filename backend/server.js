const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const Task = require("./models/Task");
const taskRoutes = require("./routes/taskRoutes");
const app = express();
const PORT = 5000;
const uri = process.env.MONGO_URI;
app.use(express.json());

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Connection error:", err));

app.use("/tasks", taskRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
