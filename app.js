let gameSeq = [];
let userSeq = [];
let colors = ["red", "yellow", "green", "blue"];

let started = false;
let level = 0;
let highScore = 1;
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
document.addEventListener("keypress", function () {
  if (!started) {
    console.log("game started");
    started = true;
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 200);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 200);
}

function levelUp() {
  userSeq = [];
  level++;
  if (level >= highScore) {
    highScore = level;
  }
  h2.innerText = `level ${level}`;
  let randIdx = Math.floor(Math.random() * 3);
  let randCol = colors[randIdx];
  let randBtn = document.querySelector(`.${randCol}`);
  gameSeq.push(randCol);
  console.log(gameSeq);
  gameFlash(randBtn);
}

function checkSeq(curIndx) {
  //function to check the sequence of colors pressed by user
  if (gameSeq[curIndx] === userSeq[curIndx]) {
    if (gameSeq.length == userSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `GAME OVER!! <br>Your score was <b>${level}</b> <br>Press any key to start!`;
    h3.innerHTML =`HIGHEST SCORE : ${highScore}`;
    h2.classList.add("wrngflash");
    let wrongCol = document.querySelector(`.${userSeq[curIndx]}`);
    wrongCol.classList.add("wrngflash");
    setTimeout(function () {
      wrongCol.classList.remove("wrngflash");
      h2.classList.remove("wrngflash");
    }, 200);
    reset();
  }
}

//for btn pressed by user
function btnPress() {
  let btn = this;
  userFlash(btn);
  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkSeq(userSeq.length - 1);
}

//to access the colors-buttons
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
