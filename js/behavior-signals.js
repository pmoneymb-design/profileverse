"use strict";

/*
PROFILEVERSE CORE ENGINE v2
STEP 2 - BEHAVIOR SIGNAL LIBRARY

Each signal represents an observable tendency revealed by an answer.
Signals apply weighted changes to the 20 core traits.
*/

const PROFILEVERSE_BEHAVIOR_SIGNALS = {
    exploresUnknown: {
        name: "Explores unfamiliar options",
        effects: {
            curiosity: 3,
            adaptability: 2,
            riskTolerance: 1,
            openMindedness: 1
        }
    },

    researchesFirst: {
        name: "Researches before deciding",
        effects: {
            logic: 3,
            strategy: 2,
            curiosity: 1,
            patience: 1
        }
    },

    plansAhead: {
        name: "Plans before acting",
        effects: {
            strategy: 3,
            discipline: 2,
            patience: 1,
            adaptability: -1
        }
    },

    actsImmediately: {
        name: "Acts immediately",
        effects: {
            confidence: 2,
            riskTolerance: 2,
            adaptability: 1,
            patience: -1
        }
    },

    trustsIntuition: {
        name: "Trusts intuition",
        effects: {
            confidence: 3,
            independence: 2,
            riskTolerance: 1,
            logic: -1
        }
    },

    evaluatesOptions: {
        name: "Evaluates multiple options",
        effects: {
            logic: 3,
            strategy: 2,
            patience: 1,
            selfAwareness: 1
        }
    },

    seeksAdvice: {
        name: "Seeks trusted advice",
        effects: {
            cooperation: 2,
            communication: 2,
            empathy: 1,
            independence: -1
        }
    },

    listensFirst: {
        name: "Listens before responding",
        effects: {
            empathy: 3,
            patience: 2,
            communication: 1,
            selfAwareness: 1
        }
    },

    takesInitiative: {
        name: "Takes initiative",
        effects: {
            leadership: 3,
            confidence: 2,
            ambition: 1,
            independence: 1
        }
    },

    organizesOthers: {
        name: "Organizes people and roles",
        effects: {
            leadership: 3,
            strategy: 2,
            communication: 1,
            discipline: 1
        }
    },

    encouragesCollaboration: {
        name: "Encourages collaboration",
        effects: {
            cooperation: 3,
            empathy: 2,
            communication: 2,
            leadership: 1
        }
    },

    protectsHarmony: {
        name: "Protects group harmony",
        effects: {
            empathy: 2,
            cooperation: 2,
            patience: 1,
            confidence: -1
        }
    },

    defendsBeliefs: {
        name: "Defends personal beliefs",
        effects: {
            confidence: 3,
            independence: 2,
            communication: 1,
            cooperation: -1
        }
    },

    solvesPractically: {
        name: "Focuses on a practical solution",
        effects: {
            logic: 2,
            strategy: 2,
            discipline: 1,
            creativity: -1
        }
    },

    experimentsFreely: {
        name: "Experiments through trial and error",
        effects: {
            creativity: 3,
            adaptability: 3,
            curiosity: 2,
            discipline: -1
        }
    },

    generatesIdeas: {
        name: "Generates many possibilities",
        effects: {
            creativity: 3,
            curiosity: 2,
            openMindedness: 2,
            strategy: -1
        }
    },

    learnsFromExamples: {
        name: "Learns from proven examples",
        effects: {
            learningOrientation: 2,
            logic: 2,
            patience: 1,
            creativity: -1
        }
    },

    learnsByDoing: {
        name: "Learns through direct experience",
        effects: {
            adaptability: 2,
            learningOrientation: 2,
            confidence: 1,
            patience: -1
        }
    },

    studiesFoundations: {
        name: "Builds a foundation before starting",
        effects: {
            learningOrientation: 3,
            logic: 2,
            discipline: 2,
            strategy: 1
        }
    },

    adaptsQuickly: {
        name: "Adjusts quickly when circumstances change",
        effects: {
            adaptability: 4,
            resilience: 2,
            openMindedness: 1,
            patience: -1
        }
    },

    prefersStability: {
        name: "Chooses stability over uncertainty",
        effects: {
            patience: 2,
            discipline: 1,
            riskTolerance: -3,
            adaptability: -1
        }
    },

    takesCalculatedRisk: {
        name: "Takes calculated risks",
        effects: {
            riskTolerance: 3,
            strategy: 2,
            confidence: 1,
            logic: 1
        }
    },

    avoidsRisk: {
        name: "Avoids unnecessary risk",
        effects: {
            patience: 2,
            strategy: 1,
            riskTolerance: -3,
            confidence: -1
        }
    },

    recoversCalmly: {
        name: "Regains composure after setbacks",
        effects: {
            resilience: 3,
            selfAwareness: 2,
            patience: 1,
            adaptability: 1
        }
    },

    rebuildsImmediately: {
        name: "Rebuilds momentum immediately",
        effects: {
            resilience: 3,
            confidence: 2,
            ambition: 1,
            patience: -1
        }
    },

    learnsFromMistakes: {
        name: "Analyzes mistakes for future improvement",
        effects: {
            selfAwareness: 3,
            learningOrientation: 2,
            logic: 2,
            resilience: 1
        }
    },

    persistsTowardGoal: {
        name: "Persists toward a difficult goal",
        effects: {
            discipline: 3,
            resilience: 3,
            ambition: 2,
            patience: 1
        }
    },

    prioritizesImpact: {
        name: "Prioritizes the highest-impact task",
        effects: {
            strategy: 3,
            logic: 2,
            ambition: 1,
            discipline: 1
        }
    },

    buildsMomentum: {
        name: "Builds momentum through quick progress",
        effects: {
            confidence: 2,
            adaptability: 1,
            ambition: 1,
            strategy: -1
        }
    },

    createsStructure: {
        name: "Creates structure in an unclear situation",
        effects: {
            strategy: 3,
            discipline: 2,
            leadership: 1,
            creativity: -1
        }
    },

    considersFeelings: {
        name: "Considers how others feel",
        effects: {
            empathy: 4,
            cooperation: 2,
            communication: 1,
            independence: -1
        }
    },

    offersGuidance: {
        name: "Offers advice and guidance",
        effects: {
            communication: 2,
            empathy: 2,
            leadership: 1,
            confidence: 1
        }
    },

    respectsSpace: {
        name: "Respects another person's independence",
        effects: {
            empathy: 2,
            patience: 2,
            selfAwareness: 1,
            cooperation: 1
        }
    },

    communicatesDirectly: {
        name: "Communicates directly",
        effects: {
            communication: 3,
            confidence: 2,
            leadership: 1,
            charisma: 1
        }
    },

    persuadesOthers: {
        name: "Persuades others toward an idea",
        effects: {
            charisma: 3,
            communication: 2,
            confidence: 2,
            leadership: 1
        }
    },

    seeksRecognition: {
        name: "Seeks recognition for achievement",
        effects: {
            ambition: 3,
            charisma: 1,
            confidence: 1,
            cooperation: -1
        }
    },

    pursuesMastery: {
        name: "Pursues mastery over time",
        effects: {
            discipline: 3,
            learningOrientation: 3,
            patience: 2,
            ambition: 1
        }
    },

    questionsAssumptions: {
        name: "Questions existing assumptions",
        effects: {
            openMindedness: 3,
            curiosity: 2,
            creativity: 2,
            independence: 1
        }
    },

    reflectsInternally: {
        name: "Reflects internally before responding",
        effects: {
            selfAwareness: 3,
            patience: 2,
            logic: 1,
            communication: -1
        }
    },

    welcomesFeedback: {
        name: "Welcomes constructive feedback",
        effects: {
            selfAwareness: 3,
            learningOrientation: 2,
            openMindedness: 2,
            confidence: 1
        }
    }
};

function getBehaviorSignal(signalId) {
    return PROFILEVERSE_BEHAVIOR_SIGNALS[signalId] || null;
}

function applyBehaviorSignal(scores, signalId) {
    const signal = getBehaviorSignal(signalId);

    if (!signal) {
        console.warn(`Unknown Profileverse behavior signal: ${signalId}`);
        return scores;
    }

    Object.entries(signal.effects).forEach(([trait, amount]) => {
        const currentScore = Number(scores[trait] ?? 50);
        scores[trait] = Math.max(0, Math.min(100, currentScore + amount));
    });

    return scores;
}

function applyBehaviorSignals(scores, signalIds) {
    signalIds.forEach((signalId) => {
        applyBehaviorSignal(scores, signalId);
    });

    return scores;
}

window.ProfileverseBehaviorSignals = PROFILEVERSE_BEHAVIOR_SIGNALS;
window.ProfileverseApplyBehaviorSignal = applyBehaviorSignal;
window.ProfileverseApplyBehaviorSignals = applyBehaviorSignals;
