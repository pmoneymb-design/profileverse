(function(){
"use strict";
const KEY="profileverseProfileV2";
const defaults=["intellect","curiosity","creativity","adaptability","resilience","empathy","leadership","courage","discipline","independence","charisma","loyalty","awareness","calmness","precision","patience","confidence","resourcefulness","strategicThinking","community","protectiveness","decisiveness","competitiveness","energy"];
function n(v,f=50){const x=Number(v);return Number.isFinite(x)?Math.max(0,Math.min(100,x)):f}
function k(v){return String(v||"").toLowerCase().replace(/[^a-z0-9]/g,"")}
function profile(){try{return JSON.parse(localStorage.getItem(KEY)||"null")}catch(e){return null}}
function traits(p){const src=p.traits||p.traitScores||p.scores||p.personalityTraits||{},out={};Object.keys(src).forEach(name=>{const raw=src[name]&&typeof src[name]==="object"?(src[name].score??src[name].value):src[name];out[k(name)]=n(raw)});defaults.forEach(x=>{if(out[k(x)]==null)out[k(x)]=50});return out}
function t(all,name){return n(all[k(name)],50)}
function pick(options,all){return options.map((item,i)=>({item,score:(item.traits||[]).reduce((sum,name,j)=>sum+t(all,name)*([1,.84,.68][j]||.6),0)+i/100})).sort((a,b)=>b.score-a.score)[0].item}
function archetype(p){return p.primaryArchetype||p.archetype||p.primary?.name||"Explorer"}
function calculate(){
 const p=profile();if(!p)return null;
 const all=traits(p),primaryArchetype=archetype(p);
 const agent=pick(ValorantData.agents,all);
 const role=ValorantData.roles.find(x=>x.name===agent.role)||pick(ValorantData.roles,all);
 const map=pick(ValorantData.maps,all),weapon=pick(ValorantData.weapons,all),playstyle=pick(ValorantData.playstyles,all),duo=pick(ValorantData.duos,all),ultimate=pick(ValorantData.ultimates,all);
 const mechanics=(t(all,"precision")+t(all,"confidence")+t(all,"decisiveness"))/3;
 const gameSense=(t(all,"awareness")+t(all,"strategicThinking")+t(all,"discipline"))/3;
 const pressure=(t(all,"calmness")+t(all,"resilience")+t(all,"adaptability"))/3;
 const teamwork=(t(all,"leadership")+t(all,"community")+t(all,"empathy"))/3;
 const clutchRating=Math.round(mechanics*.31+gameSense*.31+pressure*.28+teamwork*.10);
 const rankedScore=Math.max(18,Math.min(98,Math.round(clutchRating*.72+t(all,"discipline")*.11+t(all,"adaptability")*.09+t(all,"leadership")*.08)));
 const rankedPotential=rankedScore>=88?"Immortal":rankedScore>=78?"Ascendant":rankedScore>=68?"Diamond":rankedScore>=58?"Platinum":rankedScore>=48?"Gold":"Silver";
 const competitiveProfile=clutchRating>=84?"Elite Tactical Carry":clutchRating>=72?"High-Impact Teammate":clutchRating>=60?"Reliable Competitive Player":"Unpredictable Playmaker";
 const readiness=clutchRating>=83?"Protocol Ready":clutchRating>=69?"Strong Readiness":clutchRating>=56?"Competitive":"Developing";
 return {primaryArchetype,agent,role,map,weapon,playstyle,duo,ultimate,clutchRating,rankedScore,rankedPotential,competitiveProfile,readiness,voiceLine:ValorantData.quotes[primaryArchetype]||ValorantData.quotes.Explorer};
}
window.ProfileverseValorant={calculate};
})();