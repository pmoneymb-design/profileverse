document.addEventListener("DOMContentLoaded",function(){
const result=window.ProfileverseFormula1.calculate();
const missing=document.getElementById("missingProfile"),content=document.getElementById("resultsContent");
if(!result){missing.hidden=false;return}
content.hidden=false;
const set=(id,value)=>{const el=document.getElementById(id);if(el)el.textContent=value};
[
["primaryArchetype",result.primaryArchetype],["driverClass",result.driverClass],["readiness",result.readiness],
["constructorTeam",result.constructorTeam.name],["constructorDetail",result.constructorTeam.detail],
["driverRating",result.driverRating],["driverRatingDetail",result.driverRating>=84?"Your complete profile projects elite pace, control, and championship-level consistency.":result.driverRating>=68?"You have genuine race-winning qualities with room to sharpen the final details.":"Your ceiling is high, especially when conditions become unpredictable."],
["driverMatch",result.driverMatch.name],["driverMatchDetail",result.driverMatch.detail],
["drivingStyle",result.drivingStyle.name],["drivingStyleDetail",result.drivingStyle.detail],
["signatureCircuit",result.signatureCircuit.name],["signatureCircuitDetail",result.signatureCircuit.detail],
["engineerMatch",result.engineerMatch.name],["engineerMatchDetail",result.engineerMatch.detail],
["technicalRole",result.technicalRole.name],["technicalRoleDetail",result.technicalRole.detail],
["pitStrategy",result.pitStrategy.name],["pitStrategyDetail",result.pitStrategy.detail],
["wetRating",result.wetRating],["wetRatingDetail",result.wetRating>=82?"Changing grip brings out your best instincts.":result.wetRating>=65?"You remain composed and competitive as conditions change.":"You rely on preparation and gradually build confidence in low grip."],
["championshipPotential",result.championshipPotential],["chanceLabel",result.championshipPotential>=84?"Champion":result.championshipPotential>=66?"Contender":"Prospect"],
["championshipDetail","Calculated from racecraft, pace, consistency, adaptability, resilience, discipline, and leadership."],
["radioQuote",result.radioQuote]
].forEach(x=>set(x[0],x[1]));
document.getElementById("driverBar").style.width=result.driverRating+"%";
document.getElementById("chanceRing").style.background="conic-gradient(var(--f1-red) "+(result.championshipPotential*3.6)+"deg,rgba(255,255,255,.08) 0)";
const cards=[...document.querySelectorAll(".f1-card")];
function reveal(){cards.forEach(c=>c.classList.remove("visible"));requestAnimationFrame(()=>cards.forEach((c,i)=>setTimeout(()=>c.classList.add("visible"),i*70)))}
reveal();document.getElementById("revealButton").addEventListener("click",reveal);
try{localStorage.setItem("profileverseFormula1ResultV1",JSON.stringify({
constructorTeam:result.constructorTeam.name,driverRating:result.driverRating,driverMatch:result.driverMatch.name,drivingStyle:result.drivingStyle.name,signatureCircuit:result.signatureCircuit.name,engineerMatch:result.engineerMatch.name,technicalRole:result.technicalRole.name,pitStrategy:result.pitStrategy.name,wetRating:result.wetRating,championshipPotential:result.championshipPotential,archetype:result.primaryArchetype,completedAt:new Date().toISOString()
}))}catch(e){}
});