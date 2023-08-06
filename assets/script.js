document.addEventListener("DOMContentLoaded", function () {
  const startSection = document.getElementById("start-section");
  const quizContainer = document.getElementById("quiz-container");
  const endSection = document.getElementById("end-section");
  const highscoresSection = document.getElementById("highscores-section");
  const timerElement = document.getElementById("timer");
  const initialsInput = document.getElementById("initials-input");
  const submitButton = document.getElementById("submit-button");
  const highscoresList = document.getElementById("highscores-list");

  const questions = [
      {
          question: "Which sport is the oldest?",
          answers: [
              { text: "Wrestling", correct: true },
              { text: "Soccer", correct: false },
              { text: "Gymnastics", correct: false },
              { text: "Swimming", correct: false },
          ],
      },
      {
          question: "What year did women begin to compete in US sports?",
          answers: [
              { text: "M1921", correct: false },
              { text: "1945", correct: false },
              { text: "1963", correct: false },
              { text: "1896", correct: true },
          ],
      },
      {
          question: "What is the most played sport worldwide?",
          answers: [
              { text: "Basketball", correct: false },
              { text: "Soccer", correct: true },
              { text: "Lacrosse", correct: false },
              { text: "Tennis", correct: false },
          ],
      },
      {
          question: "What is the most popular sport featured in films?",
          answers: [
              { text: "Boxing", correct: true },
              { text: "American Football", correct: false },
              { text: "Running", correct: false },
              { text: "Baseball", correct: false },
          ],
      },
      {
          question: "What sport was Nike founded on?",
          answers: [
              { text: "Basketball", correct: false },
              { text: "Running", correct: true },
              { text: "Boxing", correct: false },
              { text: "Baseball", correct: false },
          ],
      },
  ];

  const questionTime = 15;
  let currentQuestionIndex;
  let timeLeft;
  let timerInterval;

  function startQuiz() {
      startSection.style.display = "none";
      quizContainer.style.display = "block";
      currentQuestionIndex = 0;
      timeLeft = 60;
      timerElement.textContent = timeLeft;

      startTimer();

      showQuestion();
  }

  function startTimer() {
      timerInterval = setInterval(function () {
          timeLeft--;
          timerElement.textContent = timeLeft;

          if (timeLeft <= 0) {
              clearInterval(timerInterval);
              endQuiz();
          }
      }, 1000);
  }

  function showQuestion() {
      const questionElement = document.getElementById("q" + (currentQuestionIndex + 1));
      questionElement.style.display = "block";

      const buttons = questionElement.getElementsByClassName("button-container")[0].getElementsByTagName("button");
      for (let i = 0; i < buttons.length; i++) {
          buttons[i].addEventListener("click", handleAnswerClick);
      }
  }

  function handleAnswerClick(event) {
      const selectedButton = event.target;
      const currentQuestion = questions[currentQuestionIndex];
      const selectedAnswer = currentQuestion.answers.find((answer) => answer.text === selectedButton.textContent);

      if (selectedAnswer.correct) {
          selectedButton.classList.add("correct-answer");
      } else {
          selectedButton.classList.add("wrong-answer");
          timeLeft -= 10;
          if (timeLeft < 0) {
              timeLeft = 0;
          }
      }

      currentQuestionIndex++;

      if (currentQuestionIndex < questions.length) {
          setTimeout(showNextQuestion, 1000);
      } else {
          setTimeout(endQuiz, 1000);
      }
  }

  function showNextQuestion() {
      const previousQuestionElement = document.getElementById("q" + currentQuestionIndex);
      previousQuestionElement.style.display = "none";

      showQuestion();
  }

  function endQuiz() {
      clearInterval(timerInterval);

      quizContainer.style.display = "none";
      endSection.style.display = "block";
      document.getElementById("final-score").textContent = timeLeft;

      submitButton.addEventListener("click", function () {
          const initials = initialsInput.value.trim();
          if (initials !== "") {
              const scoreEntry = initials + " - " + timeLeft;
              highscoresList.innerHTML += "<li>" + scoreEntry + "</li>";

              initialsInput.value = "";

              endSection.style.display = "none";
              highscoresSection.style.display = "block";
          }
      });
  }

  function clearHighscores() {
      highscoresList.innerHTML = "";
  }

  function init() {
      const startButton = document.querySelector("button.adjust");
      startButton.addEventListener("click", startQuiz);

      const clearButton = document.getElementById("clear-button");
      clearButton.addEventListener("click", clearHighscores);
  }

  init();
});