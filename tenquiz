let quizData = [
  {
    question: "Manakah yang bukan huruf Ikhfa Haqiqi?",
    options: ["Qaf", "Ain", "Shad", "Syin"],
    correct: "Ain",
  },
  {
    question: "Manakah yang bukan huruf Izhar Qamari?",
    options: ["Qaf", "Ain", "Ba", "Ta"],
    correct: "Ta",
  },
  {
    question: "Manakah hukum Mad yang tidak pernah dibaca 4 harakat?",
    options: ["Lin", "Jaiz Munfashil", "Shilah Thawilah", "Farqi"],
    correct: "Farqi",
  },
  {
    question: "Bacaan Saktah terdapat dalam surat, kecuali?",
    options: ["al-Muthaffifin", "Yasin", "An-Nisa", "al-Kahf"],
    correct: "An-Nisa",
  },
  {
    question: "Huruf ro sukun waqaf didahului huruf isti'la sukun, yang sebelumnya terdapat kasrah dibaca?",
    options: ["Tafkhim", "Tarqiq", "Tafkhim dan Tarqiq", "Tidak ada yang benar"],
    correct: "Tafkhim dan Tarqiq",
  },
  {
    question: "Hukum membaca basmalah di awal surat at-Taubah?",
    options: ["Wajib", "Sunnah", "Boleh", "Tidak boleh"],
    correct: "Tidak boleh",
  },
  {
    question: "Ada berapa huruf bacaan Idgham Syamsi?",
    options: ["10", "14", "15", "6"],
    correct: "14",
  },
  {
    question: "Berapa panjang hukum bacaan Mad Aridh Lissukun?",
    options: ["2 harakat", "4 harakat", "6 harakat", "2/4/6 harakat"],
    correct: "2/4/6 harakat",
  },
  {
    question: "Bacaan langka atau khusus dalam ilmu Tajwid disebut?",
    options: ["Gharib", "Saktah", "Lahn", "Tartil"],
    correct: "Gharib",
  },
  {
    question: "Nun sukun bertemu Nun dibaca?",
    options: ["Izhar", "Idgham bighunnah", "Idgham bilaghunnah", "Ikhfa Haqiqi"],
    correct: "Idgham bighunnah",
  },
];

const quizContainer = document.querySelector(".quiz-container");
const question = document.querySelector(".quiz-container .question");
const options = document.querySelector(".quiz-container .options");
const nextBtn = document.querySelector(".quiz-container .next-btn");
const quizResult = document.querySelector(".quiz-result");
const startBtnContainer = document.querySelector(".start-btn-container");
const startBtn = document.querySelector(".start-btn-container .start-btn");

let questionNumber = 0;
let score = 0;
const MAX_QUESTIONS = 9;
let timerInterval;

const shuffleArray = (array) => {
  return array.slice().sort(() => Math.random() - 0.5);
};

quizData = shuffleArray(quizData);

const resetLocalStorage = () => {
  for (i = 0; i < MAX_QUESTIONS; i++) {
    localStorage.removeItem(`userAnswer_${i}`);
  }
};

resetLocalStorage();

const checkAnswer = (e) => {
  let userAnswer = e.target.textContent;
  if (userAnswer === quizData[questionNumber].correct) {
    score++;
    e.target.classList.add("correct");
  } else {
    e.target.classList.add("incorrect");
  }

  localStorage.setItem(`userAnswer_${questionNumber}`, userAnswer);

  let allOptions = document.querySelectorAll(".quiz-container .option");
  allOptions.forEach((o) => {
    o.classList.add("disabled");
  });
};

const createQuestion = () => {
  clearInterval(timerInterval);

  let secondsLeft = 9;
  const timerDisplay = document.querySelector(".quiz-container .timer");
  timerDisplay.classList.remove("danger");

  timerDisplay.textContent = `Sisa waktu: 10 detik`;

  timerInterval = setInterval(() => {
    timerDisplay.textContent = `Sisa waktu: ${secondsLeft
      .toString()
      .padStart(2, "0")} detik`;
    secondsLeft--;

    if (secondsLeft < 3) {
      timerDisplay.classList.add("danger");
    }

    if (secondsLeft < 0) {
      clearInterval(timerInterval);
      displayNextQuestion();
    }
  }, 1000);

  options.innerHTML = "";
  question.innerHTML = `<span class='question-number'>${
    questionNumber + 1
  }/${MAX_QUESTIONS}</span>${quizData[questionNumber].question}`;

  const shuffledOptions = shuffleArray(quizData[questionNumber].options);

  shuffledOptions.forEach((o) => {
    const option = document.createElement("button");
    option.classList.add("option");
    option.innerHTML = o;
    option.addEventListener("click", (e) => {
      checkAnswer(e);
    });
    options.appendChild(option);
  });
};

const retakeQuiz = () => {
  location.reload();
};

const displayQuizResult = () => {
  quizResult.style.display = "flex";
  quizContainer.style.display = "none";
  quizResult.innerHTML = "";

  const resultHeading = document.createElement("p");
  resultHeading.innerHTML = `<h1 style="font-family: Roboto;">Tes Tajwid Instan</h1><p style="text-align: center">Terima kasih atas partisipasi Anda dalam tes tajwid cepat ini.<br /><br /> Untuk meningkatkan kualitas tes ini, kami mengharapkan saran dan masukan Anda dengan menuliskan di kolom komentar. Terima kasih. <br /><br /><br />Nilai Anda adalah<br /><br /><br /><span style="font-size:100px"> ${score} </span><br /> dari total ${MAX_QUESTIONS}.</p>`;
  quizResult.appendChild(resultHeading);


  const retakeBtn = document.createElement("button");
  retakeBtn.classList.add("retake-btn");
  retakeBtn.innerHTML = "Coba lagi";
  retakeBtn.addEventListener("click", retakeQuiz);
  quizResult.appendChild(retakeBtn);
};

const displayNextQuestion = () => {
  if (questionNumber >= MAX_QUESTIONS - 1) {
    displayQuizResult();
    return;
  }

  questionNumber++;
  createQuestion();
};

nextBtn.addEventListener("click", displayNextQuestion);

startBtn.addEventListener("click", () => {
  startBtnContainer.style.display = "none";
  quizContainer.style.display = "block";
  createQuestion();
});
