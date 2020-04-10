'use strict';

let startBtn = document.getElementById('start'),
    cancelBtn = document.getElementById('cancel'),
    addIncome = document.getElementsByTagName('button')[0],
    addExpen = document.getElementsByTagName('button')[1],
    checkbox = document.querySelector('#deposit-check'),
    extProfit = document.querySelectorAll('.additional_income-item'),
    AmountVal = document.querySelector('.result-total.budget_month-value'),
    BudDayVal = document.querySelector('.result-total.budget_day-value'),
    ExpenMonthVal = document.querySelector('.result-total.expenses_month-value'),
    AddIncomeVal = document.querySelector('.result-total.additional_income-value'),
    AddExpenVal = document.querySelector('.result-total.additional_expenses-value'),
    IncomePerVal = document.querySelector('.result-total.income_period-value'),
    TargetMonthVal = document.querySelector('.result-total.target_month-value'),
    salaryAm = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelectorAll('.income-title'),
    incomeAm = document.querySelectorAll('.income-amount'),
    addIncomeTitle = document.querySelector('.additional_income-title'),
    addIncomeAm = document.querySelector('.additional_income-amount'),
    expTitle = document.querySelectorAll('.expenses-title'),
    expAmount = document.querySelectorAll('.expenses-amount'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    addExpenItem = document.querySelector('.additional_expenses-item'),
    targAm = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    incomeItems = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.title.period-amount');
    // console.log(ExpenMonthVal);
    
    let accumulatedMonth = 0,
        expensess = [],
        expense = 0,
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
            incomeMonth: 0,
            period: 0,
            budget: 0,
            budgetDay: 0,
            budgetMonth: 0,
            expensesMonth: 0,
            blocked : function(event){
                // let testText = event.value;
                // if(testText*1 + 0  !==  event.value){
                //     event.value = testText.substring(-100, testText.length - 100);
                //     event.value = testText.substring(-100, testText.length - 100);
                //     event.textContent = ' ';
                if(startBtn.style.display === 'none'){
                    event.value = '';
                    event.preventDefault();
                }
                
            },
            afterBlock: function(){
                salaryAm.addEventListener('keypress',appData.blocked, false);
                incomeTitle.forEach(function(item){
                    item.addEventListener('keypress',appData.blocked, false);
                });
                incomeAm.forEach(function (item) {
                    item.addEventListener('keypress',appData.blocked, false);
                });
                expTitle.forEach(function (item) {
                    item.addEventListener('keypress',appData.blocked, false);  
                });
                expAmount.forEach(function (item) {
                    item.addEventListener('keypress',appData.blocked, false); 
                });
                incomeItems.forEach(function (item) {
                    item.addEventListener('keypress',appData.blocked, false); 
                });
                expensesItems.forEach(function(item){
                    item.addEventListener('keypress',appData.blocked, false);
                });
            },
            
            
            start: function(){
                if(salaryAm.value === ''){
                    alert('Ошибка!Поле " Месячный доход" должно быть заполнено');
                    return;
                }
                if(salaryAm.value !== ''){
                    startBtn.style.display = 'none';
                    cancelBtn.style.display = 'flex';                    
                }
                this.afterBlock();
                
                document.querySelector('.expenses-title').addEventListener('keypress',appData.blocked, false);
                document.querySelector('.expenses-amount').addEventListener('keypress',appData.blocked, false);
                addIncomeTitle.addEventListener('keypress',appData.blocked, false);
                addExpenItem.addEventListener('keypress',appData.blocked, false);
                // addIncomeAm.addEventListener('keypress',appData.blocked, false);
                targAm.addEventListener('keypress',appData.blocked, false);
                // salaryAm.addEventListener('keypress',appData.blocked, false);
                
                appData.budget = +salaryAm.value;
                appData.getExpenses();
                appData.getIncome();
                expense = appData.getExpensesMonth();
                appData.getAddExpenses();
                appData.getAddIncome();
                accumulatedMonth = appData.getBudget();
                appData.showResult();

            },
            showResult : function(){
                AmountVal.value = appData.budgetMonth;
                BudDayVal.value = Math.ceil(appData.budgetDay);
                ExpenMonthVal.value = appData.expensesMonth;
                AddExpenVal.value = appData.addExpenses.join(', ');
                AddIncomeVal.value = appData.addIncome.join(', ');
                TargetMonthVal.value = appData.getTargetMonth();
                IncomePerVal.value = appData.calcSavedMoney();


            },
            addExpensesBlock : function(){
                
                let cloneExpensesItem = expensesItems[0].cloneNode(true);
                for(let i = 0 ; i < cloneExpensesItem.childNodes.length;i++ ){
                    cloneExpensesItem.childNodes[i].value = '';
                }
                expensesItems[0].parentNode.insertBefore(cloneExpensesItem, addExpen);
                expensesItems = document.querySelectorAll('.expenses-items');
                if(expensesItems.length === 3){
                    addExpen.style.display = 'none';
                }
            },
            addIncomesBlock : function(){
                
                let cloneIncomeItem = incomeItems[0].cloneNode(true);
                
                for(let i = 0 ; i < cloneIncomeItem.childNodes.length;i++ ){
                    cloneIncomeItem.childNodes[i].value = '';
                }
                incomeItems[0].parentNode.insertBefore(cloneIncomeItem, addIncome);
                incomeItems = document.querySelectorAll('.income-items');
                if(incomeItems.length === 3){
                    addIncome.style.display = 'none';
                }
            },
            getExpenses: function(){    
                expensesItems.forEach(function(item){
                    let itemExpenses = item.querySelector('.expenses-title').value;
                    let cashExpenses = +item.querySelector('.expenses-amount').value;
                    
                    if(itemExpenses !== '' && cashExpenses !== ''){
                        appData.expenses[cashExpenses] = itemExpenses;
                    }

                })
            },
            getIncome: function(){
                
                incomeItems.forEach(function(item){
                    let itemIncomes = item.querySelector('.income-amount').value;
                    
                    if(itemIncomes !== ' '){
                        appData.income = itemIncomes;
                    }

                })
                for(let i in this.income){
                    appData.incomeMonth = +appData.income[i];
                }
            },
            getAddExpenses: function(){
                let addExpenses = addExpenItem.value.split(',');
                
                addExpenses.forEach(function(item) {
                    item = item.trim();
                    if(item !== ''){
                        appData.addExpenses.push(item);
                    }
                })
            },
            getAddIncome: function(){
                extProfit.forEach(function(item){
                    let itemVal = item.value.trim();
                    if(itemVal !== ''){
                        appData.addIncome.push(itemVal);
                    }
                })
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
                appData.budgetMonth = +appData.budget + +appData.incomeMonth - +expense;
                budgetDay = Math.floor( +appData.budgetMonth / 31);
                appData.budgetDay = +budgetDay;
                return appData.budgetMonth;
            },
            getTargetMonth: function () {
                appData.period = Math.ceil(targAm.value / accumulatedMonth);
                return appData.period;
                
            },
            // getStatusIncome: function () {
            //     if(budgetDay> 1200){
            //     return('У вас высокий уровень дохода');
            //     }
            //     else if(budgetDay > 600 && budgetDay < 1200){
            //         return('У вас средний уровень дохода');
            //     }
            //     else if(budgetDay < 600){
            //         return('К сожалению у вас уровень дохода ниже среднего');
            //     }
            //     else if(budgetDay <= 0){
            //         return('Что то пошло не так');
            //     }
            // },
            getinfoDeposit: function() {
                if(this.deposit){
                    this.percentDeposit = prompt('Какой годовой процент?',10);
                    this.moneyDeposit = prompt('Какая сума заложена?',10000);
                }
            },
            calcSavedMoney: function() {
               return appData.budgetMonth * appData.periodSpen;
            },
            selectPeriod: function(event){
                appData.periodSpen = +event.target.value ;
                periodAmount.textContent = event.target.value;
                if (appData.budgetMonth > 0){
                    IncomePerVal.value = appData.budgetMonth * appData.periodSpen;
                } 
            },
            cancel: function(){
                startBtn.style.display = 'block';
                cancelBtn.style.display = 'none';
                extProfit.forEach(function (item) {
                    item.value='';
                });
                salaryAm.value = '';
                addExpenItem.value = '';
                AmountVal.value = '';
                BudDayVal.value = '';
                ExpenMonthVal.value = '';
                AddIncomeVal.value = '';
                AddIncomeVal.value = '';
                AddExpenVal.value = '';
                IncomePerVal.value = '';
                TargetMonthVal.value = '';
                incomeTitle.value = '';
                addIncomeTitle.value = '';
                expTitle.value = '';
                expensesItems.value = '';
                addExpenItem.value = '';
                targAm.value = '';
                incomeItems.value = '';
                periodAmount.value = '';
                incomeItems.forEach(function(item){
                    let itemExpenses = item.querySelector('.income-title').value = '';
                    let cashExpenses = item.querySelector('.income-amount');
                    cashExpenses.value = '';
                })
                expensesItems.forEach(function(item){
                    let itemExpenses = item.querySelector('.expenses-title').value = '';
                    let cashExpenses = item.querySelector('.expenses-amount');
                    cashExpenses.value = '';
                })
                periodAmount.textContent = '1';
                periodSelect.value = '1';
            }
            
        };
    startBtn.addEventListener('click', appData.start);
    addExpen.addEventListener('click', appData.addExpensesBlock);
    addIncome.addEventListener('click', appData.addIncomesBlock);
    periodSelect.addEventListener('change', appData.selectPeriod);
    cancelBtn.addEventListener('click', appData.cancel);
    
    
    
    
    
    // console.log('Расходы за месяц:' + expense);
    // console.log(appData.getTargetMonth());
    // console.log(appData.getStatusIncome());
    // console.log('Наша программа включает в себя данные:');
    // for(let i in appData){  
    //     console.log( i + ' : ' + appData[i]);
    // }
    // console.log('addExpenses: ');
    // for(let i in appData.addExpenses){
    //     console.log( i + ' : ' + appData.addExpenses[i]);
    // }
    // console.log('expenses: ');
    
    for(let i in appData.expenses){
        console.log( i + ' : ' + appData.expenses[i]);
    }
    appData.getinfoDeposit();
    // console.log(appData.addExpenses);
    
    
    
    





