const express = require("express");

const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors(
  {
    origin: "*",
  }
));

app.get('/', (req, res) => {
  try{
    res.status(200).json({
      acknowledged: true,
      message: "Welcome to Pixel Tech Backend",
      description: "The req is OK"
  })
  } catch (error) {
    next(error)
    console.log(error)
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`)
  }
})

// export app
module.exports = app