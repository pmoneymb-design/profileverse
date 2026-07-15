(function(){
"use strict";
const STORAGE_KEY="profileverseProfileV2";
const fallbackTraits=["intellect","curiosity","creativity","adaptability","resilience","empathy","leadership","courage","discipline","independence","charisma","loyalty","awareness","calmness","precision","strength","patience","confidence","resourcefulness","strategicThinking","community","protectiveness","practicality","decisiveness","competitiveness","ambition","passion"];
function num(v,fallback=50){const n=Number(v);return Number.isFinite(n)?Math.max(0,Math.min(100,n)):fallback}
function key(v){return String(v||"").toLowerCase().replace(/[^a-z0-9]/g,"")}
function readProfile(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||"null")}catch(e){return null}}
function extractTraits(profile){
 const source=profile.traits||profile.traitScores||profile.scores||profile.personalityTraits||{};
 const out={};
 Object.keys(source||{}).forEach(k=>{
  const raw=source[k]&&typeof source[k]==="object"?(source[k].score??source[k].value):source[k];
  out[key(k)]=num(raw);
 });
 fallbackTraits.forEach(k=>{if(out[key(k)]==null)out[key(k)]=50});
 return out;
}
function trait(t,k){return num(t[key(k)],50)}
function optionScore(option,traits,index){
 const weights=[1,.84,.68];
 return (option.traits||[]).reduce((sum,k,i)=>sum+trait(traits,k)*(weights[i]||.6),0)+(((index+5)*13)%19)/100;
}
function pick(options,traits){return options.map((item,index)=>({item,score:optionScore(item,traits,index)})).sort((a,b)=>b.score-a.score)[0].item}
function archetype(profile){return profile.primaryArchetype||profile.archetype||profile.primary?.name||"Explorer"}
function calculate(){
 const profile=readProfile();if(!profile)return null;
 const traits=extractTraits(profile),primaryArchetype=archetype(profile);
 const constructorTeam=pick(Formula1Data.constructors,traits);
 const driverMatch=pick(Formula1Data.drivers,traits);
 const drivingStyle=pick(Formula1Data.styles,traits);
 const signatureCircuit=pick(Formula1Data.circuits,traits);
 const engineerMatch=pick(Formula1Data.engineers,traits);
 const technicalRole=pick(Formula1Data.technicalRoles,traits);
 const pitStrategy=pick(Formula1Data.strategies,traits);
 const pace=(trait(traits,"confidence")+trait(traits,"precision")+trait(traits,"courage"))/3;
 const racecraft=(trait(traits,"awareness")+trait(traits,"strategicThinking")+trait(traits,"adaptability"))/3;
 const consistency=(trait(traits,"discipline")+trait(traits,"calmness")+trait(traits,"resilience"))/3;
 const teamwork=(trait(traits,"leadership")+trait(traits,"empathy")+trait(traits,"community"))/3;
 const driverRating=Math.round(pace*.30+racecraft*.32+consistency*.27+teamwork*.11);
 const wetRating=Math.max(20,Math.min(99,Math.round(trait(traits,"adaptability")*.30+trait(traits,"awareness")*.25+trait(traits,"calmness")*.22+trait(traits,"courage")*.13+trait(traits,"precision")*.10)));
 const championshipPotential=Math.max(18,Math.min(97,Math.round(driverRating*.68+trait(traits,"resilience")*.13+trait(traits,"discipline")*.10+trait(traits,"leadership")*.09)));
 const driverClass=driverRating>=85?"World Championship Caliber":driverRating>=73?"Grand Prix Winner":driverRating>=60?"Points-Scoring Contender":"High-Upside Rookie";
 const readiness=driverRating>=84?"Title Ready":driverRating>=71?"Race-Winning Pace":driverRating>=58?"Competitive":"Developing";
 return {primaryArchetype,constructorTeam,driverMatch,drivingStyle,signatureCircuit,engineerMatch,technicalRole,pitStrategy,driverRating,wetRating,championshipPotential,driverClass,readiness,radioQuote:Formula1Data.quotes[primaryArchetype]||Formula1Data.quotes.Explorer};
}
window.ProfileverseFormula1={calculate};
})();