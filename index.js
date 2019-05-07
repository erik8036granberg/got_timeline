"use strict";

let click;
let enter;
let exit;
let data;
let timelineHover = true;

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");
  document.querySelector("body").addEventListener("click", mouseClick);
  document.querySelector("#slider").addEventListener("input", timelineSlider);

  const seasonIn = document.querySelectorAll(".season");
  seasonIn.forEach(item => {
    item.addEventListener("mouseenter", mouseEnter);
    item.addEventListener("mouseleave", mouseExit);
  });
  loadJSON();
}

function loadJSON() {
  fetch("datatest.json")
    .then(res => res.json())
    .then(jsondata => {
      data = jsondata;
      console.log(data);
      loadSVG();
    });
}

function loadSVG() {
  fetch("img/template.svg")
    .then(response => response.text())
    .then(svgdata => {
      console.log("svg er loaded");
      document.querySelector("#temp").insertAdjacentHTML("afterbegin", svgdata);
    });

  // setTimeout(function() {
  //   cloneTemplate();
  // }, 1000);
}

function cloneTemplate() {
  console.log("cloneTemplate");
  const template = document.querySelector("#template");

  // make a clone
  const clone = template.cloneNode(true);

  // modify id
  clone.id = "new_id";

  // modify title
  clone.querySelector("title").textContent = "New_title";

  // modify symbol
  clone
    .querySelector(".featured_symbol image")
    .setAttribute("xlink:href", "img/symbol_template.svg");

  // modify image
  clone
    .querySelector(".featured_image image")
    .setAttribute("xlink:href", "img/img_template.jpg");

  // modify y position
  // clone.querySelector("line").setAttribute("y1", "265");
  // clone.querySelector(".featured_image").style.transform =
  //   "translateY(150px)";
  // clone.querySelector(".featured_symbol").style.transform =
  //   "translateY(150px)";
  // clone.querySelector(".featured circle").style.transform =
  //   "translateY(150px)";

  // append it destination
  document.querySelector("#canvas").appendChild(clone);

  symbolStart();
}

function mouseEnter(event) {
  console.log("mouseEnter");
  enter = event.target.dataset.mouseevent;
  document.querySelector("#" + enter).classList.add("hovercolor");
}

function mouseExit(event) {
  console.log("mouseExit");
  exit = event.target.dataset.mouseevent;
  document.querySelector("#" + exit).classList.remove("hovercolor");
}

// - - - - - mouseclick seasons event listers - - - - -

function mouseClick(event) {
  click = event.target.dataset.mouseevent;
  console.log("mouseClick");
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

function setExpanded(click) {
  console.log("setExpanded");
  // expand clicked
  document.querySelector("#" + click).classList.add("zoomview");
  document.querySelector("#" + click).classList.remove("compressed");
  closeOthers(click);
  setSeasonName(click);
}

function closeOthers(click) {
  // close all others but the clicked one
  const closeDivs = document.querySelectorAll("div:not(#" + click + ").season");
  closeDivs.forEach(el => {
    el.classList.remove("zoomview");
    el.classList.remove("overview");
    el.classList.add("compressed");
  });
}

function setSeasonName() {
  // change full name to number for compressed seasons
  const setSeasonNr = document.querySelectorAll(".compressed .season_nr");
  setSeasonNr.forEach(el => {
    el.textContent = el.textContent.slice(-1);
  });

  // set season to full text for expanded season
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

//  - - - - - - - - - slider overview state - - - - - - - - -

function timelineSlider() {
  console.log("timelineSlider");
  let episodeCount = parseInt(this.value);

  // get number of dead from json
  let dead;
  let deathCount = 4;
  let step;
  for (step = 0; step < episodeCount; step++) {
    dead = data["deaths"][step]["dead"];
    deathCount = deathCount + dead;
  }

  // set death counter i DOM
  document.querySelector("#deathcounter").textContent = deathCount;

  let sliderSeason = data["deaths"][step]["season"];
  setSliderColors(sliderSeason);
}

function setSliderColors(sliderSeason) {
  console.log("setSliderColors");
  // set death counter i DOM + color fadeout for seasons
  document.querySelector(sliderSeason).classList.add("hovercolor");
  setTimeout(function() {
    document.querySelector(sliderSeason).classList.remove("hovercolor");
  }, 3000);
}
