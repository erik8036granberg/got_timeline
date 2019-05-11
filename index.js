"use strict";

let click;
let enter;
let exit;
let data;

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");
  document.querySelector("body").addEventListener("click", mouseClick);
  document.querySelector("#slider").addEventListener("input", timelineSlider);

  // mouseover eventlistners
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
      loadSVGtemplate1();
    });
}

// - - - - - - - load svg templates .....TODO: DRY this - - - - - - -

function loadSVGtemplate1() {
  fetch("img/template_1.svg")
    .then(response => response.text())
    .then(svgdata => {
      console.log("loadSVGtemplate_1");
      document.querySelector("#temp").insertAdjacentHTML("afterbegin", svgdata);
      loadSVGtemplate2();
    });
}

function loadSVGtemplate2() {
  fetch("img/template_2.svg")
    .then(response => response.text())
    .then(svgdata => {
      console.log("loadSVGtemplate_2");
      document.querySelector("#temp").insertAdjacentHTML("afterbegin", svgdata);
      loadSVGtemplate3();
    });
}

function loadSVGtemplate3() {
  fetch("img/template_3.svg")
    .then(response => response.text())
    .then(svgdata => {
      console.log("loadSVGtemplate_3");
      document.querySelector("#temp").insertAdjacentHTML("afterbegin", svgdata);
      loadSVGtemplate4();
    });
}

function loadSVGtemplate4() {
  fetch("img/template_4.svg")
    .then(response => response.text())
    .then(svgdata => {
      console.log("loadSVGtemplate_4");
      document.querySelector("#temp").insertAdjacentHTML("afterbegin", svgdata);
      loadSVGtemplate5();
    });
}

function loadSVGtemplate5() {
  fetch("img/template_5.svg")
    .then(response => response.text())
    .then(svgdata => {
      console.log("loadSVGtemplate_5");
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
  let fixedname;
  const name = featuredDeaths.name;
  const symbol = featuredDeaths.symbol;
  const image = featuredDeaths.image;
  const position = featuredDeaths.position;
  const season = featuredDeaths.season;
  const episode = featuredDeaths.episode;
  const time = featuredDeaths.time;
  const length = featuredDeaths.length;

  // make a clone
  const template = document.querySelector(`#template_${position}`);
  const clone = template.cloneNode(true);

  // set id & title
  fixedname = name
    .split(" ")
    .join("_")
    .toLowerCase();

  clone.id = fixedname;

  clone.querySelector("title").textContent = name;

  // set symbol path
  clone
    .querySelector(".featured_symbol image")
    .setAttribute("xlink:href", `img/${symbol}`);

  // set image path
  clone
    .querySelector(".featured_image image")
    .setAttribute("xlink:href", `img/${image}`);

  // calculate timeline position i season
  const timeline_pos = episode * (10 - 1) + (time * 10) / length;
  console.log(timeline_pos + "%");
  clone.style.left = `calc(${timeline_pos}% - 65px)`;

  // add eventlistners
  clone.addEventListener("click", () => {
    imageClicked(fixedname, season, time);
  });

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
    setTimeout(function() {
      el.classList.remove("appear");
    }, 1000);
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
  enter = event.target.dataset.mouseevent;
  flip(enter);
}

function mouseExit(event) {
  exit = event.target.dataset.mouseevent;
  removeExpandedImages(exit);
  stopBack(exit);
}

// - - - - - - - click on image - - - - - - -

function imageClicked(fixedname, season, time) {
  console.log("imageClicked");

  setTimeout(infobox(fixedname), 500);

  // open season
  season = season.substring(1);
  console.log(season);
  setExpanded(season);
}

function infobox(fixedname) {
  // get posotion of clicked image after animation
  const clickedPosition = document
    .querySelector("#" + fixedname + " .featured")
    .getBoundingClientRect();
  console.log(clickedPosition);

  if (fixedname === "eddard_stark") {
    document.querySelector("#infobox_eddard").classList.remove("hidden");
  }

  if (fixedname === "viserys_targaryen") {
    document.querySelector("#infobox_targaryen").classList.remove("hidden");
  }

  // calculate centerpoint
  const x_pos = clickedPosition.x;
  const y_pos = clickedPosition.y;
  console.log(x_pos);
  console.log(y_pos);
}

// - - - - - - - flip enter animation - - - - - - -

function flip(enter) {
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
  setTimeout(function() {
    const setFlipped = document.querySelectorAll("#" + enter + " .featured");
    setFlipped.forEach(el => {
      el.classList.remove("flip");
      el.classList.add("flipped");
    });
  }, 300);
  const drawTheLine = document.querySelectorAll(
    "#" + enter + " .featured_line"
  );
  drawTheLine.forEach(el => {
    el.classList.remove("hidden");
    el.classList.remove("lineback");
    el.classList.add("drawline");
  });
  setTimeout(function() {
    scaleStop(enter);
  }, 200);
}

function scaleStop(enter) {
  const scaleDot = document.querySelectorAll("#" + enter + " .featured_stop");
  scaleDot.forEach(el => {
    el.classList.add("scalein");
  });
  const stopScale = document.querySelectorAll("#" + enter + " .featured_stop");
  stopScale.forEach(el => {
    el.addEventListener("animationend", scaledIn(enter));
  });
}

function scaledIn(enter) {
  const scaledInDone = document.querySelectorAll(
    "#" + enter + " .featured_stop"
  );
  scaledInDone.forEach(el => {
    el.classList.remove("scalein");
    el.classList.add("scaledin");
  });
}
// - - - - - - - flip back animation - - - - - - -

function stopBack(exit) {
  const scaleDotDown = document.querySelectorAll(
    "#" + exit + " .featured_stop"
  );
  scaleDotDown.forEach(el => {
    el.classList.remove("scalein");
    el.classList.remove("scaledin");
    el.classList.add("scaleout");
  });
  const scaleOut = document.querySelectorAll("#" + exit + " .featured_stop");
  scaleOut.forEach(el => {
    el.addEventListener("animationend", removeLine(exit));
  });
}

function removeLine(exit) {
  const removeTheLine = document.querySelectorAll(
    "#" + exit + " .featured_line"
  );
  removeTheLine.forEach(el => {
    el.classList.remove("drawline");
    el.classList.add("lineback");
  });
  setTimeout(function() {
    flipBack(exit);
  }, 300);
}

function flipBack(exit) {
  const flipElementsBack = document.querySelectorAll("#" + exit + " .featured");
  flipElementsBack.forEach(el => {
    el.classList.remove("flipped");
    el.classList.add("flipback");
    setTimeout(function() {
      el.classList.remove("flipback");
    }, 200);
  });
  const showSymbol = document.querySelectorAll(
    "#" + exit + " .featured_symbol"
  );
  showSymbol.forEach(el => {
    el.classList.remove("hide_symbol");
    el.classList.add("show_symbol");
    setTimeout(function() {
      el.classList.remove("show_symbol");
    }, 200);
  });
}

// - - - - - mouseclick event listners - - - - -

function mouseClick(event) {
  click = event.target.dataset.mouseevent;
  if (click != undefined && click.startsWith("season")) {
    event.preventDefault();
    setExpanded(click);
  }

  if (click === "close") {
    const closeAllSeasons = document.querySelectorAll(".season");
    closeAllSeasons.forEach(el => {
      el.classList.remove("zoomview");
      el.classList.remove("compressed");
      el.classList.add("overview");
    });
    const closeButtons = document.querySelectorAll(".close");
    closeButtons.forEach(el => {
      el.classList.add("hidden");
    });
  }
}

function setExpanded(click) {
  // expand clicked
  document.querySelector("#" + click).classList.add("zoomview");
  document.querySelector("#" + click).classList.remove("overview");
  document.querySelector("#" + click).classList.remove("compressed");
  closeOthers(click);
  setSeasonName(click);
  setExpandedImages(click);
  showClose(click);
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

function setSeasonName(click) {
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

function setExpandedImages(click) {
  const expandedImages = document.querySelectorAll("#" + click + " .featured");
  expandedImages.forEach(el => {
    el.classList.add("flipped_expanded");
  });
}

function removeExpandedImages(click) {
  const expandedImages = document.querySelectorAll("#" + click + " .featured");
  expandedImages.forEach(el => {
    el.classList.remove("flipped_expanded");
  });
}

function showClose(click) {
  console.log("showClose");
  document.querySelector("#" + click + " .close").classList.remove("hidden");
}

function hideClose(click) {
  console.log("showClose");
  document.querySelector("#" + click + " .close").classList.remove("hidden");
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
