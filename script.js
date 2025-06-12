const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  const width = Math.min(window.innerWidth - 20, 400);
  canvas.width = width;
  canvas.height = width * 1.5;
}

resizeCanvas();
window.addEventListener("resize", () => {
  resizeCanvas();
  resetObjects();
});

const catImg = new Image();
catImg.src = localStorage.getItem("selectedCat") || "oreo.jpg";

function setCat(imgName) {
  catImg.src = imgName;
  localStorage.setItem("selectedCat", imgName);
}

// Game state
let cat, food, score = 0;
let highScore = localStorage.getItem("catHighScore") || 0;

function resetObjects() {
  cat = {
    x: canvas.width / 2 - canvas.width * 0.1,
    y: canvas.height - canvas.height * 0.15,
    width: canvas.width * 0.2,
    height: canvas.width * 0.2,
    speed: canvas.width * 0.05
  };

  food = {
    x: Math.random() * (canvas.width - canvas.width * 0.1),
    y: 0,
    size: canvas.width * 0.08,
    speed: canvas.height * 0.007
  };
}

resetObjects();

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && cat.x > 0) {
    cat.x -= cat.speed;
  } else if (e.key === "ArrowRight" && cat.x < canvas.width - cat.width) {
    cat.x += cat.speed;
  }
});

function drawCat() {
  ctx.drawImage(catImg, cat.x, cat.y, cat.width, cat.height);
}

function drawFood() {
  ctx.fillStyle = "#ff66b2";
  ctx.beginPath();
  ctx.arc(food.x, food.y, food.size / 2, 0, Math.PI * 2);
  ctx.fill();
}

function checkCollision() {
  const foodBottom = food.y + food.size;
  const catTop = cat.y;
  const catRight = cat.x + cat.width;
  const catLeft = cat.x;

  if (
    foodBottom > catTop &&
    food.x > catLeft &&
    food.x < catRight
  ) {
    score += 10;
    food.y = -food.size;
    food.x = Math.random() * (canvas.width - food.size);
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("catHighScore", highScore);
    }
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCat();
  drawFood();

  food.y += food.speed;
  if (food.y > canvas.height) {
    food.y = 0;
    food.x = Math.random() * (canvas.width - food.size);
  }

  checkCollision();
  document.getElementById("score").textContent = `Score: ${score} | High Score: ${highScore}`;
  requestAnimationFrame(update);
}

catImg.onload = () => {
  update();
};

function moveLeft() {
    if (cat.x > 0) {
      cat.x -= cat.speed;
    }
  }
  
  function moveRight() {
    if (cat.x < canvas.width - cat.width) {
      cat.x += cat.speed;
    }
  }
  