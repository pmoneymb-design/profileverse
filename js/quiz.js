"use strict";

const questions = window.profileverseQuestionsV2;

if (!Array.isArray(questions) || questions.length === 0) {
    throw new Error("Profileverse questions could not be loaded.");
}

const savedProgress =
    window.ProfileverseAutosave.load(questions.length);

const state = {
    currentQuestion: savedProgress?.currentQuestion || 0,
    answers:
        savedProgress?.answers ||
        Array(questions.length).fill(null),
    startedAt: Date.now(),
    paused: false,
    transitioning: false
};

const sectionName = document.getElementById("sectionName");
const questionCategory = document.getElementById("questionCategory");
const questionText = document.getElementById("questionText");
const answerList = document.getElementById("answerList");
const questionCounter = document.getElementById("questionCounter");
const timeRemaining = document.getElementById("timeRemaining");
const progressBar = document.getElementById("progressBar");
const progressPercent = document.getElementById("progressPercent");
const saveStatus = document.getElementById("saveStatus");
const questionDots = document.getElementById("questionDots");
const backButton = document.getElementById("backButton");
const nextButton = document.getElementById("nextButton");
const quizCard = document.getElementById("quizCard");
const pauseButton = document.getElementById("pauseButton");
const pauseOverlay = document.getElementById("pauseOverlay");
const resumeButton = document.getElementById("resumeButton");
const completionOverlay =
    document.getElementById("completionOverlay");
const quizStars = document.getElementById("quizStars");

function createStars() {
    const count = window.innerWidth < 700 ? 30 : 60;

    for (let index = 0; index < count; index += 1) {
        const star = document.createElement("span");
        star.className = "quiz-star";
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * -4}s`;
        star.style.animationDuration =
            `${3 + Math.random() * 4}s`;

        const size = 1 + Math.random() * 2;

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        quizStars.appendChild(star);
    }
}

function answeredCount() {
    return state.answers.filter((answer) => answer !== null).length;
}

function selectAnswer(index) {
    const current = questions[state.currentQuestion];

    if (!current.answers[index]) {
        return;
    }

    state.answers[state.currentQuestion] = index;

    window.ProfileverseAutosave.save(state, saveStatus);

    renderQuestion();

    window.setTimeout(() => {
        if (
            state.currentQuestion < questions.length - 1 &&
            !state.transitioning
        ) {
            goNext();
        }
    }, 280);
}

function renderQuestion() {
    const current = questions[state.currentQuestion];
    const selected = state.answers[state.currentQuestion];

    sectionName.textContent = current.section || current.category;
    questionCategory.textContent = current.category;
    questionText.textContent = current.question;

    answerList.innerHTML = "";

    current.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "answer-option";

        if (selected === index) {
            button.classList.add("selected");
        }

        button.innerHTML = `
            <span class="answer-number">${index + 1}</span>
            <span>${answer.text}</span>
            <span class="answer-check">✓</span>
        `;

        button.addEventListener("click", () => {
            selectAnswer(index);
        });

        answerList.appendChild(button);
    });

    backButton.disabled = state.currentQuestion === 0;
    nextButton.disabled = selected === null;
    nextButton.textContent =
        state.currentQuestion === questions.length - 1
            ? "Finish →"
            : "Next →";

    window.ProfileverseProgress.update({
        currentIndex: state.currentQuestion,
        total: questions.length,
        progressBar,
        questionCounter,
        progressPercent
    });

    window.ProfileverseProgress.renderDots(
        questionDots,
        state.currentQuestion,
        questions.length,
        state.answers
    );

    timeRemaining.textContent =
        window.ProfileverseTimer.estimate({
            currentIndex: state.currentQuestion,
            total: questions.length,
            startedAt: state.startedAt,
            answeredCount: answeredCount()
        });
}

async function goNext() {
    if (
        state.transitioning ||
        state.answers[state.currentQuestion] === null
    ) {
        return;
    }

    if (state.currentQuestion === questions.length - 1) {
        finishAssessment();
        return;
    }

    state.transitioning = true;

    await window.ProfileverseTransitions.swap(
        quizCard,
        () => {
            state.currentQuestion += 1;
            window.ProfileverseAutosave.save(state, saveStatus);
            renderQuestion();
        },
        "forward"
    );

    state.transitioning = false;
}

async function goBack() {
    if (state.transitioning || state.currentQuestion === 0) {
        return;
    }

    state.transitioning = true;

    await window.ProfileverseTransitions.swap(
        quizCard,
        () => {
            state.currentQuestion -= 1;
            window.ProfileverseAutosave.save(state, saveStatus);
            renderQuestion();
        },
        "backward"
    );

    state.transitioning = false;
}

function togglePause(forceValue = null) {
    state.paused =
        forceValue === null
            ? !state.paused
            : forceValue;

    pauseOverlay.classList.toggle("open", state.paused);
    pauseOverlay.setAttribute(
        "aria-hidden",
        String(!state.paused)
    );
}

function finishAssessment() {
    localStorage.setItem(
        "profileverseAnswersV2",
        JSON.stringify(state.answers)
    );

    localStorage.removeItem("profileverseProfileV2");
    window.ProfileverseAutosave.clear();

    completionOverlay.classList.add("open");
    completionOverlay.setAttribute("aria-hidden", "false");

    window.setTimeout(() => {
        window.location.href = "results.html";
    }, 1500);
}

backButton.addEventListener("click", goBack);
nextButton.addEventListener("click", goNext);
pauseButton.addEventListener("click", () => togglePause());
resumeButton.addEventListener("click", () => togglePause(false));

window.ProfileverseKeyboard.bind({
    onAnswer: selectAnswer,
    onNext: goNext,
    onBack: goBack,
    onPause: () => togglePause(),
    isPaused: () => state.paused
});

createStars();
renderQuestion();
