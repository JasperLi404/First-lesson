let num = 266219;
num = String(num).split('');
let len = num.length;
let i=0;
let Dob = 1;
while(i<len){
    Dob *= num[i];
    i++;
}
console.log(Dob);
let pow = Dob
let n = 3;
while(--n){
    pow*=Dob;
}
pow = String(pow);
pow = pow.substr(0,2);
console.log(pow);
