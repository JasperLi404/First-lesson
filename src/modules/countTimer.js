const countTimer = () => {
    const timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');
    const getTimeRemaining = () => {
        const date = new Date();
        date.setSeconds(date.getSeconds() - 1);
        const seconds = 59 - date.getSeconds(),
            minutes = 59 - date.getMinutes(),
            hours = 23 - date.getHours();
        return {  hours, minutes, seconds };
    };
    const oneNum = check => {
        if (check < 10) {
            return '0' + check;
        }
        return check;
    };
    const updateClock = () => {
        const timer = getTimeRemaining();
        if (timer.hours === 0) {
            updateClock();
        } else {
            timerHours.textContent = oneNum(timer.hours);
            timerMinutes.textContent = oneNum(timer.minutes);
            timerSeconds.textContent = oneNum(timer.seconds);
        }
        if (timer.hours > 0) {
            setInterval(updateClock, 1000);
        }
    };
    updateClock();
};
export default countTimer;