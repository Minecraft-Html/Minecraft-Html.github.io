// Game variables
let score = 0;
let timer = 30;
let gameInterval, timerInterval;
const target = document.getElementById("target");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const startButton = document.getElementById("start-button");
const targetContainer = document.getElementById("target-container");

// Popup Elements
const popup = document.getElementById("game-over-popup");
const finalScoreElement = document.getElementById("final-score");
const okButton = document.getElementById("ok-button");

// Image variables
const targetImage = new Image();
targetImage.src = "https://www.freepnglogos.com/uploads/circle-png/scribble-circle-outline-transparent-1.png"; // Updated source URL
let targetWidth = 0;
let targetHeight = 0;

// Set the natural size of the target image
targetImage.onload = () => {
    targetWidth = targetImage.naturalWidth;
    targetHeight = targetImage.naturalHeight;
};

// Start the game
function startGame() {
    score = 0;
    timer = 30;
    scoreElement.textContent = score;
    timerElement.textContent = timer;
    startButton.style.display = "none"; // Hide the start button

    // Reset the target's position and size, then start the game
    resetTarget();
    startTimer();
}

// Start the countdown timer
function startTimer() {
    timerInterval = setInterval(() => {
        timer--;
        timerElement.textContent = timer;
        if (timer <= 0) {
            endGame();
        }
    }, 1000);
}

// Reset the target to a random position and size
function resetTarget() {
    if (targetWidth === 0 || targetHeight === 0) {
        // Wait until the image has loaded
        return;
    }

    const containerWidth = targetContainer.offsetWidth;
    const containerHeight = targetContainer.offsetHeight;

    // Random position (inside the target container)
    const randomX = Math.floor(Math.random() * (containerWidth - targetWidth));
    const randomY = Math.floor(Math.random() * (containerHeight - targetHeight));

    // Random size (keeping the original aspect ratio)
    const randomSize = Math.random() * (1.5 - 0.5) + 0.5; // Random scale between 0.5 and 1.5
    const targetScaledWidth = targetWidth * randomSize;
    const targetScaledHeight = targetHeight * randomSize;

    target.style.width = `${targetScaledWidth}px`;
    target.style.height = `${targetScaledHeight}px`;
    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;

    // Add the click event listener for the target
    target.removeEventListener("click", hitTarget); // Remove previous listener
    target.addEventListener("click", hitTarget);
}

// Increase score when the target is clicked
function hitTarget() {
    score++;
    scoreElement.textContent = score;
    resetTarget(); // Move the target after each click
}

// End the game
function endGame() {
    clearInterval(gameInterval); // Stop the game interval
    clearInterval(timerInterval); // Stop the countdown timer
    finalScoreElement.textContent = score; // Show the score in the popup

    // Show the popup
    popup.style.display = "flex";
}

// Close the popup when the "Ok" button is clicked
okButton.addEventListener("click", () => {
    popup.style.display = "none"; // Hide the popup
    startButton.style.display = "inline-block"; // Show the start button
});

// Event listener for the start button
startButton.addEventListener("click", startGame);
