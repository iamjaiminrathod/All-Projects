const form = document.getElementById('form');
const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const passwordEl = document.getElementById('password');
const password2El = document.getElementById('password2');
const successMessage = document.getElementById('successMessage');

function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    formControl.querySelector('small').innerText = message;
}

function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function checkEmail(input){
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(re.test(input.value.trim())) {
        showSuccess(input);
        return true;
    } else {
        showError(input, 'Email is not valid');
        return false;
    }
}

function checkRequired(inputArr){
    let valid = true;
    inputArr.forEach(input => {
        if(input.value.trim() === ''){
            showError(input, `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} is required`);
            valid = false;
        } else {
            showSuccess(input);
        }
    });
    return valid;
}

function checkLength(input, min){
    if(input.value.trim().length < min){
        showError(input, `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} must be at least ${min} characters`);
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

function checkPasswordsMatch(input1, input2){
    if(input1.value !== input2.value){
        showError(input2, 'Passwords do not match');
        return false;
    } else {
        showSuccess(input2);
        return true;
    }
}

form.addEventListener('submit', function(e){
    e.preventDefault();

    const isRequired = checkRequired([nameEl,emailEl,passwordEl,password2El]);
    const isEmailValid = checkEmail(emailEl);
    const isNameValid = checkLength(nameEl, 2);
    const isPasswordValid = checkLength(passwordEl, 6);
    const isPasswordsMatch = checkPasswordsMatch(passwordEl, password2El);

    if(isRequired && isEmailValid && isNameValid && isPasswordValid && isPasswordsMatch){
        successMessage.style.display = 'block';
        setTimeout(() => successMessage.style.display = 'none', 3000);
        form.reset();
        document.querySelectorAll('.form-control').forEach(fc => fc.className = 'form-control');
    }
});
