// TEXT TO SPEECH
const speak = document.getElementById("speak");
const tts = document.getElementById("text");
speak.addEventListener("click", () => { 
    const text = tts.value.trim();
    if (text !== "") {
        const speech = new SpeechSynthesisUtterance(text); 
        speechSynthesis.cancel();
        speechSynthesis.speak(speech);
    }
});

// include more audio samples.
const sounds = [
    // FIRST COLUMN
    { file: "ah-ha.mp3", name: "Ah-Ha" },
    { file: "dan.mp3", name: "Dan" },
    { file: "backofthenet.mp3", name: "Back of the net" },
    { file: "bangoutoforder.mp3", name: "Bang out of order" },
    { file: "birdnoise.mp3", name: "Bird noise" },
    { file: "emailoftheevening.mp3", name: "Email of the evening" },
    { file: "iateascotchegg.mp3", name: "I ate a scotch egg" },
    { file: "imconfused.mp3", name: "I'm confused" },
    { file: "hellopartridge.mp3", name: "Hello Partridge" },

    // SECOND COLUMN
    { file: "Welcome To Mobile Legends.mp3", name: "Welcome To Mobile Legends" },
    { file: "Minions Spawned.mp3", name: "Minions Spawned" },
    { file: "Enemy Rampage.mp3", name: "Enemy Rampage" },
    { file: "Monster Kill.mp3", name: "Monster Kill" },
    { file: "Enemy God Like.mp3", name: "Enemy God Like" },
    { file: "Legendary.mp3", name: "Legendary" },
    { file: "Enemy Dominating.mp3", name: "Enemy Dominating" },
    { file: "Mega Kill.mp3", name: "Mega Kill" },
    { file: "Maniac.mp3", name: "Maniac" },

    // THIRD COLUMN
    { file: "Godlike.mp3", name: "Godlike" },
    { file: "Unstoppable.mp3", name: "Unstoppable" },
    { file: "Has Slain.mp3", name: "Has Slain" },
    { file: "Double Kill.mp3", name: "Double Kill" },
    { file: "Killing Spree.mp3", name: "Killing Spree" },
    { file: "First Blood.mp3", name: "First Blood" },
    { file: "Savage.mp3", name: "Savage" }
];


// display nine samples at a time.
let currentPage = 0;
const itemsPerPage = 9;

const soundboard = document.querySelector(".soundboard");
const left = document.getElementById("left");
const right = document.getElementById("right");
let currentAudio = null;

function renderSamples() {
    soundboard.innerHTML = "";
    const start = currentPage * itemsPerPage;
    const pageSounds = sounds.slice(start, start + itemsPerPage);
    
    pageSounds.forEach((soundObj, index) => {

        const button = document.createElement("button");
        button.classList.add("sample");        
        button.innerHTML = `
            <span class="number">${start + index + 1}.</span>
            <span class="name">${soundObj.name}</span>
            <span class="duration">...</span>
        `;

        // ERROR MESSAGE IF THE FILE IS MISSING
        const audio = new Audio();
        audio.src = `audio/${soundObj.file}`;
            audio.addEventListener("error", () => {
                console.error("File not found:", audio.src);
            });

            // DURATION
            audio.addEventListener("loadedmetadata", () => {
                const total = Math.floor(audio.duration);
                let mins = Math.floor(total / 60);
                let secs = total % 60;
                if (secs < 10) secs = "0" + secs;

                button.querySelector(".duration").textContent = `${mins}:${secs}`;
            });

            // PLAY SOUND
            button.addEventListener("click", () => {
                if (currentAudio) 
                {
                    currentAudio.pause();
                }
                currentAudio = audio;
                audio.currentTime = 0;
                audio.play();
            });

            soundboard.appendChild(button);
        });

        updateArrows();
}


// "left" and "right" arrows to scroll through an extended bank of samples.
left.addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage--;
        renderSamples();
    }
});

right.addEventListener("click", () => {
    const maxPage = Math.floor((sounds.length - 1) / itemsPerPage);
    if (currentPage < maxPage) {
        currentPage++;
        renderSamples();
    }
});

// ARROW KEYS
function updateArrows() {
    left.style.display = currentPage === 0 ? "none" : "inline-block"; // When the first page is displayed, the "left arrow" should be hidden

    const maxPage = Math.floor((sounds.length - 1) / itemsPerPage);
    right.style.display = currentPage === maxPage ? "none" : "inline-block"; // when the last page is displayed the "right" arrow should be hidden
}

renderSamples();