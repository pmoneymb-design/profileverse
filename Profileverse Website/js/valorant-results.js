document.addEventListener("DOMContentLoaded",function(){
const r=window.ProfileverseValorant.calculate(),missing=document.getElementById("missingProfile"),content=document.getElementById("resultsContent");
if(!r){missing.hidden=false;return}content.hidden=false;
const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v};
[
["primaryArchetype",r.primaryArchetype],["competitiveProfile",r.competitiveProfile],["readiness",r.readiness],
["agent",r.agent.name],["agentDetail",r.agent.detail],["role",r.role.name],["roleDetail",r.role.detail],
["map",r.map.name],["mapDetail",r.map.detail],["weapon",r.weapon.name],["weaponDetail",r.weapon.detail],
["playstyle",r.playstyle.name],["playstyleDetail",r.playstyle.detail],["duo",r.duo.name],["duoDetail",r.duo.detail],
["clutchRating",r.clutchRating],["clutchDetail",r.clutchRating>=84?"You stay composed, read the round, and execute when one mistake ends everything.":r.clutchRating>=68?"You are dependable under pressure and improve when the round becomes difficult.":"Your best clutches come from unpredictability and confidence."],
["ultimateImpact",r.ultimate.name],["ultimateDetail",r.ultimate.detail],["rankedPotential",r.rankedPotential],["rankPercent",r.rankedScore+"%"],
["rankDetail","Projected from mechanics, game sense, pressure control, adaptability, discipline, and teamwork."],["voiceLine",r.voiceLine]
].forEach(x=>set(x[0],x[1]));
document.getElementById("clutchBar").style.width=r.clutchRating+"%";
document.getElementById("rankRing").style.background="conic-gradient(var(--v-red) "+(r.rankedScore*3.6)+"deg,rgba(255,255,255,.08) 0)";
const cards=[...document.querySelectorAll(".val-card")];
function reveal(){cards.forEach(c=>c.classList.remove("visible"));requestAnimationFrame(()=>cards.forEach((c,i)=>setTimeout(()=>c.classList.add("visible"),i*70)))}
reveal();document.getElementById("revealButton").addEventListener("click",reveal);
try{localStorage.setItem("profileverseValorantResultV1",JSON.stringify({agent:r.agent.name,role:r.role.name,map:r.map.name,weapon:r.weapon.name,playstyle:r.playstyle.name,duo:r.duo.name,clutchRating:r.clutchRating,ultimateImpact:r.ultimate.name,rankedPotential:r.rankedPotential,archetype:r.primaryArchetype,completedAt:new Date().toISOString()}))}catch(e){}
});