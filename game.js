let mode = null;
let currentAnswer = null;
let combo = 0;
let score = 0;
let startTime = 0;

const questionEl = document.getElementById("question");
const inputEl = document.getElementById("answerInput");
const comboEl = document.getElementById("combo");
const scoreEl = document.getElementById("score");
const resultEl = document.getElementById("result");
const gameArea = document.getElementById("gameArea");
const modeSelect = document.getElementById("modeSelect");

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion() {
  let n;

  if (mode === "sq2") {
    n = rand(10, 99);
    currentAnswer = n;
    questionEl.textContent = n * n;
  }

  if (mode === "sq3") {
    n = rand(100, 999);
    currentAnswer = n;
    questionEl.textContent = n * n;
  }

  if (mode === "cb2") {
    n = rand(10, 99);
    currentAnswer = n;
    questionEl.textContent = n ** 3;
  }

  startTime = performance.now();
  inputEl.value = "";
  inputEl.focus();
}

function updateUI() {
  comboEl.textContent = `Combo: ${combo}`;
  scoreEl.textContent = `Score: ${Math.floor(score)}`;
}

function flashCorrect() {
  document.body.classList.add("correct");
  setTimeout(() => {
    document.body.classList.remove("correct");
  }, 300);
}

function flashWrong() {
  resultEl.classList.add("wrong");
  setTimeout(() => {
    resultEl.classList.remove("wrong");
  }, 300);
}

function checkAnswer() {
  const input = Number(inputEl.value);
  const time = (performance.now() - startTime) / 1000;

  if (input === currentAnswer) {
    combo++;
    score += Math.max(0, 10 - time) * combo;
    resultEl.textContent = "Correct!";
    flashCorrect();
  } else {
    combo = 0;
    resultEl.textContent = "Wrong!";
    flashWrong();
  }

  updateUI();

  setTimeout(() => {
    resultEl.textContent = "";
    generateQuestion();
  }, 400);
}

function startGame(selectedMode) {
  mode = selectedMode;
  combo = 0;
  score = 0;
  updateUI();
  modeSelect.classList.add("hidden");
  gameArea.classList.remove("hidden");
  generateQuestion();
}

export function main() {
  // 何も書かなくてもOK（将来拡張用）
}

// モードボタン
document.querySelectorAll("#modeSelect button").forEach(btn => {
  btn.addEventListener("click", () => {
    startGame(btn.dataset.mode);
  });
});

// Enterで回答
inputEl.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    checkAnswer();
  }
});
