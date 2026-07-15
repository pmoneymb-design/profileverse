"use strict";

/*
PROFILEVERSE UNIVERSAL FANDOM FRAMEWORK v1.0

This engine turns one Profileverse personality profile into
results for any fandom module that follows the universe data format.
*/

function requireProfile(profile) {
    if (!profile || !profile.traits) {
        throw new Error("A valid Profileverse profile is required.");
    }
}

function weightedScore(profile, weights = {}) {
    return Object.entries(weights).reduce(
        (total, [trait, weight]) =>
            total + Number(profile.traits[trait] ?? 50) * Number(weight),
        0
    );
}

function archetypeBonus(profile, bonuses = {}) {
    return Number(bonuses[profile.primaryArchetype] || 0);
}

function thinkingStyleBonus(profile, bonuses = {}) {
    return Number(bonuses[profile.thinkingStyle] || 0);
}

function scoreOption(profile, option) {
    return (
        weightedScore(profile, option.weights) +
        archetypeBonus(profile, option.archetypeBonuses) +
        thinkingStyleBonus(profile, option.thinkingStyleBonuses) +
        Number(option.baseScore || 0)
    );
}

function rankOptions(profile, options = []) {
    return options
        .map((option) => ({
            ...option,
            score: scoreOption(profile, option)
        }))
        .sort((a, b) => b.score - a.score);
}

function selectOption(profile, options = [], fallback = null) {
    const ranked = rankOptions(profile, options);
    return ranked[0] || fallback;
}

function chooseConditional(profile, rules = [], fallback = null) {
    for (const rule of rules) {
        const traitScore = Number(profile.traits[rule.trait] ?? 50);

        if (
            traitScore >= Number(rule.minimum ?? 0) &&
            traitScore <= Number(rule.maximum ?? 100)
        ) {
            return rule.value;
        }
    }

    return fallback;
}

function buildField(profile, field) {
    if (!field) {
        return null;
    }

    if (field.type === "fixed") {
        return field.value;
    }

    if (field.type === "ranked") {
        return selectOption(profile, field.options, field.fallback);
    }

    if (field.type === "conditional") {
        return chooseConditional(profile, field.rules, field.fallback);
    }

    if (field.type === "archetypeMap") {
        return (
            field.values?.[profile.primaryArchetype] ??
            field.fallback ??
            null
        );
    }

    if (field.type === "thinkingStyleMap") {
        return (
            field.values?.[profile.thinkingStyle] ??
            field.fallback ??
            null
        );
    }

    if (field.type === "topTrait") {
        const candidates = field.options || [];

        return candidates
            .map((candidate) => ({
                ...candidate,
                score: Number(
                    profile.traits[candidate.trait] ?? 50
                )
            }))
            .sort((a, b) => b.score - a.score)[0] || field.fallback;
    }

    return null;
}

function generateUniverse(profile, universeData) {
    requireProfile(profile);

    if (!universeData?.id || !universeData?.fields) {
        throw new Error(
            "Universe data must include an id and fields."
        );
    }

    const results = {};

    Object.entries(universeData.fields).forEach(
        ([fieldId, field]) => {
            results[fieldId] = buildField(profile, field);
        }
    );

    return {
        universeId: universeData.id,
        universeName: universeData.name,
        version: universeData.version || "1.0",
        profileId: profile.profileId || null,
        primaryArchetype: profile.primaryArchetype,
        thinkingStyle: profile.thinkingStyle,
        results
    };
}

function getStoredProfile() {
    const stored = localStorage.getItem(
        "profileverseProfileV2"
    );

    return stored ? JSON.parse(stored) : null;
}

window.ProfileverseUniverseEngine = {
    generate: generateUniverse,
    rankOptions,
    selectOption,
    weightedScore,
    chooseConditional,
    getStoredProfile
};
