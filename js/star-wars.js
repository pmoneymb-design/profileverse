"use strict";

function getProfile() {
    const stored = localStorage.getItem("profileverseProfileV2");

    if (stored) {
        return JSON.parse(stored);
    }

    const answers = localStorage.getItem("profileverseAnswersV2");

    if (!answers || !window.profileverseEngineV2) {
        return null;
    }

    const profile = window.profileverseEngineV2.buildProfile(
        JSON.parse(answers),
        window.profileverseQuestionsV2
    );

    localStorage.setItem(
        "profileverseProfileV2",
        JSON.stringify(profile)
    );

    return profile;
}

function chooseByTrait(profile, rules, fallback) {
    for (const rule of rules) {
        const score = profile.traits[rule.trait] ?? 50;

        if (score >= rule.minimum) {
            return rule.value;
        }
    }

    return fallback;
}

function highestTrait(profile, options) {
    return options
        .map((entry) => ({
            ...entry,
            score: profile.traits[entry.trait] ?? 50
        }))
        .sort((a, b) => b.score - a.score)[0];
}

function archetypeBase(archetype) {
    const data = {
        Analyst: {
            path: "Jedi Scholar",
            summary:
                "You would serve the Force through knowledge, restraint, and the ability to understand what others overlook.",
            alignment: "Light Side",
            alignmentReason:
                "Your decisions favor clarity, discipline, and responsible use of power.",
            jediRole: "Jedi Archivist",
            cloneWarsRole: "Strategic Intelligence Officer",
            mentor: "Plo Koon",
            character: "Obi-Wan Kenobi",
            rival: "Grand Admiral Thrawn",
            droid: "BD-1",
            homeworld: "Coruscant",
            era: "High Republic",
            starfighter: "Eta-2 Actis",
            squadron: "Jedi Recon Wing",
            destiny: "Keeper of Lost Knowledge",
            explanation:
                "Your full profile favors logic, strategy, patience, and learning. In the Star Wars galaxy, you would be most dangerous when given time to understand the system around you. Your strength would not be spectacle; it would be precision, preparation, and the insight to act only when the action truly matters."
        },

        Explorer: {
            path: "Jedi Pathfinder",
            summary:
                "You would follow the Force beyond familiar space, discovering new routes, cultures, and possibilities.",
            alignment: "Light Side",
            alignmentReason:
                "Your openness and curiosity pull you toward growth rather than domination.",
            jediRole: "Outer Rim Pathfinder",
            cloneWarsRole: "Forward Scout",
            mentor: "Ahsoka Tano",
            character: "Ezra Bridger",
            rival: "Cad Bane",
            droid: "Chopper",
            homeworld: "Lothal",
            era: "New Republic",
            starfighter: "T-70 X-wing",
            squadron: "Pathfinder Squadron",
            destiny: "Discoverer of Forgotten Worlds",
            explanation:
                "Your profile emphasizes curiosity, adaptability, independence, and learning through experience. You would thrive at the edge of known space, where rigid doctrine matters less than instinct, courage, and the willingness to change direction when the galaxy surprises you."
        },

        Builder: {
            path: "Jedi Sentinel",
            summary:
                "You would combine Force training with technical mastery, discipline, and carefully planned execution.",
            alignment: "Balanced Light",
            alignmentReason:
                "You value order and results, but your discipline keeps ambition under control.",
            jediRole: "Jedi Intelligence Operative",
            cloneWarsRole: "Operations Commander",
            mentor: "Mace Windu",
            character: "Cassian Andor",
            rival: "Director Krennic",
            droid: "K-2SO",
            homeworld: "Corellia",
            era: "Galactic Republic",
            starfighter: "ARC-170",
            squadron: "Sentinel Squadron",
            destiny: "Architect of Rebellion",
            explanation:
                "Your profile is structured, practical, persistent, and strategic. In the Star Wars galaxy, you would excel where Force ability alone is not enough. You would build systems, prepare contingencies, and become more effective the longer a mission lasts."
        },

        Diplomat: {
            path: "Jedi Consular",
            summary:
                "You would use the Force to understand people, reduce conflict, and create trust between divided groups.",
            alignment: "Light Side",
            alignmentReason:
                "Your strongest motivations center on empathy, cooperation, and protecting relationships.",
            jediRole: "Republic Mediator",
            cloneWarsRole: "Diplomatic Envoy",
            mentor: "Obi-Wan Kenobi",
            character: "Bail Organa",
            rival: "Count Dooku",
            droid: "C-3PO",
            homeworld: "Alderaan",
            era: "Clone Wars",
            starfighter: "Delta-7 Aethersprite",
            squadron: "Peacekeeper Wing",
            destiny: "Unifier of Rival Worlds",
            explanation:
                "Your profile centers on empathy, communication, cooperation, and patience. You would become influential not because you overpower others, but because you understand what they fear, what they value, and what agreement might still be possible."
        },

        Guardian: {
            path: "Jedi Protector",
            summary:
                "You would place yourself between danger and the people who depend on you.",
            alignment: "Light Side",
            alignmentReason:
                "Loyalty, responsibility, and protection guide how you use power.",
            jediRole: "Temple Guardian",
            cloneWarsRole: "Defensive Commander",
            mentor: "Kanan Jarrus",
            character: "Captain Rex",
            rival: "General Grievous",
            droid: "R2-D2",
            homeworld: "Naboo",
            era: "Galactic Civil War",
            starfighter: "B-wing",
            squadron: "Guardian Flight",
            destiny: "Shield of the Rebellion",
            explanation:
                "Your profile combines resilience, loyalty, empathy, and discipline. In the Star Wars galaxy, you would be trusted in the moments when fear spreads fastest. You would not seek danger for recognition, but you would refuse to abandon people when protection matters most."
        },

        Visionary: {
            path: "Force Visionary",
            summary:
                "You would see possibilities beyond current institutions and inspire others toward a larger future.",
            alignment: "Gray Light",
            alignmentReason:
                "Your ambition is strong, but your larger purpose keeps it from becoming pure domination.",
            jediRole: "Council Reformer",
            cloneWarsRole: "Grand Strategist",
            mentor: "Qui-Gon Jinn",
            character: "Leia Organa",
            rival: "Darth Sidious",
            droid: "L3-37",
            homeworld: "Chandrila",
            era: "High Republic",
            starfighter: "N-1 Starfighter",
            squadron: "Nova Squadron",
            destiny: "Founder of a New Order",
            explanation:
                "Your profile is ambitious, creative, future-oriented, and influential. You would not be satisfied preserving a flawed system. Your strength would be imagining a better structure and convincing others that it is worth building."
        },

        Maverick: {
            path: "Gray Jedi",
            summary:
                "You would trust your own connection to the Force rather than accept every rule of the Jedi Order.",
            alignment: "Gray",
            alignmentReason:
                "Independence and personal judgment matter more to you than institutional approval.",
            jediRole: "Independent Force Adept",
            cloneWarsRole: "Special Operations Agent",
            mentor: "Ahsoka Tano",
            character: "Han Solo",
            rival: "Darth Maul",
            droid: "IG-11",
            homeworld: "Tatooine",
            era: "Age of Rebellion",
            starfighter: "Modified YT-1300",
            squadron: "Rogue Cell",
            destiny: "Breaker of Old Rules",
            explanation:
                "Your profile emphasizes independence, confidence, adaptability, and questioning assumptions. In the Star Wars galaxy, you would resist rigid labels and remain loyal to principles you chose for yourself rather than traditions imposed by others."
        },

        Catalyst: {
            path: "Jedi Vanguard",
            summary:
                "You would create movement, rally people under pressure, and turn hesitation into visible action.",
            alignment: "Light Side",
            alignmentReason:
                "Your confidence and leadership are directed toward progress rather than control.",
            jediRole: "Jedi Field Commander",
            cloneWarsRole: "Frontline General",
            mentor: "Anakin Skywalker",
            character: "Poe Dameron",
            rival: "Kylo Ren",
            droid: "BB-8",
            homeworld: "Yavin 4",
            era: "Resistance Era",
            starfighter: "T-85 X-wing",
            squadron: "Vanguard Squadron",
            destiny: "Spark of the Resistance",
            explanation:
                "Your profile blends leadership, confidence, communication, and ambition. You would be strongest when people need direction, energy, and the belief that action can begin now."
        }
    };

    return data[archetype] || data.Analyst;
}

function lightsaberProfile(profile) {
    const dominant = highestTrait(profile, [
        { trait: "logic", color: "Green", hex: "#58f08a" },
        { trait: "leadership", color: "Blue", hex: "#4f8cff" },
        { trait: "independence", color: "White", hex: "#f1f5ff" },
        { trait: "creativity", color: "Purple", hex: "#a764ff" },
        { trait: "adaptability", color: "Yellow", hex: "#ffd84f" },
        { trait: "ambition", color: "Red", hex: "#ff4f62" }
    ]);

    const crystal = chooseByTrait(
        profile,
        [
            { trait: "empathy", minimum: 68, value: "Resonant Kyber" },
            { trait: "discipline", minimum: 67, value: "Dense Ilum Crystal" },
            { trait: "creativity", minimum: 66, value: "Unstable Harmonic Kyber" },
            { trait: "independence", minimum: 66, value: "Purified Kyber" }
        ],
        "Ilum Kyber"
    );

    const form = chooseByTrait(
        profile,
        [
            { trait: "strategy", minimum: 69, value: "Form III — Soresu" },
            { trait: "riskTolerance", minimum: 68, value: "Form IV — Ataru" },
            { trait: "leadership", minimum: 67, value: "Form V — Shien" },
            { trait: "creativity", minimum: 66, value: "Form VII — Juyo" },
            { trait: "discipline", minimum: 65, value: "Form II — Makashi" }
        ],
        "Form I — Shii-Cho"
    );

    const hiltStyle = chooseByTrait(
        profile,
        [
            { trait: "independence", minimum: 68, value: "Curved Custom Hilt" },
            { trait: "discipline", minimum: 67, value: "Traditional Temple Hilt" },
            { trait: "creativity", minimum: 66, value: "Modular Split Hilt" },
            { trait: "leadership", minimum: 66, value: "Crossguard Hilt" }
        ],
        "Standard Single-Blade Hilt"
    );

    const bladeLength =
        (profile.traits.confidence || 50) >= 67
            ? "Long Reach"
            : (profile.traits.adaptability || 50) >= 64
                ? "Adjustable"
                : "Standard";

    return {
        color: dominant.color,
        hex: dominant.hex,
        crystal,
        form,
        hiltStyle,
        bladeLength
    };
}

function forceProfile(profile) {
    const affinity = highestTrait(profile, [
        {
            trait: "empathy",
            value: "Living Force",
            meaning: "You sense life, emotion, and connection in the present moment."
        },
        {
            trait: "logic",
            value: "Cosmic Force",
            meaning: "You seek patterns, destiny, and the larger structure behind events."
        },
        {
            trait: "adaptability",
            value: "Unifying Force",
            meaning: "You respond to change by finding balance between competing paths."
        },
        {
            trait: "independence",
            value: "Personal Force",
            meaning: "Your connection is intuitive, private, and resistant to doctrine."
        }
    ]);

    const ability = highestTrait(profile, [
        {
            trait: "empathy",
            value: "Force Empathy",
            meaning: "You read emotional states and understand what people are not saying."
        },
        {
            trait: "logic",
            value: "Psychometry",
            meaning: "You uncover hidden history and meaning through objects and places."
        },
        {
            trait: "strategy",
            value: "Battle Meditation",
            meaning: "You improve coordination and decision-making across an entire group."
        },
        {
            trait: "adaptability",
            value: "Force Tracking",
            meaning: "You follow shifting patterns and locate what others lose."
        },
        {
            trait: "resilience",
            value: "Tutaminis",
            meaning: "You absorb and redirect energy that would overwhelm others."
        },
        {
            trait: "creativity",
            value: "Force Illusion",
            meaning: "You reshape perception and create possibilities through imagination."
        }
    ]);

    return {
        affinity,
        ability
    };
}

function councilProfile(profile) {
    const leadership = profile.traits.leadership || 50;
    const discipline = profile.traits.discipline || 50;
    const independence = profile.traits.independence || 50;
    const cooperation = profile.traits.cooperation || 50;

    const score =
        leadership * 0.35 +
        discipline * 0.25 +
        cooperation * 0.25 +
        (100 - independence) * 0.15;

    if (score >= 69) {
        return {
            value: "Very Likely",
            reason: "Your leadership, discipline, and institutional trust would make you a strong Council candidate."
        };
    }

    if (score >= 61) {
        return {
            value: "Possible",
            reason: "You could earn a seat, though your independence or unconventional choices may create debate."
        };
    }

    return {
        value: "Unlikely by Choice",
        reason: "You would probably have influence without wanting the limits of a formal Council seat."
    };
}

const profile = getProfile();

if (!profile) {
    window.location.href = "quiz.html";
} else {
    const base = archetypeBase(profile.primaryArchetype);
    const saber = lightsaberProfile(profile);
    const force = forceProfile(profile);
    const council = councilProfile(profile);

    document.getElementById("forcePath").textContent = base.path;
    document.getElementById("pathSummary").textContent = base.summary;
    document.getElementById("pathPill").textContent =
        `${base.path} • ${profile.primaryArchetype}`;

    document.getElementById("alignment").textContent = base.alignment;
    document.getElementById("alignmentReason").textContent =
        base.alignmentReason;

    document.getElementById("lightsaberColor").textContent =
        `${saber.color} Lightsaber`;

    const blade = document.getElementById("lightsaberBlade");
    blade.style.background = saber.hex;
    blade.style.color = saber.hex;

    document.getElementById("kyberCrystal").textContent = saber.crystal;
    document.getElementById("combatForm").textContent = saber.form;
    document.getElementById("hiltStyle").textContent = saber.hiltStyle;
    document.getElementById("bladeLength").textContent =
        saber.bladeLength;

    document.getElementById("forceAffinity").textContent =
        force.affinity.value;
    document.getElementById("forceAffinityMeaning").textContent =
        force.affinity.meaning;

    document.getElementById("forceAbility").textContent =
        force.ability.value;
    document.getElementById("forceAbilityMeaning").textContent =
        force.ability.meaning;

    document.getElementById("jediRole").textContent = base.jediRole;
    document.getElementById("cloneWarsRole").textContent =
        base.cloneWarsRole;
    document.getElementById("mentor").textContent = base.mentor;
    document.getElementById("characterMatch").textContent =
        base.character;
    document.getElementById("rival").textContent = base.rival;
    document.getElementById("droid").textContent = base.droid;
    document.getElementById("homeworld").textContent = base.homeworld;
    document.getElementById("era").textContent = base.era;
    document.getElementById("starfighter").textContent =
        base.starfighter;
    document.getElementById("squadron").textContent = base.squadron;
    document.getElementById("councilLikelihood").textContent =
        council.value;
    document.getElementById("councilReason").textContent =
        council.reason;
    document.getElementById("destiny").textContent = base.destiny;
    document.getElementById("explanation").textContent =
        base.explanation;

    const tagContainer = document.getElementById("traitTags");

    profile.topTraits.forEach((trait) => {
        const tag = document.createElement("span");
        tag.className = "tag";
        tag.textContent = `${trait.name} ${trait.score}`;
        tagContainer.appendChild(tag);
    });
}
