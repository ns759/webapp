// DOM Elements
let ammoElement = document.getElementById("ammo");
let pointsElement = document.getElementById("points");
let gameField = document.getElementById("background");
let copyBtn = document.getElementById("copy");
let catapult = document.getElementById("catapult");

// Initializations
let ammo = parseInt(localStorage.getItem("ammo")) || 0;
let points = parseInt(localStorage.getItem("points")) || 0;
let lastAmmoUpdate =
    parseInt(localStorage.getItem("lastAmmoUpdate")) || Date.now();
let maxAmmo = 5000;
let currentTime;
let isAnimating = false;

// Constants
const pointsPerTap = 5;
const ammoPoints = 5;
const animationDuration = 400;

// Event Handlers
function updatePoints() {
    if (isAnimating || ammo - ammoPoints < 0) return;
    isAnimating = true;

    ammo -= ammoPoints;
    ammoElement.textContent = `+${ammo}`;

    points += pointsPerTap;
    pointsElement.textContent = points;

    catapultAnimate();

    saveGameData();

    setTimeout(() => {
        isAnimating = false;
    }, animationDuration);
}

function updateAmmo() {
    ammo += ammoPoints;
    if (ammo > maxAmmo) {
        ammo = maxAmmo;
    }
    ammoElement.textContent = `+${ammo}`;

    saveGameData();
}

function toggleCopyBlock() {
    copyBtn.classList.toggle("hidden");
}

function copyText() {
    navigator.clipboard
        .writeText("https://youtube.com")
        .then(() => {
            toggleCopyBlock();
        })
        .catch((error) => {
            console.error("Error copying text: ", error);
        });
}

// Utility Functions
function initialAmmoUpdate() {
    currentTime = Date.now();
    let timeDifference = currentTime - lastAmmoUpdate;

    let ammoIncrement = Math.floor(timeDifference / 1000);
    if (ammo + ammoIncrement <= maxAmmo) {
        ammo += ammoIncrement * ammoPoints;
    } else {
        ammo = maxAmmo;
    }
    ammoElement.textContent = `+${ammo}`;
    pointsElement.textContent = points;
    saveGameData(currentTime);
}

function catapultAnimate() {
    catapult.classList.add("active");
    setTimeout(() => {
        catapult.classList.remove("active");
    }, animationDuration);
}

function saveGameData(currentTime = Date.now()) {
    localStorage.setItem("ammo", ammo);
    localStorage.setItem("points", points);
    localStorage.setItem("lastAmmoUpdate", currentTime);
}

// Initialization
console.log(ammo, points);
initialAmmoUpdate();
setInterval(updateAmmo, 1000);
gameField.addEventListener("click", updatePoints);