"use strict";

window.ProfileverseTransitions = {
    async swap(card, updateFunction, direction = "forward") {
        card.classList.remove("transition-in");
        card.classList.add("transition-out");

        await new Promise((resolve) => {
            window.setTimeout(resolve, 170);
        });

        updateFunction();

        card.classList.remove("transition-out");

        if (direction === "backward") {
            card.style.transformOrigin = "left center";
        } else {
            card.style.transformOrigin = "right center";
        }

        card.classList.add("transition-in");

        window.setTimeout(() => {
            card.classList.remove("transition-in");
        }, 400);
    }
};
