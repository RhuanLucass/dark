const body = document.body;
const header = document.querySelector("header#page-initial");
const headerSecondary = document.querySelector("header#page-secondary");
const switchDisplay = document.querySelectorAll('.page-display');
splitLetters();
function travel() {
  body.classList.toggle("entry-effect");
  setTimeout(() => {
    body.classList.toggle("entry-effect");
    
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

function splitLetters() {
  const text = document.querySelector("#header-content p");
  const letters = text.innerHTML.split("");
  text.innerHTML = "";

  letters.forEach((letter) => {
    letter !== " "
      ? (text.innerHTML += `<span class="letter-span">${letter}</span>`)
      : (text.innerHTML += "  ");
  });

  var vetWords = text.innerHTML.split("  ");
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
    var random = getVectorRandom(letters);

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
  var random = [];
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


// 3s
// Definir tamanho do header
// rolar direto para o final
// desativar fixed

const main = document.querySelector('main');
const divHeightAnimation = document.getElementById('height-animation');
const opacity = document.querySelectorAll('.page-opacity');
var scrolled = false;

if(scrolled === false) 
window.addEventListener('scroll', rotateHeader)

function rotateHeader(e){
  e.preventDefault();
  
  if(scrolled === false){
    scrolled = true;
    if(window.scrollY > 0){
      window.scroll(0, 0)
      headerSecondary.classList.toggle('rotate-page-secondary');

      
      setTimeout(() => {
        headerSecondary.style.position = 'static';

        opacity.forEach(item => item.classList.remove('page-opacity'));
        window.scroll(0, 0);
      }, 3000);
    }
  }
}

// function smoothScrollTo(endX, endY, duration) {
//   const startX = window.scrollX || window.pageXOffset;
//   const startY = window.scrollY || window.pageYOffset;
//   const distanceX = endX - startX;
//   const distanceY = endY - startY;
//   const startTime = new Date().getTime();

//   duration = typeof duration !== "undefined" ? duration : 400;

//   // Easing function
//   const easeInOutQuart = (time, from, distance, duration) => {
//     if ((time /= duration / 2) < 1)
//       return (distance / 2) * time * time * time * time + from;
//     return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
//   };

//   const timer = setInterval(() => {
//     const time = new Date().getTime() - startTime;
//     const newX = easeInOutQuart(time, startX, distanceX, duration);
//     const newY = easeInOutQuart(time, startY, distanceY, duration);
//     if (time >= duration) {
//       clearInterval(timer);
//     }
//     window.scroll(newX, newY);
//   }, 1000 / 60); // 60 fps
// }