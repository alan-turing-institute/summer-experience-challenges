// wrongColor and rightColor are background colours for input fields signifying
// wrong and correct answers respectively.
const wrongColor = "#fad9d7";  // light red
const rightColor = "#d7fae9";  // light green

// powmod(base, exp, mod) returns (base ^ exp) % mod while avoiding
// overflow/rounding errors.
// In particular, for RSA, encoding involves calculating c = powmod(m, e, n);
// and decoding involves calculating m = powmod(c, d, n).
function powmod(base, exp, mod) {
    let result = 1;
    for (let i = 0; i < exp; i++) {
        result = (result * base) % mod;
    }
    return result;
}

// enforcePosNumberInput(inputId) ensures that the value of the input
// elemeent with the id `inputId` is a positive integer. It does so by removing
// any characters that are not digits, and if the resulting value is 0, clears
// the input.
function enforcePosNumberInput(inputId) {
    let d = document.getElementById(inputId).value;
    d = d.replace(/\D/g, "");
    if (parseInt(d) === 0) d = ""; 
    document.getElementById(inputId).value = d;
}
