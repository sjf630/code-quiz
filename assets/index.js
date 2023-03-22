var startButton = document.querySelector("#start")
var timerEl = document.querySelector("#timer")
var questions = [
  {
      question: "Commonly used data types do not include:",
      answers: ["strings", "booleans", "alert", "numbers"],
      correctAnswer: "alert",
  },
   {
      question: "The condition in an if/else statement is enclosed with _",
      answers: ["quotes", "curly brackets", "parenthesis", "square brackets"],
      correctAnswer: "parenthesis",
  },
   {
      question: "Arrays in javascript can be used to store:",
      answers: ["number and strings", "other arrays", "booleans", "all of the above"],
      correctAnswer: "all of the above",
  },
   {
      question: "String values must be enclosed within _ when being assigned to variables.",
      answers: ["commas", "curly brackets", "quotes", "parenthesis"],
      correctAnswer: "quotes",
  },

]

var time = 60
var timerInt


function startTimer(){
var timer= document.createElement("p")
timerEl.appendChild(timer)
timer.textContent = time 
timerInt = setInterval(function(){
  timer.textContent--;
  if(timer.textContent <= 0){
    clearInterval(timerInt)
  }
},1000)
}









startButton.addEventListener("click",function(event){
startTimer()
})