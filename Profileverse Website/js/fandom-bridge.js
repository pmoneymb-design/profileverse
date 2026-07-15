"use strict";

/*
This bridge lets the current Harry Potter, Star Wars, and Pokémon pages
continue working while their full v2 translators are developed.
*/

const storedV2 = localStorage.getItem("profileverseProfileV2");

if (storedV2) {
    const profileV2 = JSON.parse(storedV2);

    const map = {
        Analyst: "Analyst",
        Explorer: "Explorer",
        Builder: "Builder",
        Diplomat: "Diplomat",
        Guardian: "Diplomat",
        Visionary: "Builder",
        Maverick: "Explorer",
        Catalyst: "Explorer"
    };

    const legacyProfile = {
        primaryArchetype:
            map[profileV2.primaryArchetype] || "Analyst",
        secondaryArchetype:
            map[profileV2.secondaryArchetype] || "Explorer",
        thinkingStyle: profileV2.thinkingStyle,
        traits: profileV2.traits
    };

    localStorage.setItem(
        "profileverseProfile",
        JSON.stringify(legacyProfile)
    );
}
