'use strict';

import 'nodelist-foreach-polyfill';
import 'fetch-polyfill';
import 'formdata-polyfill';
var Promise = require('es6-promise').Promise;

import '@babel/polyfill';
import elementClosest from 'element-closest';
elementClosest(window);


import  countTimer from './modules/countTimer.js';
import  toggleMenu from './modules/toggleMenu.js';
import  togglePopup from './modules/togglePopup.js';
import  tabs from './modules/tabs.js';
import  slider from './modules/slider.js';
import  changeFace from './modules/changeFace.js';
import  writeNum from './modules/writeNum.js';
import  calculator from './modules/calculator.js';
import  sendForm from './modules/sendForm.js';


window.addEventListener('DOMContentLoaded', () => {
    // timer
    countTimer();
    // menu   
    toggleMenu();
    // popup
    
    togglePopup();
    // tabs    
    tabs();
    //slider
    slider();
    //on hover change photo
    changeFace();
    // in input wrte just numbers
    writeNum();
    // calculator
    calculator(100);
    // send ajax form
    sendForm('form1');
    sendForm('form2');
    sendForm('form3');
});