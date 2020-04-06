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
        percentDeposit: 0,
        moneyDeposit: 0,
        mission: 500000,
        period: 10,
        budget: 0,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0,
        isNumber:  function(n){
            return !isNaN(parseFloat(n)) && isFinite(n);
        },
        asking: function(){
            let addExpenses,
                spending = 0,
                sum = [];
            money = prompt('Ваш месячный доход?');
            while(!appData.isNumber(money)){
                money = prompt('Ваш месячный доход?');
            }
            appData.budget = money;
            if(confirm('есть ли у вас дополнительный источник заработка?')){
                let itemIncome = prompt('Какой у вас дополнительный заработок?');
                while(appData.isNumber(itemIncome)){
                    itemIncome = prompt('Какой у вас дополнительный заработок?');
                }
                let cashIncome = prompt('Сколько зарабатываете?', 10000);
                while(!appData.isNumber(cashIncome)){
                    cashIncome = prompt('Сколько зарабатываете?', 10000);
                }
                appData.income[itemIncome]=cashIncome;
            }

        
            addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
            appData.addExpenses = addExpenses.toLowerCase().split(', ');
            let i =0;
            while(i < appData.addExpenses.length){
                let str = appData.addExpenses[i];
                str= str.charAt(0).toUpperCase() + str.slice(1);
                appData.addExpenses[i] = str;
                i++;
            }
            appData.addExpenses = appData.addExpenses.join(', ');
            appData.deposit = confirm("Есть ли у вас депозит в банке?");
            spending = appData.getExpensesMonth();
            for(let i = 0; i<2; i++){
                
                expensess[i]=prompt('Введите обязательную статью расходов?');
                while(appData.isNumber(expensess[i])){
                    expensess[i]=prompt('Введите обязательную статью расходов?');
                    
                }
                sum[i]=+prompt('Во сколько это обойдется?');
                while(!appData.isNumber(sum[i])){
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
        getinfoDeposit: function() {
            if(appData.deposit){
                appData.percentDeposit = prompt('Какой годовой процент?',10);
                while(!appData.isNumber(appData.percentDeposit)){
                    appData.percentDeposit =  prompt('Какой годовой процент?',10);
                }

                appData.moneyDeposit = prompt('Какая сума заложена?',10000);
                while(!appData.isNumber(appData.moneyDeposit)){
                    appData.moneyDeposit = prompt('Какая сума заложена?',10000);
                }
            }
        },
        calcSavedMoney: function() {
           return appData.budgetMonth * appData.period;
        }
    };
    



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
appData.getinfoDeposit();
console.log(appData.addExpenses);



