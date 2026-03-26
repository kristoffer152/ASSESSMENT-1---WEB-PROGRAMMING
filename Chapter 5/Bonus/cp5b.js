const buttons = document.querySelectorAll(".sample");

buttons.forEach(button => {

    const sound = button.dataset.sound;
    const audio = new Audio(`audio/${sound}`);

    // DURATION
    audio.addEventListener("loadedmetadata", () => {
        const durationSpan = button.querySelector(".duration");
        const seconds = audio.duration.toFixed(1);
        durationSpan.textContent = `${seconds}`;
    });

    // PLAY SOUND
    button.addEventListener("click", () => {
        audio.currentTime = 0;
        audio.play();
    });
});