'use strict' 
let money,
    accumulatedMonth,
    expensess = [],
    expense,
    budgetDay,
    appData = {
        income: {},
        addIncome: [],
        expenses: {},
        addExpenses: [],
        deposit: false,
        mission: 500000,
        period: 10,
        budget: 0,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0,
        asking: function(){
            let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
                spending = 0,
                sum = [];
            appData.addExpenses = addExpenses.toLowerCase().split(', ');
            appData.deposit = confirm("Есть ли у вас депозит в банке?");
            spending = appData.getExpensesMonth();
            for(let i = 0; i<2; i++){
                
                expensess[i]=prompt('Введите обязательную статью расходов?');
                sum[i]=+prompt('Во сколько это обойдется?');
                while(!isNumber(sum[i])){
                    sum[i]=+prompt('Во сколько это обойдется?');
                    
                }
                appData.expenses[sum[i]] = expensess[i];
                      
            }
        },
        getExpensesMonth : function () {
            let spending = 0;
            for (let i in appData.expenses){
                spending += +i;
            }
            appData.expensesMonth=+spending;
            return spending;
        },
        
        getBudget : function () {
            appData.budgetMonth = money - expense;
            budgetDay = Math.floor( appData.budgetMonth / 31);
            appData.budgetDay = budgetDay;
            return appData.budgetMonth;
        },
        getTargetMonth: function () {
            appData.period = Math.ceil(appData.mission  / accumulatedMonth);
            if (appData.period<0){
                return('Цель не будет достигнута ' + appData.period + ' месяцев');
            }
            else{
                return('Цель будет достигнута ' + appData.period + ' месяцев');
            }
        },
        getStatusIncome: function () {
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
        },
    };
    

const isNumber = (n) => {
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
appData.asking();
expense = appData.getExpensesMonth();
accumulatedMonth = appData.getBudget();

console.log('Расходы за месяц:' + expense);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
console.log('Наша программа включает в себя данные:');
for(let i in appData){  
    console.log( i + ' : ' + appData[i]);
}
console.log('addExpenses: ');
for(let i in appData.addExpenses){
    console.log( i + ' : ' + appData.addExpenses[i]);
}
console.log('expenses: ');

for(let i in appData.expenses){
    console.log( i + ' : ' + appData.expenses[i]);
}

