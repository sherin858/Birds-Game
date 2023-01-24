const createBird = () => {
  let bird = document.createElement("img");
  let birdSrc = [
    "./assets/bird-1.gif",
    "./assets/bird-2.gif",
    "./assets/bird-3.gif",
  ];
  bird.src = birdSrc[Math.floor(Math.random() * 3)];
  bird.classList.add("bird");
  randomBird(bird);
  moveRight(bird);
};

const moveRight = (bird) => {
  let birdLeft = +bird.style.left;
  let id = setInterval(() => {
    if (birdLeft + 10 < window.innerWidth - bird.width) {
      birdLeft += 10;
      bird.style.left = birdLeft + "px";
    } else {
      bird.remove();
      clearInterval(id);
    }
  }, 30);
};
const randomBird = (bird) => {
  let topVal = Math.random() * window.innerHeight;
  if (topVal < bird.height && topVal > 0) {
    console.log(topVal);
    bird.style.top = topVal + "px";
    document.body.appendChild(bird);
  } else {
    topVal = randomBird(bird);
  }
};
const createBomb = () => {
  let bomb = document.createElement("img");
  bomb.src = "./assets/bomb.png";
  bomb.classList.add("bomb");
  document.body.appendChild(bomb);
  let left = Math.random() * window.innerWidth - bomb.width;
  bomb.style.left = left + "px";
  moveDown(bomb);
};
const moveDown = (bomb) => {
  let birdScore = {
    "/assets/bird-1.gif": "+5",
    "/assets/bird-2.gif": "+5",
    "/assets/bird-3.gif": "-10",
  };
  let score = document.querySelector(".score");
  let birdsKilled = document.querySelector(".birds-killed");
  let top = +bomb.style.top;
  let id = setInterval(() => {
    if (top + 10 < window.innerHeight - bomb.height) {
      top += 10;
      bomb.style.top = top + "px";
    } else {
      bomb.remove();
      clearInterval(id);
    }
  }, 60);
  bomb.addEventListener("click", function (e) {
    let scoreChange = document.createElement("p");
    scoreChange.classList.add("score-change");
    scoreChange.textContent = "0";
    let color = Math.floor(Math.random() * 16777215).toString(16);
    scoreChange.style.color = `#${color}`;
    scoreChange.style.left = e.clientX + "px";
    scoreChange.style.top = e.clientY + "px";
    document.querySelectorAll(".bird").forEach(function (bird) {
      let distance = getDistanceBetweenElements(bird, bomb);
      if (distance <= 300) {
        let birdSrc;
        Object.keys(birdScore).forEach((key) => {
          if (bird.src.includes(key)) {
            birdSrc = key;
          }
        });
        let newScore = +score.textContent + +birdScore[birdSrc];
        if (newScore > 0) {
          score.textContent = `${newScore}`;
        } else {
          score.textContent = "0";
        }
        let content = +scoreChange.textContent + +birdScore[birdSrc];
        scoreChange.textContent = content > 0 ? `+${content}` : `${content}`;
        document.body.appendChild(scoreChange);
        let id = setTimeout(() => {
          scoreChange.remove();
          clearTimeout(id);
        }, 500);
        birdsKilled.textContent = +birdsKilled.textContent + 1;
        bird.remove();
      }
    });
    bomb.remove();
    clearInterval(id);
  });
};
function getPositionAtCenter(element) {
  const { top, left, width, height } = element.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2,
  };
}
function getDistanceBetweenElements(a, b) {
  const aPosition = getPositionAtCenter(a);
  const bPosition = getPositionAtCenter(b);

  return Math.sqrt(
    Math.pow(aPosition.x - bPosition.x, 2) +
      Math.pow(aPosition.y - bPosition.y, 2)
  );
}
const play = () => {
  let timeLeft = document.querySelector(".time-left");
  timeLeft.textContent = "60";
  let score = document.querySelector(".score");
  score.textContent = "0";
  let birdsKilled = document.querySelector(".birds-killed");
  birdsKilled.textContent = "0";
  let timeLeftId = setInterval(() => {
    if (+timeLeft.textContent > 0) {
      timeLeft.textContent = +timeLeft.textContent - 1;
      if (+timeLeft.textContent > 0) {
        createBird();
        createBomb();
      }
    } else {
      if (+document.querySelector(".score").textContent > 25) {
        document.querySelectorAll(".message h2")[1].textContent = "YOU WIN";
      } else {
        document.querySelectorAll(".message h2")[1].textContent = "YOU LOSE";
      }
      document.querySelectorAll(".message")[1].classList.remove("hide");
      clearInterval(timeLeftId);
    }
  }, 1000);
};
