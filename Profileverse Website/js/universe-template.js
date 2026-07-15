"use strict";

/*
COPY THIS FILE WHEN CREATING A NEW FANDOM.

Rename:
- file name
- constant name
- id
- name
- fields
*/

const PROFILEVERSE_UNIVERSE_TEMPLATE = {
    id: "example-universe",
    name: "Example Universe",
    version: "1.0",

    fields: {
        primaryResult: {
            type: "ranked",

            options: [
                {
                    id: "result-a",
                    name: "Result A",
                    description: "Explanation for Result A.",

                    weights: {
                        curiosity: 0.30,
                        adaptability: 0.25,
                        confidence: 0.20,
                        creativity: 0.15,
                        riskTolerance: 0.10
                    },

                    archetypeBonuses: {
                        Explorer: 8,
                        Maverick: 5
                    },

                    thinkingStyleBonuses: {
                        Exploratory: 5,
                        Adaptive: 3
                    }
                },

                {
                    id: "result-b",
                    name: "Result B",
                    description: "Explanation for Result B.",

                    weights: {
                        logic: 0.30,
                        strategy: 0.25,
                        discipline: 0.20,
                        patience: 0.15,
                        learningOrientation: 0.10
                    },

                    archetypeBonuses: {
                        Analyst: 8,
                        Builder: 5
                    },

                    thinkingStyleBonuses: {
                        Investigative: 5,
                        Tactical: 3
                    }
                }
            ]
        },

        secondaryResult: {
            type: "archetypeMap",

            values: {
                Analyst: "Analyst Result",
                Explorer: "Explorer Result",
                Builder: "Builder Result",
                Diplomat: "Diplomat Result",
                Guardian: "Guardian Result",
                Visionary: "Visionary Result",
                Maverick: "Maverick Result",
                Catalyst: "Catalyst Result"
            },

            fallback: "Default Result"
        },

        traitResult: {
            type: "topTrait",

            options: [
                {
                    trait: "logic",
                    name: "Logic Result"
                },
                {
                    trait: "creativity",
                    name: "Creativity Result"
                },
                {
                    trait: "empathy",
                    name: "Empathy Result"
                }
            ]
        },

        conditionalResult: {
            type: "conditional",

            rules: [
                {
                    trait: "confidence",
                    minimum: 68,
                    value: "High Confidence Result"
                },
                {
                    trait: "patience",
                    minimum: 65,
                    value: "High Patience Result"
                }
            ],

            fallback: "Balanced Result"
        }
    }
};

window.ProfileverseUniverseTemplate =
    PROFILEVERSE_UNIVERSE_TEMPLATE;
