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
    periodAmount = document.querySelector('.title.period-amount'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');

    
    
    let accumulatedMonth = 0,
        expensess = [],
        expense = 0,
        budgetDay;

   
    class AppData{
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
            static rightSide = [];
            
            
            static isNum(n){
                return (!isNaN(parseFloat(n)) && isFinite(n));
            }
            static blocked(){
                if(startBtn.style.display === 'none'){
                  

                    salaryAm.setAttribute('disabled',true);
                    depositAmount.setAttribute('disabled',true);
                    depositPercent.setAttribute('disabled',true);
                    incomeTitle.forEach(function(item){
                        item.setAttribute('disabled',true);
                    });
                    incomeAm.forEach(function (item) {
                        item.setAttribute('disabled',true);
                    });
                    expTitle.forEach(function (item) {
                        item.setAttribute('disabled',true);
                    });
                    expAmount.forEach(function (item) {
                        item.disabled=true;
                    });
                    expensesItems = document.querySelectorAll('.expenses-items');
                    incomeItems = document.querySelectorAll('.income-items');
                    incomeItems.forEach(function (item) {
                        item.disabled=true;
                    });
                    expensesItems.forEach(function(item){
                        item.disabled=true;
                    });
                    document.querySelectorAll('.additional_income-item').forEach(function (item) {
                        item.setAttribute('disabled',true); 
                    });
                    checkbox.setAttribute('disabled',true);
                    periodSelect.setAttribute('disabled',true);
                    depositBank.setAttribute('disabled',true);
                    addIncome.setAttribute('disabled',true);
                    addExpen.setAttribute('disabled',true);
                    document.querySelector('.expenses-title').setAttribute('disabled',true);
                    document.querySelector('.expenses-amount').setAttribute('disabled',true);
                    addIncomeTitle.setAttribute('disabled',true);
                    addExpenItem.setAttribute('disabled',true);
                    targAm.setAttribute('disabled',true);
                }
            }
            static SetCookie(key,value){
                let cookieStr = key + ' ' + value;
                console.log(cookieStr);
                
                document.cookie = cookieStr;
            }
            static putData(){
                    document.cookie = 'isLoad = true';
                    localStorage.setItem('budgetMonth',AmountVal.value);
                    document.cookie = 'budgetMonth = ' + AmountVal.value;
                    localStorage.setItem('budgetDay',BudDayVal.value);
                    document.cookie = 'budgetDay = ' + BudDayVal.value;
                    localStorage.setItem('expensesMonth',ExpenMonthVal.value);
                    document.cookie = 'expensesMonth = ' + ExpenMonthVal.value;
                    localStorage.setItem('AddExpenses', AddExpenVal.value);
                    document.cookie = 'AddExpenses = ' + AddExpenVal.value;
                    localStorage.setItem('AddIncome', AddIncomeVal.value);
                    document.cookie = 'AddIncome = ' + AddIncomeVal.value;
                    localStorage.setItem('targetMonth', TargetMonthVal.value);
                    document.cookie = 'targetMonth = ' + TargetMonthVal.value;
                    localStorage.setItem('incomePeriod', IncomePerVal.value); 
                    document.cookie = 'incomePeriod = ' + IncomePerVal.value;

            }
            static start(){
                if(salaryAm.value === ''){
                    alert('Ошибка!Поле " Месячный доход" должно быть заполнено');
                    return;
                }
                if(salaryAm.value !== ''){
                    startBtn.style.display = 'none';
                    cancelBtn.style.display = 'block';                    
                }
                if(depositPercent.style.display === 'block'){
                    if(!this.isNum(depositPercent.value) || depositPercent.value > 100 || depositPercent.value < 0 ){                    
                    alert('Это не число или  оно не находится в диапазоне от 0 до 100');
                    return;
                    }
                }
                this.blocked();
                this.budget = +salaryAm.value;
                this.getExpInc();
                expense = this.expensesMonth;
                this.getAdd();
                this.getInfoDeposit();
                accumulatedMonth = this.getBudget();
                this.showResult();
                this.putData();
            }
            static loading(){
                if(localStorage.length>0){
                    startBtn.style.display = 'none';
                    cancelBtn.style.display = 'block';
                    this.blocked();
                    AmountVal.value = localStorage.getItem('budgetMonth');
                    BudDayVal.value = localStorage.getItem('budgetDay');
                    ExpenMonthVal.value = localStorage.getItem('expensesMonth');
                    AddExpenVal.value = localStorage.getItem('AddExpenses');
                    AddIncomeVal.value = localStorage.getItem('AddIncome');
                    TargetMonthVal.value = localStorage.getItem('targetMonth');
                    IncomePerVal.value = localStorage.getItem('incomePeriod') ;    
                } 
            }
            static showResult(){
                AmountVal.value = this.budgetMonth;
                BudDayVal.value = Math.ceil(this.budgetDay);
                ExpenMonthVal.value = this.expensesMonth;
                AddExpenVal.value = this.addExpenses.join(', ');
                AddIncomeVal.value = this.addIncome.join(', ');
                TargetMonthVal.value = this.getTargetMonth();
                IncomePerVal.value = this.calcSavedMoney();
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
                        place = this.addExpenses;
                    }
                    else{ 
                        str = item.value;   
                        place=this.addIncome;                     
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
                    this.expensesMonth += +this.expenses[key];
                 }
                
            }
            static getBudget(){
                const monthDeposit = Math.floor( this.moneyDeposit * (this.percentDeposit / 100));
                this.budgetMonth = this.budget + +this.incomeMonth - this.expensesMonth + monthDeposit;
                budgetDay = Math.floor( this.budgetMonth / 31);
                this.budgetDay = +budgetDay;
                return this.budgetMonth;
            }
            static getTargetMonth(){
                this.period = Math.ceil(targAm.value / accumulatedMonth);
                return this.period;
            }
            static getInfoDeposit(){
                if(this.deposit){
                    if(this.deposit){
                        this.percentDeposit = depositPercent.value;
                        this.moneyDeposit = depositAmount.value;
                    }
                }
            }
            static calcSavedMoney(){
                return this.budgetMonth * this.periodSpen;
            }
            static selectPeriod(){

               
                    this.periodSpen = +event.target.value ;
                    periodAmount.textContent = event.target.value;
                    if (this.budgetMonth > 0){
                        IncomePerVal.value = this.budgetMonth * this.periodSpen;
                    }
                
                
            }
            static getExpInc(){
                const count = item => {
                    const startStr = item.className.split('-')[0];  
                    const itemTitle = item.querySelector(`.${startStr}-title`).value;
                    const itemAmount = +item.querySelector(`.${startStr}-amount`).value;
                    if(itemTitle !== '' && itemAmount !== '' ){
                        this[startStr][itemTitle] = itemAmount;
                    }
                 }
                 incomeItems.forEach(count);
                 expensesItems.forEach(count);
                 for(const key in this.income){
                    this.incomeMonth += +this.income[key];
                    
                 }
                 for(const key in this.expenses){
                    this.expensesMonth += +this.expenses[key];
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
                localStorage.clear(); 
                    

                incomeItems.forEach(function(item){
                    let itemExpenses = item.querySelector('.income-title').value = '';
                    let cashExpenses = item.querySelector('.income-amount').value = '';
                })
                expensesItems.forEach(function(item){
                    let itemExpenses = item.querySelector('.expenses-title').value = '';
                    let cashExpenses = item.querySelector('.expenses-amount').value = '';
                    
                })
                periodAmount.textContent = '1';
                periodSelect.value = '1';
                
                
                        salaryAm.disabled = false;
                        
                        depositAmount.disabled = false;
                        depositPercent.disabled = false;
                        incomeTitle.forEach(function(item){
                            item.disabled = false;
                        });
                        incomeAm.forEach(function (item) {
                            item.disabled = false;
                        });
                        expTitle.forEach(function (item) {
                            item.disabled = false;
                        });
                        expAmount.forEach(function (item) {
                            item.disabled = false;
                        });
                        incomeItems.forEach(function (item) {
                            item.disabled = false;
                        });
                        expensesItems.forEach(function(item){
                            item.disabled = false;
                        });
                        document.querySelectorAll('.additional_income-item').forEach(function (item) {
                            item.disabled = false; 
                        });
                        checkbox.disabled = false;
                        periodSelect.disabled = false;
                        depositBank.disabled = false;
                        addIncome.disabled = false;
                        addExpen.disabled = false;
                        document.querySelector('.expenses-title').disabled = false;
                        document.querySelector('.expenses-amount').disabled = false;
                        addIncomeTitle.disabled = false;
                        addExpenItem.disabled = false;
                        targAm.disabled = false;
               
            }
            static changePercent(){
                const selectValue = this.value;
                if(selectValue === 'other' ){
                    depositPercent.style.display = 'inline-block';
                    
                    
                } else{
                    depositPercent.style.display = 'none';
                    depositPercent.value =  selectValue;
                }
                
            }
            static depositHandler(){
                if( startBtn.style.display == 'none'){

                }
                if(checkbox.checked){
                    depositBank.style.display =  'inline-block';
                    depositAmount.style.display =  'inline-block';
                    this.deposit = true;
                    depositBank.addEventListener('change',  this.changePercent);
                }
                else{
                    depositBank.style.display =  'none';
                    depositAmount.style.display =  'none';
                    depositBank.value = '';
                    depositAmount.value = '';
                    this.deposit = false;
                    depositBank.removeEventListener('change',  this.changePercent);
                }
            }
            static eventListeners(){                
                startBtn.addEventListener('click', this.start.bind(this));
                addExpen.addEventListener('click', this.addBlocks.bind(this));
                addIncome.addEventListener('click', this.addBlocks.bind(this));
                periodSelect.addEventListener('change', this.selectPeriod.bind(this));
                cancelBtn.addEventListener('click', this.cancel.bind(this));
                checkbox.addEventListener('change', this.depositHandler.bind(this));
                // cancelBtn.addEventListener('click', this.blocked.bind(this));

            }
        }
AppData.loading();
AppData.eventListeners();
 
    
    
    





