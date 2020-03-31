'use strict';

const money = +prompt('Ваш месячный доход?');
const income = 'фриланс';
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую').split(', ');
const deposit = confirm("Есть ли у вас депозит в банке?");
const expenses1 = prompt('Введите обязательную статью расходов?');
const amount1 = +prompt('Во сколько это обойдется?') 
const expenses2 = prompt('Введите обязательную статью расходов?');
const amount2 = +prompt('Во сколько это обойдется?') ;
const mission = 454000;
const period = 8;
const getExpensesMonth = (elem1, elem2) => {
    return  elem1 + elem2;
};
const expense = getExpensesMonth(amount1, amount2);
const showTypeOf = data => {
    console.log(data,typeof(data));
};
const getAccumulatedMonth = () =>{
    return money - expense;
};
const accumulatedMonth = getAccumulatedMonth();
const getTargetMonth = () => {
    return  Math.ceil(mission  / accumulatedMonth);
};

const budgetDay = Math.floor( accumulatedMonth/ 31);


showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log(addExpenses);
console.log('Расходы за месяц:' + getExpensesMonth(amount1, amount2));

// console.log('Период равен' + ' ' + period + ' ' + 'месяцев');
// console.log('Цель заработать' + ' ' + mission + ' ' +  'рублей');



console.log('Цель будет достигнута за:' + getTargetMonth());
console.log('Бюджет на день:' + budgetDay);
const getStatusIncome = () =>{
    if(budgetDay> 1200){
        return('У вас высокий уровень дохода');
}
else if(budgetDay > 600 && budgetDay < 1200){
    return('У вас средний уровень дохода');
}
else if(budgetDay < 600){
    return('К сожалению у вас уровень дохода ниже среднего');
}
else if(budgetDay <= 0){
    return('Что то пошло не так');
}
};

console.log(getStatusIncome());

