let timer;
let totalSeconds = 0;
let isRunning = false;

const display = document.getElementById('timer');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');

function updateDisplay() {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    display.textContent = `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
}

function startTimer() {
    if (!isRunning) {
        if(totalSeconds === 0){
            const h = parseInt(document.getElementById('hours').value)||0;
            const m = parseInt(document.getElementById('minutes').value)||0;
            const s = parseInt(document.getElementById('seconds').value)||0;
            totalSeconds = h*3600 + m*60 + s;
            if(totalSeconds === 0) return;
        }
        isRunning = true;
        timer = setInterval(()=>{
            if(totalSeconds>0){
                totalSeconds--;
                updateDisplay();
            } else{
                clearInterval(timer);
                isRunning=false;
                alert("Time's up!");
            }
        },1000);
    }
}

function pauseTimer(){
    clearInterval(timer);
    isRunning = false;
}

function resetTimer(){
    clearInterval(timer);
    isRunning=false;
    totalSeconds = 0;
    updateDisplay();
    document.getElementById('hours').value = '';
    document.getElementById('minutes').value = '';
    document.getElementById('seconds').value = '';
}

startBtn.addEventListener('click',startTimer);
pauseBtn.addEventListener('click',pauseTimer);
resetBtn.addEventListener('click',resetTimer);

// initialize
updateDisplay();
