"use strict";

window.ProfileverseKeyboard = {
    bind({
        onAnswer,
        onNext,
        onBack,
        onPause,
        isPaused
    }) {
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                onPause();
                return;
            }

            if (isPaused()) {
                return;
            }

            if (["1", "2", "3", "4"].includes(event.key)) {
                onAnswer(Number(event.key) - 1);
                return;
            }

            if (event.key === "ArrowRight" || event.key === "Enter") {
                onNext();
                return;
            }

            if (event.key === "ArrowLeft") {
                onBack();
            }
        });
    }
};
