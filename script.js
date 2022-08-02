const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const firstOperationScreen = document.querySelector('.first-screen');
const lastOperationScreen = document.querySelector('.second-screen');
const deleteBtn = document.querySelector('.backspace');
const cleanBtn = document.querySelector('.clean');
const equalBtn = document.querySelector('.equal');

let firstNumber = '';
let lastNumber = '';
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
    if (firstOperationScreen.textContent.length === 21) return;
    if (shouldResetScreen || firstOperationScreen.textContent === '0') 
        resetScreen();
    
    firstOperationScreen.textContent += number;
    //If there is already coma and you continue typing it throws NaN
    removeComa();
    addComa();
    if (firstOperationScreen.textContent.length >= 11) makeNumbersSmaller();
}

function setOperator(operator) {
    if (operation !== '') calculate();
    operation = operator;
    removeComa();
    firstNumber = firstOperationScreen.textContent;
    addComa();
    lastOperationScreen.textContent = `${firstNumber} ${operation}`;
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
    removeComa();
    lastNumber = firstOperationScreen.textContent;
    firstOperationScreen.textContent = 
    operate(firstNumber, operation, lastNumber);
    addComa()
    lastOperationScreen.textContent = `${firstNumber} ${operation} ${lastNumber} =`;
    operation = ''
}

function colorButton(e) {
    const value = document.querySelector(`button[value='${e.key}']`);
    value.classList.add('active');
    setTimeout(() => {value.classList.remove('active')}, 140);
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
    firstOperationScreen.textContent = '';
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