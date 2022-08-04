const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const firstOperationScreen = document.querySelector('.first-screen');
const lastOperationScreen = document.querySelector('.second-screen');
const deleteBtn = document.querySelector('.backspace');
const cleanBtn = document.querySelector('.clean');
const equalBtn = document.querySelector('.equal');

let firstNumber = '';
let lastNumber = null;
let operation = '';
let shouldResetScreen = false;

function operate (firstNumber, operator, secondNumber) {
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);

    if (operator === '+') return firstNumber + secondNumber;
    if (operator === '-') return firstNumber - secondNumber;
    if (operator === '*') return firstNumber * secondNumber;
    if (operator === '/') return firstNumber / secondNumber;
}

function setNumber(number) {
    //After user finished typing numbers, they could become smaller, and if
    //user presses an operator and continuous typing the numbers will start
    //not from font-size 39 or 34 but from the font-size they got to. This 
    //if statement prevents it.
    if (shouldResetScreen) {
        firstOperationScreen.style.fontSize = '39';
        if (window.innerWidth < 389)
        firstOperationScreen.style.fontSize = '34';
    }
    if (shouldResetScreen || firstOperationScreen.textContent === '0') resetScreen();
    if (firstOperationScreen.textContent.length === 21) return;
    //If there is already coma and you continue typing it throws NaN removing
    //come on this stage allows to continue typing
    removeComa();
    firstOperationScreen.textContent += number;
    addComa();
    if (firstOperationScreen.textContent.length >= 10) makeNumbersSmaller();
}

function setOperator(operator) {
    if (operation !== '') calculate();
    operation = operator;
    //If there is already coma and you continue typing it throws NaN removing
    //come on this stage allows to continue typing
    removeComa();
    firstNumber = firstOperationScreen.textContent;
    addComa();
    lastOperationScreen.textContent = `${firstNumber} ${operation}`;
    //shouldResetScreen is used in setNumber to check if it needs to refresh 
    //the screen after operator was chosen
    shouldResetScreen = true;
}

function setPoint() {
    if (firstOperationScreen.textContent === '')
        firstOperationScreen.textContent = '0';

    if (firstOperationScreen.textContent.includes('.')) return;

    firstOperationScreen.textContent += '.';
}

function calculate() {
    if (operation === '' || shouldResetScreen) return
    //If there is already coma and you continue typing it throws NaN removing
    //come on this stage allows to continue typing
    removeComa();
    lastNumber = firstOperationScreen.textContent;
    firstOperationScreen.textContent = 
    operate(firstNumber, operation, lastNumber);
    setNumberSize();
    //Prevents from throwing NaN if output includes such a big number that it shows e
    if (!firstOperationScreen.textContent.includes('e')) addComa();
    lastOperationScreen.textContent = `${firstNumber} ${operation} ${lastNumber} =`;
    //Prevents from doing calculation after Enter was pressed
    operation = '';
    shouldResetScreen = true;
}

function colorButton(e) {
    const value = document.querySelector(`button[value='${e.key}']`);
    value.classList.add('active');
    setTimeout(() => {value.classList.remove('active')}, 140);
}

function setNumberSize() {
    if (firstOperationScreen.textContent.includes('e')) {
        if (firstOperationScreen.textContent.length > 17) {
            firstOperationScreen.style.fontSize = '26px'
        }
    } else {
        firstOperationScreen.style.fontSize = '24px'
    }
}

function makeNumbersSmaller() {
    const style = window.getComputedStyle(firstOperationScreen, null).getPropertyValue('font-size');
    let fontSize = parseFloat(style);
    firstOperationScreen.style.fontSize = (fontSize - 1) + 'px'
}

function makeNumbersBigger() {
    const style = window.getComputedStyle(firstOperationScreen, null).getPropertyValue('font-size');
    let fontSize = parseFloat(style);
    firstOperationScreen.style.fontSize = (fontSize + 1) + 'px'
}

function addComa() {
    firstOperationScreen.textContent = 
    Number(firstOperationScreen.textContent).toLocaleString("en-US")
}

function removeComa() {
    if (firstOperationScreen.textContent.includes(',')) {
        firstOperationScreen.textContent = 
            firstOperationScreen.textContent.replace(/,/g, '');
    }
}

function deleteNumber() {
    let screenLength = firstOperationScreen.textContent.length;
    firstOperationScreen.textContent = 
    firstOperationScreen.textContent.slice(0, -1);
    if (screenLength >= 11 && screenLength <= 16) makeNumbersBigger();
}

function resetScreen() {
    //Cleans second screen after you pressed Enter or = followed by a number.
    if (lastOperationScreen.textContent.includes(lastNumber)) {
        lastOperationScreen.textContent = '';
    }
    firstOperationScreen.textContent = '';
    lastNumber = null;
    shouldResetScreen = false;
}

function cleanCalculator() {
    firstOperationScreen.textContent = '0';
    lastOperationScreen.textContent = '';
    operation = '';
    shouldResetScreen = false;
    firstOperationScreen.style.fontSize = '39';
    if (window.innerWidth < 389)
    firstOperationScreen.style.fontSize = '34';
}

function manageKeyboard(e) {
    if (e.key >= 0) setNumber(e.key);
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') 
        setOperator(e.key);
    if (e.key === '.') setPoint();
    if (e.key === '=' || e.key === 'Enter') calculate();
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Delete') cleanCalculator();
    colorButton(e);
}

window.addEventListener('keydown', manageKeyboard);
numberButtons.forEach(number => {
    number.addEventListener('click', () => {setNumber(number.value)})
});
operatorButtons.forEach(operator => {
    operator.addEventListener('click', () => {setOperator(operator.value)})
});
deleteBtn.addEventListener('click', deleteNumber);
cleanBtn.addEventListener('click', cleanCalculator);
equalBtn.addEventListener('click', calculate);