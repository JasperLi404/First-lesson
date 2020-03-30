'use strict';

const money = +prompt('Ваш месячный доход?');
const income = 'фриланс';
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую').split(', ');
const deposit = confirm("Есть ли у вас депозит в банке?");
const expenses1 = prompt('Введите обязательную статью расходов?');
const amount1 = +prompt('Во сколько это обойдется?') 
const expenses2 = prompt('Введите обязательную статью расходов?');
const amount2 = +prompt('Во сколько это обойдется?') ;
const budgetMonth = money - amount1 - amount2;
const mission = 454000;
const period = 8;
const budgetDay = Math.floor(budgetMonth / 31);


console.log(typeof money, typeof income,typeof deposit);
console.log(addExpenses.length);
console.log('Период равен' + ' ' + period + ' ' + 'месяцев');
console.log('Цель заработать' + ' ' + mission + ' ' +  'рублей');
console.log(addExpenses);


console.log('Цель будет достигнута за:' + Math.ceil(mission  / budgetMonth));
console.log('Бюджет на день:' + budgetDay);




console.log('Бюджет на месяц:' + Math.round(budgetMonth));

if(budgetDay> 1200){
    console.log('У вас высокий уровень дохода');
}
else if(budgetDay > 600 && budgetDay < 1200){
    console.log('У вас средний уровень дохода');
}
else if(budgetDay < 600){
    console.log('К сожалению у вас уровень дохода ниже среднего');
}
else if(budgetDay <= 0){
    console.log('Что то пошло не так');
}