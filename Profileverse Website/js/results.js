"use strict";

const savedAnswers = localStorage.getItem("profileverseAnswersV2");

if (!savedAnswers) {
    window.location.href = "quiz.html";
} else {
    try {
        const answers = JSON.parse(savedAnswers);

        const profile = window.profileverseEngineV2.buildProfile(
            answers,
            window.profileverseQuestionsV2
        );

        profile.profileId =
            window.ProfileverseAnalytics.makeProfileId(profile);

        localStorage.setItem(
            "profileverseProfileV2",
            JSON.stringify(profile)
        );

        const summary =
            window.ProfileversePersonalitySummary.get(
                profile.primaryArchetype
            );

        document.getElementById("primaryArchetype").textContent =
            profile.primaryArchetype;

        document.getElementById("personalitySummary").textContent =
            summary.summary;

        document.getElementById("profileId").textContent =
            profile.profileId;

        document.getElementById("thinkingStyle").textContent =
            profile.thinkingStyle;

        document.getElementById("confidence").textContent =
            `${profile.confidence.label} confidence`;

        document.getElementById("primaryMatch").textContent =
            `${profile.archetypes.primary.match}%`;

        document.getElementById("topTraitName").textContent =
            profile.topTraits[0].name;

        document.getElementById("topTraitScore").textContent =
            `${profile.topTraits[0].score}/100`;

        document.getElementById("secondaryArchetype").textContent =
            profile.secondaryArchetype;

        document.getElementById("secondaryMatch").textContent =
            `${profile.archetypes.secondary.match}% match`;

        document.getElementById("secondaryThinkingStyle").textContent =
            profile.secondaryThinkingStyle;

        const [balance, balanceText] =
            window.ProfileverseAnalytics.calculateBalance(profile);

        document.getElementById("profileBalance").textContent =
            balance;

        document.getElementById("balanceText").textContent =
            balanceText;

        window.ProfileverseCharts.renderConfidenceRing(
            profile.confidence.score
        );

        window.ProfileverseCharts.renderTraitRadar(profile);
        window.ProfileverseCharts.renderArchetypeWheel(profile);

        window.ProfileverseCharts.renderRanking(
            "archetypeRanking",
            profile.archetypes.rankings
        );

        window.ProfileverseCharts.renderRanking(
            "thinkingRanking",
            profile.thinkingStyles.rankings
        );

        const strongest = Object.entries(profile.traits)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([id, score]) => ({ id, score }));

        const growth = Object.entries(profile.traits)
            .sort((a, b) => a[1] - b[1])
            .slice(0, 5)
            .map(([id, score]) => ({ id, score }));

        window.ProfileverseAnalytics.renderTraitCards(
            "strengthCards",
            strongest
        );

        window.ProfileverseAnalytics.renderTraitCards(
            "growthCards",
            growth
        );

        window.ProfileverseAnalytics.renderInsights(summary);
        window.ProfileverseAnalytics.renderRecommendations(
            profile.primaryArchetype
        );

        const fandomMap = {
            Analyst: ["Ravenclaw", "Green Lightsaber", "Lucario", "Athena"],
            Explorer: ["Gryffindor", "Yellow Lightsaber", "Eevee", "Hermes"],
            Builder: ["Slytherin", "Purple Lightsaber", "Metagross", "Hephaestus"],
            Diplomat: ["Hufflepuff", "Blue Lightsaber", "Gardevoir", "Aphrodite"],
            Guardian: ["Hufflepuff", "Blue Lightsaber", "Arcanine", "Poseidon"],
            Visionary: ["Slytherin", "Purple Lightsaber", "Mewtwo", "Apollo"],
            Maverick: ["Gryffindor", "White Lightsaber", "Zoroark", "Hades"],
            Catalyst: ["Gryffindor", "Blue Lightsaber", "Charizard", "Ares"]
        };

        const matches =
            fandomMap[profile.primaryArchetype] ||
            fandomMap.Analyst;

        document.getElementById("harryPotterResult").textContent =
            matches[0];

        document.getElementById("starWarsResult").textContent =
            matches[1];

        document.getElementById("pokemonResult").textContent =
            matches[2];

        document.getElementById("percyJacksonResult").textContent =
            matches[3];
    } catch (error) {
        console.error("Profileverse analytics error:", error);

        document.getElementById("primaryArchetype").textContent =
            "Unable to calculate";
    }
}
