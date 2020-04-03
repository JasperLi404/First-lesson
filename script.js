'use strict';
let total=0,
    appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 500000,
    period: 10,
    asking: function(){
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm("Есть ли у вас депозит в банке?");
        let spending=0;
        for(let i = 0; i<2; i++){
            let sum=[];
            expensess[i]=prompt('Введите обязательную статью расходов?');
            sum[i]=prompt('Во сколько это обойдется?');
            while(!isNumber(sum[i])){
                sum[i]=prompt('Во сколько это обойдется?');
            }
            spending+=+sum[i];
            appData.expenses[expensess[i]] = sum[i];           
        }
        appData.expensesMonth=spending;
        return spending;
    },
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
},
    money,
    isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
},
    start = () => {
    money = prompt('Ваш месячный доход?');
    while(!isNumber(money)){
        money = prompt('Ваш месячный доход?');
    }
    appData.budget = money;
    
};
start();

let expensess = [],
    expense = appData.asking(),
    getAccumulatedMonth = () =>{
    appData.budgetMonth = money - expense;
    return money - expense;
},
    accumulatedMonth = getAccumulatedMonth(),
    getTargetMonth = () => {
        appData.period = Math.ceil(appData.mission  / accumulatedMonth);
        if (appData.period<0){
            console.log('Цель не будет достигнута ' + appData.period + ' месяцев');
        }
        else{
            console.log('Цель будет достигнута ' + appData.period + ' месяцев');
        }
};

const budgetDay = Math.floor( accumulatedMonth/ 31);
appData.budgetDay = budgetDay;
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

console.log('Расходы за месяц:' + expense);
getTargetMonth();
console.log(getStatusIncome());

console.log('Наша программа включает в себя данные:');
for(let i in appData){
    
    console.log( i + ' ' + appData[i]);
}
for(let i in appData.addExpenses){
    console.log( i + ' ' + appData.addExpenses[i]);

}
for(let i in appData.expenses){
    console.log( i + ' ' + appData.expenses[i]);

}

