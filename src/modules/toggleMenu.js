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
        document.documentElement.scrollTop += 20;
        if(document.documentElement.scrollTop > sum){
            cancelAnimationFrame(interval);
        }
    }
    window.addEventListener('click', (event) => {
        event.preventDefault();
        let target = event.target;    
        if(menu.classList.contains('active-menu') && !target.closest('menu')){
            handlerMenu();
        } else if(target.closest('main')){
            if(target.closest('.menu')) handlerMenu();
            else if (target.closest('a>img')) {
                sum = 888;
                animateScroll();
            }
        }
        else if(target.closest('menu')){
            if(target.className === 'close-btn') handlerMenu();
            else if(target.closest('ul>li>a')){
            handlerMenu();
            
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
export default toggleMenu;