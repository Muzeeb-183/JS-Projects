let inputSlider = document.querySelector('.inputSlider');
let sliderValue = document.querySelector('.sliderValue');
let passBox = document.querySelector('.passBox');
let lowercase = document.querySelector('#lowercase');
let uppercase = document.querySelector('#uppercase');
let numbers = document.querySelector('#numbers');
let symbols = document.querySelector('#symbols');
let genBtn = document.querySelector('.genBtn');
let copyIcon = document.querySelector('#copy-icon');

sliderValue.textContent = inputSlider.value; // Showing slider value

inputSlider.addEventListener('input', () => {
    sliderValue.textContent = inputSlider.value;
});

genBtn.addEventListener('click', () => {
    passBox.value = generatePassword();
});

// Function to generate password
let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lowerChars = "abcdefghijklmnopqrstuvwxyz";
let nums = '0123456789';
let syms = '@#$%^&*';

function generatePassword() {
    let genPassword = "";
    let allChars = "";

    allChars += lowercase.checked ? lowerChars : "";
    allChars += uppercase.checked ? upperChars : "";
    allChars += numbers.checked ? nums : "";
    allChars += symbols.checked ? syms : "";

    if (allChars === "" || allChars.length === 0) {
        return genPassword;
    }

    let i = 1;
    while (i <= inputSlider.value) {
        genPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
        i++;
    }
    return genPassword;
}

copyIcon.addEventListener('click', () => {
    if (passBox.value !== "") { // Change OR to AND
        navigator.clipboard.writeText(passBox.value).then(() => { // Handle success
            copyIcon.title = "Password copied";
            copyIcon.innerHTML = "✔"; // Change icon to checkmark

            // Reset icon after 2 seconds
            setTimeout(() => {
                copyIcon.innerHTML = "content_copy"; // Change it back to original icon
                copyIcon.title = ""; // Clear title
            }, 2000);
        }).catch(err => {
            console.error('Could not copy password: ', err);
        });
    }   
});
