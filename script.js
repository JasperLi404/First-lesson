'use strict';
let books = document.querySelectorAll('.book'),
    aside = document.querySelector('.books'),
    adv = document.querySelector('.adv'),
    a = document.getElementsByTagName('a'),
    li3 = books[0].getElementsByTagName('li'),
    li5 = books[5].getElementsByTagName('li'),
    li6 = books[2].getElementsByTagName('li'),
    add = li6[5].cloneNode(true),
    i=0;
adv.remove();
console.log(add);
while(i<6){
    books[i].remove();
    i++;
}

aside.prepend(books[2]);
aside.prepend(books[5]);
aside.prepend(books[3]);
aside.prepend(books[4]);
aside.prepend(books[0]);
aside.prepend(books[1]);
a[2].textContent = 'Книга 3. this и Прототипы Объектов';
document.body.style.backgroundImage = "url('image/you-dont-know-js.jpg')";
i=0;

li3[1].after(li3[0]);
li3[1].after(li3[3]);
li3[6].after(li3[4]);
li3[5].after(li3[4]);
li3[4].after(li3[3]);
li3[8].after(li3[5]);
li3[7].after(li3[5]);
li3[6].after(li3[5]);
li3[5].after(li3[4]);
li3[7].after(li3[5]);
li3[6].after(li3[5]);
li3[8].after(li3[6]);
li3[7].after(li3[6]);
li3[8].after(li3[7]);
li3[9].after(li3[8]);


// console.log(li5[6]);
li5[9].after(li5[2]);
li5[8].after(li5[2]);
li5[7].after(li5[2]);
li5[6].after(li5[2]);
li5[5].after(li5[2]);
li5[4].after(li5[2]);
li5[3].after(li5[2]);
li5[8].after(li5[3]);
li5[7].after(li5[3]);
li5[6].after(li5[3]);
li5[5].after(li5[3]);
li5[4].after(li5[3]);
li5[9].after(li5[5]);
li5[8].after(li5[5]);
li5[7].after(li5[5]);
li5[6].after(li5[5]);
li5[5].after(li5[5]);
li5[7].after(li5[6]);
li5[8].after(li5[6]);
li5[7].after(li5[6]);
li5[8].after(li5[7]);
li5[9].after(li5[8]);

add.textContent = 'Глава 8: За пределами ES6';
books[2].append(add);

li6[10].after(li6[9]);

















