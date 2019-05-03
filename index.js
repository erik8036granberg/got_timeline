"use strict";

let click;
let activezoom;

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");
  document.querySelector("body").addEventListener("click", mouseClick);
  document.querySelector("#slider").addEventListener("input", timelineSlider);
}

// - - - - - mouseclick event listers - - - - -

function mouseClick(event) {
  click = event.target.dataset.click;
  console.log(click);
  if (click != undefined && click.startsWith("season")) {
    event.preventDefault();
    expandDiv(click);
  }
}

// - - - - - expand clicked div & close others - - - - -

function expandDiv(click) {
  console.log("expandDiv");

  document.querySelector("#" + click).classList.add("zoomview");
  document.querySelector("#" + click).classList.remove("compressed");

  // expand clicked
  const closeDivs = document.querySelectorAll("div:not(#" + click + ").season");

  // close others but clicked
  closeDivs.forEach.call(closeDivs, function(el) {
    el.classList.remove("zoomview");
    el.classList.remove("overview");
    el.classList.add("compressed");
  });

  // set color to zoomed-mode
  const setColor = document.querySelectorAll(".season");
  setColor.forEach.call(setColor, function(el) {
    el.classList.add("setcolor");
  });

  // crop to season number for compressed panes
  const setSeasonNr = document.querySelectorAll(".compressed .season_nr");
  setSeasonNr.forEach.call(setSeasonNr, function(el) {
    el.textContent = el.textContent.slice(-1);
  });

  // set season to full text for expanded
  setTimeout(function() {
    document.querySelector("#" + click + " .season_nr").textContent =
      "Season " + click.slice(-1);
  }, 200);
}

//  - - - - - - - - - slider test - - - - - - - - -

function timelineSlider() {
  console.log(this.value);

  let seasonCount = parseInt(this.value);
  let deathCount = "";

  if (seasonCount > 67) {
    seasonCount = 67;
  }
  document.querySelector("#deathcounter").textContent = seasonCount;
}
