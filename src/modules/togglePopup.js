const togglePopup = () => {
    const popup = document.querySelector('.popup'),
    popupBtn = document.querySelectorAll('.popup-btn'),
    popupContent = popup.querySelector('.popup-content');
    let count = -560;
    let interval;
    const animate = () => {
        if(popupContent.style.display == 'none'){
            cancelAnimationFrame(interval);
            count = -560;
            popupContent.style.marginLeft = `-560px`;
        }
        interval = requestAnimationFrame(animate);
        if(count < 0){
            count += 20;
            popupContent.style.marginLeft = `${count}px`;
        } else{
            cancelAnimationFrame(interval);
            count = -560;
            console.log(true);
        }

    }
    popupBtn.forEach((elem) => {
        elem.addEventListener('click', () => {
            popup.style.display = 'block';
            if(popup.clientWidth > 768){
                let count = -560;
                popupContent.style.marginLeft = `-560px`;
                animate();
            }
        })
    });

    popup.addEventListener('click', () => {
        let target = event.target;
        if(target.classList.contains('popup-close')){
            popup.style.display = 'none';
        } else{
            target = target.closest('.popup-content');
            if(!target){
                popup.style.display = 'none';
            }
        }
        
    });
}
export default togglePopup;