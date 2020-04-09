"use strict";

// Information for OpenWeather API
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&APPID=********";

// Empty object to add current data
const data = {};

// Select all need elemnt from page
const zip = document.getElementById("zip");
const feelings = document.getElementById("feelings");
const generate = document.getElementById("generate");
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const content = document.getElementById("content");
