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
        if ((profile.traits[rule.trait] || 50) >= rule.minimum) {
            return rule.value;
        }
    }

    return fallback;
}

function highestTrait(profile, options) {
    return options
        .map((entry) => ({
            ...entry,
            score: profile.traits[entry.trait] || 50
        }))
        .sort((a, b) => b.score - a.score)[0];
}

function archetypeBase(archetype) {
    const data = {
        Analyst: {
            partner: "Lucario",
            partnerReason:
                "Perceptive, disciplined, and strongest when it understands the battle around it.",
            summary:
                "You would build a precise, balanced team that rewards preparation, pattern recognition, and calm decision-making.",
            trainerClass: "Ace Trainer",
            region: "Sinnoh",
            gym: "Psychic / Steel Gym",
            eliteRole: "Elite Four Strategist",
            rank: "Master Class",
            legendary: "Latios",
            professor: "Professor Rowan",
            companion: "Cynthia",
            rival: "Blue",
            explanation:
                "Your full profile favors logic, strategy, learning, and discipline. Your team is built around control, information, and Pokémon that become more dangerous when used with patience and precision."
        },

        Explorer: {
            partner: "Eevee",
            partnerReason:
                "Adaptable, curious, and capable of growing in many different directions.",
            summary:
                "You would travel widely, experiment with unusual combinations, and discover your strongest team through experience.",
            trainerClass: "Pokémon Ranger",
            region: "Hoenn",
            gym: "Flying / Normal Gym",
            eliteRole: "Frontier Brain",
            rank: "Adventure Class",
            legendary: "Latias",
            professor: "Professor Birch",
            companion: "May",
            rival: "Gladion",
            explanation:
                "Your profile emphasizes curiosity, adaptability, independence, and discovery. Your team rewards flexibility and gives you multiple paths instead of forcing one fixed strategy."
        },

        Builder: {
            partner: "Metagross",
            partnerReason:
                "Methodical, powerful, and built for long-term mastery.",
            summary:
                "You would train deliberately, build strong internal team roles, and improve through structure and repetition.",
            trainerClass: "Veteran",
            region: "Galar",
            gym: "Steel Gym",
            eliteRole: "Elite Four Tactician",
            rank: "Champion Class",
            legendary: "Regigigas",
            professor: "Professor Magnolia",
            companion: "Steven Stone",
            rival: "Paul",
            explanation:
                "Your profile is disciplined, practical, strategic, and persistent. Your team is designed to scale over time and become increasingly difficult to break."
        },

        Diplomat: {
            partner: "Gardevoir",
            partnerReason:
                "Empathetic, loyal, and deeply responsive to its trainer.",
            summary:
                "You would create a team built on trust, support, and coordinated strength rather than intimidation.",
            trainerClass: "Pokémon Breeder",
            region: "Kalos",
            gym: "Fairy / Psychic Gym",
            eliteRole: "Elite Four Support Specialist",
            rank: "Harmony Class",
            legendary: "Cresselia",
            professor: "Professor Sycamore",
            companion: "Lillie",
            rival: "Silver",
            explanation:
                "Your profile centers on empathy, cooperation, patience, and communication. Your strongest teams would feel connected rather than merely assembled."
        },

        Guardian: {
            partner: "Arcanine",
            partnerReason:
                "Loyal, protective, dependable, and brave under pressure.",
            summary:
                "You would build a team that protects its members, holds ground, and remains steady through difficult battles.",
            trainerClass: "Pokémon Ranger",
            region: "Johto",
            gym: "Fire / Fighting Gym",
            eliteRole: "Elite Four Defender",
            rank: "Guardian Class",
            legendary: "Zamazenta",
            professor: "Professor Elm",
            companion: "Brock",
            rival: "Giovanni",
            explanation:
                "Your profile combines loyalty, resilience, empathy, and discipline. Your team would be trusted in long battles where protection and steadiness matter most."
        },

        Visionary: {
            partner: "Mewtwo",
            partnerReason:
                "Intelligent, powerful, independent, and driven by larger questions.",
            summary:
                "You would pursue rare Pokémon, unconventional strategies, and goals that change how others understand battling.",
            trainerClass: "Pokémon Master",
            region: "Unova",
            gym: "Psychic / Dragon Gym",
            eliteRole: "Champion",
            rank: "Legend Class",
            legendary: "Rayquaza",
            professor: "Professor Juniper",
            companion: "N",
            rival: "Leon",
            explanation:
                "Your profile is ambitious, creative, influential, and future-focused. Your team reflects scale, possibility, and the desire to redefine what a trainer can become."
        },

        Maverick: {
            partner: "Zoroark",
            partnerReason:
                "Independent, clever, unconventional, and difficult to predict.",
            summary:
                "You would reject standard team-building rules and win through misdirection, surprise, and personal style.",
            trainerClass: "Rogue Trainer",
            region: "Alola",
            gym: "Dark Gym",
            eliteRole: "Independent Challenger",
            rank: "Wildcard Class",
            legendary: "Mew",
            professor: "Professor Kukui",
            companion: "Gladion",
            rival: "Lance",
            explanation:
                "Your profile emphasizes independence, creativity, adaptability, and confidence. Your team would reflect your refusal to follow a formula just because others trust it."
        },

        Catalyst: {
            partner: "Charizard",
            partnerReason:
                "Bold, visible, energetic, and capable of changing the momentum of a battle.",
            summary:
                "You would lead from the front, energize your team, and create decisive turning points.",
            trainerClass: "Gym Leader",
            region: "Kanto",
            gym: "Fire Gym",
            eliteRole: "Elite Four Captain",
            rank: "Vanguard Class",
            legendary: "Ho-Oh",
            professor: "Professor Oak",
            companion: "Ash Ketchum",
            rival: "Gary Oak",
            explanation:
                "Your profile blends leadership, confidence, communication, and ambition. Your team is designed to create pressure, inspire momentum, and finish battles decisively."
        }
    };

    return data[archetype] || data.Analyst;
}

function starterProfile(profile) {
    return highestTrait(profile, [
        {
            trait: "curiosity",
            name: "Treecko",
            reason: "Independent, observant, and eager to explore."
        },
        {
            trait: "empathy",
            name: "Popplio",
            reason: "Expressive, supportive, and relationship-focused."
        },
        {
            trait: "discipline",
            name: "Turtwig",
            reason: "Patient, dependable, and strongest through steady growth."
        },
        {
            trait: "confidence",
            name: "Charmander",
            reason: "Bold, determined, and energized by challenge."
        },
        {
            trait: "adaptability",
            name: "Froakie",
            reason: "Flexible, alert, and comfortable changing tactics."
        }
    ]);
}

function teamProfile(profile, base) {
    const pools = {
        Analyst: ["Lucario", "Alakazam", "Metagross", "Rotom", "Corviknight", "Milotic"],
        Explorer: ["Eevee", "Flygon", "Talonflame", "Greninja", "Lycanroc", "Togekiss"],
        Builder: ["Metagross", "Excadrill", "Magnezone", "Torterra", "Aegislash", "Conkeldurr"],
        Diplomat: ["Gardevoir", "Togekiss", "Lapras", "Sylveon", "Altaria", "Indeedee"],
        Guardian: ["Arcanine", "Umbreon", "Corviknight", "Mudsdale", "Blissey", "Gallade"],
        Visionary: ["Mewtwo", "Dragonite", "Volcarona", "Espeon", "Garchomp", "Porygon-Z"],
        Maverick: ["Zoroark", "Absol", "Noivern", "Sableye", "Mimikyu", "Hawlucha"],
        Catalyst: ["Charizard", "Infernape", "Luxray", "Staraptor", "Lucario", "Gyarados"]
    };

    return pools[profile.primaryArchetype] || pools.Analyst;
}

function battleProfile(profile) {
    return highestTrait(profile, [
        {
            trait: "strategy",
            value: "Calculated Control",
            meaning: "You win by controlling tempo, matchups, and information."
        },
        {
            trait: "adaptability",
            value: "Flexible Counterplay",
            meaning: "You change plans quickly and punish predictable opponents."
        },
        {
            trait: "riskTolerance",
            value: "High-Pressure Offense",
            meaning: "You create momentum through bold plays and calculated danger."
        },
        {
            trait: "empathy",
            value: "Team Synergy",
            meaning: "You build around trust, support moves, and coordinated roles."
        },
        {
            trait: "discipline",
            value: "Layered Setup",
            meaning: "You prepare patiently and become stronger as the battle continues."
        },
        {
            trait: "creativity",
            value: "Unorthodox Tactics",
            meaning: "You rely on surprise, unusual combinations, and unexpected moves."
        }
    ]);
}

function typeProfile(profile) {
    return highestTrait(profile, [
        {
            trait: "logic",
            names: ["Psychic", "Steel"],
            colors: ["#d45aa6", "#9aa4b8"]
        },
        {
            trait: "adaptability",
            names: ["Water", "Flying"],
            colors: ["#4f8cff", "#88a8ff"]
        },
        {
            trait: "empathy",
            names: ["Fairy", "Psychic"],
            colors: ["#f4a5d7", "#d45aa6"]
        },
        {
            trait: "discipline",
            names: ["Steel", "Ground"],
            colors: ["#9aa4b8", "#c7a26a"]
        },
        {
            trait: "riskTolerance",
            names: ["Fire", "Fighting"],
            colors: ["#ff704f", "#c4574e"]
        },
        {
            trait: "independence",
            names: ["Dark", "Ghost"],
            colors: ["#6e5a78", "#745b9e"]
        },
        {
            trait: "creativity",
            names: ["Dragon", "Electric"],
            colors: ["#7667d8", "#ffd84f"]
        }
    ]);
}

function championPotential(profile) {
    const score =
        (profile.traits.strategy || 50) * 0.24 +
        (profile.traits.discipline || 50) * 0.22 +
        (profile.traits.resilience || 50) * 0.20 +
        (profile.traits.confidence || 50) * 0.18 +
        (profile.traits.adaptability || 50) * 0.16;

    if (score >= 68) return "Elite";
    if (score >= 61) return "High";
    if (score >= 55) return "Developing";
    return "Unconventional";
}

const profile = getProfile();

if (!profile) {
    window.location.href = "quiz.html";
} else {
    const base = archetypeBase(profile.primaryArchetype);
    const starter = starterProfile(profile);
    const battle = battleProfile(profile);
    const type = typeProfile(profile);
    const team = teamProfile(profile, base);

    document.getElementById("partnerName").textContent = base.partner;
    document.getElementById("partner").textContent = base.partner;
    document.getElementById("partnerReason").textContent = base.partnerReason;
    document.getElementById("partnerSummary").textContent = base.summary;
    document.getElementById("partnerPill").textContent =
        `${base.partner} • ${profile.primaryArchetype}`;

    document.getElementById("starter").textContent = starter.name;
    document.getElementById("starterReason").textContent = starter.reason;

    const teamGrid = document.getElementById("teamGrid");
    team.forEach((pokemon, index) => {
        const slot = document.createElement("div");
        slot.className = "team-slot";
        slot.innerHTML = `
            <span>${index === 0 ? "Ace Pokémon" : `Team Slot ${index + 1}`}</span>
            <strong>${pokemon}</strong>
        `;
        teamGrid.appendChild(slot);
    });

    document.getElementById("trainerClass").textContent = base.trainerClass;
    document.getElementById("battleStyle").textContent = battle.value;
    document.getElementById("battleMeaning").textContent = battle.meaning;

    document.getElementById("typeSpecialty").textContent =
        type.names.join(" / ");

    const typeBadges = document.getElementById("typeBadges");
    type.names.forEach((name, index) => {
        const badge = document.createElement("span");
        badge.className = "type-badge";
        badge.textContent = name;
        badge.style.color = type.colors[index];
        badge.style.background = `${type.colors[index]}22`;
        badge.style.border = `1px solid ${type.colors[index]}55`;
        typeBadges.appendChild(badge);
    });

    document.getElementById("region").textContent = base.region;
    document.getElementById("gymSpecialty").textContent = base.gym;
    document.getElementById("eliteRole").textContent = base.eliteRole;
    document.getElementById("championPotential").textContent =
        championPotential(profile);
    document.getElementById("trainerRank").textContent = base.rank;
    document.getElementById("legendary").textContent = base.legendary;
    document.getElementById("professor").textContent = base.professor;
    document.getElementById("companion").textContent = base.companion;
    document.getElementById("rival").textContent = base.rival;

    document.getElementById("pokeball").textContent =
        chooseByTrait(
            profile,
            [
                { trait: "discipline", minimum: 67, value: "Luxury Ball" },
                { trait: "riskTolerance", minimum: 67, value: "Quick Ball" },
                { trait: "empathy", minimum: 66, value: "Friend Ball" },
                { trait: "independence", minimum: 66, value: "Dusk Ball" },
                { trait: "creativity", minimum: 66, value: "Premier Ball" }
            ],
            "Ultra Ball"
        );

    document.getElementById("signatureStrategy").textContent =
        chooseByTrait(
            profile,
            [
                { trait: "strategy", minimum: 68, value: "Predict and Punish" },
                { trait: "adaptability", minimum: 67, value: "Mid-Battle Switching" },
                { trait: "leadership", minimum: 66, value: "Tempo Control" },
                { trait: "creativity", minimum: 66, value: "Unexpected Coverage" },
                { trait: "discipline", minimum: 66, value: "Setup and Sweep" }
            ],
            "Balanced Pressure"
        );

    document.getElementById("explanation").textContent = base.explanation;

    const tags = document.getElementById("traitTags");
    profile.topTraits.forEach((trait) => {
        const tag = document.createElement("span");
        tag.className = "tag";
        tag.textContent = `${trait.name} ${trait.score}`;
        tags.appendChild(tag);
    });
}
