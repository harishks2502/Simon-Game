let gameSequence = [];

let userSequence = [];

let buttons = ["color-one", "color-two", "color-three", "color-four"];

let started = false;

let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    started = true;

    levelUp();
  }
});

function levelUp() {
  userSequence = [];

  level++;

  h2.innerText = `Level ${level}`;

  let randomIndex = Math.floor(Math.random() * 4);

  let randomColor = buttons[randomIndex];
  gameSequence.push(randomColor);

  let randomButton = document.querySelector(`.${randomColor}`);

  gameFlash(randomButton);
}

function gameFlash(button) {
  button.classList.add("flash");

  setTimeout(function () {
    button.classList.remove("flash");
  }, 250);
}

let allButtons = document.querySelectorAll(".button");
for (button of allButtons) {
  button.addEventListener("click", buttonPress);
}

function buttonPress() {
  let button = this;
  userFlash(button);

  let userColor = button.getAttribute("id");
  userSequence.push(userColor);

  checkAnswer(userSequence.length - 1);
}

function userFlash(button) {
  button.classList.add("userFlash");

  setTimeout(function () {
    button.classList.remove("userFlash");
  }, 250);
}

function checkAnswer(index) {
  if (userSequence[index] === gameSequence[index]) {
    if (userSequence.length == gameSequence.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your Score was ${level} </br> Press any key to start again.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 250);
    reset();
  }
}

function reset() {
  gameSequence = [];
  userSequence = [];
  started = false;
  level = 0;
}
