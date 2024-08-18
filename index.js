const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");
const consoleMessage = require("./utils/console.utils");
const port = process.env.PORT || 8080;

mongoose
  .connect(process.env.ATLAS_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then( async () => {
    consoleMessage.successMessage("MongoDB connected successfully");
  })
  .catch((err) => {
    consoleMessage.errorMessage("MongoDB connection failed");
  });

app.listen(port, () => {
  consoleMessage.infoMessage(`Server running on port ${port}`);
})