document.addEventListener("DOMContentLoaded",function(){
const result=window.ProfileverseHungerGames.calculate();
const missing=document.getElementById("missingProfile"), content=document.getElementById("resultsContent");
if(!result){missing.hidden=false;return}
content.hidden=false;
const set=(id,value)=>{const el=document.getElementById(id);if(el)el.textContent=value};
set("primaryArchetype",result.primaryArchetype);set("tributeClass",result.tributeClass);set("readiness",result.readinessLabel);
[["district",result.district.name],["districtDetail",result.district.focus+" — "+result.district.detail],["weapon",result.weapon.name],["weaponDetail",result.weapon.detail],["strategy",result.strategy.name],["strategyDetail",result.strategy.detail],["victor",result.victor.name],["victorDetail",result.victor.detail],["mentor",result.mentor.name],["mentorDetail",result.mentor.detail],["reputation",result.reputation.name],["reputationDetail",result.reputation.detail],["survivalStyle",result.survivalStyle.name],["survivalDetail",result.survivalStyle.detail],["tributeScore",result.tributeScore],["scoreDetail",result.tributeScore>=10?"The Gamemakers see a serious contender.":result.tributeScore>=7?"Your skills earn attention without revealing everything.":"You are underestimated, which may be your greatest advantage."],["survivalChance",result.survivalChance],["chanceLabel",result.survivalChance>=80?"Favorite":result.survivalChance>=60?"Contender":"Underdog"],["chanceDetail","Calculated from tactical thinking, resilience, adaptability, combat readiness, and social influence."],["quote",result.quote]].forEach(x=>set(x[0],x[1]));
document.getElementById("scoreBar").style.width=(result.tributeScore/12*100)+"%";
document.getElementById("chanceRing").style.background="conic-gradient(var(--hg-gold) "+(result.survivalChance*3.6)+"deg, rgba(255,255,255,.08) 0)";
const cards=[...document.querySelectorAll(".hg-card")];
function reveal(){cards.forEach(c=>c.classList.remove("visible"));requestAnimationFrame(()=>cards.forEach((c,i)=>setTimeout(()=>c.classList.add("visible"),i*75)))}
reveal();document.getElementById("revealButton").addEventListener("click",reveal);
try{localStorage.setItem("profileverseHungerGamesResultV1",JSON.stringify({district:result.district.name,tributeScore:result.tributeScore,weapon:result.weapon.name,strategy:result.strategy.name,victor:result.victor.name,mentor:result.mentor.name,reputation:result.reputation.name,survivalStyle:result.survivalStyle.name,survivalChance:result.survivalChance,archetype:result.primaryArchetype,completedAt:new Date().toISOString()}))}catch(e){}
});