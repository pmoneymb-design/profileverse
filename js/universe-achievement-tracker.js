"use strict";

/*
Add this script to each fandom page with a data-universe attribute:

<script
    src="../js/achievements.js"
    data-universe="harry-potter"
></script>
<script src="../js/universe-achievement-tracker.js"></script>

Accepted IDs:
- harry-potter
- star-wars
- pokemon
- percy-jackson
*/

document.addEventListener("DOMContentLoaded", () => {
    const achievementScript = document.querySelector(
        'script[src$="achievements.js"][data-universe]'
    );

    const universeId =
        achievementScript?.dataset?.universe;

    if (!universeId || !window.ProfileverseAchievements) {
        return;
    }

    const state =
        window.ProfileverseAchievements.recordUniverseVisit(
            universeId
        );

    window.ProfileverseAchievements.showUnlockQueue(
        state.newlyUnlocked
    );
});
