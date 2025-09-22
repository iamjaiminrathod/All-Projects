const display = document.getElementById('display');

function appendNumber(num) {
    if(display.value === '0') display.value = '';
    display.value += num;
}

function appendOperator(op) {
    const lastChar = display.value.slice(-1);
    if ('+-*/'.includes(lastChar)) return;
    display.value += op;
}

function clearDisplay() {
    display.value = '';
}

function calculateResult() {
    try {
        display.value = eval(display.value.replace('×','*').replace('÷','/'));
    } catch {
        display.value = 'Error';
    }
}
