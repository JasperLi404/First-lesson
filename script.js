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
        
        const menu = document.querySelector('menu'),
            menuItems = menu.querySelectorAll('ul>li>a'),
            imgClick = document.querySelector('a>img'),
            main = document.querySelector('main');
        let interval,
                sum;
            if(document.documentElement.clientWidth > 768){
                imgClick.parentNode.href = '#';
            }
        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        }        
        const animateScroll = () => {
            interval = requestAnimationFrame(animateScroll);
            document.documentElement.scrollTop += 5;
            if(document.documentElement.scrollTop > sum){
                cancelAnimationFrame(interval);
            }
        }
        main.addEventListener('click', (event) => {
            let target = event.target;
            if(target.closest('.menu')) handlerMenu();
            else if (target.closest('a>img')) {
                sum = 888;
                document.documentElement.scrollTop = 0;
                animateScroll();
            }
        });
        menu.addEventListener('click', () => {
            let target = event.target;
            if(target.classList.contains('.close-btn')) handlerMenu();
            else if(target.closest('ul>li>a')){
                handlerMenu();
                if(document.documentElement.clientWidth > 768){
                    target.href = '#';
                }
                if(target === menuItems[0]) {
                    sum = 888;
                    animateScroll();
                }
                if(target === menuItems[1]){
                    sum = 1400;
                    animateScroll();
                }
                if(target === menuItems[2]){
                    sum = 2380;
                    animateScroll();
                }
                if(target === menuItems[3]){
                    sum = 3500;
                    animateScroll();
                }
                if(target === menuItems[4]){
                    sum = 4540;
                    animateScroll();
                }
            }
        });
    };
    toggleMenu();
    // popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
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
                    let count = -560;
                    popupContent.style.marginLeft = `${count}px`;
                    animate();
                }
            })
        });

        popup.addEventListener('click', () => {
            let target = event.target;
            if(target.classList.contains('.popup-close')){
                popup.style.display = 'none';
            } else{
                target = target.closest('.popup-content');
                if(!target){
                    popup.style.display = 'none';
                }
            }
            
        });
    }
    togglePopup();
    // tabs
    const tabs = () =>{
        const tabHeader = document.querySelector('.service-header'),
              tab = tabHeader.querySelectorAll('.service-header-tab'),
              tabContent = document.querySelectorAll('.service-tab');
            
        const toggletabContent = (index) => {
            for(let i = 0; i < tabContent.length; i++){
                if(index === i){
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else{
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        }

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if(target) {   
                tab.forEach((item, i) => {
                    if(item === target){
                        toggletabContent(i);
                    }
                });
                    
        }  
            
            });
    }
    tabs();

});