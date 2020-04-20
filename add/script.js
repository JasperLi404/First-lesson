'use strict';
const hi = document.querySelector('.hi'),
      today = document.querySelector('.today'),
      now = document.querySelector('.now'),
      nY = document.querySelector('.New-Year');
const sayHello = () => {
    let hours = new Date().getHours();
    if(hours > 5 && hours < 12){
        return 'Доброе утро';
    }
    else if(hours > 12 && hours < 17){
        return "Добрый день";
    }
    else if (hours > 17 && hours < 20){
        return 'Добрый вечер';
    }
    else {
        return 'Доброй ночи';
    }
};
const toDay = () => {
    const day = new Date().getDay();
    switch(day){
        case 0: return 'Воскресенье'; break;
        case 1: return 'Понидельник'; break;
        case 2: return 'Вторник'; break;
        case 3: return 'Среда'; break;
        case 4: return 'Четверг'; break;
        case 5: return 'Пятница'; break;
        case 6: return 'Субота'; break;
    }
}
const time = () => {
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const seconds = new Date().getSeconds();
    if (hours > 12){
        return hours - 12 + ':' + minutes + ':' + seconds + ' PM';
    } else{
        return hours + ':' + minutes + ':' + seconds + ' AM';

    }
}

const newYear = () => {
    const date = new Date().getTime();
    const remaining = new Date('1 january 2021').getTime();
    const count = (remaining - date) / 1000;
    let days = Math.floor(count / 60 / 60 / 24);
    return days;

}



hi.textContent = sayHello();
now.textContent = 'Текущее время: ' + time();
today.textContent = 'Сегодня: ' + ' ' + toDay();
nY.textContent = 'До нового года осталось ' + newYear() + ' дней';