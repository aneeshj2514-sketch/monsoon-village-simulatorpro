"use strict";

const initialStats = {
  villagers: 62,
  houses: 48,
  water: 40,
  animals: 35,
  electricity: 28,
  environment: 70,
  happiness: 50,
  score: 0
};

const statLabels = {
  villagers: "Villagers Safe",
  houses: "Houses Protected",
  water: "Clean Water",
  animals: "Animals Rescued",
  electricity: "Electricity",
  environment: "Environment",
  happiness: "Village Happiness",
  score: "Overall Score"
};

const statElements = {
  villagers: document.getElementById("statVillagers"),
  houses: document.getElementById("statHouses"),
  water: document.getElementById("statWater"),
  animals: document.getElementById("statAnimals"),
  electricity: document.getElementById("statElectricity"),
  environment: document.getElementById("statEnvironment"),
  happiness: document.getElementById("statHappiness"),
  score: document.getElementById("statScore")
};

const missions = {
  houses: {
    title: "Houses: Rising Floodwater",
    location: "Houses",
    scenario: "Water is moving toward the lowest row of homes. Families can help, but supplies are limited and the rain is still heavy.",
    choices: [
      {
        text: "Repair roof leaks and clear blocked drains first.",
        detail: "This protects several homes from rainwater, but floodwater at the doors remains a larger risk.",
        impact: { houses: 16, villagers: 2, happiness: 3, score: 62 },
        science: "Clearing drains helps rainwater leave the area faster. During floods, doorways and low drains still need direct protection."
      },
      {
        text: "Build a sandbag line and move valuables upstairs.",
        detail: "This slows water and reduces damage, but it takes time and teamwork.",
        impact: { houses: 30, villagers: 3, happiness: 4, score: 88 },
        science: "Sandbags reduce the speed of floodwater, giving people time to protect doors and drains. Moving items higher lowers loss even if water enters."
      },
      {
        text: "Evacuate the lowest homes and protect only the main road.",
        detail: "People move out of the riskiest area, but many houses receive little protection.",
        impact: { houses: 6, villagers: 7, happiness: -1, score: 52 },
        science: "Evacuation reduces danger to people. Property damage still increases when water is not slowed near homes."
      }
    ]
  },
  river: {
    title: "River: Contaminated Water",
    location: "River",
    scenario: "Floodwater has mixed with the village water source. Children are thirsty, and some families want to drink after filtering through cloth.",
    choices: [
      {
        text: "Filter muddy water through cloth, then boil water for children and elders first.",
        detail: "This targets the most vulnerable people, but clean water access remains uneven.",
        impact: { water: 22, villagers: 3, happiness: 2, score: 68 },
        science: "Cloth can remove visible particles but not all microbes. Boiling priority water lowers illness risk for vulnerable people."
      },
      {
        text: "Distribute untreated stored water to save time.",
        detail: "Families receive water quickly, but storage containers may already be contaminated.",
        impact: { water: 8, villagers: -3, happiness: 1, score: 43 },
        science: "Clean-looking stored water can still contain microbes after flooding. Speed matters, but water quality must be checked."
      },
      {
        text: "Boil water and set up a covered clean-water point.",
        detail: "Fuel must be managed carefully, but the water becomes much safer for the whole village.",
        impact: { water: 34, villagers: 4, happiness: 3, environment: -2, score: 90 },
        science: "Boiling kills many disease-causing microbes. Covered storage prevents clean water from being contaminated again."
      }
    ]
  },
  bridge: {
    title: "Bridge: Damaged Crossing",
    location: "Bridge",
    scenario: "The bridge is partly cracked. It is the fastest path to the health centre, but one support pillar is surrounded by fast water.",
    choices: [
      {
        text: "Allow only supervised foot traffic with a lookout at each end.",
        detail: "Urgent trips continue, but the damaged support remains a serious concern.",
        impact: { villagers: 4, happiness: 4, score: 66 },
        science: "Reducing load lowers stress on a damaged bridge. It does not solve erosion around the foundation."
      },
      {
        text: "Close the bridge and mark a safer detour.",
        detail: "Travel takes longer, but people avoid a possible collapse.",
        impact: { villagers: 6, happiness: 1, score: 88 },
        science: "Fast-moving water can weaken soil around bridge supports. A detour reduces exposure to a high-consequence hazard."
      },
      {
        text: "Send one light supply vehicle across at a time.",
        detail: "Supplies move faster, but each crossing adds stress to the weakened bridge.",
        impact: { villagers: 1, happiness: 3, score: 46 },
        science: "Vehicles add heavy dynamic loads to weakened structures. Speed is not helpful if the route itself becomes dangerous."
      }
    ]
  },
  school: {
    title: "School: Emergency Shelter",
    location: "School",
    scenario: "The school is on higher ground. Families need shelter, but classrooms must be organized quickly to prevent crowding and confusion.",
    choices: [
      {
        text: "Open classrooms immediately and organize families after they arrive.",
        detail: "People get inside quickly, but supplies and medical needs become harder to track.",
        impact: { villagers: 4, happiness: 5, score: 54 },
        science: "Crowd flow matters in emergency shelters. Without zones, responders may miss vulnerable people or duplicate supplies."
      },
      {
        text: "Create zones for families, first aid, food, and information.",
        detail: "This takes planning but makes the shelter easier to manage.",
        impact: { villagers: 5, happiness: 11, water: 4, score: 90 },
        science: "Organized shelters reduce disease risk and help people find support. Clear information also lowers fear during emergencies."
      },
      {
        text: "Use the hall for families and reserve classrooms for dry supplies.",
        detail: "This balances shelter and storage, but the hall can become crowded.",
        impact: { villagers: 5, houses: 2, happiness: 6, score: 64 },
        science: "High ground is valuable for both storage and safety. A balanced shelter plan protects people and key supplies."
      }
    ]
  },
  health: {
    title: "Health Centre: Disease Prevention",
    location: "Health Centre",
    scenario: "Several villagers have cuts from debris. The health worker has limited disinfectant, bandages, and oral rehydration packets.",
    choices: [
      {
        text: "Treat wounds in arrival order and share hygiene steps while people wait.",
        detail: "Many people receive care, but the sickest cases may not be seen first.",
        impact: { villagers: 4, water: 3, happiness: 3, score: 58 },
        science: "Cleaning wounds reduces infection risk after flood exposure. Triage still matters when supplies and staff are limited."
      },
      {
        text: "Set up a single supply desk for families to collect bandages.",
        detail: "This is simple to manage, but it does not sort people by urgency.",
        impact: { villagers: 1, happiness: 1, score: 42 },
        science: "Triage means sorting by urgency and need. Fair distribution can save more lives than first-come service."
      },
      {
        text: "Triage urgent cases, clean wounds, and reserve rehydration packets for symptoms.",
        detail: "This balances immediate care with prevention.",
        impact: { villagers: 7, water: 6, happiness: 5, score: 92 },
        science: "Cleaning wounds reduces infection risk after flood exposure. Oral rehydration helps replace water and salts lost during illness."
      }
    ]
  },
  animals: {
    title: "Animal Shelter: Stranded Livestock",
    location: "Animal Shelter",
    scenario: "Cows and goats are trapped near a flooded field. Families depend on them for milk and income, but rescue paths are muddy.",
    choices: [
      {
        text: "Open the nearby paddock and lure animals with feed.",
        detail: "Some animals move calmly, but others may scatter around the wet field.",
        impact: { animals: 18, happiness: 3, environment: 1, score: 63 },
        science: "Animals under stress may move unpredictably. Guided movement is safer than uncontrolled release."
      },
      {
        text: "Use ropes and guide animals to raised dry ground in small groups.",
        detail: "Slow movement prevents panic and keeps rescuers safer.",
        impact: { animals: 42, happiness: 6, environment: 4, score: 86 },
        science: "Small-group movement reduces crowd pressure and slipping. Raised ground lowers exposure to contaminated floodwater."
      },
      {
        text: "Move feed and clean water first, then return when paths are less muddy.",
        detail: "This supports animal survival, but several animals remain in risky water.",
        impact: { animals: 7, happiness: -1, score: 44 },
        science: "Protecting livestock supports food security and recovery. Disaster planning includes animals when human safety is already controlled."
      }
    ]
  },
  power: {
    title: "Power Station: Electrical Safety",
    location: "Power Station",
    scenario: "Power lines are wet, and part of the station is flooded. Some villagers want electricity restored immediately for lights and phone charging.",
    choices: [
      {
        text: "Shut unsafe circuits, raise equipment, and restore power zone by zone.",
        detail: "The process is slower, but it controls electrical risk.",
        impact: { electricity: 48, villagers: 2, happiness: 5, score: 89 },
        science: "Water conducts electricity when minerals are present. Isolating circuits prevents shock while allowing safer restoration."
      },
      {
        text: "Restart the main supply after a quick outside inspection.",
        detail: "Lights may return quickly, but hidden faults inside flooded areas can be dangerous.",
        impact: { electricity: 16, villagers: -5, happiness: 2, score: 38 },
        science: "A single damaged line can create shock or fire hazards. Testing sections is safer than energizing everything at once."
      },
      {
        text: "Keep power off until safety checks are complete.",
        detail: "This avoids electrical accidents but slows communication and care.",
        impact: { electricity: 5, villagers: 2, happiness: -3, score: 60 },
        science: "Turning power off reduces one risk but creates others. Resilience means restoring essential services safely."
      }
    ]
  },
  forest: {
    title: "Forest: Landslide Risk",
    location: "Forest",
    scenario: "The hillside above the village is soaked. Some trees were cut before the monsoon, and muddy runoff is entering fields.",
    choices: [
      {
        text: "Move families away from the slope and mark the danger zone.",
        detail: "People are safer, but muddy runoff continues to damage fields.",
        impact: { environment: 10, villagers: 5, houses: 3, score: 72 },
        science: "Moving people away reduces landslide exposure. Soil still needs protection so runoff does not speed downhill."
      },
      {
        text: "Dig a deep drainage channel straight down the hill.",
        detail: "Water drains quickly, but it may speed erosion.",
        impact: { environment: -4, houses: 5, score: 42 },
        science: "Fast channels can cut into soil and carry sediment downhill. Slowing and spreading water is often safer."
      },
      {
        text: "Block runoff with brush barriers and move people away from the slope.",
        detail: "This protects the village now and supports soil recovery.",
        impact: { environment: 18, villagers: 3, houses: 6, score: 88 },
        science: "Roots and barriers slow runoff and hold soil in place. Moving people away reduces landslide exposure."
      }
    ]
  }
};

let stats = { ...initialStats };
let completedMissions = new Set();
let choiceHistory = [];
let soundEnabled = false;
let audioContext;
let toastTimer;

const screens = {
  home: document.getElementById("homeScreen"),
  game: document.getElementById("gameScreen"),
  report: document.getElementById("reportScreen")
};

const modalOverlay = document.getElementById("modalOverlay");
const modalContent = document.getElementById("modalContent");
const toast = document.getElementById("toast");

document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("instructionsButton").addEventListener("click", showInstructions);
document.getElementById("creditsButton").addEventListener("click", showCredits);
document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("reportButton").addEventListener("click", showReport);
document.getElementById("playAgainButton").addEventListener("click", resetGame);
document.getElementById("reviewChoicesButton").addEventListener("click", showChoiceReview);
document.getElementById("soundToggleHome").addEventListener("click", toggleSound);
document.getElementById("soundToggleGame").addEventListener("click", toggleSound);

document.querySelectorAll(".map-location").forEach((button) => {
  button.addEventListener("click", () => openMission(button.dataset.mission));
});

modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modalOverlay.classList.contains("open")) {
    closeModal();
  }
});

updateDashboard();
updateProgress();

function startGame() {
  playTone(540, 0.08, "triangle");
  showScreen("game");
  showToast("Emergency command activated. Choose your first mission.");
}

function resetGame() {
  stats = { ...initialStats };
  completedMissions = new Set();
  choiceHistory = [];
  document.querySelectorAll(".map-location").forEach((button) => {
    button.classList.remove("completed");
    button.disabled = false;
  });
  updateDashboard();
  updateProgress();
  showScreen("home");
}

function showScreen(name) {
  Object.values(screens).forEach((screen) => screen.classList.remove("active"));
  screens[name].classList.add("active");
}

function openMission(id) {
  const mission = missions[id];
  if (!mission || completedMissions.has(id)) {
    showToast("That mission is already complete.");
    return;
  }

  playTone(430, 0.06, "sine");
  modalContent.innerHTML = `
    <p class="eyebrow">${mission.location} Mission</p>
    <h2 id="modalTitle">${mission.title}</h2>
    <p class="hero-copy">${mission.scenario}</p>
    <div class="choice-list">
      ${mission.choices.map((choice, index) => `
        <button class="choice-button" data-mission-id="${id}" data-choice-index="${index}">
          <strong>${choice.text}</strong>
          <span>${choice.detail}</span>
        </button>
      `).join("")}
    </div>
  `;
  modalContent.querySelectorAll(".choice-button").forEach((button) => {
    button.addEventListener("click", () => resolveMission(button.dataset.missionId, Number(button.dataset.choiceIndex)));
  });
  openModal();
}

function resolveMission(id, choiceIndex) {
  const mission = missions[id];
  const choice = mission.choices[choiceIndex];
  completedMissions.add(id);
  applyImpact(choice.impact);
  choiceHistory.push({
    mission: mission.location,
    title: mission.title,
    choice: choice.text,
    science: choice.science,
    impact: choice.impact
  });

  const locationButton = document.querySelector(`[data-mission="${id}"]`);
  locationButton.classList.add("completed");
  locationButton.disabled = true;

  modalContent.innerHTML = `
    <p class="eyebrow">Decision Complete</p>
    <h2 id="modalTitle">${mission.title}</h2>
    <div class="result-box">
      <strong>${choice.text}</strong>
      <p>${choice.science}</p>
      <div class="impact-list">${formatImpact(choice.impact).map((item) => `<span>${item}</span>`).join("")}</div>
    </div>
    <button class="primary-button small" id="continueMissionButton">${completedMissions.size === Object.keys(missions).length ? "View Rescue Report" : "Return to Map"}</button>
  `;
  document.getElementById("continueMissionButton").addEventListener("click", () => {
    closeModal();
    if (completedMissions.size === Object.keys(missions).length) {
      showReport();
    }
  });

  updateDashboard();
  updateProgress();
  playTone(720, 0.12, "triangle");
  showToast(`${mission.location} mission complete.`);
}

function applyImpact(impact) {
  Object.entries(impact).forEach(([key, value]) => {
    const max = key === "score" ? 999 : 100;
    stats[key] = clamp(stats[key] + value, 0, max);
  });
}

function updateDashboard() {
  Object.entries(stats).forEach(([key, value]) => {
    const element = statElements[key];
    if (!element) return;
    const displayValue = key === "score" ? `${getOverallScorePercent()}%` : `${Math.round(value)}%`;
    element.textContent = displayValue;

    const card = document.querySelector(`.metric-card[data-stat="${key}"]`);
    const meter = card.querySelector(".meter span");
    const meterWidth = key === "score" ? getOverallScorePercent() : value;
    meter.style.width = `${meterWidth}%`;
    card.classList.add("changed");
    window.setTimeout(() => card.classList.remove("changed"), 360);
  });
}

function updateProgress() {
  const total = Object.keys(missions).length;
  const complete = completedMissions.size;
  const percent = (complete / total) * 100;
  document.getElementById("missionProgressText").textContent = `${complete} of ${total} missions complete`;
  document.getElementById("missionProgressBar").style.width = `${percent}%`;
  document.getElementById("reportButton").disabled = complete < total;
}

function showReport() {
  const rating = getRating();
  const achievements = getAchievements();
  document.getElementById("ratingTitle").textContent = `${rating.label}: ${rating.status}`;
  document.getElementById("ratingSummary").textContent = rating.summary;
  document.getElementById("reportStats").innerHTML = [
    ["Final Score", `${getOverallScorePercent()}%`],
    ["People Saved", `${Math.round(stats.villagers)}%`],
    ["Homes Saved", `${Math.round(stats.houses)}%`],
    ["Animals Rescued", `${Math.round(stats.animals)}%`],
    ["Clean Water", `${Math.round(stats.water)}%`],
    ["Electricity", `${Math.round(stats.electricity)}%`],
    ["Environment", `${Math.round(stats.environment)}%`],
    ["Happiness", `${Math.round(stats.happiness)}%`]
  ].map(([label, value]) => `
    <article class="report-item">
      <span>${label}</span>
      <strong>${value}</strong>
    </article>
  `).join("");
  document.getElementById("achievementList").innerHTML = achievements.map((achievement) => `<span>${achievement}</span>`).join("");
  closeModal();
  showScreen("report");
  launchConfetti();
  playSuccessSound();
}

function getRating() {
  const scorePercent = getOverallScorePercent();
  if (scorePercent >= 82) {
    return {
      label: "Excellent",
      status: "Monsoon Hero",
      summary: "The village was strongly protected, but recovery will continue over the coming days."
    };
  }
  if (scorePercent >= 62) {
    return {
      label: "Good",
      status: "Village Stabilized",
      summary: "The worst of the crisis was controlled, but some areas still need support."
    };
  }
  return {
    label: "Needs Improvement",
    status: "Village Needs More Help",
    summary: "The village survived the first response, but stronger planning is needed."
  };
}

function getOverallScorePercent() {
  const maxMissionScore = Object.keys(missions).length * 100;
  return Math.round((stats.score / maxMissionScore) * 100);
}

function getAchievements() {
  const earned = [];
  if (stats.houses >= 65) earned.push("Flood Fighter");
  if (stats.environment >= 78) earned.push("Eco Guardian");
  if (stats.water >= 65) earned.push("Water Protector");
  if (stats.villagers >= 78) earned.push("Village Hero");
  if (completedMissions.size === Object.keys(missions).length) earned.push("Rapid Responder");
  if (stats.score >= 520) earned.push("Scientific Thinker");
  if (stats.animals >= 58) earned.push("Animal Ally");
  return earned.length ? earned : ["Rescue Trainee"];
}

function showInstructions() {
  modalContent.innerHTML = `
    <p class="eyebrow">How to Play</p>
    <h2 id="modalTitle">Lead the village response</h2>
    <p class="hero-copy">Click locations on the village map, read the emergency scenario, and choose one action. Each choice changes the live dashboard and teaches a short science idea.</p>
    <div class="result-box">
      <strong>Your goal</strong>
      <p>Complete all eight missions, keep people safe, protect clean water, rescue animals, restore power, and generate the best rescue report you can.</p>
    </div>
  `;
  openModal();
}

function showCredits() {
  modalContent.innerHTML = `
    <h2 id="modalTitle">Created By Aneesh Jayagandan<br>Grade 8</h2>
  `;
  openModal();
}

function showChoiceReview() {
  modalContent.innerHTML = `
    <p class="eyebrow">Decision Review</p>
    <h2 id="modalTitle">Your rescue choices</h2>
    <div class="choice-list">
      ${choiceHistory.map((item) => `
        <div class="choice-button">
          <strong>${item.mission}: ${item.choice}</strong>
          <span>${item.science}</span>
        </div>
      `).join("")}
    </div>
  `;
  openModal();
}

function openModal() {
  modalOverlay.classList.add("open");
  modalOverlay.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modalOverlay.classList.remove("open");
  modalOverlay.setAttribute("aria-hidden", "true");
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function formatImpact(impact) {
  return Object.entries(impact).map(([key, value]) => {
    const sign = value > 0 ? "+" : "";
    const suffix = key === "score" ? " pts" : "%";
    return `${statLabels[key]} ${sign}${value}${suffix}`;
  });
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  document.getElementById("soundToggleHome").textContent = soundEnabled ? "Sound On" : "Sound Off";
  document.getElementById("soundToggleGame").textContent = soundEnabled ? "Sound On" : "Sound Off";
  if (soundEnabled) {
    ensureAudio();
    playTone(520, 0.1, "sine");
    startRainAmbience();
  }
}

function ensureAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playTone(frequency, duration, type) {
  if (!soundEnabled) return;
  ensureAudio();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.055, audioContext.currentTime + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration + 0.02);
}

function startRainAmbience() {
  if (!soundEnabled || !audioContext || window.rainAmbienceStarted) return;
  window.rainAmbienceStarted = true;
  const bufferSize = 2 * audioContext.sampleRate;
  const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i += 1) {
    output[i] = (Math.random() * 2 - 1) * 0.18;
  }
  const noise = audioContext.createBufferSource();
  const filter = audioContext.createBiquadFilter();
  const gain = audioContext.createGain();
  noise.buffer = noiseBuffer;
  noise.loop = true;
  filter.type = "lowpass";
  filter.frequency.value = 760;
  gain.gain.value = 0.018;
  noise.connect(filter).connect(gain).connect(audioContext.destination);
  noise.start();
}

function playSuccessSound() {
  if (!soundEnabled) return;
  [520, 660, 780, 1040].forEach((note, index) => {
    window.setTimeout(() => playTone(note, 0.13, "triangle"), index * 100);
  });
}

function launchConfetti() {
  const layer = document.getElementById("confettiLayer");
  layer.innerHTML = "";
  const colors = ["#1677b8", "#1f8f5f", "#ffd166", "#f28c28", "#d9433e"];
  for (let i = 0; i < 90; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = `${Math.random() * 0.55}s`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    layer.appendChild(piece);
  }
  window.setTimeout(() => {
    layer.innerHTML = "";
  }, 2300);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
