"use strict";

const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileMenu = document.getElementById("mobileMenu");

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.toggle("open");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );
        });
    });
}

const starField = document.getElementById("starField");

if (starField) {
    const starCount = window.innerWidth < 700 ? 35 : 70;

    for (let index = 0; index < starCount; index += 1) {
        const star = document.createElement("span");

        star.className = "star";
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * -4}s`;
        star.style.animationDuration =
            `${3 + Math.random() * 4}s`;

        const size = 1 + Math.random() * 2;

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        starField.appendChild(star);
    }
}

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element, index) => {
    element.style.transitionDelay =
        `${Math.min(index % 4, 3) * 80}ms`;

    revealObserver.observe(element);
});

document.querySelectorAll(".faq-item").forEach((item) => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    button.addEventListener("click", () => {
        const isOpen = item.classList.toggle("open");

        answer.style.maxHeight = isOpen
            ? `${answer.scrollHeight}px`
            : "0px";
    });
});
