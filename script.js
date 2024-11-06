const quizData = [
    {
        question: "Qual a sintaxe correta para imprimir 'Olá Mundo' no console do JavaScript?",
        options: ["document.write('Olá Mundo')", "console.log('Olá Mundo')", "alert('Olá Mundo')", "print('Olá Mundo')"],
        correct: 1
    },
    {
        question: "Qual método embutido remove o último elemento de um array e o retorna?",
        options: ["last()", "get()", "pop()", "slice()"],
        correct: 2
    },
    {
        question: "Como você declara uma variável no JavaScript?",
        options: ["var nomeCarro;", "v nomeCarro;", "variable nomeCarro;", "String nomeCarro;"],
        correct: 0
    },
    {
        question: "Qual destas opções representa um 'closure' em JavaScript?",
        options: ["function interna() { let x = 5; }", "let x = function() { return 5; }", "function externa() { let x = 5; return function() { return x; }; }", "Nenhuma das opções"],
        correct: 2
    },
    {
        question: "O que o operador '===' significa em JavaScript?",
        options: ["É usado para comparação estrita", "Atribui um valor", "Compara valores de forma solta", "Nenhuma das opções"],
        correct: 0
    }
];

let currentQuestionIndex = 0;
let selectedAnswers = [];
let correctAnswers = 0;

const questionContainer = document.getElementById("question-container");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const showAnswersBtn = document.getElementById("show-answers-btn");
const resultBtn = document.getElementById("result-btn");
const resultContainer = document.getElementById("result-container");
const scoreContainer = document.getElementById("score");
const allQuestionsContainer = document.getElementById("all-questions");

function displayQuestion() {
    const questionData = quizData[currentQuestionIndex];
    questionContainer.innerHTML = `
        <h4>${questionData.question}</h4>
        <ul class="list-group">
            ${questionData.options.map((option, index) => `
                <li class="list-group-item option-item" data-index="${index}">
                    <input type="radio" name="answer" value="${index}" ${selectedAnswers[currentQuestionIndex] === index ? "checked" : ""}>
                    ${option}
                </li>`).join('')}
        </ul>
    `;

    document.querySelectorAll('.option-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const selected = e.currentTarget.getAttribute('data-index');
            selectedAnswers[currentQuestionIndex] = parseInt(selected);
        });
    });
}

function updateButtons() {
    prevBtn.style.display = currentQuestionIndex > 0 ? "block" : "none";
    nextBtn.innerText = currentQuestionIndex === quizData.length - 1 ? "Finalizar" : "Próximo";
}

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
        updateButtons();
    } else {
        resultBtn.classList.remove('d-none');
        nextBtn.classList.add('d-none');
        prevBtn.classList.add('d-none');
        showAnswersBtn.classList.add('d-none');
    }
});

prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
        updateButtons();
    }
});

showAnswersBtn.addEventListener('click', () => {
    const questionData = quizData[currentQuestionIndex];
    const selectedAnswer = selectedAnswers[currentQuestionIndex];
    const correctAnswer = questionData.correct;

    document.querySelectorAll('.option-item').forEach(item => {
        const index = item.getAttribute('data-index');
        if (index == correctAnswer) {
            item.classList.add('correct');
        } else if (index == selectedAnswer) {
            item.classList.add('incorrect');
        }
    });

    if (selectedAnswer === correctAnswer) {
        correctAnswers++;
    }
});

resultBtn.addEventListener('click', () => {
    resultContainer.classList.remove('d-none');
    scoreContainer.innerText = `Você acertou ${correctAnswers} de ${quizData.length}`;
    allQuestionsContainer.innerHTML = quizData.map((q, i) => `
        <div>
            <h5>${i + 1}. ${q.question}</h5>
            <p>Resposta correta: ${q.options[q.correct]}</p>
        </div>
    `).join('');
    resultBtn.classList.add('d-none');
    quizContainer.classList.add('d-none');
});

window.onload = function () {
    displayQuestion();
    updateButtons();
};
