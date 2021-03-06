"use strict";

let click;
let enter;
let exit;
let data;
let seasonFixed;

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");
  document.querySelector("body").addEventListener("click", mouseClick);
  document.querySelector("#slider").addEventListener("input", timelineSlider);
  document.querySelector("#modal_box").addEventListener("click", closeModal);

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

// - - - - - - - load svg templates .....TODO: DRY this?? - - - - - - -

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
  // vars for json data
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
    imageClicked(fixedname, season);
  });

  // append it destination season div
  document.querySelector(`${season}`).appendChild(clone);
  symbolStart();
}

// - - - - - - - startanimation of symbols - - - - - - -

function symbolStart() {
  console.log("symbolStart");
  //zoom in effect
  const allStart = document.querySelectorAll(".featured");
  allStart.forEach(el => {
    el.classList.add("appear");
    setTimeout(function() {
      el.classList.remove("appear");
    }, 1000);
  });
  // hide lines
  const hideLines = document.querySelectorAll(".featured_line");
  hideLines.forEach(el => {
    el.classList.add("hidden");
  });
  //hide line stop
  const scaleStopes = document.querySelectorAll(".featured_stop");
  scaleStopes.forEach(el => {
    el.classList.add("small");
  });
}

// - - - - - mouseclick event listners - - - - -

function mouseClick(event) {
  // mouse click
  click = event.target.dataset.mouseevent;
  if (click != undefined && click.startsWith("season")) {
    setExpanded(click);
  }
  if (click === "close") {
    removeExpanded();
  }
}

// - - - - - mouseover event listners - - - - -

function mouseEnter(event) {
  // flip featured on mouse-enter
  enter = event.target.dataset.mouseevent;
  flip(enter);
}

function mouseExit(event) {
  // flip featured back on mouse-leave
  exit = event.target.dataset.mouseevent;
  removeExpandedImages(exit);
  stopBack(exit);
}

// - - - - - expand seasons - - - - -

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
  // set enlarged featured image
  const expandedImages = document.querySelectorAll("#" + click + " .featured");
  expandedImages.forEach(el => {
    el.classList.add("flipped_expanded");
  });
}

function showClose(click) {
  // show close-button
  console.log("showClose");
  document.querySelector("#" + click + " .close").classList.remove("hidden");
}

// - - - - - close seasons - - - - -

function removeExpanded() {
  // close season
  const closeAllSeasons = document.querySelectorAll(".season");
  closeAllSeasons.forEach(el => {
    el.classList.remove("zoomview");
    el.classList.remove("compressed");
    el.classList.add("overview");
  });
  resetSeasonName();
  hideClose();
}

function resetSeasonName() {
  // set season to full text for all seasons
  const resetSeasonName = document.querySelectorAll(".season_nr");
  setTimeout(function() {
    resetSeasonName.forEach(el => {
      el.textContent = "Season " + el.textContent.slice(-1);
    });
  }, 200);
}

function removeExpandedImages(click) {
  // remove enlarged featured image
  const expandedImages = document.querySelectorAll("#" + click + " .featured");
  expandedImages.forEach(el => {
    el.classList.remove("flipped_expanded");
  });
}

function hideClose(click) {
  // hide close-button
  console.log("hideClose");
  const closeButtons = document.querySelectorAll(".close");
  closeButtons.forEach(el => {
    el.classList.add("hidden");
  });
}

// - - - - - - - flip enter animation - - - - - - -

function flip(enter) {
  // flip image group
  const flipElements = document.querySelectorAll("#" + enter + " .featured");
  flipElements.forEach(el => {
    el.classList.add("flip");
  });
  // hide symbol half way on turn
  const hideSymbol = document.querySelectorAll(
    "#" + enter + " .featured_symbol"
  );
  hideSymbol.forEach(el => {
    el.classList.add("hide_symbol");
  });
  // draw line on animation end
  const flipEvent = document.querySelectorAll("#" + enter + " .featured");
  flipEvent.forEach(el => {
    el.addEventListener("animationend", drawLine(enter));
  });
}

function drawLine(enter) {
  // set flipped state for image group
  setTimeout(function() {
    const setFlipped = document.querySelectorAll("#" + enter + " .featured");
    setFlipped.forEach(el => {
      el.classList.remove("flip");
      el.classList.add("flipped");
    });
  }, 300);
  // draw line
  const drawTheLine = document.querySelectorAll(
    "#" + enter + " .featured_line"
  );
  drawTheLine.forEach(el => {
    el.classList.remove("hidden");
    el.classList.remove("lineback");
    el.classList.add("drawline");
  });
  // go to line stop after time
  setTimeout(function() {
    scaleStop(enter);
  }, 200);
}

function scaleStop(enter) {
  // line stop scale in animation
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
  // line stop scale animation state
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
  // line stop scale out animation
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
  // draw line back
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
  // remove flipped animation state & flip back
  const flipElementsBack = document.querySelectorAll("#" + exit + " .featured");
  flipElementsBack.forEach(el => {
    el.classList.remove("flipped");
    el.classList.add("flipback");
    setTimeout(function() {
      el.classList.remove("flipback");
    }, 200);
  });
  // show symbol on half way of animation
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

// - - - - - - - click on featued image - - - - - - -

function imageClicked(fixedname, season) {
  console.log("imageClicked");

  // open season if not open
  season = season.substring(1);
  console.log(season);
  setExpanded(season);

  // timeout for correct position in case of animation
  setTimeout(function() {
    modal(fixedname);
  }, 500);
}

function modal(fixedname) {
  // get content from json
  const featuredData = data.featured;
  console.log(featuredData);

  const dataObj = featuredData.filter(function(feature) {
    return feature.image === "img_" + fixedname + ".jpg";
  });
  console.log("dataObj er: ");
  console.log(dataObj);

  // set image
  document.querySelector("#modal #round").src = "img/img_" + fixedname + ".jpg";

  // show modal
  document.querySelector("#modal").classList.remove("hidden");

  // scale modal to view size animation
  document.querySelector("#modal_box").classList.add("scale");

  seasonFixed = dataObj[0]["season"].substr(1);
  console.log("seasonFixed");
  console.log(seasonFixed);

  document.querySelector("#modal_box h2").classList.add(`${seasonFixed}`);
  const colorH3 = document.querySelectorAll("#modal_box h3");
  colorH3.forEach(el => {
    el.classList.add(`${seasonFixed}`);
  });

  // get content from json
  document.querySelector("#modal_box #episode").textContent =
    "Episode: " + dataObj[0]["episode"];
  document.querySelector("#modal_box #name").textContent = dataObj[0]["name"];
  document.querySelector("#modal_box #assailant").textContent =
    dataObj[0]["assailant"];
  document.querySelector("#modal_box #method").textContent =
    dataObj[0]["method"];
  document.querySelector("#modal_box #description").textContent =
    dataObj[0]["description"];
}

function closeModal() {
  // show modal
  document.querySelector("#modal").classList.add("hidden");

  // scale modal to view size animation
  document.querySelector("#modal_box").classList.remove("scale");

  document.querySelector("#modal_box h2").classList.remove(`${seasonFixed}`);
  const colorH3 = document.querySelectorAll("#modal_box h3");
  colorH3.forEach(el => {
    el.classList.remove(`${seasonFixed}`);
  });
}

//  - - - - - - - - - slider - - - - - - - - -

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
  document.querySelector("#deathfigure").textContent = deathCount;
  let sliderSeason = data["deaths"][step]["season"];
  setSliderColors(sliderSeason);
}

function setSliderColors(sliderSeason) {
  // set death counter i DOM + color fadeout for seasons
  document.querySelector(sliderSeason).classList.add("hovercolor");
  setTimeout(function() {
    document.querySelector(sliderSeason).classList.remove("hovercolor");
  }, 3000);
}
