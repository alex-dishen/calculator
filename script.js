const buttons = document.querySelectorAll('button');
const result = document.querySelector('.result');
const typed = document.querySelector('.typed');
const clean = document.querySelector('.clean');

let typingNum = '';
let typedNum = '';
let operator = '';
let clicks = 0;

window.onload = () => {
    result.textContent = '0';
}

function populateDisplay(e) {
    const className = e.target.className;
    const value = e.target.value;

    if(value >= 0) {
        for(let i = 0; i < 1; i++) {
            typingNum += value
        }
        result.textContent = typingNum
    }

    if (className === 'operator active') {
        if (clicks > 0) {
            if (typingNum) {
                typedNum = operate(typedNum, operation, typingNum);
            }
            typed.textContent = `${typedNum} ${operation}`;
        } else {
            typedNum = typingNum;
        }

        operation = value;
        typed.textContent = `${typedNum} ${operation}`;
        result.textContent = typedNum;
        typingNum = '';
        ++clicks;
    }
// 12 + 7 - 5 * 3 = should yield 42
    calculateOnEqual(e);
}

function calculateOnEqual(e) {
    const className = e.target.className;
    if (className === 'equal active') {
        typingNum = operate(typedNum, operation, typingNum);
        result.textContent = typingNum
        console.log(`On equal: ${typingNum}`);
    }
}

function addActiveClass(e) {
    e.target.classList.add('active');
}

function removeActiveClass(e) {
    e.target.classList.remove('active')
}

buttons.forEach(button => {
    button.addEventListener('mousedown', (e) => {
        addActiveClass(e);
        populateDisplay(e);
    });
    button.addEventListener('mouseup', removeActiveClass);
    button.addEventListener('mouseleave', removeActiveClass);
})

function add(a, b) {
    return +a + +b
}

function subtract(a, b) {
    return a - b
}

function multiply (a, b) {
    return a * b
}

function divide (a, b) {
    return a / b
}

function operate (a, operator, b) {
    if(operator === '+') {
        return add(a, b)
    } else if (operator === '-') {
        return subtract(a, b)
    } else if (operator === '*') {
        return multiply (a, b)
    } else if (operator === '/') {
        return divide (a, b)
    }
}

clean.addEventListener('click', () => {
    typedNum = '';
    typingNum = '';
    operation = '';
    typed.textContent = '';
    result.textContent = '0';
    clicks = 0;
});