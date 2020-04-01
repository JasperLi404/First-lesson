'use strict';
let isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
let money;
const income = 'фриланс';
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую').split(', ');
const deposit = confirm("Есть ли у вас депозит в банке?");
let expenses = [];
const start = () => {
    money = prompt('Ваш месячный доход?');
    do{
        money = prompt('Ваш месячный доход?');
    }while(!isNumber(money));
    
}
start();
const mission = 454000;
const period = 8;
const getExpensesMonth = () => {
    let sum = 0;

    for(let i = 0; i<2; i++){
        expenses[i]= prompt('Введите обязательную статью расходов?');
        sum+= prompt('Во сколько это обойдется?');
        do{
            sum+= prompt('Во сколько это обойдется?');
        }while(!isNumber(sum))
       

    }

    return  sum;
};
const expense = getExpensesMonth();
const showTypeOf = data => {
    console.log(data,typeof(data));
};
const getAccumulatedMonth = () =>{
    return money - expense;
};
const accumulatedMonth = getAccumulatedMonth();
const getTargetMonth = () => {
    let period = Math.ceil(mission  / accumulatedMonth);
    if (period<0){
        console.log('Цель не будет достигнута' + period + 'месяцев');
    }
    else{
        console.log('Цель будет достигнута' + period + 'месяцев');
    }
};

const budgetDay = Math.floor( accumulatedMonth/ 31);


showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log(addExpenses);
console.log('Расходы за месяц:' + expense);
getTargetMonth();



// console.log('Цель будет достигнута за:' + getTargetMonth());
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

