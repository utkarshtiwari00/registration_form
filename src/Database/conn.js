const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/registrationEmployee")
  .then(() => console.log("Connection is successful!"))
  .catch((err) => console.log("Connection is not successful!", err));
