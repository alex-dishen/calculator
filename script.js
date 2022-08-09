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
    if (shouldResetScreen) firstOperationScreen.style.fontSize = '39';
    if (shouldResetScreen || firstOperationScreen.textContent === '0') resetScreen();
    if (firstOperationScreen.textContent.length >= 21) return;
    //If there is already coma and user continue typing it throws NaN removing
    //come on this stage allows to continue typing
    removeComa();
    firstOperationScreen.textContent += number;
    //Add coma back to be displayed
    addComa();
    if (firstOperationScreen.textContent.length >= 10) makeNumbersSmaller();
}

function setOperator(operator) {
    if (operation !== '') calculate();
    operation = operator;
    //If there is already coma and user continue typing it throws NaN removing
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
    //If there is coma and user presses enter or = it throws NaN, removing
    //come here allows to do the calculation
    removeComa();
    lastNumber = firstOperationScreen.textContent;
    firstOperationScreen.textContent = 
    operate(firstNumber, operation, lastNumber);
    setNumberSize();
    //Without the check for 'e' sign, if e sing will appear it will throw NaN
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
        firstOperationScreen.style.fontSize = '25px'
    }
    if (!firstOperationScreen.textContent.includes('e')) {
        if (firstOperationScreen.textContent.length >= 14) {
        firstOperationScreen.style.fontSize = '29px'
        }
        if (firstOperationScreen.textContent.length >= 18) {
        firstOperationScreen.style.fontSize = '26px'
        }
    }
}

function makeNumbersSmaller() {
    const style = window.getComputedStyle(firstOperationScreen, null)
        .getPropertyValue('font-size');
    let fontSize = parseFloat(style);
    firstOperationScreen.style.fontSize = (fontSize - 1) + 'px';
}

function makeNumbersBigger() {
    const style = window.getComputedStyle(firstOperationScreen, null)
        .getPropertyValue('font-size');
    let fontSize = parseFloat(style);
    firstOperationScreen.style.fontSize = (fontSize + 1) + 'px';
}

function addComa() {
    firstOperationScreen.textContent = 
    Number(firstOperationScreen.textContent).toLocaleString("en-US");
}

function removeComa() {
    if (firstOperationScreen.textContent.includes(',')) {
        firstOperationScreen.textContent = 
            firstOperationScreen.textContent.replace(/,/g, '');
    }
}

function deleteNumber() {
    let screenLength = firstOperationScreen.textContent.length;
    //If there is coma and user deletes a number it throws NaN removing
    //come allows deleting
    removeComa();
    firstOperationScreen.textContent = 
    firstOperationScreen.textContent.slice(0, -1);
    addComa();
    if (screenLength >= 10 && screenLength <= 21) makeNumbersBigger();
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
    number.addEventListener('click', () => {setNumber(number.value)});
});
operatorButtons.forEach(operator => {
    operator.addEventListener('click', () => {setOperator(operator.value)});
});
deleteBtn.addEventListener('click', deleteNumber);
cleanBtn.addEventListener('click', cleanCalculator);
equalBtn.addEventListener('click', calculate);