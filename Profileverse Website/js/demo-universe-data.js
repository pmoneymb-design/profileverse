"use strict";

/*
DEMO UNIVERSE MODULE

This proves the universal framework works without changing
the existing live fandom pages.
*/

const PROFILEVERSE_DEMO_UNIVERSE = {
    id: "demo-realm",
    name: "Demo Realm",
    version: "1.0",

    fields: {
        role: {
            type: "ranked",

            options: [
                {
                    id: "scholar",
                    name: "Scholar",
                    description:
                        "You seek knowledge and hidden patterns.",

                    weights: {
                        logic: 0.28,
                        curiosity: 0.22,
                        learningOrientation: 0.20,
                        strategy: 0.16,
                        patience: 0.14
                    },

                    archetypeBonuses: {
                        Analyst: 9
                    }
                },

                {
                    id: "pathfinder",
                    name: "Pathfinder",
                    description:
                        "You discover new paths through change.",

                    weights: {
                        adaptability: 0.26,
                        curiosity: 0.22,
                        riskTolerance: 0.18,
                        independence: 0.18,
                        creativity: 0.16
                    },

                    archetypeBonuses: {
                        Explorer: 9,
                        Maverick: 5
                    }
                },

                {
                    id: "protector",
                    name: "Protector",
                    description:
                        "You defend people and important commitments.",

                    weights: {
                        empathy: 0.24,
                        resilience: 0.22,
                        discipline: 0.18,
                        cooperation: 0.18,
                        leadership: 0.18
                    },

                    archetypeBonuses: {
                        Guardian: 9,
                        Diplomat: 4
                    }
                },

                {
                    id: "commander",
                    name: "Commander",
                    description:
                        "You organize people and create momentum.",

                    weights: {
                        leadership: 0.27,
                        confidence: 0.22,
                        communication: 0.18,
                        strategy: 0.18,
                        ambition: 0.15
                    },

                    archetypeBonuses: {
                        Catalyst: 9,
                        Visionary: 5
                    }
                }
            ]
        },

        artifact: {
            type: "topTrait",

            options: [
                {
                    trait: "logic",
                    name: "Crystal Codex"
                },
                {
                    trait: "creativity",
                    name: "Shifting Prism"
                },
                {
                    trait: "empathy",
                    name: "Heartstone"
                },
                {
                    trait: "discipline",
                    name: "Iron Sigil"
                },
                {
                    trait: "adaptability",
                    name: "Traveler's Compass"
                }
            ]
        },

        companion: {
            type: "archetypeMap",

            values: {
                Analyst: "Silver Owl",
                Explorer: "Sky Fox",
                Builder: "Stone Golem",
                Diplomat: "White Stag",
                Guardian: "Dire Wolf",
                Visionary: "Phoenix",
                Maverick: "Shadow Lynx",
                Catalyst: "Golden Lion"
            },

            fallback: "Spirit Raven"
        }
    }
};

window.ProfileverseDemoUniverse =
    PROFILEVERSE_DEMO_UNIVERSE;
