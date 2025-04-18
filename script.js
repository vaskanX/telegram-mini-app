const categories = [
  {
    name: 'Sports',
    questions: [
      {
        q: 'Which sport uses a racket?',
        a: ['Football', 'Tennis', 'Hockey'],
        correct: 1
      },
      {
        q: 'How many players in a football team?',
        a: ['9', '10', '11'],
        correct: 2
      }
    ]
  },
  {
    name: 'Travel',
    questions: [
      {
        q: 'Where is the Eiffel Tower?',
        a: ['Rome', 'Paris', 'Berlin'],
        correct: 1
      },
      {
        q: 'Which country is known for sushi?',
        a: ['China', 'Japan', 'Thailand'],
        correct: 1
      }
    ]
  }
];

let currentCategory = null;
let currentQuestionIndex = 0;
let score = 0;

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

function startApp() {
  showScreen('category-screen');
  const list = document.getElementById('category-list');
  list.innerHTML = '';
  categories.forEach((cat, index) => {
    const div = document.createElement('div');
    div.className = 'category';
    div.textContent = cat.name;
    div.onclick = () => selectCategory(index);
    list.appendChild(div);
  });
}

function selectCategory(index) {
  currentCategory = categories[index];
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  const questionData = currentCategory.questions[currentQuestionIndex];
  document.getElementById('question-title').textContent = questionData.q;
  const answers = document.getElementById('answers-container');
  answers.innerHTML = '';
  questionData.a.forEach((answer, i) => {
    const btn = document.createElement('button');
    btn.textContent = answer;
    btn.onclick = () => checkAnswer(i);
    answers.appendChild(btn);
  });
  showScreen('quiz-screen');
}

function checkAnswer(selectedIndex) {
  if (selectedIndex === currentCategory.questions[currentQuestionIndex].correct) {
    score++;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < currentCategory.questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById('result-text').textContent = `You scored ${score} out of ${currentCategory.questions.length}`;
  showScreen('result-screen');
}

function restart() {
  showScreen('welcome-screen');
}
