const buttons = document.querySelectorAll('button');
const result = document.querySelector('.result');
const typed = document.querySelector('.typed');
const clean = document.querySelector('.clean');
const backspace = document.querySelector('.backspace');

let oldNum = '';
let currNum = '';
let operation = '';
let clicks = 0;
let equalClicks = 0;

window.onload = () => {
    result.textContent = '0';
}

function calculateOnEqual(e) {
    const className = e.target.className;

    if (className === 'equal active') {
        if (oldNum && currNum) {
            typed.textContent = `${currNum} ${operation} ${oldNum} =`;
            oldNum = operate(currNum, operation, oldNum);
            currNum = oldNum;
            result.textContent = oldNum;
        }

        oldNum = '';
        ++equalClicks;
    }
}

function calculateOnOperator(e) {
    const className = e.target.className;
    const value = e.target.value;

    if (className === 'operator active') {
        if (clicks > 0) {
            if (oldNum || currNum) {
                currNum = operate(currNum, operation, oldNum);
                typed.textContent = `${currNum} ${operation}`;
            }
        } else {
            currNum = oldNum;
        }

        operation = value;
        if (currNum) {
            typed.textContent = `${currNum} ${operation}`;
            result.textContent = currNum;
        }

        oldNum = '';
        ++clicks;
    }
}

function populateDisplay(e) {
    const value = e.target.value;

    if (currNum === '') {
        typed.textContent = '';
    }
    
    if(value >= 0) {
        for(let i = 0; i < 1; i++) {
            oldNum += value;
        }
        result.textContent = oldNum;
    }

    calculateOnOperator(e);
    calculateOnEqual(e);
}

function addActiveClass(e) {
    e.target.classList.add('active');
}

function removeActiveClass(e) {
    e.target.classList.remove('active');
}

function removeLastElement(string) {
    oldNum = string.slice(0, string.length - 1);
    result.textContent = oldNum;
}

function operate (firstNumber, operator, secondNumber) {
    if(operator === '+') return +firstNumber + +secondNumber;
    if (operator === '-') return firstNumber - secondNumber;
    if (operator === '*') return firstNumber * secondNumber;
    if (operator === '/') return firstNumber / secondNumber;
}

buttons.forEach(button => {
    button.addEventListener('mousedown', (e) => {
        addActiveClass(e);
        populateDisplay(e);
    });
    button.addEventListener('mouseup', removeActiveClass);
    button.addEventListener('mouseleave', removeActiveClass);
})

clean.addEventListener('click', () => {
    currNum = '';
    oldNum = '';
    operation = '';
    typed.textContent = '';
    result.textContent = '0';
    clicks = 0;
    equalClicks = 0;
});

backspace.addEventListener('click', () => {removeLastElement(oldNum)});