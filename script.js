// State management
let currentMode = 'quiz';
let currentQuizIndex = 0;
let quizScore = 0;
let currentFlashcardIndex = 0;
let isFlipped = false;

// DOM Elements
const quizSection = document.getElementById('quiz-section');
const flashcardSection = document.getElementById('flashcard-section');
const resultScreen = document.getElementById('result-screen');
const modeQuizBtn = document.getElementById('mode-quiz');
const modeFlashcardsBtn = document.getElementById('mode-flashcards');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedback = document.getElementById('feedback');
const nextBtn = document.getElementById('next-button');
const currentQNum = document.getElementById('current-question-num');
const progressBar = document.getElementById('progress');

const cardFront = document.getElementById('card-front');
const cardBack = document.getElementById('card-back');
const cardTerm = document.getElementById('card-term');
const cardDef = document.getElementById('card-definition');
const flipBtn = document.getElementById('flip-card');
const prevCardBtn = document.getElementById('prev-card');
const nextCardBtn = document.getElementById('next-card');

const scoreText = document.getElementById('score-text');
const restartBtn = document.getElementById('restart-btn');

// Initialize Quiz
function initQuiz() {
    currentQuizIndex = 0;
    quizScore = 0;
    showQuiz();
}

function showQuiz() {
    if (currentQuizIndex >= quizQuestions.length) {
        showResults();
        return;
    }
    
    const q = quizQuestions[currentQuizIndex];
    questionText.innerText = q.question;
    currentQNum.innerText = currentQuizIndex + 1;
    
    const progress = ((currentQuizIndex) / quizQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
    
    optionsContainer.innerHTML = '';
    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(index, btn);
        optionsContainer.appendChild(btn);
    });
    
    feedback.classList.add('hidden');
    nextBtn.classList.add('hidden');
}

function checkAnswer(index, btn) {
    const q = quizQuestions[currentQuizIndex];
    const allButtons = optionsContainer.querySelectorAll('.option-btn');
    
    allButtons.forEach(b => b.disabled = true);
    
    if (index === q.correct) {
        btn.classList.add('correct');
        feedback.innerText = "Richtig!";
        feedback.style.backgroundColor = "#d4edda";
        feedback.classList.remove('hidden');
        quizScore++;
    } else {
        btn.classList.add('wrong');
        allButtons[q.correct].classList.add('correct');
        feedback.innerText = "Falsch.";
        feedback.style.backgroundColor = "#f8d7da";
        feedback.classList.remove('hidden');
    }
    
    nextBtn.classList.remove('hidden');
}

function showResults() {
    quizSection.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    scoreText.innerText = `Du hast ${quizScore} von ${quizQuestions.length} Fragen richtig beantwortet.`;
}

// Flashcard Logic
function initFlashcards() {
    currentFlashcardIndex = 0;
    updateFlashcard();
}

function updateFlashcard() {
    isFlipped = false;
    const card = flashcards[currentFlashcardIndex];
    cardTerm.innerText = card.term;
    cardDef.innerText = card.definition;
    
    const cardEl = document.getElementById('flashcard');
    cardEl.classList.remove('flipped');
}

// Event Listeners
modeQuizBtn.onclick = () => {
    currentMode = 'quiz';
    modeQuizBtn.classList.add('active');
    modeFlashcardsBtn.classList.remove('active');
    quizSection.classList.remove('hidden');
    flashcardSection.classList.add('hidden');
    resultScreen.classList.add('hidden');
    initQuiz();
};

modeFlashcardsBtn.onclick = () => {
    currentMode = 'flashcards';
    modeFlashcardsBtn.classList.add('active');
    modeQuizBtn.classList.remove('active');
    quizSection.classList.add('hidden');
    flashcardSection.classList.remove('hidden');
    resultScreen.classList.add('hidden');
    initFlashcards();
};

nextBtn.onclick = () => {
    currentQuizIndex++;
    showQuiz();
};

flipBtn.onclick = () => {
    document.getElementById('flashcard').classList.toggle('flipped');
};

prevCardBtn.onclick = () => {
    currentFlashcardIndex = (currentFlashcardIndex - 1 + flashcards.length) % flashcards.length;
    updateFlashcard();
};

nextCardBtn.onclick = () => {
    currentFlashcardIndex = (currentFlashcardIndex + 1) % flashcards.length;
    updateFlashcard();
};

restartBtn.onclick = () => {
    showQuiz();
};

// Initial Load
window.onload = () => {
    initQuiz();
};
