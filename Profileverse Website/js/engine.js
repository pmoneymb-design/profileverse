"use strict";

const scoringMatrix = [
    [
        { curiosity: 4, adaptability: 4 },
        { strategy: 4, logic: 3, adaptability: -1 },
        { empathy: 4, curiosity: 2 },
        { logic: 4, curiosity: 3, strategy: 2 }
    ],
    [
        { strategy: 3, adaptability: 1 },
        { empathy: 4, logic: 1 },
        { empathy: 3, curiosity: 2, adaptability: 2 },
        { logic: 4, strategy: 2 }
    ],
    [
        { adaptability: 4, strategy: 2 },
        { adaptability: 3, strategy: 1 },
        { empathy: 3, adaptability: 2 },
        { logic: 4, strategy: 3, curiosity: 1 }
    ],
    [
        { empathy: 3, logic: 2 },
        { empathy: 4, curiosity: 2, logic: 1 },
        { empathy: 2, adaptability: 1 },
        { logic: 2, strategy: 1, empathy: -1 }
    ],
    [
        { adaptability: 4, curiosity: 2 },
        { logic: 2, empathy: 1, strategy: 1 },
        { logic: 4, strategy: 3, curiosity: 2 },
        { curiosity: 4, adaptability: 4 }
    ],
    [
        { strategy: 4, logic: 2 },
        { strategy: 4, logic: 2 },
        { adaptability: 2, strategy: 1 },
        { adaptability: 4, logic: 2, strategy: 2 }
    ],
    [
        { logic: 3, curiosity: 2, adaptability: 2 },
        { adaptability: 3, strategy: 1 },
        { logic: 4, strategy: 4 },
        { strategy: 2, logic: 2, adaptability: -1 }
    ],
    [
        { empathy: 5 },
        { empathy: 2, strategy: 3, logic: 2 },
        { empathy: 3, curiosity: 1 },
        { empathy: 3, adaptability: 1 }
    ],
    [
        { adaptability: 4, strategy: 2 },
        { logic: 4, curiosity: 3, strategy: 2 },
        { strategy: 2, adaptability: -1 },
        { empathy: 3, logic: 1 }
    ],
    [
        { curiosity: 4, adaptability: 2 },
        { logic: 3, curiosity: 2, strategy: 1 },
        { strategy: 4, logic: 2 },
        { adaptability: 4, curiosity: 3 }
    ]
];

function clampScore(score) {
    return Math.max(0, Math.min(100, score));
}

function calculateTraitScores(answers) {
    const scores = {
        curiosity: 50,
        logic: 50,
        strategy: 50,
        empathy: 50,
        adaptability: 50
    };

    answers.forEach((answerIndex, questionIndex) => {
        const changes = scoringMatrix[questionIndex]?.[answerIndex];

        if (!changes) {
            return;
        }

        Object.entries(changes).forEach(([trait, amount]) => {
            scores[trait] = clampScore(scores[trait] + amount);
        });
    });

    return scores;
}

function calculateThinkingStyle(scores) {
    const styleScores = {
        Investigative:
            scores.logic * 0.4 +
            scores.strategy * 0.35 +
            scores.curiosity * 0.25,

        Exploratory:
            scores.curiosity * 0.4 +
            scores.adaptability * 0.4 +
            scores.logic * 0.2,

        Reflective:
            scores.empathy * 0.35 +
            scores.logic * 0.35 +
            scores.strategy * 0.3,

        Adaptive:
            scores.adaptability * 0.5 +
            scores.curiosity * 0.25 +
            scores.empathy * 0.25
    };

    return Object.entries(styleScores).sort(
        (a, b) => b[1] - a[1]
    )[0][0];
}

function calculateArchetype(scores, thinkingStyle) {
    const archetypeScores = {
        Analyst:
            scores.logic * 0.35 +
            scores.strategy * 0.35 +
            scores.curiosity * 0.2 +
            scores.adaptability * 0.1,

        Explorer:
            scores.curiosity * 0.4 +
            scores.adaptability * 0.4 +
            scores.logic * 0.1 +
            scores.empathy * 0.1,

        Diplomat:
            scores.empathy * 0.55 +
            scores.adaptability * 0.2 +
            scores.logic * 0.15 +
            scores.curiosity * 0.1,

        Builder:
            scores.strategy * 0.4 +
            scores.logic * 0.3 +
            scores.adaptability * 0.2 +
            scores.curiosity * 0.1
    };

    if (thinkingStyle === "Investigative") {
        archetypeScores.Analyst += 5;
    }

    if (thinkingStyle === "Exploratory") {
        archetypeScores.Explorer += 5;
    }

    if (thinkingStyle === "Reflective") {
        archetypeScores.Diplomat += 5;
    }

    if (thinkingStyle === "Adaptive") {
        archetypeScores.Explorer += 3;
        archetypeScores.Builder += 2;
    }

    const ranked = Object.entries(archetypeScores).sort(
        (a, b) => b[1] - a[1]
    );

    return {
        primary: ranked[0][0],
        secondary: ranked[1][0]
    };
}

const universeMappings = {
    Analyst: {
        harryPotter: "Ravenclaw",
        starWars: "Green Lightsaber",
        greekMythology: "Athena",
        pokemon: "Lucario"
    },

    Explorer: {
        harryPotter: "Gryffindor",
        starWars: "Yellow Lightsaber",
        greekMythology: "Hermes",
        pokemon: "Eevee"
    },

    Diplomat: {
        harryPotter: "Hufflepuff",
        starWars: "Blue Lightsaber",
        greekMythology: "Apollo",
        pokemon: "Gardevoir"
    },

    Builder: {
        harryPotter: "Slytherin",
        starWars: "Purple Lightsaber",
        greekMythology: "Hephaestus",
        pokemon: "Metagross"
    }
};

const archetypeDescriptions = {
    Analyst:
        "You naturally seek understanding before acting. You prefer informed decisions, clear reasoning, and thoughtful preparation.",

    Explorer:
        "You naturally seek new possibilities and experiences. You are flexible, curious, and comfortable discovering your path as you go.",

    Diplomat:
        "You naturally consider people and relationships. You listen carefully, seek understanding, and value cooperation.",

    Builder:
        "You naturally create structure and improve systems. You value preparation, practical progress, and dependable results."
};

function buildProfile(answers) {
    const traits = calculateTraitScores(answers);
    const thinkingStyle = calculateThinkingStyle(traits);
    const archetypes = calculateArchetype(traits, thinkingStyle);

    return {
        traits,
        thinkingStyle,
        primaryArchetype: archetypes.primary,
        secondaryArchetype: archetypes.secondary,
        description: archetypeDescriptions[archetypes.primary],
        universes: universeMappings[archetypes.primary]
    };
}

window.profileverseEngine = {
    buildProfile
};