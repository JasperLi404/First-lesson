'use strict';
window.addEventListener('DOMContentLoaded', () => {
    // timer
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
    countTimer();

    // menu
    const toggleMenu = () => {
        
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        }
        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
        
    };
    toggleMenu();
    // popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupClose = document.querySelector('.popup-close'),
        popupContent = popup.querySelector('.popup-content');
        let count = -560;
        let interval;
        const animate = () => {
            interval = requestAnimationFrame(animate);
            count += 2.5;
            popupContent.style.marginLeft = `${count}px`;
            if(count === 0){
                cancelAnimationFrame(interval);
            }

        }
        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                if(popup.clientWidth > 768){
                    popupContent.style.marginLeft = `${count}px`;
                    animate();
                }
            })
        });
        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';

        });
    }
    togglePopup();
});