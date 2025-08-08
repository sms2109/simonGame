let gameSeq = [];
let userSeq = [];

let btns = ["yellow","red","purple","green"];

let started = false;
let level = 0;

let h2 = document.querySelector('h2');
document.addEventListener("click", function(e) {
    if (e.target.classList.contains("start") && started === false) {
        console.log("game started");
        started = true;

        levelup();
    }
});


function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelup(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    // let currentScore = document.querySelector('.current');
    
    // currentScore.innerText = `Your current Score : ${level} `;

    //random btn choose
    let randomIdx = Math.floor(Math.random() * 3);
    let randomColor = btns[randomIdx];
    let randombtn = document.querySelector(`.${randomColor}`);
    // console.log(randomIdx);
    // console.log(randomColor);
    // console.log(randombtn);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randombtn);
}

function checkAns(idx){
    
    if(userSeq[idx] === gameSeq[idx]){
        // console.log("same value");
        if(userSeq.length == gameSeq.length){
            setTimeout(levelup,1000);
        }
    }
    else{
        h2.innerHTML = `Game Over!Your score was <b>${level}!👏Created by sksolanki!</b><br><br><button class="button-85 start">Restart</button`;
        maxScore(level);
        document.querySelector('body').style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor = "white";
        },150);

        reset();
    }

}

function btnPress(){
    // console.log("btn was pressed");
    // console.log(this);
    let btn = this;
    userflash(btn);

    let userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);
    console.log(userSeq);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
let finalscore = document.querySelector('.score');
let allScore = [];
function maxScore(max){
    allScore.push(max);
    console.log(allScore);
    let highest = Math.max(...allScore);
    console.log(highest);
    finalscore.innerHTML = `Highest Score : ${highest} 😎`;
}


//code for btn click sound , just for fun copied bt google

// app.js

// Get references to your audio elements
// This is your background music sound (if you keep it)
const backgroundMusic = document.querySelector('audio[loop]');
// This is the single sound for all Simon game button clicks
const generalButtonClickSound = document.getElementById('generalButtonClickSound');

// Get references to your HTML buttons
const playButton = document.querySelector('.button-85.start');
// Assuming your restart button (if you have one) also has class 'button-85' and 'restart'
// You might need to adjust this selector based on your actual restart button's class/ID.
const restartButton = document.querySelector('.button-85.restart'); // <--- ADDED THIS LINE

const redBtn = document.getElementById('red');
const yellowBtn = document.getElementById('yellow');
const greenBtn = document.getElementById('green');
const purpleBtn = document.getElementById('purple');

// --- Generic function to play the button sound ---
function playGeneralButtonClickSound() {
    if (generalButtonClickSound) {
        generalButtonClickSound.currentTime = 0; // Rewind to the start
        // Using .catch() to handle potential Promise rejection if playback fails
        generalButtonClickSound.play().catch(e => console.error("Error playing button sound:", e));
    }
}

// --- Event Listener for the "Play" Button ---
playButton.addEventListener('click', () => {
    playGeneralButtonClickSound(); // <--- ADDED THIS LINE: Play sound for Play button
    // You might want to unmute the background music here, or start the game
    if (backgroundMusic) {
        backgroundMusic.muted = false; // Unmute if it was muted
        backgroundMusic.play().catch(e => console.error("Error playing background music:", e));
    }
    console.log("Play button clicked! (Background music unmuted/played)");
    // Add your game's "start game" logic here (e.g., calling a startGame() function)
});

// --- Event Listener for the "Restart" Button (if it exists) ---
// This assumes you have a restart button in your HTML with class 'restart'
if (restartButton) { // Check if the restart button actually exists on the page
    restartButton.addEventListener('click', () => {
        playGeneralButtonClickSound(); // <--- ADDED THIS LINE: Play sound for Restart button
        console.log("Restart button clicked!");
        // Add your game's "restart game" logic here
    });
}


// --- Add Event Listeners for all Simon game buttons ---
redBtn.addEventListener('click', () => {
    playGeneralButtonClickSound(); // Play the sound
    // Your existing red button game logic goes here
    console.log("Red button clicked!");
});

yellowBtn.addEventListener('click', () => {
    playGeneralButtonClickSound(); // Play the sound
    // Your existing yellow button game logic goes here
    console.log("Yellow button clicked!");
});

greenBtn.addEventListener('click', () => {
    playGeneralButtonClickSound(); // Play the sound
    // Your existing green button game logic goes here
    console.log("Green button clicked!");
});

purpleBtn.addEventListener('click', () => {
    playGeneralButtonClickSound(); // Play the sound
    // Your existing purple button game logic goes here
    console.log("Purple button clicked!");
});


// --- Important for Simon Game Logic (when the *game* plays a sound during sequence) ---
// When the game itself (e.g., in a `playSequence` function) needs to play
// a sound for a flashing button, you would also call `playGeneralButtonClickSound()`.
// Make sure to call this function in your game's sequence playback logic.
/*
function playSimonSequence(sequence) {
    let delay = 0;
    for (let i = 0; i < sequence.length; i++) {
        const color = sequence[i];
        setTimeout(() => {
            // Flash the button
            flashButton(color); // Assuming you have this function

            // Play the general button sound
            playGeneralButtonClickSound(); // <--- CALL IT HERE TOO!

        }, delay);
        delay += 500; // Adjust delay as needed between flashes
    }
}
*/