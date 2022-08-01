const numberButtons = document.querySelectorAll('[data-number]');
const currentOperationScreen = document.querySelector('.result');
const clean = document.querySelector('.clean');

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

function colorButton(e) {
    const value = document.querySelector(`button[value='${e.key}']`);
    value.classList.add('active');
    setTimeout(() => {value.classList.remove('active')}, 140);
}

function deleteNumber() {
    currentOperationScreen.textContent = 
    currentOperationScreen.textContent.slice(0, -1);
}

function handleKeyboardINput(e) {
    if (e.key >= 0) setNumber(e.key);
    if (e.key === 'Backspace') deleteNumber()
    colorButton(e);
}

window.addEventListener('keydown', handleKeyboardINput);

numberButtons.forEach(number => {
    number.addEventListener('click', () => {setNumber(number.value)})
});