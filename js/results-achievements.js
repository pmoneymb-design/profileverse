"use strict";

/*
Load this file after achievements.js and after the main results logic.
It records assessment completions, unlocks achievements, and renders the grid.
*/

document.addEventListener("DOMContentLoaded", () => {
    const profile = JSON.parse(
        localStorage.getItem("profileverseProfileV2") || "null"
    );

    const answers = JSON.parse(
        localStorage.getItem("profileverseAnswersV2") || "null"
    );

    if (!profile || !Array.isArray(answers)) {
        return;
    }

    window.ProfileverseAchievements.recordAssessment(
        profile,
        answers
    );

    const state = window.ProfileverseAchievements.evaluate(
        profile,
        answers
    );

    window.ProfileverseAchievements.renderGrid(
        "achievementGrid"
    );

    window.ProfileverseAchievements.showUnlockQueue(
        state.newlyUnlocked
    );
});
