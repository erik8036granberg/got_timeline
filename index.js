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
      loadSVGtemplate();
    });
}

function loadSVGtemplate() {
  fetch("img/template.svg")
    .then(response => response.text())
    .then(svgdata => {
      console.log("loadSVGtemplate");
      document.querySelector("#temp").insertAdjacentHTML("afterbegin", svgdata);
      getFeatured();
    });
}

function getFeatured() {
  console.log("getFeatured");
  const featuredDeaths = data["featured"];
  console.log(featuredDeaths);
  featuredDeaths.forEach(cloneFeatured);
}

function cloneFeatured(featuredDeaths) {
  console.log("cloneFeatured");
  const name = featuredDeaths.name;
  const symbol = featuredDeaths.symbol;
  const image = featuredDeaths.image;
  const position = featuredDeaths.position;
  const season = featuredDeaths.season;
  const episode = featuredDeaths.episode;
  const time = featuredDeaths.time;
  const length = featuredDeaths.length;

  // make a clone
  const template = document.querySelector("#template");
  const clone = template.cloneNode(true);

  // set id & title
  clone.id = name
    .split(" ")
    .join("_")
    .toLowerCase();
  clone.querySelector("title").textContent = name;

  // set symbol path
  clone
    .querySelector(".featured_symbol image")
    .setAttribute("xlink:href", `img/${symbol}`);

  // set image path
  clone
    .querySelector(".featured_image image")
    .setAttribute("xlink:href", `img/${image}`);

  // set y-height based of 1-5 presets in json
  let line_pos;
  let img_pos;
  console.log(position);

  if (position == 1) {
    line_pos = 65;
    img_pos = -50;
    console.log("1 set");
  }
  if (position == 2) {
    line_pos = 115;
    img_pos = 0;
    console.log("2 set");
  }
  if (position == 3) {
    line_pos = 165;
    img_pos = 50;
    console.log("2 set");
  }
  if (position == 4) {
    line_pos = 215;
    img_pos = 100;
    console.log("4 set");
  }
  if (position == 5) {
    line_pos = 265;
    img_pos = 150;
    console.log("5 set");
  }

  // set y-position i svg
  clone.querySelector("line").setAttribute("y1", `${line_pos}`);
  clone.querySelector(
    ".featured_image"
  ).style.transform = `translateY(${img_pos}px)`;
  clone.querySelector(
    ".featured_symbol"
  ).style.transform = `translateY(${img_pos}px)`;
  clone.querySelector(
    ".featured circle"
  ).style.transform = `translateY(${img_pos}px)`;

  // calculate timeline position i season
  const timeline_pos = episode * 10 - 1 + (time * 10) / length;
  console.log(timeline_pos + "%");
  clone.style.left = `calc(${timeline_pos}% - 75px)`;

  // append it destination season div
  document.querySelector(`${season}`).appendChild(clone);

  symbolStart();
}

// - - - - - - - startanimation of symbols - - - - - - -

function symbolStart() {
  console.log("symbolStart");
  const allStart = document.querySelectorAll(".featured");
  allStart.forEach(el => {
    el.classList.add("appear");
  });
  const hideLines = document.querySelectorAll(".featured_line");
  hideLines.forEach(el => {
    el.classList.add("hidden");
  });
  const scaleStopes = document.querySelectorAll(".featured_stop");
  scaleStopes.forEach(el => {
    el.classList.add("small");
  });
}

// - - - - - mouseover event listners - - - - -

function mouseEnter(event) {
  console.log("mouseEnter");
  enter = event.target.dataset.mouseevent;
  if (enter != undefined && enter.startsWith("season")) {
    document.querySelector("#" + enter).classList.add("hovercolor");
    flip(enter);
  }
}

function mouseExit(event) {
  console.log("mouseExit");
  exit = event.target.dataset.mouseevent;
  if (exit != undefined && exit.startsWith("season")) {
    document.querySelector("#" + exit).classList.remove("hovercolor");
    flipBack(exit);
  }
}

// - - - - - - - flip enter animation - - - - - - -

function flip(enter) {
  console.log("flip");

  const flipElements = document.querySelectorAll("#" + enter + " .featured");
  flipElements.forEach(el => {
    el.classList.add("flip");
  });
  const hideSymbol = document.querySelectorAll(
    "#" + enter + " .featured_symbol"
  );
  hideSymbol.forEach(el => {
    el.classList.add("hide_symbol");
  });
  const flipEvent = document.querySelectorAll("#" + enter + " .featured");
  flipEvent.forEach(el => {
    el.addEventListener("animationend", drawLine(enter));
  });
}

function drawLine(enter) {
  console.log("drawLine");
  const drawTheLine = document.querySelectorAll(
    "#" + enter + " .featured_line"
  );
  drawTheLine.forEach(el => {
    el.classList.remove("hidden");
    el.classList.add("line");
  });
  setTimeout(function() {
    scaleStop(enter);
  }, 200);
}

function scaleStop(enter) {
  console.log("scaleStop");
  const scaleDot = document.querySelectorAll("#" + enter + " .featured_stop");
  scaleDot.forEach(el => {
    el.classList.remove("small");
  });
}

// - - - - - mouseclick event listners - - - - -

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
