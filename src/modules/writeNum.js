const writeNum = () => {
    const calcBlock = document.querySelector('.calc-block');
    calcBlock.addEventListener('input', (event) => {
        if(event.target.matches('.calc-square, calc-day, .calc-count')){
            event.value = event.value.replace(/[a-zA-Z]/g, '');
        }
        
    })
};
export default writeNum;
