const money = 3550;
const income = 'фриланс';
const addExpenses = 'Кофе, Интернет, Комуналка';
const deposit = false;
const mission = 454000;
const period = 8;
const budgetDay = money/30;

console.log(typeof money, typeof income,typeof deposit);
console.log(addExpenses.length);
console.log('Период равен' + ' ' + period + ' ' + 'месяцев');
console.log('Цель заработать' + ' ' + mission + ' ' +  'рублей');
console.log(addExpenses.toLowerCase().split(', '))
console.log(Math.round(budgetDay));






