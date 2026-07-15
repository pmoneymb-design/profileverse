"use strict";

window.ProfileverseAnalytics = {
    makeProfileId(profile) {
        const raw = [
            profile.primaryArchetypeId,
            profile.secondaryArchetypeId,
            profile.thinkingStyles.primary.id,
            profile.topTraits.map((trait) => trait.id).join("-")
        ].join("|");

        let hash = 2166136261;

        for (let index = 0; index < raw.length; index += 1) {
            hash ^= raw.charCodeAt(index);
            hash = Math.imul(hash, 16777619);
        }

        const code = (hash >>> 0)
            .toString(36)
            .toUpperCase()
            .padStart(7, "0");

        return `PV-${code.slice(0, 4)}-${code.slice(4, 7)}`;
    },

    calculateBalance(profile) {
        const difference =
            profile.archetypes.rankings[0].match -
            profile.archetypes.rankings[1].match;

        if (difference >= 12) {
            return ["Distinct", "Clear primary identity"];
        }

        if (difference >= 6) {
            return ["Defined", "Strong primary with support"];
        }

        return ["Blended", "Multiple strong influences"];
    },

    renderTraitCards(containerId, traits) {
        const container = document.getElementById(containerId);
        container.innerHTML = "";

        traits.forEach((trait) => {
            const data = window.ProfileverseTraits[trait.id];
            const card = document.createElement("article");

            card.className = "trait-card";
            card.innerHTML = `
                <span class="trait-score">${trait.score}/100</span>
                <strong>${data.name}</strong>
                <p>${data.description}</p>
            `;

            container.appendChild(card);
        });
    },

    renderInsights(summary) {
        const sections = {
            leadership: ["leadershipTitle", "leadershipText"],
            communication: ["communicationTitle", "communicationText"],
            decision: ["decisionTitle", "decisionText"],
            learning: ["learningTitle", "learningText"],
            teamwork: ["teamworkTitle", "teamworkText"],
            stress: ["stressTitle", "stressText"]
        };

        Object.entries(sections).forEach(([key, ids]) => {
            document.getElementById(ids[0]).textContent = summary[key][0];
            document.getElementById(ids[1]).textContent = summary[key][1];
        });
    },

    renderRecommendations(archetype) {
        const container = document.getElementById("recommendationGrid");
        const recommendations =
            window.ProfileverseRecommendations.get(archetype);

        recommendations.forEach(([name, score, reason]) => {
            const card = document.createElement("article");
            card.className = "recommendation-card";

            card.innerHTML = `
                <span>${score}% personality match</span>
                <strong>${name}</strong>
                <small>${reason}</small>
            `;

            container.appendChild(card);
        });
    }
};
