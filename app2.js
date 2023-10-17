const questions2 = [
  {
    question2: "Баумкухен — это выпечка, cрез которой напоминает спил дерева с годовыми кольцами. В какой стране она популярна?",
    answers2: [
      { text2: 'Италия', correct2: false },
      { text2: 'Германия', correct2: true },
      { text2: 'Франция', correct2: false },
      { text2: 'Норвегия', correct2: false },
    ]
  },
  {
    question2: "Как называются традиционные бельгийские и голландские пончики, которые готовят во фритюре? Их подают на новогодний стол.",
    answers2: [
      { text2: 'Олибол', correct2: true },
      { text2: 'Пассброд', correct2: false },
      { text2: 'Опертье', correct2: false },
      { text2: 'Попьет', correct2: false },
    ]
  },
  {
    question2: "Из каких фруктов готовится традиционное венгерское повидло из Тополовени??Из каких фруктов готовится традиционное венгерское повидло из Тополовени?",
    answers2: [
      { text2: 'Сливы', correct2: true },
      { text2: 'Яблоки', correct2: false },
      { text2: 'Груши', correct2: false },
      { text2: 'Абрикосы', correct2: false },
    ]
  },
  {
    question2: "Что внутри котлеты по-киевски?",
    answers2: [
      { text2: 'Сливочное масло', correct2: true },
      { text2: 'Яйцо', correct2: false },
      { text2: 'Изюм', correct2: false },
      { text2: 'Сало', correct2: false },
    ]
  },
];

const questionElement2 = document.getElementById('question2');
const answerButtons2 = document.getElementById('answer-buttons2');
const nextButton2 = document.getElementById('next-btn2');

let currentQuestionIndex2 = 0;
let score2 = 0;
function startQuiz2() {
  currentQuestionIndex2 = 0;
  score2 = 0;
  nextButton2.innerHTML = 'Следующий вопрос';
  showQuestion2();
}

function showQuestion2() {
  resetState2();

  let currentQuestion2 = questions2[currentQuestionIndex2];
  let questionNo2 = currentQuestionIndex2 + 1;
  questionElement2.innerHTML = questionNo2 + '. ' + currentQuestion2.question2;

  currentQuestion2.answers2.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML = answer.text2;
    button.classList.add('btn');
    answerButtons2.appendChild(button);
    if (answer.correct2) {
      button.dataset.correct2 = answer.correct2;
    }
    button.addEventListener('click', selectAnswer2);
  });
}

function resetState2() {
  nextButton2.style.display = 'none';
  while (answerButtons2.firstChild) {
    answerButtons2.removeChild(answerButtons2.firstChild)
  }
}

function selectAnswer2(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct2 === 'true';
  if (isCorrect) {
    selectedBtn.classList.add('correct');
    score++;
  } else {
    selectedBtn.classList.add('incorrect');
  }
  Array.from(answerButtons2.children).forEach(button => {
    if (button.dataset.correct2 === 'true') {
      button.classList.add('correct');
    }
    button.disabled = true;
  })
  nextButton2.style.display = 'block';
}

function showScore2() {
  resetState2()
  questionElement2.innerHTML = `Твой счет ${score} из ${questions2.length}!`;
  nextButton2.innerHTML = 'Попробуй снова';
  nextButton2.style.display = 'block'
}

function handleNextButton2() {
  currentQuestionIndex2++;
  if (currentQuestionIndex2 < questions2.length) {
    showQuestion2()
  } else {
    showScore2();
  }
}

nextButton2.addEventListener('click', () => {
  if (currentQuestionIndex2 < questions2.length) {
    handleNextButton2()
  } else {
    startQuiz2()
  }
})

startQuiz2()