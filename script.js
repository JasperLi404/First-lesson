const lang = prompt("en or ru?");
const ru = "Понидельник, Вторник, Среда, Четверг, Пятница, Субота, Воскресенье";
const en = 'Monday, Thursday, Wednesday, Tuesday, Friday, Suturday, Sunday';
const mistake = 'You made mistake. Reload page and try again';
if (lang == 'ru' || lang == 'Ru'){
    console.log(ru);
}
else if (lang == 'en' || lang == 'En'){
    console.log(en);
}
else {
    console.log(mistake);
}


switch(lang){
    case 'ru':
    case 'Ru': console.log(ru); break;
    case 'en':
    case 'En': console.log(en); break;
    default : console.log(mistake);
}



