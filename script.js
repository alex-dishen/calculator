const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const firstOperationScreen = document.querySelector('.result');
const lastOperationScreen = document.querySelector('.typed');
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

function resetScreen() {
    firstOperationScreen.textContent = '';
    shouldResetScreen = false;
}

function setNumber(number) {
    if (shouldResetScreen) resetScreen();
    firstOperationScreen.textContent += number;
}

function setOperator(operator) {
    if (firstOperationScreen.textContent === '') return;    
    firstNumber = firstOperationScreen.textContent;
    operation = operator;
    lastOperationScreen.textContent = `${firstNumber} ${operation}`;
    shouldResetScreen = true;
}

function colorButton(e) {
    const value = document.querySelector(`button[value='${e.key}']`);
    value.classList.add('active');
    setTimeout(() => {value.classList.remove('active')}, 140);
}

function deleteNumber() {
    firstOperationScreen.textContent = 
    firstOperationScreen.textContent.slice(0, -1)
}

function cleanCalculator() {
    firstOperationScreen.textContent = '';
    lastOperationScreen.textContent = '';
    shouldResetScreen = false;
}

function calculate() {
    if (operation === '' || shouldResetScreen) return
    lastNumber = firstOperationScreen.textContent;
    firstOperationScreen.textContent = 
    operate(firstNumber, operation, lastNumber);
    lastOperationScreen.textContent = `${firstNumber} ${operation} ${lastNumber} =`;
    operation = ''
}

function setPoint() {
    if (firstOperationScreen.textContent === '')
        firstOperationScreen.textContent = '0';

    if (firstOperationScreen.textContent.includes('.')) return;

    firstOperationScreen.textContent += '.';
}

function handleKeyboardINput(e) {
    if (e.key >= 0) setNumber(e.key);
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') 
        setOperator(e.key);
    if (e.key === '.') setPoint();
    if (e.key === '=' || e.key === 'Enter') calculate();
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Delete') cleanCalculator();
    colorButton(e);
}

window.addEventListener('keydown', handleKeyboardINput);
numberButtons.forEach(number => {
    number.addEventListener('click', () => {setNumber(number.value)})
});
operatorButtons.forEach(operator => {
    operator.addEventListener('click', () => {setOperator(operator.value)})
});
deleteBtn.addEventListener('click', deleteNumber);
cleanBtn.addEventListener('click', cleanCalculator);
equalBtn.addEventListener('click', calculate);