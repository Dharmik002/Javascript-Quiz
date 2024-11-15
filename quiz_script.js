const quizData = [
    { question: "What will '1' + 4 evaluate to?", options: ["5", "'14'", "NaN", "Error"], answer: "'53'" },
    { question: "What is the result of typeof NaN?", options: ["'number'", "'NaN'", "'undefined'", "'object'"], answer: "'number'" },
    { question: "What does typeof [] return?", options: ["'object'", "'array'", "'undefined'", "'number'"], answer: "'object'" },
    { question: "What will be the result of 1 + '1'?", options: ["'11'", "2", "'2'", "NaN"], answer: "'11'" },
    { question: "What is the output of '5' - 2?", options: ["3", "5", "'3'", "Error"], answer: "3" }
];

let currentQuestion = 0;
let score = 0;
let username = '';

function startQuiz() {
    username = document.getElementById('username').value.trim();
    if (!username) {
        alert("Please enter your name to start the quiz!");
        return;
    }

    document.getElementById('intro-container').classList.remove('active');
    document.getElementById('quiz-container').classList.add('active');
    updateProgress();
    loadQuestion();
}

function updateProgress() {
    const progress = document.getElementById("progress");
    const progressWidth = ((currentQuestion + 1) / quizData.length) * 100;
    progress.style.width = progressWidth + "%";
}

function loadQuestion() {
    const questionEl = document.getElementById("question");
    const optionsContainer = document.getElementById("options-container");

    const questionData = quizData[currentQuestion];
    questionEl.textContent = questionData.question;
    optionsContainer.innerHTML = "";

    questionData.options.forEach((option, index) => {
        const optionEl = document.createElement("div");
        optionEl.classList.add("option");
        optionEl.innerHTML = `
            <input type="radio" name="option" value="${option}" id="option${index}">
            <label for="option${index}">${option}</label>
        `;
        optionEl.onclick = () => {
            document.querySelectorAll(".option").forEach(opt => opt.classList.remove("selected"));
            optionEl.classList.add("selected");
            optionEl.querySelector("input").checked = true;
        };
        optionsContainer.appendChild(optionEl);
    });
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
        alert("Please select an answer!");
        return;
    }

    if (selectedOption.value === quizData[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        updateProgress();
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz-container').classList.remove('active');
    document.getElementById('result-container').classList.add('active');

    document.getElementById('user-name').textContent = username;
    document.getElementById('user-score').textContent = score;
    document.getElementById('total-questions').textContent = quizData.length;
    document.getElementById('final-score').textContent = score;
}
