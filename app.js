const tabBtns = Array.from(document.querySelectorAll(".tab__btn"));
const tabIndicator = document.querySelector("#tab_indicator");
const tabSlide = Array.from(document.querySelectorAll(".tab__slide"));
const root = document.querySelector(":root");

const numBtns = tabBtns.length;

root.style.setProperty("--num-btns", numBtns);

tabBtns[0].classList.add("active");
tabSlide[0].classList.add("active");

let activeBtn = tabBtns[0];
let activeSlide = tabSlide[0];

tabBtns.forEach((el) => {
  el.addEventListener("click", onTabBtnClick);
});

function onTabBtnClick(e) {
  e.preventDefault();
  const btn = e.target.closest(".tab__btn");
  changeBtn(btn);
}

function changeBtn(btn) {
  if (btn.classList.contains("active")) {
    return;
  }
  activeBtn.classList.remove("active");
  btn.classList.add("active");
  activeBtn = btn;
  changeIndicator(btn);
}

function changeIndicator(btn) {
  const indexBtn = tabBtns.indexOf(btn);
  tabIndicator.style.left = `calc(${indexBtn}*100%/${numBtns})`;
  changeSlide(indexBtn);
}

function changeSlide(index) {
  activeSlide.classList.remove("active");
  tabSlide[index].classList.add("active");
  activeSlide = tabSlide[index];
}

// -------------////////////////


const questions = [
  {
    question: "Какое животное японцы называют «лошадью с распухшей спиной»?",
    answers: [
      { text: 'Слона', correct: false},
      { text: 'Верблюда', correct: true},
      { text: 'Мышь', correct: false},
      { text: 'Жираффа', correct: false},
    ]
  },
  {
    question: "Какое насекомое охраняет лесные поляны от вредных мух?",
    answers: [
      { text: 'Стрекоза', correct: true },
      { text: 'Кузнечик', correct: false },
      { text: 'Мотылек', correct: false },
      { text: 'Муравей', correct: false },
    ]
  },
  {
    question: "Какому животному стоят памятники в Токио и в Париже?",
    answers: [
      { text: 'Садамандре', correct: false },
      { text: 'Лягушке', correct: true },
      { text: 'Льву', correct: false },
      { text: 'Обезьяне', correct: false },
    ]
  },
  {
    question: " Какую особенность имеют самцы морских коньков?",
    answers: [
      { text: 'Светятся в темноте', correct: false },
      { text: 'Самцы больше', correct: false },
      { text: 'Отбрасывают хвост', correct: false },
      { text: 'Беременеют и рожают', correct: true },
    ]
  }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = 'Следующий вопрос';
  showQuestion();
}

function showQuestion() {
resetState();

  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    answerButtons.appendChild(button);
    if(answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = 'none';
  while(answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild)
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';
  if (isCorrect) {
    selectedBtn.classList.add('correct');
    score++;
  }else{
    selectedBtn.classList.add('incorrect');
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === 'true'){
      button.classList.add('correct');
    }
    button.disabled = true;
  })
  nextButton.style.display = 'block';
}

function showScore() {
  resetState()
  questionElement.innerHTML = `Твой счет ${score} из ${questions.length}!`;
  nextButton.innerHTML = 'Пропробуй снова';
  nextButton.style.display = 'block'
}

function handleNextButton() {
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion()
  }else{
    showScore();
  }
}

nextButton.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length){
    handleNextButton()
  } else{
    startQuiz()
  }
})

startQuiz()








