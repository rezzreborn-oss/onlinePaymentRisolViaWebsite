const display = document.querySelector('.js-display');

//state (otak)
let operand1 = '';
let operand2 = '';
let isSecondNumber = false;

document.querySelector('.js-buttons').addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') return;

    const value = event.target.textContent;

    //jika angka
    if (!isNaN(value)) {
        if (!isSecondNumber) {
            operand1 += value;
            display.value = operand1;
        } else {
            operand2 += value;
            display.value = operand2
        }
    }
})