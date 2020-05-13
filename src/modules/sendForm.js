const sendForm = (id) => {
    const errorMessage  = 'Что то пошло не так...',
        successMessage = "Спасибо! Мы скоро с Вами свяжемся";
    const form = document.getElementById(id);    

    const statusMessage = document.createElement('div');
    form.appendChild(statusMessage);
    if(form.id == 'form3'){
      statusMessage.style.color = '#fff';
    }
    form.addEventListener('input', (event) => {
        let target = event.target;
        if(target.className == 'form-phone' || target.classList.contains('form-phone')){
            let val = target.value.replace(/(\D|[a-zA-ZА-Яа-я])/g, '');
            target.value ='+'+ val;
        }
        if(target.classList.contains('form-email')){
          target.value = target.value.replace(/[а-яА-я]/,'');
        }
        if(target.className == 'form-name' || target.className == 'mess' || target.className == 'top-form'){
            target.value = target.value.replace(/[a-zA-Z0-9]/g, '');
        }
    });
    form.querySelector('.form-btn').addEventListener('click', event => {
        event.preventDefault();      
        
        form.appendChild(statusMessage);
        const formData = new FormData(form);
        let body = {};
        formData.forEach((val,key) => {
            body[key] = val;
        });
        statusMessage.textContent = 'Загрузка...';
        POSTData(body)
        .then((response) => {
            if(response.status !== 200){
                throw new Error('network status isn`t 200');
            }
            statusMessage.textContent = successMessage;
            setTimeout(() => statusMessage.parentNode.removeChild(statusMessage), 3000);
            clearInput();
        })
        .catch(() => {
            statusMessage.textContent = errorMessage;
            setTimeout(() => statusMessage.parentNode.removeChild(statusMessage), 3000);
            clearInput();
        });

    });
    const clearInput = () => {
        const elementsForm = [...form.elements].filter(item => {
            return item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
        });
        elementsForm.forEach(item => item.value = '');
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
    };
}
export default sendForm;