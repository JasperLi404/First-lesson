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
            imgClick = document.querySelector('a>img');
        let interval, sum;
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
        window.addEventListener('click', (event) => {
        let target = event.target;    
            if(menu.classList.contains('active-menu') && !target.closest('menu')){
                handlerMenu();
            } else if(target.closest('main')){
                if(target.closest('.menu')) handlerMenu();
                else if (target.closest('a>img')) {
                    sum = 888;
                    document.documentElement.scrollTop = 0;
                    animateScroll();
                }
            }
            else if(target.closest('menu')){
                if(target.className === 'close-btn') handlerMenu();
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

    //slider
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
              slider = document.querySelector('.portfolio-content'),
              ul =  document.querySelector('.portfolio-dots');
        let currentSlide = 0,
        interval;
        slide.forEach(() => {
            let li = document.createElement('li');
            li.classList.add('dot');
            ul.prepend(li);
        });
        const dot = document.querySelectorAll('.dot');
        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };
        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };
        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot,currentSlide, 'dot-active');
            currentSlide++;
            if(currentSlide >= slide.length){
                currentSlide = 0 ;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot,currentSlide, 'dot-active');
            
        };
        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };
        const stopSlide = () => {
            clearInterval(interval);
        };
        slider.addEventListener('click', (event) => {
            event.preventDefault();
            let target = event.target;
            if(!target.matches('.portfolio-btn, .dot')){
                return;
            }
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot,currentSlide, 'dot-active');
            if(target.matches('#arrow-right')){
                currentSlide++;
            }
            if(target.matches('#arrow-left')){
                currentSlide--;
            } 
            if(target.matches('.dot')){
                dot.forEach((elem,index) => {
                    if(elem === target){
                        currentSlide = index;
                    }
                });
            }
            if(currentSlide >= slide.length){
                currentSlide = 0;
            }
            if(currentSlide < 0){
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot,currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (event) => {
            if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
                stopSlide();
            }
        });
        slider.addEventListener('mouseout', (event) => {
            if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
                startSlide(1500);
           }
        });
        startSlide(1500);
    };
    slider();
    //on hover change photo
    const changeFace = () => {
            const container = document.querySelector('.command');
            let fff;
        container.addEventListener('mouseover', (event) => {
            let target = event.target;
                if(target.matches('.command__photo')){
                    fff = event.target.src;
                    event.target.src = event.target.dataset.img;                
                }
        });
        container.addEventListener('mouseout',(event) => {
            let target = event.target;
            if(target.matches('.command__photo')) event.target.src = fff;
        });
    };
    changeFace();
    // in input wrte just numbers
    const writeNum = () => {
        const calcBlock = document.querySelector('.calc-block');
        calcBlock.addEventListener('input', (event) => {
            if(event.target.matches('.calc-square, calc-day, .calc-count')){
                event.value = event.value.replace(/[a-zA-Z]/g, '');
            }
            
        })
    };
    writeNum();

    // calculator
    const calculator = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
             calcType = document.querySelector('.calc-type'),
             calcSquare = document.querySelector('.calc-square'),
             calcDay = document.querySelector('.calc-day'),
             calcCount= document.querySelector('.calc-count'),
             totalValue = document.getElementById('total');
        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1,
                i = 0;
            const typeValue = +calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;
                
            if(calcCount.value > 1){
                countValue += (calcCount.value - 1) / 10; 
            }
            if(calcDay && calcDay.value < 5){
                dayValue *= 2;
            } else if(calcDay && calcDay.value < 10){
                dayValue *= 1.5;
            }
            if(typeValue && squareValue){
                total = price * typeValue * squareValue * countValue * dayValue;
            } 
            
            totalValue.textContent = total;
        }

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;
            if(target.matches('select') || target.matches('input')){
                countSum();                
            }

        });
    }
    calculator(100);

    // send ajax form
    const sendForm = (id) => {
        const errorMessage  = 'Что то пошло не так...',
            successMessage = "Спасибо! Мы скоро с Вами свяжемся";
        const form = document.getElementById(id);
        const statusMessage = document.createElement('div');
        form.appendChild(statusMessage);
        form.addEventListener('input', (event) => {
            let target = event.target;
            if(target.className == 'form-phone'){
                target.value = target.value.replace(/\D/g, '');
            }
            if(target.className == 'form-name' || target.className == 'mess'){
                target.value = target.value.replace(/[a-zA-Z0-9]/g, '');
            }
        });
        form.addEventListener('submit', event => {
            event.preventDefault();        
            form.appendChild(statusMessage);
            const formData = new FormData(form);
            let body = {};
            formData.forEach((val,key) => {
                body[key] = val;
            });
            POSTData(body)
            .then((response) => {
                if(response.status !== 200){
                    throw new Error('netvork status isn`t 200');
                }
                clearInput();
                statusMessage.textContent = successMessage;
            })
            .catch(() =>  statusMessage.textContent = errorMessage);

        });
        const clearInput = () => {
            const elementsForm = [...form.elements].filter(item => {
                return item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
            });
            elementsForm.forEach(item => item.value = '')
        }
        
        // const animateLoading = () => {
        //     const style = document.createElement('style');
        //     document.head.appendChild(style);
        //     statusMessage.classList.add('cover');
        //     statusMessage.innerHTML = `
        //     <div class="container">
        //         <div class="dash uno"></div>
        //         <div class="dash dos"></div>
        //         <div class="dash tres"></div>
        //         <div class="dash cuatro"></div>
        //     </div>`;           
        //     style.innerHTML = `
        //     .cover{
        //         width :100%;
        //         display: flex;
        //         flex-direction:row;
        //         align-items:center;
        //         justify-content: center;
        //     }
        //     .container{
        //         display: flex;
        //         flex-direction:row;
        //         width: 220px;
        //         height: 60px;
        //     }
        //       .dash {
        //         margin: 0 15px;
        //         width: 35px;
        //         height: 15px;
        //         border-radius: 8px;
        //         background: #099dda;
        //         box-shadow: 0 0 10px 0 #099dda;
        //       }
              
        //       .uno {
        //         margin-right: -18px;
        //         transform-origin: center left;
        //         animation: spin 3s linear infinite;  
        //       }
              
        //       .dos {
        //         transform-origin: center right;
        //         animation: spin2 3s linear infinite;
        //         animation-delay: .2s;
        //       }
              
        //       .tres {
        //         transform-origin: center right;
        //         animation: spin3 3s linear infinite;
        //         animation-delay: .3s;
        //       }
              
        //       .cuatro {
        //         transform-origin: center right;
        //         animation: spin4 3s linear infinite;
        //         animation-delay: .4s;
        //       }
              
        //       @keyframes spin {
        //         0% {
        //           transform: rotate(0deg);
        //         }
        //         25% {
        //           transform: rotate(360deg);
        //         }
        //         30% {
        //           transform: rotate(370deg);
        //         }
        //         35% {
        //           transform: rotate(360deg);
        //         }
        //         100% {
        //           transform: rotate(360deg);
        //         }
        //       }
              
        //       @keyframes spin2 {
        //         0% {
        //           transform: rotate(0deg);
        //         }
        //         20% {
        //           transform: rotate(0deg);
        //         }
        //         30% {
        //           transform: rotate(-180deg);
        //         }
        //         35% {
        //           transform: rotate(-190deg);
        //         }
        //         40% {
        //           transform: rotate(-180deg);
        //         }
        //         78% {
        //           transform: rotate(-180deg);
        //         }
        //         95% {
        //           transform: rotate(-360deg);
        //         }
        //         98% {
        //           transform: rotate(-370deg);
        //         }
        //         100% {
        //           transform: rotate(-360deg);
        //         }
        //       }
              
        //       @keyframes spin3 {
        //         0% {
        //           transform: rotate(0deg);
        //         }
        //         27% {
        //           transform: rotate(0deg);  
        //         }
        //         40% {
        //           transform: rotate(180deg);
        //         }
        //         45% {
        //           transform: rotate(190deg);
        //         }
        //         50% {
        //           transform: rotate(180deg);
        //         }
        //         62% {
        //           transform: rotate(180deg);
        //         }
        //         75% {
        //           transform: rotate(360deg);
        //         }
        //         80% {
        //           transform: rotate(370deg);
        //         }
        //         85% {
        //           transform: rotate(360deg);
        //         }
        //         100% {
        //           transform: rotate(360deg);
        //         }
        //       }
              
        //       @keyframes spin4 {
        //         0% {
        //           transform: rotate(0deg);
        //         }
        //         38% {
        //           transform: rotate(0deg);
        //         }
        //         60% {
        //           transform: rotate(-360deg);
        //         }
        //         65% {
        //           transform: rotate(-370deg);
        //         }
        //         75% {
        //           transform: rotate(-360deg);
        //         }
        //         100% {
        //           transform: rotate(-360deg);
        //         }
        //       }
        //       `;
        
        //     }
        const POSTData = (body) => {
            return fetch('./server.php', {
                method : 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(body)
            });
            // return new Promise((resolve, reject) => {
            //     const request = new XMLHttpRequest();
            //     request.addEventListener('readystatechange', () =>{
            //         // animateLoading();
            //         if(request.readyState !== 4){
            //             return;
            //         }
            //         if(request.status === 200){
                        
            //             return resolve();
            //         }else{
            //             return reject();
            //         }
            //     } );
            //     request.open('POST', './server.php');
            //     request.setRequestHeader('Content-Type', 'application/json');
            //     request.send(JSON.stringify(body));
            // });
        };
    }
    sendForm('form1');
    sendForm('form2');
    sendForm('form3');

});