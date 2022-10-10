const body = document.body;
const header = document.querySelector("header#page-initial");
const headerSecondary = document.querySelector("header#secondary-page");
const switchDisplay = document.querySelectorAll('.page-display');
const main = document.querySelector('main');
const divHeightAnimation = document.getElementById('height-animation');
const opacity = document.querySelectorAll('.page-opacity');
const textSecondary1 = document.getElementById('secondary-text-1');
const textSecondary2 = document.getElementById('secondary-text-2');
const music = document.getElementById('music');
const volume = document.getElementById('volume');
const effectCave = document.getElementById('effect-cave');
const effectWind = document.getElementById('effect-wind');
const effectRotate = document.getElementById('effect-rotate');
const sectionYears = document.getElementById('section-years');
let play = false;
let scrolled = false;


function travel() {
  body.classList.toggle("entry-effect");
  
  music.pause();
  effectCave.volume = 1;
  effectCave.play();
  
  setTimeout(() => {
    body.classList.toggle("entry-effect");
    music.src = "assets/audio/music-theme-2.mp3";
    music.play();
    
    header.classList.add('page-display');
    headerSecondary.classList.remove('page-display');
    divHeightAnimation.classList.remove('page-display');
    body.style.overflowY = 'auto';
    
    
    setTimeout(() => {
      switchDisplay.forEach(item => {
        item.classList.remove('page-display');
      });
    }, 1800);  
  }, 1400);
}

splitLetters();
function splitLetters() {
  const text = document.querySelector("#header-content p");
  const letters = text.innerHTML.split("");
  text.innerHTML = "";

  letters.forEach((letter) => {
    letter !== " "
      ? (text.innerHTML += `<span class="letter-span">${letter}</span>`)
      : (text.innerHTML += "  ");
  });

  let vetWords = text.innerHTML.split("  ");
  text.innerHTML = "";
  vetWords.forEach((word) => {
    text.innerHTML += `<div class="word">${word}</div>`;
    text.innerHTML += " ";
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

const image = document.querySelector("#header-content img");

image.addEventListener("mouseover", switchLogo);
image.addEventListener("mouseout", switchLogo);
function switchLogo() {
  if (image.getAttribute("src") === "assets/images/dark-logo-invert.jpg") {
    image.src = "assets/images/dark-logo.jpg";
  } else if (image.getAttribute("src") === "assets/images/dark-logo.jpg") {
    image.src = "assets/images/dark-logo-invert.jpg";
  }
}

rotateWithScroll()
function rotateWithScroll(){
  if(scrolled === false) window.addEventListener('scroll', rotateHeader);
}

function rotateHeader(e){
  e.preventDefault();
  
  if(scrolled === false){
    scrolled = true;
    if(window.scrollY > 0){
      window.scroll(0, 0);
      headerSecondary.classList.toggle('secondary-rotate-page');
      textSecondary1.classList.toggle('text-scale');
      textSecondary2.classList.toggle('text-scale');

      effectRotate.volume = 1;
      effectRotate.play();
      
      setTimeout(() => {
        headerSecondary.style.position = 'static';

        opacity.forEach(item => item.classList.remove('page-opacity'));
        window.scroll(0, 0);
      }, 3000);
    }
  }
}

body.addEventListener('click', playMusic)
function playMusic(){
  if(play === false){
    music.play();
    volume.setAttribute('active', 'yes');
    switchVolume();
    music.volume = 0.1;
    play = true;
  }
}

volume.addEventListener('click', switchVolume);
function switchVolume(){
  const volumeIcon = volume.children[0];
  
  if(volume.getAttribute('active') === 'yes'){
    volumeIcon.src = 'assets/images/volume-on.png';
    music.play();
    volume.setAttribute('active', 'not');
  }else{
    volumeIcon.src = 'assets/images/volume-off.png';
    music.pause();
    volume.setAttribute('active', 'yes');
  }
}

const yearsSymbol = document.querySelectorAll('#section-years #symbol-years button');
const  imgSymbol = document.getElementById('img-symbol');
let click = false;

yearsSymbol.forEach(year => year.addEventListener('mouseover', hoverYears));
yearsSymbol.forEach(year => year.addEventListener('mouseout', outYears));
yearsSymbol.forEach(year => year.addEventListener('click', clickYears));


function hoverYears(){
  if(click === false){
    if(this.id === 'year-2019'){
      sectionYears.classList.add('y-2019');
      imgSymbol.style.transform = 'rotate3d(1, 0, 0, 30deg)';
    }else if(this.id === 'year-1986'){
      sectionYears.classList.add('y-1986');
      imgSymbol.style.transform = 'rotate3d(1, -1, 0, 30deg)';
    }else if(this.id === 'year-1953'){
      sectionYears.classList.add('y-1953');
      imgSymbol.style.transform = 'rotate3d(1, 1, 0, 30deg)';
    }   
  }
}

function outYears(){
  if(click === false){
  imgSymbol.style.transform = 'rotate3d(0, 0, 0, 0)';
  setTimeout(() => {
      if(this.id === 'year-2019'){
        sectionYears.classList.remove('y-2019');
      }else if(this.id === 'year-1986'){
        sectionYears.classList.remove('y-1986');
      }else if(this.id === 'year-1953'){
        sectionYears.classList.remove('y-1953');
      }
    }, 300);
  }
}

const cube =  document.querySelector('.cube');
let arrowAnimation;
function clickYears(){
  click = true;
  effectWind.volume = 1;
  effectWind.play();
  imgSymbol.style.animation = 'rotate-symbol 5s forwards';
  yearsSymbol.disabled = true;
  let idArrow = this.id;
  let subArrow = idArrow.substr(5);
  arrowAnimation = document.getElementById('arrow-'+subArrow);
  arrowAnimation.classList.add('arrow-animation');
  setTimeout(() => {
    if(this.id === 'year-2019'){
      sectionYears.classList.add('y-2019');
      sectionYears.classList.add('face-front-top');
      cube.style.transform = 'rotateX(-90deg)';
    }else if(this.id === 'year-1986'){
      if(sectionYears.classList.contains('face-front-top')){
        sectionYears.classList.remove('face-front-top');
      }
      sectionYears.classList.add('y-1986');
      cube.style.transform = 'rotateY(-90deg)';
    }else if(this.id === 'year-1953'){
      if(sectionYears.classList.contains('face-front-top')){
        sectionYears.classList.remove('face-front-top');
      }
      sectionYears.classList.add('y-1953');
      cube.style.transform = 'rotateY(90deg)';
    }
  }, 1000);

  setTimeout(() => {
    sectionYears.classList.remove('y-2019');
    sectionYears.classList.remove('y-1986');
    sectionYears.classList.remove('y-1953');
    imgSymbol.style.animation = 'none';
    yearsSymbol.disabled = false;
    click = false;
  }, 5000);
}

const arrows = document.querySelectorAll('.arrow');
arrows.forEach(arrow => arrow.addEventListener('click', arrowBack));

function arrowBack(){
  imgSymbol.style.transform = 'rotate3d(0, 0, 0, 0)';
  cube.style.transform = 'rotateX(0)';
  imgSymbol.style.animation = 'rotate-symbol 5s forwards';
  effectWind.volume = 1;
  effectWind.play();
  arrowAnimation.classList.remove('arrow-animation');

  setTimeout(() => {
    imgSymbol.style.animation = 'none';
  }, 5000);
}