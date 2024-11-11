const countdownTextEl = document.getElementById('countdown-text');
const circle = document.getElementById('c2');
let timeLeft = 45; // total time in seconds

countdownTextEl.textContent = timeLeft;

const countdownInterval = setInterval(() => {
    timeLeft--;
    countdownTextEl.textContent = timeLeft;

    // Change color based on remaining time
    if (timeLeft <= 15) {
        circle.style.stroke = '#ff0000'; // Red for last 15 seconds
       
    } else if (timeLeft <= 30) {
        circle.style.stroke = '#ffa500'; // Yellow from 30 to 15 seconds
        
    } else {
        circle.style.stroke = '#198051'; // Green for the initial 30 seconds
        
    }

    if (timeLeft <= 0) {
        clearInterval(countdownInterval);
    }
}, 1000);