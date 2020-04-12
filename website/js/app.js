"use strict";

// Information for OpenWeather API
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&units=metric&APPID=d005e35a98f556ab1335c2956d43c455";

// Select all need elemnt from page
const zip = document.getElementById("zip");
const feelings = document.getElementById("feelings");
const generate = document.getElementById("generate");
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const content = document.getElementById("content");

const errorHolder = document.getElementById("errorHolder");

const entryHolderTitle = document.getElementById("entryHolderTitle");
const city = document.getElementById("city");

const entryHolder = document.getElementById("entryHolder");

// This function use new Date object to get current date
function getDate() {
  const date = new Date();
  return date.toDateString();
}

// getData function using the keyword async and sets parameters baseUrl, zip and apiKey
const getData = async (baseUrl, zip, apiKey) => {
  const response = await fetch(baseUrl + zip.value + apiKey);
  try {
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    return error;
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
    return newData[newData.length - 1];
  } catch (error) {
    return error;
  }
};

// updateUI function using the keyword async and updates the data we have, and attach to selected elements
const updateUI = async () => {
  const req = await fetch("/all");
  try {
    const allData = await req.json();
    city.innerHTML = allData[allData.length - 1].city;
    date.innerHTML = allData[allData.length - 1].date;
    temp.innerHTML = `${allData[allData.length - 1].temp.toFixed(1)}&#8451`;
    content.innerHTML = feelings.value;

    // reset feelings value (clear field)
    feelings.value = "";
  } catch (err) {
    return error;
  }
};

// Add event listener to button generate. When button is clicked callback function performAction will execute
generate.addEventListener("click", performAction);

// performAction function collect functions above starting from getData and wiht Promises (and key word then) add postData i updateUI.
function performAction() {
  if (feelings.value.trim().length === 0) {
    feelings.classList.add("error");
    feelings.setAttribute("placeholder", "Please enter your feelings!!!");
    return;
  } else if (zip.value.trim().length === 0) {
    zip.classList.add("error");
    zip.setAttribute("placeholder", "Please enter zip code!!!");
    return;
  } else {
    zip.removeAttribute("class");
    feelings.removeAttribute("class");
    getData(baseUrl, zip, apiKey).then(function (data) {
      if (data === undefined) {
        errorParagraph();
      } else {
        errorHolder.style.display = "none";

        postData("/addData", {
          date: getDate(),
          temp: data.main.temp,
          content: feelings.value,
          city: data.name,
        }).then(updateUI());

        // display returned data
        entryHolderTitle.style.display = "block";
        entryHolder.style.display = "block";
        // reset zip code value (clear field)
        zip.value = "";
      }
    });
  }
}
zip.addEventListener("focus", fieldFocus);

function fieldFocus() {
  zip.value = "";
  feelings.value = "";
  entryHolderTitle.style.display = "none";
  entryHolder.style.display = "none";
  errorHolder.style.display = "none";
  if (errorHolder.hasChildNodes()) {
    errorHolder.removeChild(errorHolder.firstElementChild);
  }
}

function errorParagraph() {
  // if there is an error it is displayed
  if (!errorHolder.hasChildNodes()) {
    const p = document.createElement("p");
    p.textContent = "Invalid zip code!";
    p.setAttribute("class", "error");
    errorHolder.style.display = "block";
    errorHolder.appendChild(p);
  }
  entryHolder.style.display = "none";
  entryHolderTitle.style.display = "none";
}
