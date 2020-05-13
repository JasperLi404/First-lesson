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
export default changeFace;