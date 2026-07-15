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
            parent: "Athena",
            cabin: "Cabin 6",
            cabinReason:
                "You value wisdom, preparation, and seeing the shape of a problem before acting.",
            summary:
                "You would enter Camp Half-Blood as a strategist, researcher, and calm problem-solver whose mind becomes a weapon.",
            cohort: "First Cohort",
            cohortReason:
                "Your discipline and strategic judgment would quickly earn trust.",
            questRole: "Strategist",
            prophecyRole: "Interpreter of the Hidden Line",
            companion: "Gray Owl",
            monster: "Sphinx",
            olympianAlly: "Apollo",
            satyr: "Grover Underwood",
            location: "The Labyrinth",
            legacy: "Cabin Counselor",
            character: "Annabeth Chase",
            rival: "Luke Castellan",
            campSkill: "Battle Planning",
            romanRank: "Centurion",
            explanation:
                "Your full profile favors logic, strategy, patience, and learning. In the Percy Jackson world, your greatest power would be understanding the quest before everyone else does. You would notice patterns in prophecies, identify weak points in monsters, and keep the group from wasting strength."
        },

        Explorer: {
            parent: "Hermes",
            cabin: "Cabin 11",
            cabinReason:
                "You are adaptable, curious, and comfortable finding your own route.",
            summary:
                "You would treat the mythological world as a map full of hidden doors, shortcuts, and unexpected allies.",
            cohort: "Fifth Cohort",
            cohortReason:
                "You would thrive in the flexible, underestimated cohort that rewards creativity.",
            questRole: "Scout",
            prophecyRole: "Finder of the Lost Path",
            companion: "Pegasus",
            monster: "Stymphalian Birds",
            olympianAlly: "Artemis",
            satyr: "Gleeson Hedge",
            location: "The Sea of Monsters",
            legacy: "World-Travelling Hero",
            character: "Leo Valdez",
            rival: "Octavian",
            campSkill: "Tracking and Navigation",
            romanRank: "Probatio Turned Scout",
            explanation:
                "Your profile emphasizes curiosity, adaptability, independence, and discovery. You would be the demigod most willing to enter the strange tunnel, try the untested route, or turn a failed plan into a new adventure."
        },

        Builder: {
            parent: "Hephaestus",
            cabin: "Cabin 9",
            cabinReason:
                "You create dependable systems and improve through discipline and repetition.",
            summary:
                "You would be known for building the weapon, repairing the chariot, and making sure the plan can actually survive contact with reality.",
            cohort: "Second Cohort",
            cohortReason:
                "Your reliability and technical mastery fit the cohort's high standards.",
            questRole: "Engineer",
            prophecyRole: "Maker of the Final Device",
            companion: "Automaton Dragon",
            monster: "Talos",
            olympianAlly: "Hestia",
            satyr: "Coach Hedge",
            location: "Mount St. Helens",
            legacy: "Master Inventor",
            character: "Leo Valdez",
            rival: "Daedalus",
            campSkill: "Forge Mastery",
            romanRank: "Chief Engineer",
            explanation:
                "Your profile is disciplined, practical, resilient, and strategic. In the Percy Jackson world, you would turn limited resources into tools that save the quest. Your strength would come from preparation, craftsmanship, and refusing to leave the team without a working solution."
        },

        Diplomat: {
            parent: "Aphrodite",
            cabin: "Cabin 10",
            cabinReason:
                "You understand people, emotional dynamics, and the power of trust.",
            summary:
                "You would become the demigod who prevents allies from becoming enemies and sees the truth beneath conflict.",
            cohort: "Fourth Cohort",
            cohortReason:
                "Your cooperation and emotional intelligence would strengthen the cohort.",
            questRole: "Mediator",
            prophecyRole: "Voice That Prevents the War",
            companion: "Dove",
            monster: "Empousa",
            olympianAlly: "Iris",
            satyr: "Grover Underwood",
            location: "New Rome",
            legacy: "Camp Ambassador",
            character: "Piper McLean",
            rival: "Drew Tanaka",
            campSkill: "Charmspeak",
            romanRank: "Diplomatic Envoy",
            explanation:
                "Your profile centers on empathy, communication, cooperation, and patience. In the Percy Jackson world, you would be strongest when the quest depends on understanding motives, repairing trust, or convincing rivals to fight on the same side."
        },

        Guardian: {
            parent: "Poseidon",
            cabin: "Cabin 3",
            cabinReason:
                "You protect people with loyalty, endurance, and instinctive courage.",
            summary:
                "You would be the demigod who remains standing when the quest becomes dangerous and others need someone they can trust.",
            cohort: "Third Cohort",
            cohortReason:
                "Your steadiness and protective instinct suit a respected central cohort.",
            questRole: "Protector",
            prophecyRole: "Shield at the Breaking Point",
            companion: "Black Pegasus",
            monster: "Minotaur",
            olympianAlly: "Hestia",
            satyr: "Grover Underwood",
            location: "The Underworld",
            legacy: "Praetor",
            character: "Percy Jackson",
            rival: "Ares",
            campSkill: "Swordsmanship",
            romanRank: "Praetor",
            explanation:
                "Your profile combines loyalty, resilience, empathy, and discipline. In the Percy Jackson world, you would not seek danger for attention, but you would move toward it when someone else needs protection."
        },

        Visionary: {
            parent: "Apollo",
            cabin: "Cabin 7",
            cabinReason:
                "You imagine larger possibilities and inspire others toward a meaningful future.",
            summary:
                "You would interpret prophecy, shape morale, and help the camp believe that a better ending is possible.",
            cohort: "First Cohort",
            cohortReason:
                "Your ambition and influence would place you among visible leaders.",
            questRole: "Prophet-Leader",
            prophecyRole: "Speaker of the New Prophecy",
            companion: "Griffin",
            monster: "Python",
            olympianAlly: "Athena",
            satyr: "Grover Underwood",
            location: "Delphi",
            legacy: "Oracle",
            character: "Rachel Elizabeth Dare",
            rival: "Octavian",
            campSkill: "Prophecy Interpretation",
            romanRank: "Augur",
            explanation:
                "Your profile is ambitious, creative, future-focused, and influential. In the Percy Jackson world, your strength would come from seeing beyond the current crisis and helping others understand what the struggle could lead to."
        },

        Maverick: {
            parent: "Hades",
            cabin: "Cabin 13",
            cabinReason:
                "You trust your own judgment and remain comfortable outside group expectations.",
            summary:
                "You would be powerful, private, and difficult to control, choosing loyalty on your own terms.",
            cohort: "Fifth Cohort",
            cohortReason:
                "You would fit the cohort known for outsiders who prove everyone wrong.",
            questRole: "Shadow Operative",
            prophecyRole: "The One Who Walks Between Worlds",
            companion: "Hellhound",
            monster: "Fury",
            olympianAlly: "Hecate",
            satyr: "Coach Hedge",
            location: "Tartarus",
            legacy: "Independent Hero",
            character: "Nico di Angelo",
            rival: "Minos",
            campSkill: "Shadow Travel",
            romanRank: "Special Operative",
            explanation:
                "Your profile emphasizes independence, confidence, adaptability, and questioning assumptions. In the Percy Jackson world, you would reject easy labels and become strongest in places other demigods fear to enter."
        },

        Catalyst: {
            parent: "Ares",
            cabin: "Cabin 5",
            cabinReason:
                "You create momentum, lead visibly, and turn hesitation into action.",
            summary:
                "You would be the demigod who rallies the line, charges first, and gives everyone else the courage to move.",
            cohort: "Second Cohort",
            cohortReason:
                "Your leadership and battlefield energy fit a high-performing cohort.",
            questRole: "Field Commander",
            prophecyRole: "Spark of the Final Battle",
            companion: "War Horse",
            monster: "Drakon",
            olympianAlly: "Nike",
            satyr: "Coach Hedge",
            location: "Manhattan",
            legacy: "Praetor",
            character: "Clarisse La Rue",
            rival: "Ethan Nakamura",
            campSkill: "War Games",
            romanRank: "Centurion",
            explanation:
                "Your profile blends leadership, confidence, communication, and ambition. In the Percy Jackson world, you would be most effective when people need direction, courage, and visible movement."
        }
    };

    return data[archetype] || data.Analyst;
}

function combatProfile(profile) {
    const weapon = highestTrait(profile, [
        {
            trait: "logic",
            value: "Celestial Bronze Spear",
            style: "Measured Reach",
            item: "Daedalus Blueprint",
            power: "Tactical Foresight"
        },
        {
            trait: "confidence",
            value: "Celestial Bronze Sword",
            style: "Direct Assault",
            item: "Shield of Aegis",
            power: "Battle Presence"
        },
        {
            trait: "adaptability",
            value: "Twin Daggers",
            style: "Mobile Counterattack",
            item: "Winged Shoes",
            power: "Rapid Movement"
        },
        {
            trait: "creativity",
            value: "Transforming Multi-Tool",
            style: "Improvised Combat",
            item: "Magical Tool Belt",
            power: "Enchanted Invention"
        },
        {
            trait: "empathy",
            value: "Bow of Light",
            style: "Protective Support",
            item: "Iris Message Prism",
            power: "Emotional Insight"
        },
        {
            trait: "discipline",
            value: "Roman Gladius",
            style: "Formational Defense",
            item: "Imperial Gold Shield",
            power: "Unbreakable Focus"
        }
    ]);

    return weapon;
}

function fatalFlaw(profile) {
    return highestTrait(profile, [
        {
            trait: "empathy",
            value: "Personal Loyalty",
            meaning: "You may risk too much for people you refuse to abandon."
        },
        {
            trait: "ambition",
            value: "Hubris",
            meaning: "You may believe the right vision gives you the right to carry too much alone."
        },
        {
            trait: "independence",
            value: "Defiance",
            meaning: "You may reject help simply because you want the choice to remain yours."
        },
        {
            trait: "logic",
            value: "Overthinking",
            meaning: "You may delay action while searching for certainty that never arrives."
        },
        {
            trait: "discipline",
            value: "Rigidity",
            meaning: "You may hold to a plan after the situation has changed."
        },
        {
            trait: "confidence",
            value: "Recklessness",
            meaning: "You may act before fully respecting the danger."
        }
    ]);
}

function greatestStrength(profile) {
    return highestTrait(profile, [
        {
            trait: "resilience",
            value: "Endurance",
            meaning: "You keep moving when the quest becomes harder than expected."
        },
        {
            trait: "strategy",
            value: "Foresight",
            meaning: "You see consequences and prepare for what comes next."
        },
        {
            trait: "empathy",
            value: "Loyalty",
            meaning: "You create trust strong enough to survive fear and conflict."
        },
        {
            trait: "adaptability",
            value: "Improvisation",
            meaning: "You can reshape a failed plan before the danger closes in."
        },
        {
            trait: "leadership",
            value: "Command",
            meaning: "You help others act together when hesitation could cost the quest."
        },
        {
            trait: "creativity",
            value: "Ingenuity",
            meaning: "You find possibilities that monsters and rivals do not expect."
        }
    ]);
}

const profile = getProfile();

if (!profile) {
    window.location.href = "quiz.html";
} else {
    const base = archetypeBase(profile.primaryArchetype);
    const combat = combatProfile(profile);
    const flaw = fatalFlaw(profile);
    const strength = greatestStrength(profile);

    document.getElementById("godlyParent").textContent = base.parent;
    document.getElementById("parentSummary").textContent = base.summary;
    document.getElementById("parentPill").textContent =
        `${base.parent} • ${profile.primaryArchetype}`;

    document.getElementById("cabin").textContent = base.cabin;
    document.getElementById("cabinReason").textContent =
        base.cabinReason;

    document.getElementById("cohort").textContent = base.cohort;
    document.getElementById("cohortReason").textContent =
        base.cohortReason;

    document.getElementById("weapon").textContent = combat.value;
    document.getElementById("combatStyle").textContent = combat.style;
    document.getElementById("magicalItem").textContent = combat.item;
    document.getElementById("power").textContent = combat.power;

    document.getElementById("fatalFlaw").textContent = flaw.value;
    document.getElementById("fatalFlawMeaning").textContent =
        flaw.meaning;

    document.getElementById("greatestStrength").textContent =
        strength.value;
    document.getElementById("strengthMeaning").textContent =
        strength.meaning;

    document.getElementById("questRole").textContent = base.questRole;
    document.getElementById("prophecyRole").textContent =
        base.prophecyRole;
    document.getElementById("companion").textContent = base.companion;
    document.getElementById("monster").textContent = base.monster;
    document.getElementById("olympianAlly").textContent =
        base.olympianAlly;
    document.getElementById("satyrGuide").textContent = base.satyr;
    document.getElementById("questLocation").textContent =
        base.location;
    document.getElementById("legacyPath").textContent = base.legacy;
    document.getElementById("characterMatch").textContent =
        base.character;
    document.getElementById("rival").textContent = base.rival;
    document.getElementById("campSkill").textContent = base.campSkill;
    document.getElementById("romanRank").textContent = base.romanRank;
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
