const body = document.body;
const buttonSwitchPage = document.getElementById("switch-page");
const header = document.querySelector("header#page-initial");
const headerSecondary = document.querySelector("header#secondary-page");
const switchDisplay = document.querySelectorAll(".page-display");
const main = document.querySelector("main");
const divHeightAnimation = document.getElementById("height-animation");
const opacity = document.querySelectorAll(".page-opacity");
const textSecondary1 = document.getElementById("secondary-text-1");
const textSecondary2 = document.getElementById("secondary-text-2");
const music = document.getElementById("music");
const volume = document.getElementById("volume");
const volumeIcon = volume.children[0];
const effectCave = document.getElementById("effect-cave");
const effectWind = document.getElementById("effect-wind");
const effectRotate = document.getElementById("effect-rotate");
const sectionYears = document.getElementById("section-years");
const image = document.querySelector("#header-content img");
const arrows = document.querySelectorAll(".arrow");
const cube = document.querySelector(".cube");
const yearsSymbol = document.querySelectorAll("#section-years #symbol-years button");
const imgSymbol = document.getElementById("img-symbol");
let click = false;
let play = false;
let scrolled = false;
let scrollMain = false;
let arrowAnimation;
let clickTravel = false;

buttonSwitchPage.addEventListener("click", travel);
function travel() {
  if(clickTravel === false){
    clickTravel = true;
    play = true;
    body.classList.toggle("entry-effect");

    music.pause();
    playAudio(effectCave);

    setTimeout(() => {
      body.classList.toggle("entry-effect");
      music.src = "assets/audio/music-theme-2.mp3";
    
      volumeIcon.src = "assets/images/symbols/volume-on.png";
      playAudio(music);
      volume.setAttribute("active", "not");
    
      header.classList.add("page-display");
      headerSecondary.classList.remove("page-display");
      divHeightAnimation.classList.remove("page-display");

      setTimeout(() => {
        body.style.overflowY = "auto";
        switchDisplay.forEach((item) => {
          item.classList.remove("page-display");
        });
      }, 1800);
    }, 1400);
  }
}

splitLetters();
function splitLetters() {
  const text = document.querySelector("#header-content p");
  const letters = text.innerHTML.split("");
  text.innerHTML = "";

  letters.forEach((letter) => {
    letter !== " "
      ? (text.innerHTML += `<span class="letter-span">${letter}</span>`)
      : (text.innerHTML += "<span>&nbsp;</span>");
  });

  let vetWords = text.innerHTML.split("<span>&nbsp;</span>");
  text.innerHTML = "";
  vetWords.forEach((word) => {
    text.innerHTML += `<div class="word">${word}</div>`;
    text.innerHTML += "<span>&nbsp;</span>";
  });

  const newLetters = text.querySelectorAll(".letter-span");

  invertLetters(newLetters);
  setInterval(() => {
    invertLetters(newLetters);
  }, 6000);
}

function invertLetters(letters) {
  try {
    let random = getVectorRandom(letters);

    random.forEach((number) => letters[number].classList.add("invert-letter"));

    setTimeout(() => {
      random.forEach((number) => {
        letters[number].classList.remove("invert-letter");
      });
    }, 7000);
  } catch (e) {}
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getVectorRandom(letters) {
  let random = [];
  for (let i = 0; i < parseInt(letters.length / 5); i++) {
    random[i] = getRandomInt(0, letters.length);
  }
  return random;
}

image.addEventListener("mouseover", switchLogo);
image.addEventListener("mouseout", switchLogo);

function switchLogo() {
  if (image.getAttribute("src") === "assets/images/logo/dark-logo-invert.jpeg") {
    image.src = "assets/images/logo/dark-logo.jpeg";
  } else if (image.getAttribute("src") === "assets/images/logo/dark-logo.jpeg") {
    image.src = "assets/images/logo/dark-logo-invert.jpeg";
  }
}

window.addEventListener("scroll", rotateHeader);

function rotateHeader(e) {
  e.preventDefault();

  if (scrolled === false) {
    scrolled = true;
    if (window.scrollY > 0) {
      window.scroll(0, 0);
      headerSecondary.classList.toggle("secondary-rotate-page");
      textSecondary1.classList.toggle("text-scale");
      textSecondary2.classList.toggle("text-scale");

      playAudio(effectRotate);

      setTimeout(() => {
        headerSecondary.style.position = "static";
        scrollMain = true;
        opacity.forEach((item) => item.classList.remove("page-opacity"));
        window.scroll(0, 0);
      }, 3000);
    }
  } else if (scrolled === true && scrollMain === true) {
    if (window.scrollY > 0 && window.scrollY < main.offsetTop/2) {
      scrollMain = false;
      window.scroll(0, main.offsetTop);

      setTimeout(() => {
        scrollMain = true;
      }, 50);
    } else if(window.scrollY >= main.offsetTop/2 && window.scrollY <= main.offsetTop){
      scrollMain = false;
      window.scroll(0, 0);

      setTimeout(() => {
        scrollMain = true;
      }, 50);
    }
  }
}

body.addEventListener("click", playMusic);
function playMusic(e) {
  if (play === false) {
    volume.setAttribute("active", "yes");
    switchVolume();
    play = true;
  }
}

function playAudio(audio) {
  audio.volume = 1;
  audio.play();
}

volume.addEventListener("click", switchVolume);
function switchVolume() {

  if (volume.getAttribute("active") === "yes") {
    volumeIcon.src = "assets/images/symbols/volume-on.png";
    playAudio(music);
    volume.setAttribute("active", "not");
  } else {
    volumeIcon.src = "assets/images/symbols/volume-off.png";
    music.pause();
    volume.setAttribute("active", "yes");
  }
}

yearsSymbol.forEach((year) => year.addEventListener("mouseover", hoverYears));
yearsSymbol.forEach((year) => year.addEventListener("mouseout", outYears));
yearsSymbol.forEach((year) => year.addEventListener("click", clickYears));

function hoverYears() {
  if (click === false) {
    if (this.id === "year-2019") {
      sectionYears.classList.add("y-2019");
      imgSymbol.style.transform = "rotate3d(1, 0, 0, 30deg)";
    } else if (this.id === "year-1986") {
      sectionYears.classList.add("y-1986");
      imgSymbol.style.transform = "rotate3d(1, -1, 0, 30deg)";
    } else if (this.id === "year-1953") {
      sectionYears.classList.add("y-1953");
      imgSymbol.style.transform = "rotate3d(1, 1, 0, 30deg)";
    }
  }
}

function outYears() {
  if (click === false) {
    imgSymbol.style.transform = "rotate3d(0, 0, 0, 0)";
    setTimeout(() => {
      if (this.id === "year-2019") {
        sectionYears.classList.remove("y-2019");
      } else if (this.id === "year-1986") {
        sectionYears.classList.remove("y-1986");
      } else if (this.id === "year-1953") {
        sectionYears.classList.remove("y-1953");
      }
    }, 300);
  }
}

function clickYears() {
  let idArrow = this.id;
  let subArrow = idArrow.substr(5);
  arrowAnimation = document.getElementById("arrow-" + subArrow);
  click = true;

  imgSymbol.style.animation = "rotate-symbol 5s forwards";
  yearsSymbol.disabled = true;
  body.style.overflowY = "hidden";
  arrowAnimation.classList.add("arrow-animation");
  playAudio(effectWind);

  setTimeout(() => {
    if (this.id === "year-2019") {
      sectionYears.classList.add("y-2019");
      sectionYears.classList.add("face-front-top");
      cube.style.transform = "rotateX(-90deg)";
    } else if (this.id === "year-1986") {
      if (sectionYears.classList.contains("face-front-top")) {
        sectionYears.classList.remove("face-front-top");
      }
      sectionYears.classList.add("y-1986");
      cube.style.transform = "rotateY(-90deg)";
    } else if (this.id === "year-1953") {
      if (sectionYears.classList.contains("face-front-top")) {
        sectionYears.classList.remove("face-front-top");
      }
      sectionYears.classList.add("y-1953");
      cube.style.transform = "rotateY(90deg)";
    }
  }, 1000);

  setTimeout(() => {
    sectionYears.classList.remove("y-2019");
    sectionYears.classList.remove("y-1986");
    sectionYears.classList.remove("y-1953");
    imgSymbol.style.animation = "none";
    yearsSymbol.disabled = false;
    click = false;
  }, 5000);
}

arrows.forEach((arrow) => arrow.addEventListener("click", arrowBack));

function arrowBack() {
  imgSymbol.style.transform = "rotate3d(0, 0, 0, 0)";
  cube.style.transform = "rotateX(0)";
  imgSymbol.style.animation = "rotate-symbol 5s forwards";
  arrowAnimation.classList.remove("arrow-animation");
  playAudio(effectWind);

  setTimeout(() => {
    imgSymbol.style.animation = "none";
    body.style.overflowY = "auto";
  }, 5000);
}