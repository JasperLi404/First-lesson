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

   
    class AppData{
            static _this=this;
            static income =  {};
            static addIncome =  [];
            static expenses =  {};
            static addExpenses =  [];
            static deposit =  false;
            static percentDeposit =  0;
            static moneyDeposit =  0;
            static mission =  500000;
            static incomeMonth =  0;
            static expensesMonth =  0;
            static period =  0;
            static budget =  0;
            static budgetDay = 0;
            static budgetMonth = 0;
            static blocked(){
                if(startBtn.style.display === 'none'){
                    event.value = '';
                    event.preventDefault();
                } 
            }
            static afterBlock(){
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
            }
            static start(){
                
                if(salaryAm.value === ''){
                    alert('Ошибка!Поле " Месячный доход" должно быть заполнено');
                    return;
                }
                if(salaryAm.value !== ''){
                    startBtn.style.display = 'none';
                    cancelBtn.style.display = 'flex';                    
                }
                console.log(_this);
                
                _this.afterBlock();
                _this.budget = +salaryAm.value;
                _this.getExpInc();
                expense = _this.expensesMonth;
                _this.getAdd();
                accumulatedMonth = _this.getBudget();
                _this.showResult();
            }
            static showResult(){
            AmountVal.value = _this.budgetMonth;
            BudDayVal.value = Math.ceil(_this.budgetDay);
            ExpenMonthVal.value = _this.expensesMonth;
            AddExpenVal.value = _this.addExpenses.join(', ');
            AddIncomeVal.value = _this.addIncome.join(', ');
            TargetMonthVal.value = _this.getTargetMonth();
            IncomePerVal.value = _this.calcSavedMoney();
            }
            
            static addBlocks(item){
                const startStr = item.toElement.parentNode;
                let itemItems = startStr.querySelectorAll(`.${startStr.className}-items`);
                const cloneItem = itemItems[0].cloneNode(true);
                for(let i = 0 ; i < cloneItem.childNodes.length;i++ ){
                cloneItem.childNodes[i].value = '';
                }
                itemItems[0].parentNode.insertBefore(cloneItem, item.toElement);
                itemItems = document.querySelectorAll(`.${startStr.className}-items`);
                if(itemItems.length === 3){
                    item.toElement.style.display = 'none';
                }
              
                

            }
            
            static getAdd(){
                

                let addExpenses = addExpenItem.value.split(',');
                const countAdd = item => {
                    let str ='';
                    let place;
                    if(typeof(item.value) === "undefined") {
                        str = item;
                        place = _this.addExpenses;
                    }
                    else{ 
                        str = item.value;   
                        place=_this.addIncome;                     
                    }
                    str = str.trim();
                    if(str !== ''){
                        place.push(str);
                    }
                }


                addExpenses.forEach(countAdd);
                extProfit.forEach(countAdd);
                
            }
            static getExpensesMonth(){
               
                for(const key in _this.expenses){
                    _this.expensesMonth += +_this.expenses[key];
                 }
                
            }
            static getBudget(){
                _this.budgetMonth = _this.budget + +_this.incomeMonth - _this.expensesMonth;
                // console.log(expense);
                budgetDay = Math.floor( _this.budgetMonth / 31);
                _this.budgetDay = +budgetDay;
                return _this.budgetMonth;
            }
            static getTargetMonth(){
                _this.period = Math.ceil(targAm.value / accumulatedMonth);
                return _this.period;
            }
            static getinfoDeposit(){
                if(_this.deposit){
                    _this.percentDeposit = prompt('Какой годовой процент?',10);
                    _this.moneyDeposit = prompt('Какая сума заложена?',10000);
                }
            }
            static calcSavedMoney(){
                return _this.budgetMonth * _this.periodSpen;
            }
            static selectPeriod(){
                _this.periodSpen = +event.target.value ;
                periodAmount.textContent = event.target.value;
                if (_this.budgetMonth > 0){
                    IncomePerVal.value = _this.budgetMonth * _this.periodSpen;
                } 
            }
            static getExpInc(){
                const count = item => {
                    const startStr = item.className.split('-')[0];                   
                    const itemTitle = item.querySelector(`.${startStr}-title`).value;
                    const itemAmount = +item.querySelector(`.${startStr}-amount`).value;
                    if(itemTitle !== '' && itemAmount !== '' ){
                        _this[startStr][itemTitle] = itemAmount ;
                    }
                 }
                 incomeItems.forEach(count);
                 expensesItems.forEach(count);
                 for(const key in _this.income){
                    _this.incomeMonth += +_this.income[key];
                    
                 }
                 for(const key in _this.expenses){
                    _this.expensesMonth += +_this.expenses[key];
                 }
                

            }
            static cancel(){
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
                incomeItems = document.querySelectorAll('.income-items');
                expensesItems = document.querySelectorAll('.expenses-items');

                incomeItems.forEach(function(item){
                    let itemExpenses = item.querySelector('.income-title').value = '';
                    let cashExpenses = item.querySelector('.income-amount').value = '';
                    // cashExpenses.value = '';
                })
                expensesItems.forEach(function(item){
                    let itemExpenses = item.querySelector('.expenses-title').value = '';
                    let cashExpenses = item.querySelector('.expenses-amount').value = '';
                    
                })
                periodAmount.textContent = '1';
                periodSelect.value = '1';
            }
            static eventListeners(){
                console.log('click');
                
                startBtn.addEventListener('click', this.start);
                addExpen.addEventListener('click', this.addBlocks);
                addIncome.addEventListener('click', this.addBlocks);
                periodSelect.addEventListener('change', this.selectPeriod);
                cancelBtn.addEventListener('click', this.cancel);
            }
        }
    const _this=AppData;
   AppData.eventListeners();
 
    
    
    





