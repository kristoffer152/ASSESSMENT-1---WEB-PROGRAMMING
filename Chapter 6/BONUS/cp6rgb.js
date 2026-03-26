const rgb = document.getElementById("rgb");
const cbox = document.getElementById("cbox");
const statusText = document.getElementById("lives");
const messageText = document.getElementById("message");
const replay = document.getElementById("replay");

// Game variables
let correctColor;
let score = 0;
let lives = 3;
const totalOptions = 3;

// Generate random RGB colour
function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Start a new round
function startRound() {

    // Clear previous options
    cbox.innerHTML = "";
    messageText.textContent = "";

    messageText.style.fontSize = "16px";
    messageText.style.color = "";

    // Generate correct colour
    correctColor = generateRandomColor();
    rgb.textContent = correctColor;

    // Create options of colour
    const colors = [correctColor];

    // Additional random colours
    while (colors.length < totalOptions) {
        colors.push(generateRandomColor());
    }

    // Shuffle colours
    colors.sort(() => Math.random() - 0.5);

    // Clickable boxes
    colors.forEach(color => {

        const box = document.createElement("div");
        box.classList.add("cbox");
        box.style.backgroundColor = color;

        // The possible options should be interactive and when clicked inform the user if they were correct or incorrect.
        box.addEventListener("click", function () {
            if (color === correctColor) {
                score++;
                messageText.textContent = "Correct!";
                messageText.style.color = "lightgreen";
            } 
            else {
                lives--;
                messageText.textContent = "Incorrect!";
                messageText.style.color = "salmon";
            }

            updateLives();

            // The game should continue until they player has run out of lives
            if (lives === 0) {
                endGame();
            } 
            else {
                // Delay before next round
                setTimeout(startRound, 1000);
            }
        });

        cbox.appendChild(box);
    });
}

// Update score and lives display
function updateLives() {
    statusText.textContent = `Lives: ${"❤️".repeat(lives)} | Score: ${score}`;
}

// At the end of the game the user should be presented with a final score
function endGame() {
    messageText.textContent = `Game Over! Final Score: ${score}`;
    messageText.style.fontSize = "60px";
    replay.style.display = "inline-block";
    cbox.innerHTML = "";
}

// Ability to replay the game
replay.addEventListener("click", function () {
    score = 0;
    lives = 3;
    replay.style.display = "none";
    updateLives();
    startRound();
});
    
// Initialize game
updateLives();
startRound();