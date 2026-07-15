"use strict";

window.ProfileverseProgress = {
    update({
        currentIndex,
        total,
        progressBar,
        questionCounter,
        progressPercent
    }) {
        const questionNumber = currentIndex + 1;
        const percent = Math.round((questionNumber / total) * 100);

        questionCounter.textContent =
            `Question ${questionNumber} of ${total}`;

        progressPercent.textContent = `${percent}%`;
        progressBar.style.width = `${percent}%`;

        return percent;
    },

    renderDots(container, currentIndex, total, answers) {
        container.innerHTML = "";

        const visibleCount = 9;
        const half = Math.floor(visibleCount / 2);
        let start = Math.max(0, currentIndex - half);
        let end = Math.min(total, start + visibleCount);

        start = Math.max(0, end - visibleCount);

        for (let index = start; index < end; index += 1) {
            const dot = document.createElement("span");
            dot.className = "question-dot";

            if (index === currentIndex) {
                dot.classList.add("active");
            } else if (answers[index] !== null) {
                dot.classList.add("complete");
            }

            container.appendChild(dot);
        }
    }
};
