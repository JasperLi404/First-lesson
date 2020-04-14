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
    
    
    let accumulatedMonth = 0,
        expensess = [],
        expense = 0,
        budgetDay;

   
    const AppData = function(){
            this.income =  {};
            this.addIncome =  [];
            this.expenses =  {};
            this.addExpenses =  [];
            this.deposit =  false;
            this.percentDeposit =  0;
            this.moneyDeposit =  0;
            this.mission =  500000;
            this.incomeMonth =  0;
            this.period =  0;
            this.budget =  0;
            this.budgetDay = 0;
            this.budgetMonth = 0;
            
    };
    AppData.prototype.blocked = function(){
        if(startBtn.style.display === 'none'){
            event.value = '';
            event.preventDefault();
        }
    };
    AppData.prototype.afterBlock = function() {
        const _this = this;
        console.log(this);
        salaryAm.addEventListener('keypress',_this.blocked, false);
                incomeTitle.forEach(function(item){
                    item.addEventListener('keypress', _this.blocked, false);
                });
                incomeAm.forEach(function (item) {
                    item.addEventListener('keypress', _this.blocked, false);
                });
                expTitle.forEach(function (item) {
                    item.addEventListener('keypress', _this.blocked, false);  
                });
                expAmount.forEach(function (item) {
                    item.addEventListener('keypress', _this.blocked, false); 
                });
                incomeItems.forEach(function (item) {
                    item.addEventListener('keypress', _this.blocked, false); 
                });
                expensesItems.forEach(function(item){
                    item.addEventListener('keypress', _this.blocked, false);
                });
                document.querySelectorAll('.additional_income-item').forEach(function (item) {
                    item.addEventListener('keypress', _this.blocked, false); 
                });
        document.querySelector('.expenses-title').addEventListener('keypress',_this.blocked, false);
        document.querySelector('.expenses-amount').addEventListener('keypress',_this.blocked, false);
        addIncomeTitle.addEventListener('keypress',_this.blocked, false);
        addExpenItem.addEventListener('keypress',_this.blocked, false);
        targAm.addEventListener('keypress',_this.blocked, false);
    };
    const _this = this;
    AppData.prototype.start = function() {
        if(salaryAm.value === ''){
            alert('Ошибка!Поле " Месячный доход" должно быть заполнено');
            return;
        }
        if(salaryAm.value !== ''){
            startBtn.style.display = 'none';
            cancelBtn.style.display = 'flex';                    
        }
        console.log(this);
        
        
        appData.afterBlock();
        
        
        // salaryAm.addEventListener('keypress',appData.blocked, false);
        console.log(salaryAm.value);
        
        
        appData.budget = +salaryAm.value;
        appData.getExpenses();
        appData.getIncome();
        expense = appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        accumulatedMonth = appData.getBudget();
        appData.showResult();
    };
   
    AppData.prototype.showResult = function(){
        AmountVal.value = +this.budgetMonth;
        BudDayVal.value = Math.ceil(this.budgetDay);
        ExpenMonthVal.value = this.expensesMonth;
        AddExpenVal.value = this.addExpenses.join(', ');
        AddIncomeVal.value = this.addIncome.join(', ');
        TargetMonthVal.value = this.getTargetMonth();
        IncomePerVal.value = this.calcSavedMoney();
    };
    AppData.prototype.addExpensesBlock = function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
                for(let i = 0 ; i < cloneExpensesItem.childNodes.length;i++ ){
                    cloneExpensesItem.childNodes[i].value = '';
                }
                expensesItems[0].parentNode.insertBefore(cloneExpensesItem, addExpen);
                expensesItems = document.querySelectorAll('.expenses-items');
                if(expensesItems.length === 3){
                    addExpen.style.display = 'none';
                }
    };

    AppData.prototype.addIncomesBlock = function(){
                
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        
        for(let i = 0 ; i < cloneIncomeItem.childNodes.length;i++ ){
            cloneIncomeItem.childNodes[i].value = '';
        }
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, addIncome);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            addIncome.style.display = 'none';
        }
    };
    AppData.prototype.getExpenses= function(){    
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = +item.querySelector('.expenses-amount').value;
            
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[cashExpenses] = itemExpenses;
            }

        })
    };
    AppData.prototype.getIncome= function(){
        
        incomeItems.forEach(function(item){
            let itemIncomes = item.querySelector('.income-amount').value;
            
            if(itemIncomes !== ' '){
                _this.income = itemIncomes;
            }

        })
        for(let i in this.income){
            this.incomeMonth = +appData.income[i];
        }
    };
    AppData.prototype.getAddExpenses= function(){
        let addExpenses = addExpenItem.value.split(',');
        
        addExpenses.forEach(function(item) {
            item = item.trim();
            if(item !== ''){
                appData.addExpenses.push(item);
            }
        })
    };
    AppData.prototype.getAddIncome= function(){
        extProfit.forEach(function(item){
            let itemVal = item.value.trim();
            if(itemVal !== ''){
                appData.addIncome.push(itemVal);
            }
        })
    }; 
    AppData.prototype.getExpensesMonth = function () {
        let spending = 0;
        for (let i in appData.expenses){
            spending += +i;
        }
        this.expensesMonth=+spending;
        return spending;
    };
    
    AppData.prototype.getBudget = function () {
        this.budgetMonth = +this.budget + +this.incomeMonth - +expense;
        budgetDay = Math.floor( this.budgetMonth / 31);
        this.budgetDay = +budgetDay;
        return this.budgetMonth;
    };
    AppData.prototype.getTargetMonth= function () {
        this.period = Math.ceil(targAm.value / accumulatedMonth);
        return this.period;
        
    };
    AppData.prototype.getinfoDeposit= function() {
        if(this.deposit){
            this.percentDeposit = prompt('Какой годовой процент?',10);
            this.moneyDeposit = prompt('Какая сума заложена?',10000);
        }
    };
    AppData.prototype.calcSavedMoney= function() {
      let calcul= appData.budgetMonth * appData.periodSpen;       
       return calcul;

       
    };
    AppData.prototype.selectPeriod= function(event){
        appData.periodSpen = +event.target.value ;
        periodAmount.textContent = event.target.value;
        if (appData.budgetMonth > 0){
            IncomePerVal.value = appData.budgetMonth * appData.periodSpen;
        } 
    };
    AppData.prototype.cancel= function(){
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
    };
     
    AppData.prototype.eventListeners = function(){
    
        startBtn.addEventListener('click', appData.start);
        addExpen.addEventListener('click', appData.addExpensesBlock);
        addIncome.addEventListener('click', appData.addIncomesBlock);
        periodSelect.addEventListener('change', appData.selectPeriod);
        cancelBtn.addEventListener('click', appData.cancel);
    }
    const appData = new AppData();    
    console.log(appData);
     appData.eventListeners();
 
    
    
    





