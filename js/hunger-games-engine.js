(function(){
"use strict";
const STORAGE_KEY="profileverseProfileV2";
const fallbackTraits=["intellect","curiosity","creativity","adaptability","resilience","empathy","leadership","courage","discipline","independence","charisma","loyalty","awareness","calmness","precision","strength","patience","confidence","resourcefulness","strategicThinking","community","protectiveness","practicality","coordination","decisiveness"];
function num(v,fallback=50){const n=Number(v);return Number.isFinite(n)?Math.max(0,Math.min(100,n)):fallback}
function normalizeKey(k){return String(k||"").toLowerCase().replace(/[^a-z0-9]/g,"")}
function readProfile(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||"null")}catch(e){return null}}
function extractTraits(profile){
 const source=profile.traits||profile.traitScores||profile.scores||profile.personalityTraits||{};
 const out={};
 Object.keys(source||{}).forEach(k=>{const value=source[k]&&typeof source[k]==="object"?(source[k].score??source[k].value):source[k];out[normalizeKey(k)]=num(value)});
 fallbackTraits.forEach(k=>{const nk=normalizeKey(k);if(out[nk]==null)out[nk]=50});
 return out;
}
function trait(traits,key){return num(traits[normalizeKey(key)],50)}
function scoreOption(option,traits,index){
 const weights=[1,.82,.67];
 const base=(option.traits||[]).reduce((sum,k,i)=>sum+trait(traits,k)*(weights[i]||.55),0);
 const tie=((index+1)*7)%13/100;
 return base+tie;
}
function pick(options,traits){return options.map((x,i)=>({x,s:scoreOption(x,traits,i)})).sort((a,b)=>b.s-a.s)[0].x}
function archetype(profile){return profile.primaryArchetype||profile.archetype||profile.primary?.name||"Explorer"}
function calculate(){
 const profile=readProfile(); if(!profile)return null;
 const traits=extractTraits(profile), a=archetype(profile);
 const district=pick(HungerGamesData.districts,traits);
 const weapon=pick(HungerGamesData.weapons,traits);
 const strategy=pick(HungerGamesData.strategies,traits);
 const victor=pick(HungerGamesData.victors,traits);
 const mentor=pick(HungerGamesData.mentors,traits);
 const reputation=pick(HungerGamesData.reputations,traits);
 const survivalStyle=pick(HungerGamesData.survivalStyles,traits);
 const combat=(trait(traits,"courage")+trait(traits,"strength")+trait(traits,"precision"))/3;
 const mind=(trait(traits,"intellect")+trait(traits,"strategicThinking")+trait(traits,"awareness"))/3;
 const endurance=(trait(traits,"resilience")+trait(traits,"adaptability")+trait(traits,"calmness"))/3;
 const social=(trait(traits,"charisma")+trait(traits,"empathy")+trait(traits,"leadership"))/3;
 const readiness=Math.round(combat*.24+mind*.29+endurance*.29+social*.18);
 const tributeScore=Math.max(1,Math.min(12,Math.round(1+readiness/9)));
 const survivalChance=Math.max(18,Math.min(96,Math.round(readiness*.82+trait(traits,"resourcefulness")*.12+trait(traits,"loyalty")*.06)));
 const tributeClass= readiness>=82?"Elite Contender":readiness>=70?"High-Potential Tribute":readiness>=57?"Dangerous Underdog":"Unpredictable Survivor";
 const readinessLabel=readiness>=80?"Arena Ready":readiness>=65?"Strong Readiness":readiness>=50?"Competitive":"High Variance";
 return {profile,traits,primaryArchetype:a,district,weapon,strategy,victor,mentor,reputation,survivalStyle,tributeScore,survivalChance,tributeClass,readinessLabel,readiness,quote:HungerGamesData.quotes[a]||HungerGamesData.quotes.Explorer};
}
window.ProfileverseHungerGames={calculate};
})();