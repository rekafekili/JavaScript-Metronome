import Timer from './timer.js';

const tempoDisplay = document.querySelector('.tempo');
const tempoText = document.querySelector('.tempo-text');
const decreaseTempoBtn = document.querySelector('.decrease-tempo');
const increaseTempoBtn = document.querySelector('.increase-tempo');
const tempoSlider = document.querySelector('.slider');
const startStopBtn = document.querySelector('.start-stop');
const subtractBeats = document.querySelector('.subtract-beats');
const addBeats = document.querySelector('.add-beats');
const measureCount = document.querySelector('.measure-count');

const highClick = new Audio('../assets/Perc_Clap_hi.wav');
const lowClick = new Audio('../assets/Perc_Clap_lo.wav');

let bpm = 140;
let beatsPerMeasure = 4;
let tempoTextString = 'Nice and Steady';
let count = 0;
let isRunning = false;

decreaseTempoBtn.addEventListener('click', () => {
    if (bpm <= 20) { return }
    bpm--;
    updateMetronome(bpm);
});

increaseTempoBtn.addEventListener('click', () => {
    if (bpm >= 280) { return }
    bpm++;
    updateMetronome(bpm);
});

// change: Slider를 옮기고 놓았을 때 listen
// input: Slider가 움직임과 동시에 listen
tempoSlider.addEventListener('input', () => {
    bpm = tempoSlider.value;
    updateMetronome(bpm);
});

subtractBeats.addEventListener('click', () => {
    if (beatsPerMeasure <= 0) { return }
    beatsPerMeasure--;
    measureCount.textContent = beatsPerMeasure;
    count = 0;
});

addBeats.addEventListener('click', () => {
    if (beatsPerMeasure >= 8) { return }
    beatsPerMeasure++;
    measureCount.textContent = beatsPerMeasure;
    count = 0;
});

startStopBtn.addEventListener('click', () => {
    count = 0;

    if (!isRunning) {
        metronome.start();
        isRunning = true;
        startStopBtn.textContent = 'STOP';
    } else {
        metronome.stop();
        isRunning = false;
        startStopBtn.textContent = 'START';
    }
});

function updateMetronome(bpm) {
    tempoDisplay.textContent = bpm;
    tempoSlider.value = bpm;
    metronome.timeInterval = 60000 / bpm;

    if (bpm <= 40) { tempoTextString = "Super Slow" }
    else if (bpm < 80) { tempoTextString = "Slow" }
    else if (bpm < 120) { tempoTextString = "Getting there" }
    else if (bpm < 180) { tempoTextString = "Nice and Steady" }
    else if (bpm < 220) { tempoTextString = "Rock n' Roll" }
    else if (bpm < 240) { tempoTextString = "Funky Stuff" }
    else if (bpm < 260) { tempoTextString = "Relax Dude" }
    else { tempoTextString = "Eddie Van Halen" }

    tempoText.textContent = tempoTextString; 
}

function playClick() {
    if (count === beatsPerMeasure) {
        count = 0;
    }

    if (count === 0) {
        highClick.play();
        highClick.currentTime = 0;
    } else {
        lowClick.play();
        lowClick.currentTime = 0;
    }

    count++;
}

const metronome = new Timer(playClick, 60000 / bpm, { immediate: true });