const submitBtn = document.querySelector('#submitBtn');
const nameError = document.querySelector('#nameError');
const emailError = document.querySelector('#emailError');
const passError = document.querySelector('#passError');
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (validateName() && validateEmail() && validatePassword() && validatecnfmPassword()) {
        alert('form submit successfully');
    }
});
function validateName() {
    let name = document.querySelector('#name').value;
    if (name.length == 0) {
        nameError.innerHTML = "Name is required";
        return false;
    }
    if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
        nameError.innerHTML = "Write full Name";
        return false;
    }
    nameError.innerHTML = "";
    return true;
}

function validateEmail() {
    let email = document.querySelector('#email').value;
    if (email.length == 0) {
        emailError.innerHTML = "Email is required";
        return false;
    }
    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        emailError.innerHTML = "Write full mail";
        return false;
    }
    emailError.innerHTML = "";
    return true;
}

function validatePassword() {
    let password = document.querySelector('#password').value;
    if (password.length == 0) {
        passError.innerHTML = "Enter Password";
        return false;
    }
    passError.innerHTML = "";
    return true;
}
function validatecnfmPassword() {
    let cnfmPassword = document.querySelector('#cnfmpassword').value;
    if (cnfmPassword.length == 0) {
        cnfmPassError.innerHTML = "Enter the Password"
        return false;
    }
    if (cnfmPassword.length != password.length || cnfmPassword !== password) {
        cnfmPassword.innerHTML = "Doesnot match the above password";
        return false;
    }
    cnfmPassword.innerHTML = "";
    return true;

}