"use strict";

window.ProfileverseAutosave = {
    storageKey: "profileverseAssessmentProgressV3",

    load(totalQuestions) {
        try {
            const saved = JSON.parse(
                localStorage.getItem(this.storageKey) || "null"
            );

            if (
                saved &&
                Array.isArray(saved.answers) &&
                saved.answers.length === totalQuestions
            ) {
                return saved;
            }
        } catch (error) {
            console.warn("Could not load saved progress.", error);
        }

        return null;
    },

    save(state, statusElement) {
        localStorage.setItem(
            this.storageKey,
            JSON.stringify({
                currentQuestion: state.currentQuestion,
                answers: state.answers,
                savedAt: Date.now()
            })
        );

        if (statusElement) {
            statusElement.textContent = "Saving...";

            window.clearTimeout(this.statusTimer);

            this.statusTimer = window.setTimeout(() => {
                statusElement.textContent = "Progress saved";
            }, 450);
        }
    },

    clear() {
        localStorage.removeItem(this.storageKey);
    }
};
