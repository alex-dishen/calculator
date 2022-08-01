const buttons = document.querySelectorAll('button');
const result = document.querySelector('.result');
const typed = document.querySelector('.typed');
const clean = document.querySelector('.clean');
const backspace = document.querySelector('.backspace');

let oldNum = '';
let currNum = '';
let operation = '';
let clicks = 0;

function calculateOnEqual(e) {
    let className = e.target.className;

    //KEYBOARD CONNECTION
    if(e.key) {
        const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
        className = key.className
    }

    if (className === 'equal active') {
        if (oldNum && currNum) {
            typed.textContent = `${currNum} ${operation} ${oldNum} =`;
            currNum = operate(currNum, operation, oldNum);
            result.textContent = currNum;
        }

        oldNum = ''
    }
}

function calculateOnOperator(e) {
    let className = e.target.className;
    let value = e.target.value;

    //KEYBOARD CONNECTION
    if(e.key) {
        const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
        value = key.value;
        className = key.className
    }

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
    let value = e.target.value;

    //KEYBOARD CONNECTION
    if(e.key) {
        const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
        value = key.value;
    }

    if (currNum === '') {
        typed.textContent = '';
    }
    
    if(value >= 0 || value === '.') {
        oldNum += value;
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


//KEYBOARD CONNECTION
function addActiveToKeyboard(e) {
    const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
    key.classList.add('active');
}

function removeActiveFromKeyboard(e) {
    const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
    key.classList.remove('active');
}

function removeLastElement(string) {
    oldNum = string.slice(0, string.length - 1);
    result.textContent = oldNum;
}

function cleanDisplay() {
    currNum = '';
    oldNum = '';
    operation = '';
    typed.textContent = '';
    result.textContent = '';
    clicks = 0;
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

clean.addEventListener('click', cleanDisplay);

backspace.addEventListener('click', () => {removeLastElement(oldNum)});

//KEYBOARD CONNECTION
window.addEventListener('keydown', (e) => {
    addActiveToKeyboard(e);
    populateDisplay(e);
    //BACKSPACE
    if(e.keyCode === 8) {
        removeLastElement(oldNum);
    }
    //DELETE
    if(e.keyCode === 46) {
        cleanDisplay();
    }
});

window.addEventListener('keyup', removeActiveFromKeyboard);