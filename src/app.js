const tempoDisplay = document.querySelector('.tempo');
const tempoText = document.querySelector('.tempo-text');
const decreaseTempoBtn = document.querySelector('.decrease-tempo');
const increaseTempoBtn = document.querySelector('.increase-tempo');
const tempoSlider = document.querySelector('.slider');
const startStopBtn = document.querySelector('.start-stop');
const subtractBeats = document.querySelector('.subtract-beats');
const addBeats = document.querySelector('.add-beats');
const measureCount = document.querySelector('.measure-count');

let bpm = 140;
let beatsPerMeasure = 4;
let tempoTextString = 'Medium';

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
});

addBeats.addEventListener('click', () => {
    if (beatsPerMeasure >= 8) { return }
    beatsPerMeasure++;
    measureCount.textContent = beatsPerMeasure;
});

function updateMetronome(bpm) {
    tempoDisplay.textContent = bpm;
    tempoSlider.value = bpm;

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

function validateTempo() {
    if (bpm <= 20 || bpm >= 280) {
        return
    }
}