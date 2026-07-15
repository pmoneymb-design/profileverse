"use strict";

const RECOMMENDATION_MAP = {
    Analyst: [
        ["Dune", 97, "Strategy, politics, and complex systems"],
        ["Sherlock", 95, "Pattern recognition and deduction"],
        ["The Lord of the Rings", 91, "Lore, strategy, and moral choices"],
        ["Mass Effect", 89, "Leadership and difficult decisions"]
    ],

    Explorer: [
        ["Avatar", 98, "Discovery, growth, and adaptability"],
        ["One Piece", 96, "Adventure and freedom"],
        ["Zelda", 93, "Exploration and problem-solving"],
        ["Mass Effect", 90, "New worlds and flexible choices"]
    ],

    Builder: [
        ["The Lord of the Rings", 96, "Duty, craft, and long-term purpose"],
        ["Marvel", 93, "Team roles and practical heroism"],
        ["Star Trek", 91, "Systems, discipline, and responsibility"],
        ["Skyrim", 88, "Mastery and progression"]
    ],

    Diplomat: [
        ["Avatar", 98, "Balance, empathy, and cooperation"],
        ["Marvel", 94, "Relationships and team dynamics"],
        ["The Hunger Games", 91, "Compassion under pressure"],
        ["Mass Effect", 89, "Diplomacy and alliance building"]
    ],

    Guardian: [
        ["The Lord of the Rings", 98, "Loyalty, protection, and endurance"],
        ["Marvel", 94, "Protective heroism"],
        ["Game of Thrones", 90, "Duty and difficult loyalty"],
        ["Halo", 87, "Service and resilience"]
    ],

    Visionary: [
        ["Dune", 98, "Future-building and influence"],
        ["Marvel", 96, "Power, purpose, and identity"],
        ["Arcane", 93, "Innovation and ambition"],
        ["Star Trek", 90, "Building a better future"]
    ],

    Maverick: [
        ["Arcane", 97, "Independence and unconventional choices"],
        ["The Boys", 94, "Questioning power"],
        ["Cyberpunk", 92, "Identity and rebellion"],
        ["Naruto", 89, "Defying expectations"]
    ],

    Catalyst: [
        ["Marvel", 98, "Action, leadership, and momentum"],
        ["Naruto", 95, "Determination and influence"],
        ["One Piece", 92, "Energy and team leadership"],
        ["The Hunger Games", 90, "Starting movements"]
    ]
};

window.ProfileverseRecommendations = {
    get(archetype) {
        return RECOMMENDATION_MAP[archetype] || RECOMMENDATION_MAP.Analyst;
    }
};
