"use strict";

const geocodeApi_url1 =
  "https://maps.googleapis.com/maps/api/geocode/json?address=";
const geocodeApi_url2 = "&key=AIzaSyAoH_5rOPCAnsYOmuMu6OrwkEYKGo-yxD0";
const geoNames = "http://api.geonames.org/earthquakesJSON?";

function initMap() {
  //Initialize map
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 4,
  });
}

function plotMap(loc) {
  //Center and plot a location in the map
  const location = loc;
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: location,
  });

  const marker = new google.maps.Marker({
    position: location,
    map: map,
  });
}

var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
};
ready(() => {
  document.querySelector(".header").style.height = window.innerHeight + "px";
});

const btnD = document.getElementById("toData");

btnD.addEventListener("click", () =>
  window.scrollTo({
    // Scroll down to map on click
    top: 850,
    behavior: "smooth",
  })
);

//API GOOGLE
async function getApi(city) {
  //geocode google maps api
  const response = await fetch(geocodeApi_url1 + city + geocodeApi_url2);
  console.log(geocodeApi_url1 + city + geocodeApi_url2);
  var data = await response.json();

  getCoor(data);
}
var button = document.getElementById("submit");
button.onclick = function () {
  console.log("click");
  getVal();
};

function getVal() {
  //Get city value
  const cityInput = document.getElementById("city").value;
  getApi(cityInput);
}

document.addEventListener(
  "DOMContentLoaded",
  function () {
    //Submit city name
    var button = document.getElementById("submit");
    button.onclick = function () {
      getVal();
    };
    var container = document.getElementById("container");
    container.appendChild(button);
  },
  false
);

function getCoor(data) {
  //Filter data

  plotMap(data.results[0].geometry.location);
  sendCoor(
    data.results[0].geometry.bounds.northeast.lat,
    data.results[0].geometry.bounds.northeast.lng,
    data.results[0].geometry.bounds.southwest.lat,
    data.results[0].geometry.bounds.southwest.lng
  );
}

//API GEONAMES

async function sendCoor(north, east, south, west) {
  //Format api link
  console.log(
    geoNames +
      "north=" +
      north +
      "&south=" +
      south +
      "&east=" +
      east +
      "&west=" +
      west +
      "&username=paco"
  );
  const response1 = await fetch(
    geoNames +
      "north=" +
      north +
      "&south=" +
      south +
      "&east=" +
      east +
      "&west=" +
      west +
      "&username=paco"
  );
  var data = await response1.json();
  setData(data);
}

function setData(data) {
  //Table formatting

  var count = 0;
  var cityname = document.getElementById("city").value;
  let tab = `<tr>
        <th>Date</th>
        <th>Magnitude</th> 
         </tr>`;

  for (let r of data.earthquakes) {
    count++;
    tab += `<tr>
          <td>
          ${r.datetime}
          </td>
          <td>
          ${r.magnitude}
          </td>
          <tr>`;
  }

  if (count == 0) {
    tab = `<tr>
      <th>No reported earthquakes in the city</th>
       </tr>`;
    count = "";
  } else {
    count = "Top " + count + " Earthquakes in " + cityname;
  }

  // exportar HTML  a un archivo
  document.getElementById("Tabla").innerHTML = tab;
  document.getElementById("number").innerHTML = count;
}
