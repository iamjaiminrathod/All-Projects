const questions = [
            {
                question: "What does HTML stand for?",
                answers: [
                    { text: "Hyper Trainer Marking Language", correct: false },
                    { text: "Hyper Text Marketing Language", correct: false },
                    { text: "Hyper Text Markup Language", correct: true },
                    { text: "Hyperlink and Text Markup Language", correct: false }
                ]
            },
            {
                question: "Which planet is known as the 'Red Planet'?",
                answers: [
                    { text: "Mars", correct: true },
                    { text: "Venus", correct: false },
                    { text: "Jupiter", correct: false },
                    { text: "Saturn", correct: false }
                ]
            },
            {
                question: "What is the powerhouse of the cell?",
                answers: [
                    { text: "Nucleus", correct: false },
                    { text: "Ribosome", correct: false },
                    { text: "Mitochondrion", correct: true },
                    { text: "Cell Wall", correct: false }
                ]
            },
            {
                question: "In CSS, what does 'CSS' stand for?",
                answers: [
                    { text: "Creative Style Sheets", correct: false },
                    { text: "Cascading Style Sheets", correct: true },
                    { text: "Computer Style Sheets", correct: false },
                    { text: "Colorful Style Sheets", correct: false }
                ]
            },
            {
                question: "What is the largest mammal in the world?",
                answers: [
                    { text: "African Elephant", correct: false },
                    { text: "Giraffe", correct: false },
                    { text: "Blue Whale", correct: true },
                    { text: "Sperm Whale", correct: false }
                ]
            }
        ];

        const questionElement = document.getElementById("question");
        const answerButtons = document.getElementById("answer-buttons");
        const nextButton = document.getElementById("next-btn");
        const quizContainer = document.getElementById("quiz");
        const scoreContainer = document.getElementById("score-container");
        const scoreText = document.getElementById("score-text");
        const restartButton = document.getElementById("restart-btn");

        let currentQuestionIndex = 0;
        let score = 0;

        function startQuiz() {
            currentQuestionIndex = 0;
            score = 0;
            nextButton.innerHTML = "Next";
            nextButton.disabled = true;
            quizContainer.style.display = "block";
            scoreContainer.style.display = "none";
            showQuestion();
        }

        function showQuestion() {
            resetState();
            let currentQuestion = questions[currentQuestionIndex];
            let questionNo = currentQuestionIndex + 1;
            questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

            currentQuestion.answers.forEach(answer => {
                const button = document.createElement("button");
                button.innerHTML = answer.text;
                button.classList.add("answer-btn", "w-full", "text-left", "p-4", "rounded-lg", "border-2", "border-gray-200", "bg-gray-50", "hover:bg-indigo-100", "hover:border-indigo-300", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", "focus:ring-indigo-500");
                answerButtons.appendChild(button);
                if (answer.correct) {
                    button.dataset.correct = answer.correct;
                }
                button.addEventListener("click", selectAnswer);
            });
        }

        function resetState() {
            nextButton.disabled = true;
            while (answerButtons.firstChild) {
                answerButtons.removeChild(answerButtons.firstChild);
            }
        }

        function selectAnswer(e) {
            const selectedBtn = e.target;
            const isCorrect = selectedBtn.dataset.correct === "true";
            if (isCorrect) {
                selectedBtn.classList.add("correct");
                score++;
            } else {
                selectedBtn.classList.add("incorrect");
            }
            Array.from(answerButtons.children).forEach(button => {
                if (button.dataset.correct === "true") {
                    if (!button.classList.contains("correct")) {
                       button.classList.add("correct");
                    }
                }
                button.disabled = true;
            });
            nextButton.disabled = false;
        }
        
        function showScore(){
            quizContainer.style.display = "none";
            scoreContainer.style.display = "block";
            scoreText.innerHTML = `You scored ${score} out of ${questions.length}!`;
        }

        function handleNextButton() {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                showScore();
            }
        }

        nextButton.addEventListener("click", () => {
            if (currentQuestionIndex < questions.length) {
                handleNextButton();
            } else {
                startQuiz();
            }
        });
        
        restartButton.addEventListener("click", startQuiz);

        startQuiz();