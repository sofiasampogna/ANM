'use strict';

function initMap() {
    // The location of Uluru
    const uluru = { lat: -25.344, lng: 131.031 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: uluru,
    });


    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });

}


function sFunction() {
  document.documentElement.scrollDown = 0; // For Chrome, Firefox, IE and Opera
}

var ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}
ready(() => {
    document.querySelector(".header").style.height = window.innerHeight + "px";
})

const btnD = document.getElementById('toData');

btnD.addEventListener('click', () => window.scrollTo({
  top: 850,
  behavior: 'smooth',
}));
