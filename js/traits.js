"use strict";

/*
PROFILEVERSE CORE ENGINE v2
STEP 1 - TRAITS
*/

const PROFILEVERSE_TRAITS = {
curiosity:{name:"Curiosity",category:"Mind",description:"Desire to explore new ideas, people, and experiences."},
logic:{name:"Logic",category:"Mind",description:"Uses evidence, structure, and rational thinking."},
creativity:{name:"Creativity",category:"Mind",description:"Produces original ideas."},
openMindedness:{name:"Open-mindedness",category:"Mind",description:"Welcomes different perspectives."},
learningOrientation:{name:"Learning Orientation",category:"Mind",description:"Constant desire to improve."},

strategy:{name:"Strategy",category:"Decision Making",description:"Plans before acting."},
confidence:{name:"Confidence",category:"Decision Making",description:"Trusts personal judgment."},
independence:{name:"Independence",category:"Decision Making",description:"Comfortable making decisions alone."},
riskTolerance:{name:"Risk Tolerance",category:"Decision Making",description:"Comfort with uncertainty."},
patience:{name:"Patience",category:"Decision Making",description:"Willing to wait for better outcomes."},

empathy:{name:"Empathy",category:"Social",description:"Understands emotions."},
leadership:{name:"Leadership",category:"Social",description:"Naturally guides others."},
cooperation:{name:"Cooperation",category:"Social",description:"Works well with others."},
communication:{name:"Communication",category:"Social",description:"Expresses ideas clearly."},
charisma:{name:"Charisma",category:"Social",description:"Naturally attracts people."},

adaptability:{name:"Adaptability",category:"Growth",description:"Adjusts quickly to change."},
discipline:{name:"Discipline",category:"Growth",description:"Maintains consistency."},
resilience:{name:"Resilience",category:"Growth",description:"Recovers from setbacks."},
ambition:{name:"Ambition",category:"Growth",description:"Driven to achieve."},
selfAwareness:{name:"Self-awareness",category:"Growth",description:"Understands personal strengths and weaknesses."}
};

const DEFAULT_TRAIT_SCORES={};
Object.keys(PROFILEVERSE_TRAITS).forEach(t=>DEFAULT_TRAIT_SCORES[t]=50);

window.ProfileverseTraits=PROFILEVERSE_TRAITS;
window.ProfileverseDefaultTraitScores=DEFAULT_TRAIT_SCORES;
