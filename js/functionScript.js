//creating a random type bird
const createBird = () => {
  let bird = document.createElement("img");
  let birdsSrc = [
    "./assets/bird-1.gif",
    "./assets/bird-2.gif",
    "./assets/bird-3.gif",
  ];
  let birdsScores = {
    "./assets/bird-1.gif": "+10",
    "./assets/bird-2.gif": "+5",
    "./assets/bird-3.gif": "-10",
  };
  let birdSrc = birdsSrc[Math.floor(Math.random() * birdsSrc.length)];
  bird.src = birdSrc;

  //attribute holding the score

  bird.setAttribute("data-score", birdsScores[birdSrc]);
  bird.classList.add("bird");
  document.body.appendChild(bird);
  bird.onload = function () {
    let topVal = Math.random() * (innerHeight - this.height);
    this.style.top = topVal + "px";
    moveRight(this);
  };
};

//move bird right
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

//create bomb at random position
const createBomb = () => {
  let bomb = document.createElement("img");
  bomb.src = "./assets/bomb.png";
  bomb.classList.add("bomb");
  document.body.appendChild(bomb);
  let left = Math.random() * window.innerWidth - bomb.width;
  bomb.style.left = left + "px";
  moveDown(bomb);
};

//move bomb down and handling clicking on it according to birds and bomb itself

const moveDown = (bomb) => {
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
    //red circle when bomb is clicked
    let bombRange = document.createElement("div");
    bombRange.classList.add("bomb-range");
    //net score added to or removed from total score
    let scoreChange = document.createElement("p");
    scoreChange.classList.add("score-change");
    scoreChange.textContent = "0";
    //random color for net score added to or removed from total score
    let color = Math.floor(Math.random() * 16777215).toString(16);
    scoreChange.style.color = `#${color}`;
    //positioning red circle
    scoreChange.style.left = e.clientX + "px";
    scoreChange.style.top = e.clientY + "px";
    bombRange.style.left = e.clientX - 150 + "px";
    bombRange.style.top = e.clientY - 150 + "px";
    document.body.appendChild(bombRange);
    //remove red circle
    let bombRangeId = setTimeout(() => {
      bombRange.remove();
      clearTimeout(bombRangeId);
    }, 40);
    document.querySelectorAll(".bird").forEach(function (bird) {
      let distance = getDistanceBetweenElements(bird, bomb);
      //if bomb center is close to the bird center by 300px
      if (distance <= 300) {
        let newScore = +score.textContent + +bird.getAttribute("data-score");
        if (newScore > 0) {
          score.textContent = `${newScore}`;
        } else {
          score.textContent = "0";
        }
        let content =
          +scoreChange.textContent + +bird.getAttribute("data-score");
        scoreChange.textContent = content >= 0 ? `+${content}` : `${content}`;
        document.body.appendChild(scoreChange);
        let id = setTimeout(() => {
          scoreChange.remove();
          clearTimeout(id);
        }, 500);
        //increase number of killed birds wheter it's a negative or positive bird
        birdsKilled.textContent = +birdsKilled.textContent + 1;
        bird.remove();
      }
    });
    bomb.remove();
    clearInterval(id);
  });
};

//getting center of img
function getPositionAtCenter(element) {
  const { top, left, width, height } = element.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2,
  };
}

//getting distance with pythagoras theorem
function getDistanceBetweenElements(a, b) {
  const aPosition = getPositionAtCenter(a);
  const bPosition = getPositionAtCenter(b);

  return Math.sqrt(
    Math.pow(aPosition.x - bPosition.x, 2) +
      Math.pow(aPosition.y - bPosition.y, 2)
  );
}

//start game and setting initial values
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
    }
    //if time counter is 0 display game results
    else {
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
