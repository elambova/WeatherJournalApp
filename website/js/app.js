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

// This function use new Date object to get current date
function getDate() {
  const date = new Date();
  return date.toDateString();
}

// getData function using the keyword async and sets parameters baseUrl, zip and apiKey
const getData = async (baseUrl, zip, apiKey) => {
  const response = await fetch(baseUrl + zip.value + apiKey);
  console.log(response);
  try {
    if (response.ok) {
      const data = await response.json();
      return data.main.temp;
    }
  } catch (error) {
    console.error(error);
  }
};

// postData function using the keyword async and use method POST to post data which we will need later
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData[newData.length - 1];
  } catch (error) {
    console.error(error);
  }
};
