const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('mousedown', () => {button.classList.add('active')});
    button.addEventListener('mouseup', () => {button.classList.remove('active')});
})

window.addEventListener('keydown', (e) => {console.log(e.key)})