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

function highestTrait(profile, traitIds) {
    return traitIds
        .map((id) => ({
            id,
            score: profile.traits[id] ?? 50
        }))
        .sort((a, b) => b.score - a.score)[0];
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

function archetypeBase(archetype) {
    const data = {
        Analyst: {
            house: "Ravenclaw",
            reason: "You value understanding, evidence, and thoughtful preparation.",
            summary:
                "You would move through Hogwarts by questioning assumptions, noticing hidden patterns, and mastering difficult subjects for the satisfaction of truly understanding them.",
            ilvermorny: "Horned Serpent",
            professor: "Professor Flitwick",
            club: "Ancient Runes Society",
            orderRole: "Strategist",
            ministry: "Department of Mysteries",
            career: "Unspeakable",
            character: "Hermione Granger",
            rival: "Draco Malfoy",
            era: "Second Wizarding War",
            spell: "Protego",
            explanation:
                "Your full profile leans toward analysis, strategy, learning, and patient judgment. Hogwarts would reward your willingness to understand before acting, while your strongest magical contributions would come from preparation, research, and seeing connections others miss."
        },

        Explorer: {
            house: "Gryffindor",
            reason: "You are open to discovery and willing to enter uncertainty.",
            summary:
                "You would experience Hogwarts as a place of hidden passages, unusual creatures, and adventures that teach more than any textbook.",
            ilvermorny: "Thunderbird",
            professor: "Professor Hagrid",
            club: "Duelling Club",
            orderRole: "Scout",
            ministry: "Department of Magical Transportation",
            career: "Magizoologist",
            character: "Ginny Weasley",
            rival: "Cormac McLaggen",
            era: "Post-War Reconstruction",
            spell: "Expelliarmus",
            explanation:
                "Your profile favors curiosity, adaptability, and learning through experience. You would grow through exploration and become strongest when plans change, danger appears, or an unfamiliar path offers something worth discovering."
        },

        Builder: {
            house: "Slytherin",
            reason: "You value discipline, resourcefulness, and long-term achievement.",
            summary:
                "You would approach Hogwarts as a system to master, using preparation and skill to build influence and lasting success.",
            ilvermorny: "Wampus",
            professor: "Professor Snape",
            club: "Potions Club",
            orderRole: "Logistics Commander",
            ministry: "Magical Research and Development",
            career: "Master Potioneer",
            character: "Minerva McGonagall",
            rival: "Hermione Granger",
            era: "Founders Era",
            spell: "Accio",
            explanation:
                "Your profile emphasizes structure, discipline, and practical improvement. At Hogwarts, you would become known for reliability, technical mastery, and the ability to turn preparation into results."
        },

        Diplomat: {
            house: "Hufflepuff",
            reason: "You lead through empathy, fairness, and cooperation.",
            summary:
                "You would make Hogwarts more humane by noticing who is excluded, calming conflict, and helping people trust one another.",
            ilvermorny: "Pukwudgie",
            professor: "Professor Sprout",
            club: "Hogwarts Student Support Society",
            orderRole: "Mediator",
            ministry: "Department of International Magical Cooperation",
            career: "Healer",
            character: "Cedric Diggory",
            rival: "Pansy Parkinson",
            era: "Triwizard Tournament",
            spell: "Episkey",
            explanation:
                "Your profile centers on empathy, cooperation, and communication. Your magic would be most powerful when it protects relationships, restores trust, or helps people through difficult moments."
        },

        Guardian: {
            house: "Hufflepuff",
            reason: "You protect people and commitments through loyalty and steadiness.",
            summary:
                "You would be the person others trust when Hogwarts becomes dangerous, remaining dependable even when fear and uncertainty spread.",
            ilvermorny: "Pukwudgie",
            professor: "Professor McGonagall",
            club: "Dumbledore's Army",
            orderRole: "Protector",
            ministry: "Department of Magical Law Enforcement",
            career: "Auror",
            character: "Neville Longbottom",
            rival: "Bellatrix Lestrange",
            era: "Battle of Hogwarts",
            spell: "Protego Maxima",
            explanation:
                "Your profile combines loyalty, resilience, patience, and practical courage. You would not seek danger for attention, but you would refuse to abandon people when protection matters most."
        },

        Visionary: {
            house: "Slytherin",
            reason: "You imagine larger possibilities and pursue meaningful influence.",
            summary:
                "You would see Hogwarts not only as it is, but as what it could become, and you would gather the knowledge and allies needed to shape that future.",
            ilvermorny: "Horned Serpent",
            professor: "Professor Dumbledore",
            club: "Slug Club",
            orderRole: "Strategic Leader",
            ministry: "Minister's Office",
            career: "Magical Reformer",
            character: "Albus Dumbledore",
            rival: "Tom Riddle",
            era: "First Wizarding War",
            spell: "Expecto Patronum",
            explanation:
                "Your profile is future-oriented, ambitious, creative, and influential. Hogwarts would become a platform for your larger ideas, and your strongest moments would involve inspiring people toward something they did not believe was possible."
        },

        Maverick: {
            house: "Gryffindor",
            reason: "You trust independent judgment and question expectations.",
            summary:
                "You would resist being defined by Hogwarts traditions, choosing your own mentors, methods, and reasons for using magic.",
            ilvermorny: "Thunderbird",
            professor: "Professor Lupin",
            club: "Dumbledore's Army",
            orderRole: "Independent Operative",
            ministry: "Freelance Consultant",
            career: "Curse-Breaker",
            character: "Sirius Black",
            rival: "Dolores Umbridge",
            era: "Marauders Era",
            spell: "Riddikulus",
            explanation:
                "Your profile emphasizes independence, confidence, adaptability, and questioning assumptions. You would be difficult to control because your loyalty is to your own principles rather than status or tradition."
        },

        Catalyst: {
            house: "Gryffindor",
            reason: "You create momentum and help others move from hesitation to action.",
            summary:
                "You would become a visible force at Hogwarts, energizing people, organizing resistance, and making difficult action feel possible.",
            ilvermorny: "Wampus",
            professor: "Professor McGonagall",
            club: "Duelling Club",
            orderRole: "Field Commander",
            ministry: "Auror Office",
            career: "Auror Captain",
            character: "Harry Potter",
            rival: "Lucius Malfoy",
            era: "Second Wizarding War",
            spell: "Stupefy",
            explanation:
                "Your profile blends leadership, confidence, communication, and ambition. You would be most effective when people need direction, courage, and a reason to act now."
        }
    };

    return data[archetype] || data.Analyst;
}

function wandProfile(profile) {
    const dominant = highestTrait(profile, [
        "logic",
        "creativity",
        "empathy",
        "discipline",
        "independence",
        "resilience"
    ]).id;

    const woodMap = {
        logic: "Walnut",
        creativity: "Hazel",
        empathy: "Willow",
        discipline: "Black Walnut",
        independence: "Hawthorn",
        resilience: "Oak"
    };

    const core = chooseByTrait(
        profile,
        [
            { trait: "confidence", minimum: 67, value: "Dragon Heartstring" },
            { trait: "empathy", minimum: 66, value: "Unicorn Hair" },
            { trait: "creativity", minimum: 64, value: "Phoenix Feather" }
        ],
        "Phoenix Feather"
    );

    const length = `${10 + Math.round((profile.traits.confidence || 50) / 20)}¼ inches`;

    const flexibility = chooseByTrait(
        profile,
        [
            { trait: "adaptability", minimum: 67, value: "Supple" },
            { trait: "discipline", minimum: 67, value: "Unyielding" },
            { trait: "openMindedness", minimum: 64, value: "Slightly springy" }
        ],
        "Reasonably flexible"
    );

    return {
        wood: woodMap[dominant],
        core,
        length,
        flexibility
    };
}

function patronusProfile(profile) {
    const candidates = [
        ["empathy", "Golden Retriever", "Loyal, warm, and naturally protective."],
        ["logic", "Snowy Owl", "Observant, composed, and guided by clarity."],
        ["adaptability", "Red Fox", "Flexible, alert, and resourceful in unfamiliar situations."],
        ["leadership", "Lion", "Courageous, visible, and willing to protect others."],
        ["independence", "Black Wolf", "Self-directed, instinctive, and loyal by choice."],
        ["resilience", "Stag", "Steady, enduring, and able to rise after hardship."],
        ["creativity", "Raven", "Imaginative, curious, and drawn to hidden possibilities."]
    ];

    const winner = candidates
        .map(([trait, animal, meaning]) => ({
            trait,
            animal,
            meaning,
            score: profile.traits[trait] || 50
        }))
        .sort((a, b) => b.score - a.score)[0];

    return winner;
}

function animagusProfile(profile) {
    const candidates = [
        ["riskTolerance", "Golden Eagle", "Freedom, perspective, and bold movement."],
        ["empathy", "Doe", "Gentleness, loyalty, and quiet protection."],
        ["logic", "Raven", "Observation, intelligence, and strategic distance."],
        ["discipline", "Badger", "Persistence, steadiness, and practical strength."],
        ["independence", "Black Cat", "Autonomy, instinct, and controlled confidence."],
        ["adaptability", "Fox", "Resourcefulness and rapid adjustment."]
    ];

    return candidates
        .map(([trait, animal, meaning]) => ({
            trait,
            animal,
            meaning,
            score: profile.traits[trait] || 50
        }))
        .sort((a, b) => b.score - a.score)[0];
}

function academicProfile(profile) {
    const subjects = [
        ["logic", "Ancient Runes"],
        ["creativity", "Charms"],
        ["discipline", "Potions"],
        ["empathy", "Herbology"],
        ["riskTolerance", "Defense Against the Dark Arts"],
        ["curiosity", "Astronomy"],
        ["learningOrientation", "Transfiguration"],
        ["adaptability", "Care of Magical Creatures"]
    ]
        .map(([trait, subject]) => ({
            trait,
            subject,
            score: profile.traits[trait] || 50
        }))
        .sort((a, b) => b.score - a.score);

    const weakest = subjects[subjects.length - 1].subject;

    return {
        best: subjects.slice(0, 3).map((item) => item.subject),
        weakest
    };
}

function bloodStatus(profile) {
    if ((profile.traits.openMindedness || 50) >= 65) {
        return {
            value: "Muggle-Born",
            reason: "Your identity is shaped more by discovery and growth than inherited tradition."
        };
    }

    if ((profile.traits.independence || 50) >= 65) {
        return {
            value: "Half-Blood",
            reason: "You balance tradition with an independent view of the magical world."
        };
    }

    return {
        value: "Pure-Blood",
        reason: "You would feel a strong connection to established magical traditions."
    };
}

function owlGrades(profile, bestSubjects) {
    const grade = (score) => {
        if (score >= 70) return "Outstanding";
        if (score >= 62) return "Exceeds Expectations";
        if (score >= 54) return "Acceptable";
        return "Poor";
    };

    const subjectTraits = {
        "Ancient Runes": "logic",
        "Charms": "creativity",
        "Potions": "discipline",
        "Herbology": "empathy",
        "Defense Against the Dark Arts": "resilience",
        "Astronomy": "curiosity",
        "Transfiguration": "learningOrientation",
        "Care of Magical Creatures": "adaptability"
    };

    return bestSubjects.concat(["Defense Against the Dark Arts", "Transfiguration"])
        .slice(0, 5)
        .map((subject) => ({
            subject,
            grade: grade(profile.traits[subjectTraits[subject]] || 50)
        }));
}

const profile = getProfile();

if (!profile) {
    window.location.href = "quiz.html";
} else {
    const base = archetypeBase(profile.primaryArchetype);
    const wand = wandProfile(profile);
    const patronus = patronusProfile(profile);
    const animagus = animagusProfile(profile);
    const academics = academicProfile(profile);
    const blood = bloodStatus(profile);

    document.getElementById("houseName").textContent = base.house;
    document.getElementById("housePill").textContent = `${base.house} • ${profile.primaryArchetype}`;
    document.getElementById("houseSummary").textContent = base.summary;
    document.getElementById("house").textContent = base.house;
    document.getElementById("houseReason").textContent = base.reason;

    document.getElementById("bloodStatus").textContent = blood.value;
    document.getElementById("bloodReason").textContent = blood.reason;

    document.getElementById("wandWood").textContent = wand.wood;
    document.getElementById("wandCore").textContent = wand.core;
    document.getElementById("wandLength").textContent = wand.length;
    document.getElementById("wandFlexibility").textContent = wand.flexibility;

    document.getElementById("patronus").textContent = patronus.animal;
    document.getElementById("patronusMeaning").textContent = patronus.meaning;
    document.getElementById("animagus").textContent = animagus.animal;
    document.getElementById("animagusMeaning").textContent = animagus.meaning;

    document.getElementById("pet").textContent =
        (profile.traits.curiosity || 50) >= 64 ? "Snowy Owl" :
        (profile.traits.empathy || 50) >= 64 ? "Kneazle" :
        "Barn Owl";

    document.getElementById("ilvermorny").textContent = base.ilvermorny;

    const subjectContainer = document.getElementById("bestSubjects");
    academics.best.forEach((subject) => {
        const tag = document.createElement("span");
        tag.className = "subject";
        tag.textContent = subject;
        subjectContainer.appendChild(tag);
    });

    document.getElementById("weakestSubject").textContent = academics.weakest;
    document.getElementById("favoriteProfessor").textContent = base.professor;
    document.getElementById("club").textContent = base.club;

    document.getElementById("quidditch").textContent =
        chooseByTrait(
            profile,
            [
                { trait: "leadership", minimum: 66, value: "Captain / Chaser" },
                { trait: "riskTolerance", minimum: 64, value: "Seeker" },
                { trait: "resilience", minimum: 63, value: "Keeper" },
                { trait: "strategy", minimum: 63, value: "Beater" }
            ],
            "Reserve Chaser"
        );

    const owlContainer = document.getElementById("owlResults");
    owlGrades(profile, academics.best).forEach(({ subject, grade }) => {
        const item = document.createElement("div");
        item.className = "owl";
        item.innerHTML = `<strong>${grade}</strong><span>${subject}</span>`;
        owlContainer.appendChild(item);
    });

    document.getElementById("orderRole").textContent = base.orderRole;
    document.getElementById("ministry").textContent = base.ministry;

    document.getElementById("hallow").textContent =
        chooseByTrait(
            profile,
            [
                { trait: "independence", minimum: 65, value: "Invisibility Cloak" },
                { trait: "ambition", minimum: 65, value: "Elder Wand" },
                { trait: "empathy", minimum: 65, value: "Resurrection Stone" }
            ],
            "Invisibility Cloak"
        );

    document.getElementById("career").textContent = base.career;
    document.getElementById("characterMatch").textContent = base.character;
    document.getElementById("rival").textContent = base.rival;
    document.getElementById("era").textContent = base.era;
    document.getElementById("signatureSpell").textContent = base.spell;
    document.getElementById("explanation").textContent = base.explanation;

    const tagContainer = document.getElementById("traitTags");
    profile.topTraits.forEach((trait) => {
        const tag = document.createElement("span");
        tag.className = "tag";
        tag.textContent = `${trait.name} ${trait.score}`;
        tagContainer.appendChild(tag);
    });
}
