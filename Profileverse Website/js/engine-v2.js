"use strict";

/*
==================================================
PROFILEVERSE CORE ENGINE v2
STEP 4 - FULL PERSONALITY ENGINE
==================================================

Required files loaded before this file:
1. traits.js
2. behavior-signals.js
3. questions-v2.js

Pipeline:
Answers
→ Behavior Signals
→ 20 Trait Scores
→ 8 Thinking Styles
→ 8 Archetypes
→ Universe-ready Profile
*/

const PROFILEVERSE_THINKING_STYLES = {
    investigative: {
        name: "Investigative",
        description: "Seeks evidence, patterns, and understanding before acting.",
        weights: {
            logic: 0.24,
            curiosity: 0.18,
            strategy: 0.16,
            learningOrientation: 0.15,
            patience: 0.10,
            selfAwareness: 0.09,
            openMindedness: 0.08
        }
    },

    exploratory: {
        name: "Exploratory",
        description: "Discovers answers through novelty, experimentation, and experience.",
        weights: {
            curiosity: 0.22,
            adaptability: 0.20,
            creativity: 0.18,
            openMindedness: 0.15,
            riskTolerance: 0.12,
            confidence: 0.08,
            independence: 0.05
        }
    },

    reflective: {
        name: "Reflective",
        description: "Processes situations internally before responding.",
        weights: {
            selfAwareness: 0.22,
            patience: 0.18,
            empathy: 0.17,
            logic: 0.15,
            openMindedness: 0.12,
            learningOrientation: 0.09,
            communication: 0.07
        }
    },

    adaptive: {
        name: "Adaptive",
        description: "Adjusts quickly as circumstances, people, and information change.",
        weights: {
            adaptability: 0.28,
            resilience: 0.20,
            openMindedness: 0.14,
            creativity: 0.12,
            riskTolerance: 0.10,
            cooperation: 0.09,
            confidence: 0.07
        }
    },

    tactical: {
        name: "Tactical",
        description: "Focuses on timing, priorities, and practical execution.",
        weights: {
            strategy: 0.24,
            logic: 0.19,
            discipline: 0.18,
            confidence: 0.12,
            leadership: 0.10,
            resilience: 0.09,
            riskTolerance: 0.08
        }
    },

    intuitive: {
        name: "Intuitive",
        description: "Relies on instinct, personal judgment, and fast pattern recognition.",
        weights: {
            confidence: 0.23,
            independence: 0.18,
            creativity: 0.15,
            selfAwareness: 0.14,
            riskTolerance: 0.12,
            charisma: 0.10,
            adaptability: 0.08
        }
    },

    collaborative: {
        name: "Collaborative",
        description: "Builds decisions through listening, communication, and shared input.",
        weights: {
            cooperation: 0.23,
            empathy: 0.21,
            communication: 0.18,
            leadership: 0.10,
            patience: 0.10,
            openMindedness: 0.10,
            charisma: 0.08
        }
    },

    visionary: {
        name: "Visionary",
        description: "Focuses on future possibilities, bold ideas, and meaningful impact.",
        weights: {
            creativity: 0.20,
            ambition: 0.19,
            curiosity: 0.14,
            leadership: 0.13,
            confidence: 0.11,
            openMindedness: 0.10,
            charisma: 0.08,
            riskTolerance: 0.05
        }
    }
};

const PROFILEVERSE_ARCHETYPES = {
    analyst: {
        name: "Analyst",
        description:
            "You seek understanding before action and prefer decisions grounded in evidence, patterns, and preparation.",
        weights: {
            logic: 0.20,
            strategy: 0.18,
            curiosity: 0.14,
            learningOrientation: 0.13,
            patience: 0.10,
            selfAwareness: 0.09,
            discipline: 0.08,
            openMindedness: 0.08
        },
        thinkingStyleBonuses: {
            Investigative: 8,
            Reflective: 4,
            Tactical: 3
        }
    },

    explorer: {
        name: "Explorer",
        description:
            "You are energized by discovery, freedom, new possibilities, and learning through experience.",
        weights: {
            curiosity: 0.20,
            adaptability: 0.18,
            openMindedness: 0.14,
            riskTolerance: 0.12,
            creativity: 0.12,
            independence: 0.10,
            confidence: 0.07,
            resilience: 0.07
        },
        thinkingStyleBonuses: {
            Exploratory: 8,
            Adaptive: 5,
            Intuitive: 3
        }
    },

    builder: {
        name: "Builder",
        description:
            "You create structure, improve systems, and turn consistent effort into dependable results.",
        weights: {
            discipline: 0.20,
            strategy: 0.17,
            resilience: 0.14,
            logic: 0.12,
            patience: 0.11,
            learningOrientation: 0.10,
            ambition: 0.09,
            leadership: 0.07
        },
        thinkingStyleBonuses: {
            Tactical: 8,
            Investigative: 3,
            Adaptive: 3
        }
    },

    diplomat: {
        name: "Diplomat",
        description:
            "You understand people, reduce unnecessary conflict, and create progress through trust and communication.",
        weights: {
            empathy: 0.22,
            cooperation: 0.19,
            communication: 0.16,
            patience: 0.11,
            openMindedness: 0.10,
            selfAwareness: 0.08,
            charisma: 0.08,
            adaptability: 0.06
        },
        thinkingStyleBonuses: {
            Collaborative: 8,
            Reflective: 5,
            Adaptive: 2
        }
    },

    guardian: {
        name: "Guardian",
        description:
            "You protect people, commitments, and stability through loyalty, patience, and dependable action.",
        weights: {
            empathy: 0.16,
            cooperation: 0.15,
            discipline: 0.14,
            resilience: 0.13,
            patience: 0.12,
            leadership: 0.10,
            selfAwareness: 0.08,
            communication: 0.07,
            strategy: 0.05
        },
        thinkingStyleBonuses: {
            Collaborative: 5,
            Reflective: 4,
            Tactical: 3
        }
    },

    visionary: {
        name: "Visionary",
        description:
            "You imagine what could be possible and motivate yourself or others toward meaningful change.",
        weights: {
            creativity: 0.19,
            ambition: 0.18,
            leadership: 0.14,
            confidence: 0.12,
            curiosity: 0.11,
            charisma: 0.10,
            openMindedness: 0.09,
            riskTolerance: 0.07
        },
        thinkingStyleBonuses: {
            Visionary: 8,
            Intuitive: 4,
            Exploratory: 3
        }
    },

    maverick: {
        name: "Maverick",
        description:
            "You trust your own path, question assumptions, and remain comfortable operating outside expectations.",
        weights: {
            independence: 0.22,
            confidence: 0.16,
            creativity: 0.14,
            riskTolerance: 0.13,
            openMindedness: 0.11,
            adaptability: 0.10,
            charisma: 0.07,
            resilience: 0.07
        },
        thinkingStyleBonuses: {
            Intuitive: 8,
            Exploratory: 4,
            Adaptive: 3
        }
    },

    catalyst: {
        name: "Catalyst",
        description:
            "You create movement, energize others, and turn opportunities into action.",
        weights: {
            leadership: 0.18,
            charisma: 0.17,
            confidence: 0.15,
            ambition: 0.14,
            communication: 0.11,
            adaptability: 0.09,
            resilience: 0.08,
            cooperation: 0.05,
            riskTolerance: 0.03
        },
        thinkingStyleBonuses: {
            Visionary: 5,
            Tactical: 4,
            Collaborative: 3,
            Intuitive: 3
        }
    }
};

function cloneDefaultTraitScores() {
    if (!window.ProfileverseDefaultTraitScores) {
        throw new Error(
            "traits.js must load before engine-v2.js"
        );
    }

    return {
        ...window.ProfileverseDefaultTraitScores
    };
}

function clampScore(score) {
    return Math.max(0, Math.min(100, Math.round(score)));
}

function calculateWeightedScore(traits, weights) {
    return Object.entries(weights).reduce(
        (total, [traitId, weight]) => {
            const traitScore = Number(traits[traitId] ?? 50);
            return total + traitScore * weight;
        },
        0
    );
}

function normalizeRankedScores(scoreObject) {
    const entries = Object.entries(scoreObject).sort(
        (a, b) => b[1] - a[1]
    );

    const maximum = entries[0]?.[1] || 1;

    return entries.map(([id, score]) => ({
        id,
        score: Math.round(score * 100) / 100,
        match: clampScore((score / maximum) * 100)
    }));
}

function calculateTraitScores(questions, answers) {
    const traits = cloneDefaultTraitScores();

    answers.forEach((answerIndex, questionIndex) => {
        const question = questions[questionIndex];

        if (
            !question ||
            answerIndex === null ||
            answerIndex === undefined
        ) {
            return;
        }

        const selectedAnswer = question.answers?.[answerIndex];

        if (!selectedAnswer) {
            return;
        }

        const signals = selectedAnswer.signals || [];

        if (!window.ProfileverseApplyBehaviorSignals) {
            throw new Error(
                "behavior-signals.js must load before engine-v2.js"
            );
        }

        window.ProfileverseApplyBehaviorSignals(
            traits,
            signals
        );
    });

    Object.keys(traits).forEach((traitId) => {
        traits[traitId] = clampScore(traits[traitId]);
    });

    return traits;
}

function calculateThinkingStyles(traits) {
    const styleScores = {};

    Object.entries(PROFILEVERSE_THINKING_STYLES).forEach(
        ([styleId, style]) => {
            styleScores[styleId] = calculateWeightedScore(
                traits,
                style.weights
            );
        }
    );

    const rankedStyles = normalizeRankedScores(styleScores);

    return {
        primary: {
            ...rankedStyles[0],
            ...PROFILEVERSE_THINKING_STYLES[rankedStyles[0].id]
        },
        secondary: {
            ...rankedStyles[1],
            ...PROFILEVERSE_THINKING_STYLES[rankedStyles[1].id]
        },
        rankings: rankedStyles.map((style) => ({
            ...style,
            name: PROFILEVERSE_THINKING_STYLES[style.id].name,
            description:
                PROFILEVERSE_THINKING_STYLES[style.id].description
        }))
    };
}

function calculateArchetypes(traits, thinkingStyles) {
    const archetypeScores = {};

    Object.entries(PROFILEVERSE_ARCHETYPES).forEach(
        ([archetypeId, archetype]) => {
            let score = calculateWeightedScore(
                traits,
                archetype.weights
            );

            const primaryStyleName =
                thinkingStyles.primary.name;

            const secondaryStyleName =
                thinkingStyles.secondary.name;

            score +=
                archetype.thinkingStyleBonuses[
                    primaryStyleName
                ] || 0;

            score +=
                (archetype.thinkingStyleBonuses[
                    secondaryStyleName
                ] || 0) * 0.5;

            archetypeScores[archetypeId] = score;
        }
    );

    const rankedArchetypes =
        normalizeRankedScores(archetypeScores);

    return {
        primary: {
            ...rankedArchetypes[0],
            ...PROFILEVERSE_ARCHETYPES[
                rankedArchetypes[0].id
            ]
        },
        secondary: {
            ...rankedArchetypes[1],
            ...PROFILEVERSE_ARCHETYPES[
                rankedArchetypes[1].id
            ]
        },
        rankings: rankedArchetypes.map((archetype) => ({
            ...archetype,
            name:
                PROFILEVERSE_ARCHETYPES[
                    archetype.id
                ].name,
            description:
                PROFILEVERSE_ARCHETYPES[
                    archetype.id
                ].description
        }))
    };
}

function calculateConfidence(primaryMatch, secondaryMatch) {
    const separation =
        primaryMatch - secondaryMatch;

    if (separation >= 12) {
        return {
            label: "Very High",
            score: 95
        };
    }

    if (separation >= 7) {
        return {
            label: "High",
            score: 85
        };
    }

    if (separation >= 3) {
        return {
            label: "Moderate",
            score: 72
        };
    }

    return {
        label: "Balanced",
        score: 60
    };
}

function findTopTraits(traits, limit = 5) {
    return Object.entries(traits)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([id, score]) => ({
            id,
            score,
            name:
                window.ProfileverseTraits?.[id]?.name ||
                id
        }));
}

function buildProfile(answers, questions = null) {
    const activeQuestions =
        questions ||
        window.profileverseQuestionsV2;

    if (!Array.isArray(activeQuestions)) {
        throw new Error(
            "questions-v2.js must load before engine-v2.js"
        );
    }

    if (!Array.isArray(answers)) {
        throw new TypeError(
            "Profileverse answers must be an array."
        );
    }

    const traits = calculateTraitScores(
        activeQuestions,
        answers
    );

    const thinkingStyles =
        calculateThinkingStyles(traits);

    const archetypes = calculateArchetypes(
        traits,
        thinkingStyles
    );

    const confidence = calculateConfidence(
        archetypes.primary.match,
        archetypes.secondary.match
    );

    return {
        engineVersion: "2.0",
        traits,
        topTraits: findTopTraits(traits),
        thinkingStyle: thinkingStyles.primary.name,
        secondaryThinkingStyle:
            thinkingStyles.secondary.name,
        thinkingStyles,
        primaryArchetype:
            archetypes.primary.name,
        primaryArchetypeId:
            archetypes.primary.id,
        secondaryArchetype:
            archetypes.secondary.name,
        secondaryArchetypeId:
            archetypes.secondary.id,
        description:
            archetypes.primary.description,
        archetypes,
        confidence
    };
}

window.ProfileverseThinkingStyles =
    PROFILEVERSE_THINKING_STYLES;

window.ProfileverseArchetypes =
    PROFILEVERSE_ARCHETYPES;

window.profileverseEngineV2 = {
    buildProfile,
    calculateTraitScores,
    calculateThinkingStyles,
    calculateArchetypes
};
