let gameseq = [];
let userseq = [];
let start = false;
let level = 0;
let btns = ["one", "two", "three", "four"];

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (start == false) {
    start = true;
    levelUp();
  }
});

document.addEventListener(
  "touchstart",
  function () {
    setTimeout(() => {
      if (start == false) {
        start = true;
        levelUp();
      }
    }, 1000);
  },
  { passive: false }
);

function levelUp() {
  userseq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let rand = Math.floor(Math.random() * 3);
  let randColor = btns[rand];
  let randBtn = document.querySelector(`.${randColor}`);
  gameseq.push(randColor);
  btnFlash(randBtn);
}

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

let btn;
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", function () {
    let Btn = this;
    userFlash(Btn);
    let userColor = this.getAttribute("id");
    userseq.push(userColor);
    checkAns(userseq.length - 1);
  });
}

function checkAns(idx) {
  if (gameseq[idx] == userseq[idx]) {
    if (gameseq.length == userseq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    score.push(level);
    h2.innerHTML = `Game Over!<b> Your score was ${level}</b><br>Press any key or any where to start.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 200);
    reset();

    scoring(level);
  }
}

function reset() {
  start = false;
  gameseq = [];
  userseq = [];
  level = 0;
}

let score = [];

function scoring(level) {
  let h3 = document.querySelector("h3");
  if (!h3) {
    h3 = document.createElement("h3");
    document.body.appendChild(h3);
  }
  const highestScore = Math.max(...score);
  h3.innerText = `Highest Score: ${highestScore}`;
}
