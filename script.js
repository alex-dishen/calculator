const numberButtons = document.querySelectorAll('[data-number]');
const currentOperationScreen = document.querySelector('.result');
const lastOperationScreen = document.querySelector('.typed');
const deleteBtn = document.querySelector('.backspace');

let firstNumber = '';
let lastNumber = '';
let operation = '';

function operate (firstNumber, operator, secondNumber) {
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);

    if (operator === '+') return firstNumber + secondNumber;
    if (operator === '-') return firstNumber - secondNumber;
    if (operator === '*') return firstNumber * secondNumber;
    if (operator === '/') return firstNumber / secondNumber;
}

function setNumber(number) {
    currentOperationScreen.textContent += number
}

function setOperator(operator) {
    firstNumber = currentOperationScreen.textContent;
    operation = operator;
    lastOperationScreen.textContent = `${firstNumber} ${operation}`;
}

function colorButton(e) {
    const value = document.querySelector(`button[value='${e.key}']`);
    value.classList.add('active');
    setTimeout(() => {value.classList.remove('active')}, 140);
}

function deleteNumber() {
    currentOperationScreen.textContent = 
    currentOperationScreen.textContent.slice(0, -1);
}

function evaluate() {
    currentOperationScreen.textContent = 
    operate(firstNumber, operation, lastNumber);
    lastOperationScreen.textContent = `${firstNumber} ${operation} ${lastNumber} =`
    // currentOperation = null
}

function handleKeyboardINput(e) {
    if (e.key >= 0) setNumber(e.key);
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') 
        setOperator(e.key);
    if (e.key === '=' || e.key === 'Enter') evaluate();
    if (e.key === 'Backspace') deleteNumber();
    colorButton(e);
}

window.addEventListener('keydown', handleKeyboardINput);
numberButtons.forEach(number => {
    number.addEventListener('click', () => {setNumber(number.value)})
});
deleteBtn.addEventListener('click', deleteNumber);