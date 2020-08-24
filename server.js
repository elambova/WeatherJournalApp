var path = require("path");
const dotenv = require("dotenv");
dotenv.config();

/* Empty JS object to act as endpoint for all routes */
projectData = [];

// Add express to run server and routers
const express = require("express");

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require("body-parser");
const cors = require("cors");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

const port = 8000;

// Spin up th server
app.listen(port, listening);

// Callback function for listen, initialize in console that the server is running and the contents of localhost:8080
function listening() {
  console.log(`Server is running on localhost:${port}`);
}

const fetch = require("node-fetch");

// Keys for access to APIs
const key = {
  apiKey: process.env.API_KEY,
};

// getData function using the keyword async and sets parameters baseUrl, zip and apiKey
const getData = async (zip) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=metric&APPID=d005e35a98f556ab1335c2956d43c455`
  );
  try {
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    return error;
  }
};

// Get Route
app.get("/data", async (req, res, next) => {
  try {
    const data = await getData(req.query.zip);
    res.send(data);
  } catch (err) {
    throw new Error(err);
  }
});

// POST route

app.post("/addData", addData);

function addData(request, response) {
  projectData.push(request.body);
  response.send(projectData);
}

// GET roure
app.get("/all", allWeatherData);

function allWeatherData(request, response) {
  response.send(projectData);
}
