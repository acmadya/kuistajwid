let quizData = [
  {
    question: "Apa nama surah yang artinya 'segumpal darah'?",
    options: ["al-Fil", "al-Alaq", "al-Bayyinah", "at-Takwir"],
    correct: "al-Alaq",
  },
  {
    question: "Berapa jumlah ayat dalam surah al-Kafirun?",
    options: ["3 ayat", "4 ayat", "6 ayat", "10 ayat"],
    correct: "6 ayat",
  },
  {
    question: "Surah apa yang terletak setelah surah al-Fajr?",
    options: ["al-Balad", "al-Ghasyiyah", "al-A'la", "as-Syams"],
    correct: "al-Balad",
  },
  {
    question: "Apa bunyi surah an-Naba ayat ke-5?",
    options: ["ٱلَّذِى هُمْ فِيهِ مُخْتَلِفُونَ", "كَلَّا سَيَعْلَمُونَ", "ثُمَّ كَلَّا سَيَعْلَمُونَ", "أَلَمْ نَجْعَلِ ٱلْأَرْضَ مِهَٰدًا"],
    correct: "ثُمَّ كَلَّا سَيَعْلَمُونَ",
  },
  {
    question: "Surah apa yang terdapat ayat وَأَلْقَتْ مَا فِيهَا وَتَخَلَّتْ?",
    options: ["al-Insyiqaq", "al-Infithar", "al-Muthaffifin", "al-Buruj"],
    correct: "al-Insyiqaq",
  },
  {
    question: "Apa arti dari nama surah as-Syams?",
    options: ["Bulan", "Bintang", "Matahari", "Bumi"],
    correct: "Matahari",
  },
  {
    question: "Berapa jumlah ayat dalam surah an-Naba?",
    options: ["30", "40", "50", "35"],
    correct: "40",
  },
  {
    question: "Surah apa yang terletak setelah surah Abasa?",
    options: ["at-Takwir", "an-Naba", "an-Naziat", "al-Infithar"],
    correct: "at-Takwir",
  },
  {
    question: "Apa bunyi surah al-Qariah ayat ke-9?",
    options: ["فَأُمُّهُۥ هَاوِيَةٌ", "فَهُوَ فِى عِيشَةٍ رَّاضِيَةٍ", "وَأَمَّا مَنْ خَفَّتْ مَوَٰزِينُهُۥ", "وَمَآ أَدْرَىٰكَ مَا هِيَهْ"],
    correct: "فَأُمُّهُۥ هَاوِيَةٌ",
  },
  {
    question: "Surah apa yang terdapat ayat ٱلَّذِينَ هُمْ يُرَآءُونَ?",
    options: ["Quraisy", "al-Fil", "al-Maun", "al-Humazah"],
    correct: "Gharib",
  },
  {
    question: "Surah apa yang tidak berjumlah 3 ayat?",
    options: ["al-Ashr", "al-Kautsar", "an-Nashr", "al-Ikhlas"],
    correct: "al-Ikhlas",
  },
  {
    question: "Manakah surah apa yang berjumlah 6 ayat?",
    options: ["al-Maun", "al-Qariah", "an-Nas", "az-Zalzalah"],
    correct: "an-Nas",
  },
  {
    question: "Berapa jumlah ayat ad-Dhuha",
    options: ["10", "11", "12", "9"],
    correct: "11",
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
const MAX_QUESTIONS = 10;
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
  resultHeading.innerHTML = `<h1 style="font-family: Roboto;">Kuis Cepat Tajwid</h1><p style="text-align: center">Terima kasih atas partisipasi Anda dalam tes tajwid cepat ini.<br /><br /> Untuk meningkatkan kualitas tes ini, kami mengharapkan saran dan masukan Anda dengan menuliskan di kolom komentar. Terima kasih. <br /><br /><br />Nilai Anda adalah<br /><br /><br /><span style="font-size:100px"> ${score} </span><br /> dari total ${MAX_QUESTIONS}.</p><p style="text-align: right">Powered by <a href="https://khudzilkitab.com">KhudzilKitab</a></p>`;
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