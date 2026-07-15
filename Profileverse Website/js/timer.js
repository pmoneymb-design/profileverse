"use strict";

window.ProfileverseTimer = {
    estimate({
        currentIndex,
        total,
        startedAt,
        answeredCount
    }) {
        const remaining = total - currentIndex - 1;

        let secondsPerQuestion = 14;

        if (answeredCount > 2) {
            const elapsedSeconds = Math.max(
                1,
                (Date.now() - startedAt) / 1000
            );

            secondsPerQuestion = Math.max(
                6,
                Math.min(30, elapsedSeconds / answeredCount)
            );
        }

        const minutes = Math.max(
            1,
            Math.round((remaining * secondsPerQuestion) / 60)
        );

        return remaining === 0
            ? "Final question"
            : `About ${minutes} minute${minutes === 1 ? "" : "s"} left`;
    }
};
