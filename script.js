'use strict';
window.addEventListener('DOMContentLoaded', () => {
    const countTimer = deadline => {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
        const getTimeRemaining = () => {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            return { timeRemaining, hours, minutes, seconds };
        };
        const oneNum = check => {
            if (check < 10) {
                return '0' + check;
            }
            return check;
        };
        const updateClock = () => {
            const timer = getTimeRemaining();
            if (timer.timeRemaining < 0) {
                return;
            } else {
                timerHours.textContent = oneNum(timer.hours);
                timerMinutes.textContent = oneNum(timer.minutes);
                timerSeconds.textContent = oneNum(timer.seconds);
            }
            if (timer.timeRemaining > 0) {
                setInterval(updateClock, 1000);
            }
        };
        updateClock();
    };
    countTimer('21 april 2020');
});
