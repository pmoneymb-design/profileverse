"use strict";

function svgElement(name, attributes = {}) {
    const element = document.createElementNS(
        "http://www.w3.org/2000/svg",
        name
    );

    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });

    return element;
}

function polarPoint(center, radius, angle) {
    return {
        x: center + radius * Math.cos(angle),
        y: center + radius * Math.sin(angle)
    };
}

function pointString(points) {
    return points
        .map((point) => `${point.x.toFixed(2)},${point.y.toFixed(2)}`)
        .join(" ");
}

function describeDonutSegment(
    center,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle
) {
    const outerStart = polarPoint(center, outerRadius, startAngle);
    const outerEnd = polarPoint(center, outerRadius, endAngle);
    const innerEnd = polarPoint(center, innerRadius, endAngle);
    const innerStart = polarPoint(center, innerRadius, startAngle);

    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

    return [
        `M ${outerStart.x} ${outerStart.y}`,
        `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
        `L ${innerEnd.x} ${innerEnd.y}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
        "Z"
    ].join(" ");
}

function showTooltip(tooltip, event, title, text) {
    tooltip.innerHTML = `<strong>${title}</strong><span>${text}</span>`;
    tooltip.style.left = `${event.clientX}px`;
    tooltip.style.top = `${event.clientY}px`;
    tooltip.classList.add("visible");
}

function hideTooltip(tooltip) {
    tooltip.classList.remove("visible");
}

window.ProfileverseCharts = {
    renderRanking(containerId, rankings) {
        const container = document.getElementById(containerId);
        container.innerHTML = "";

        rankings.forEach((item, index) => {
            const row = document.createElement("div");
            row.className = "ranking-row";

            row.innerHTML = `
                <span class="ranking-number">${String(index + 1).padStart(2, "0")}</span>
                <span class="ranking-name">${item.name}</span>
                <div class="ranking-track">
                    <div class="ranking-fill" data-width="${item.match}%"></div>
                </div>
                <span class="ranking-score">${item.match}</span>
            `;

            container.appendChild(row);
        });

        requestAnimationFrame(() => {
            container.querySelectorAll(".ranking-fill").forEach((bar) => {
                bar.style.width = bar.dataset.width;
            });
        });
    },

    renderConfidenceRing(score) {
        const circle = document.getElementById("confidenceRing");
        const value = Math.max(0, Math.min(100, Number(score) || 0));
        const circumference = 302;
        const offset = circumference - (circumference * value) / 100;

        circle.style.strokeDashoffset = offset;
        document.getElementById("ringScore").textContent = value;
    },

    renderTraitRadar(profile) {
        const svg = document.getElementById("traitRadar");
        const tooltip = document.getElementById("radarTooltip");

        const traits = Object.entries(window.ProfileverseTraits).map(
            ([id, trait]) => ({
                id,
                name: trait.name,
                category: trait.category,
                score: profile.traits[id] ?? 50
            })
        );

        const center = 310;
        const maximumRadius = 205;
        const labelRadius = 257;
        const count = traits.length;
        const startAngle = -Math.PI / 2;

        svg.innerHTML = "";

        [0.2, 0.4, 0.6, 0.8, 1].forEach((level) => {
            const points = traits.map((_, index) => {
                const angle =
                    startAngle + (Math.PI * 2 * index) / count;

                return polarPoint(
                    center,
                    maximumRadius * level,
                    angle
                );
            });

            svg.appendChild(
                svgElement("polygon", {
                    points: pointString(points),
                    class: "radar-grid"
                })
            );
        });

        traits.forEach((trait, index) => {
            const angle =
                startAngle + (Math.PI * 2 * index) / count;

            const outer = polarPoint(
                center,
                maximumRadius,
                angle
            );

            svg.appendChild(
                svgElement("line", {
                    x1: center,
                    y1: center,
                    x2: outer.x,
                    y2: outer.y,
                    class: "radar-axis"
                })
            );
        });

        const resultPoints = traits.map((trait, index) => {
            const angle =
                startAngle + (Math.PI * 2 * index) / count;

            return polarPoint(
                center,
                maximumRadius * (trait.score / 100),
                angle
            );
        });

        const area = svgElement("polygon", {
            points: pointString(resultPoints),
            class: "radar-area"
        });

        svg.appendChild(area);

        resultPoints.forEach((point, index) => {
            const trait = traits[index];

            const dot = svgElement("circle", {
                cx: point.x,
                cy: point.y,
                r: 5,
                class: "radar-point"
            });

            dot.addEventListener("mousemove", (event) => {
                showTooltip(
                    tooltip,
                    event,
                    trait.name,
                    `${trait.score}/100 · ${trait.category}`
                );
            });

            dot.addEventListener("mouseleave", () => {
                hideTooltip(tooltip);
            });

            svg.appendChild(dot);
        });

        traits.forEach((trait, index) => {
            const angle =
                startAngle + (Math.PI * 2 * index) / count;

            const point = polarPoint(
                center,
                labelRadius,
                angle
            );

            const label = svgElement("text", {
                x: point.x,
                y: point.y,
                class: "radar-label",
                "text-anchor":
                    Math.abs(point.x - center) < 18
                        ? "middle"
                        : point.x > center
                            ? "start"
                            : "end",
                "dominant-baseline": "middle"
            });

            label.textContent = trait.name;
            svg.appendChild(label);
        });
    },

    renderArchetypeWheel(profile) {
        const svg = document.getElementById("archetypeWheel");
        const tooltip = document.getElementById("wheelTooltip");
        const rankings = profile.archetypes.rankings;

        const center = 260;
        const innerRadius = 112;
        const baseOuterRadius = 190;
        const count = rankings.length;
        const gap = 0.025;
        const startOffset = -Math.PI / 2;

        const colors = [
            "#8f70ff",
            "#637dff",
            "#4fa9ff",
            "#58c8cd",
            "#7bd39b",
            "#d1bb63",
            "#db7a82",
            "#bf6edb"
        ];

        svg.innerHTML = "";

        rankings.forEach((item, index) => {
            const segmentStart =
                startOffset +
                (Math.PI * 2 * index) / count +
                gap;

            const segmentEnd =
                startOffset +
                (Math.PI * 2 * (index + 1)) / count -
                gap;

            const outerRadius =
                baseOuterRadius + (item.match / 100) * 38;

            const path = svgElement("path", {
                d: describeDonutSegment(
                    center,
                    innerRadius,
                    outerRadius,
                    segmentStart,
                    segmentEnd
                ),
                fill: colors[index],
                class: "wheel-segment"
            });

            path.addEventListener("mousemove", (event) => {
                showTooltip(
                    tooltip,
                    event,
                    item.name,
                    `${item.match}% match`
                );
            });

            path.addEventListener("mouseleave", () => {
                hideTooltip(tooltip);
            });

            svg.appendChild(path);

            const middleAngle = (segmentStart + segmentEnd) / 2;
            const labelPoint = polarPoint(
                center,
                outerRadius + 28,
                middleAngle
            );

            const label = svgElement("text", {
                x: labelPoint.x,
                y: labelPoint.y,
                class: "wheel-label",
                "text-anchor": "middle",
                "dominant-baseline": "middle"
            });

            label.textContent = item.name;
            svg.appendChild(label);
        });

        document.getElementById("wheelPrimary").textContent =
            profile.primaryArchetype;

        document.getElementById("wheelPrimaryScore").textContent =
            `${profile.archetypes.primary.match}% match`;
    }
};
