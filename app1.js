const questions1 = [
  {
    question1: "В этом городе прошли Зимние Олимпийские игры 2014?",
    answers1: [
      { text1: 'Москва', correct1: false },
      { text1: 'Сочи', correct1: true },
      { text1: 'Крснодар', correct1: false },
      { text1: 'Тольтти', correct1: false },
    ]
  },
  {
    question1: "Раньше этот город назывался Кёнигсберг.",
    answers1: [
      { text1: 'Калининград', correct1: true },
      { text1: 'Сочи', correct1: false },
      { text1: 'Волгоград', correct1: false },
      { text1: 'Воронеж', correct1: false },
    ]
  },
  {
    question1: "Город с большим количеством разводных мостов.",
    answers1: [
      { text1: 'Санкт-Петербург', correct1: true },
      { text1: 'Сочи', correct1: false },
      { text1: 'Волгоград', correct1: false },
      { text1: 'Хабаровск', correct1: false },
    ]
  },
];

const questionElement1 = document.getElementById('question1');
const answerButtons1 = document.getElementById('answer-buttons1');
const nextButton1 = document.getElementById('next-btn1');

let currentQuestionIndex1 = 0;
let score1 = 0;

function startQuiz1() {
  currentQuestionIndex1 = 0;
  score1 = 0;
  nextButton1.innerHTML = 'Следующий вопрос';
  showQuestion1();
}

function showQuestion1() {
  resetState1();

  let currentQuestion1 = questions1[currentQuestionIndex1];
  let questionNo1 = currentQuestionIndex1 + 1;
  questionElement1.innerHTML = questionNo1 + '. ' + currentQuestion1.question1;

  currentQuestion1.answers1.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML = answer.text1;
    button.classList.add('btn');
    answerButtons1.appendChild(button);
    if (answer.correct1) {
      button.dataset.correct1 = answer.correct1;
    }
    button.addEventListener('click', selectAnswer1);
  });
}

function resetState1() {
  nextButton1.style.display = 'none';
  while (answerButtons1.firstChild) {
    answerButtons1.removeChild(answerButtons1.firstChild)
  }
}

function selectAnswer1(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct1 === 'true';
  if (isCorrect) {
    selectedBtn.classList.add('correct');
    score++;
  } else {
    selectedBtn.classList.add('incorrect');
  }
  Array.from(answerButtons1.children).forEach(button => {
    if (button.dataset.correct1 === 'true') {
      button.classList.add('correct');
    }
    button.disabled = true;
  })
  nextButton1.style.display = 'block';
}

function showScore1() {
  resetState1()
  questionElement1.innerHTML = `Твой счет ${score} из ${questions1.length}!`;
  nextButton1.innerHTML = 'Попробуй снова';
  nextButton1.style.display = 'block'
}

function handleNextButton1() {
  currentQuestionIndex1++;
  if (currentQuestionIndex1 < questions1.length) {
    showQuestion1()
  } else {
    showScore1();
  }
}

nextButton1.addEventListener('click', () => {
  if (currentQuestionIndex1 < questions1.length) {
    handleNextButton1()
  } else {
    startQuiz1()
  }
})

startQuiz1()