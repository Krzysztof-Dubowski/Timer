var timerInterval;
var timeAudio = new Audio('ring-bell.mp3');
var breakAudio = new Audio('three-two-one-fight.mp3');
var rounds;
var initialRounds;
var initialTimeMin;
var initialTimeSec;
var initialBreak;

document.getElementById('submit').addEventListener('click', initializeTimer);

function initializeTimer() {
    if (!rounds) {
        rounds = parseInt(document.getElementById('round-input').value) || 0;
        initialRounds = rounds;
    }

    initialBreak = parseInt(document.getElementById('break-input').value) || 0;
    initialTimeMin = parseInt(document.getElementById('min-input').value) || 0;
    initialTimeSec = parseInt(document.getElementById('sec-input').value) || 0;

    document.getElementById('round-number').innerText = formatTime(initialRounds);
    document.getElementById('break-number').innerText = formatTime(initialBreak);

    var timeMin = initialTimeMin;
    var timeSec = initialTimeSec;

    if (timeSec >= 60) {
        var minutesToAdd = Math.floor(timeSec / 60);
        timeMin += minutesToAdd;
        timeSec %= 60;
    }

    document.getElementById('time-min').innerText = formatTime(timeMin);
    document.getElementById('time-sec').innerText = formatTime(timeSec);

    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    var timeMin = parseInt(document.getElementById('time-min').innerText) || 0;
    var timeSec = parseInt(document.getElementById('time-sec').innerText) || 0;
    var breakNumber = parseInt(document.getElementById('break-number').innerText) || 0;

    console.log("timeMin:", timeMin, "timeSec:", timeSec, "breakNumber:", breakNumber);

    if (timeSec === 0 && timeMin === 0) {
        clearInterval(timerInterval);
        playAudio(timeAudio);
        startBreakTimer();
    } else {
        if (timeSec === 0) {
            timeMin--;
            timeSec = 59;
        } else {
            timeSec--;
        }
        document.getElementById('time-min').innerText = formatTime(timeMin);
        document.getElementById('time-sec').innerText = formatTime(timeSec);
    }

    if (timeMin === 0 && timeSec === 0 && breakNumber === 0) {
        decrementRoundOnce();
    }
}

function startBreakTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(updateBreakTimer, 1000);
}

function updateBreakTimer() {
    var breakNumber = parseInt(document.getElementById('break-number').innerText) || 0;

    console.log("breakNumber:", breakNumber);

    if (breakNumber === 0) {
        clearInterval(timerInterval);
        decrementRoundOnce();
    } else {
        breakNumber--;
        document.getElementById('break-number').innerText = formatTime(breakNumber);

        if (breakNumber === 3) {
            playAudioForDuration(breakAudio, 4000); // Odtwarzaj dźwięk przez 4 sekundy
        }
    }
}

function playAudioForDuration(audio, duration) {
    audio.currentTime = 0;
    audio.play();
    setTimeout(function () {
        audio.pause();
    }, duration);
}

function decrementRoundOnce() {
    if (rounds > 0) {
        rounds--;
        document.getElementById('round-number').innerText = formatTime(rounds);
        console.log("decremented rounds, new value:", rounds);

        // Przywracamy pierwotne wartości dla time-min, time-sec, i break
        document.getElementById('time-min').innerText = formatTime(initialTimeMin);
        document.getElementById('time-sec').innerText = formatTime(initialTimeSec);
        document.getElementById('break-number').innerText = formatTime(initialBreak);

        // Rozpocznij ponownie odliczanie tylko jeśli rounds > 0
        if (rounds > 0) {
            startTimer();
        } else {
            // Jeśli rounds == 0, ustaw wszystkie wartości na "00"
            document.getElementById('time-min').innerText = "00";
            document.getElementById('time-sec').innerText = "00";
            document.getElementById('break-number').innerText = "00";
        }
    }
}

function startTimer() {
    var timeMin = initialTimeMin;
    var timeSec = initialTimeSec;

    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
}

function playAudio(audio) {
    audio.currentTime = 0;
    audio.play();
    setTimeout(function () {
        audio.pause();
    }, 1000); // Odtwarzaj dźwięk przez 1 sekundę
}

function formatTime(value) {
    return value < 10 ? "0" + value : value;
}
