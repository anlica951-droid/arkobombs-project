// ARKOBOMBS Countdown Timer

const targetDate = new Date("September 24, 2026 13:00:00").getTime();

function updateCountdown(){

    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;

}

updateCountdown();
setInterval(updateCountdown,1000);