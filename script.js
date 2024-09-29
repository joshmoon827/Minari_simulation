document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue(
    "--marquee-elements-displayed"
  );
  const marqueeContent = document.querySelector("ul.marquee-content");

  root.style.setProperty("--marquee-elements", marqueeContent.children.length);

  for (let i = 0; i < marqueeElementsDisplayed; i++) {
    marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
  }
});

const score = document.querySelector(".score");
let currentScore = 0;
const targetScore = 85;
const duration = 2000;
const interval = 20;
const steps = duration / interval;
const increment = targetScore / steps;

const timer = setInterval(() => {
  currentScore += increment;
  if (currentScore >= targetScore) {
    clearInterval(timer);
    currentScore = targetScore;
  }
  if (score) {
    score.textContent = Math.round(currentScore) + "점";
  }
}, interval);
