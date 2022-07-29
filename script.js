const buttons = document.querySelectorAll('button');
const result = document.querySelector('.result');
const typed = document.querySelector('.typed');
let type = '';
let displayText = '';

window.onload = () => {
    result.textContent = '0';
}

function populateDisplay(e) {
    if(e.target.value >= 0) {
        for(let i = 0; i < 1; i++) {
            type += e.target.value
        }
    }
    result.textContent = type

    if (e.target.className === 'operator active') {
        displayText = `${type} ${e.target.value}`
        typed.textContent = displayText
        type = ''
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
        populateDisplay(e)
    });
    button.addEventListener('mouseup', removeActiveClass);
    button.addEventListener('mouseleave', removeActiveClass);
})

function add(a, b) {
    return a + b
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