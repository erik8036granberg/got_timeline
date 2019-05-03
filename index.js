"use strict";

let click;
let activezoom;

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");
  document.querySelector("body").addEventListener("click", mouseClick);
  document.querySelector("#slider").addEventListener("input", timelineSlider);
  loadJSON();
}

function loadJSON() {
  fetch("datatest.json")
    .then(res => res.json())
    .then(jsondata => {
      console.log(jsondata);
      // jsondata.forEach(dataitem => {
      //   console.log(dataitem);
      // });
    });
}

// - - - - - mouseclick event listers - - - - -

function mouseClick(event) {
  click = event.target.dataset.click;
  console.log("season clicked to expand");
  console.log(click);
  if (click === "season_1") {
    season1Expanded();
    setExpanded(click);
  }
  if (click === "season_2") {
    season2Expanded();
    setExpanded(click);
  }
  if (click === "season_3") {
    season3Expanded();
    setExpanded(click);
  }
  if (click === "season_4") {
    season4Expanded();
    setExpanded(click);
  }
  if (click === "season_5") {
    season5Expanded();
    setExpanded(click);
  }
  if (click === "season_6") {
    season6Expanded();
    setExpanded(click);
  }
  if (click === "season_7") {
    season7Expanded();
    setExpanded(click);
  }
}

// - - - - - expand clicked div & close others - - - - -

function setExpanded(click) {
  console.log("setExpanded");

  // expand clicked
  document.querySelector("#" + click).classList.add("zoomview");
  document.querySelector("#" + click).classList.remove("compressed");

  // close others but clicked
  const closeDivs = document.querySelectorAll("div:not(#" + click + ").season");
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

// - - - - - expanded seasons - - - - -

function season1Expanded() {
  console.log("season1Expanded");
}

function season2Expanded() {
  console.log("season2Expanded");
}

function season3Expanded() {
  console.log("season3Expanded");
}

function season4Expanded() {
  console.log("season4Expanded");
}

function season5Expanded() {
  console.log("season5Expanded");
}

function season6Expanded() {
  console.log("season6Expanded");
}

function season7Expanded() {
  console.log("season7Expanded");
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

// function mouseClick(event) {
//   click = event.target.dataset.click;
//   console.log(click);
//   if (click != undefined && click.startsWith("season")) {
//     event.preventDefault();
//     expandDiv(click);
//   }
// }
