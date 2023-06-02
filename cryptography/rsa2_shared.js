// Display the value of m = c^d mod n
//   cInputId (string): id of input element containing c
//   dInputId (string): id of input element containing d
//   nInputId (string): id of input element containing n
//   mSpanId (string): id of span element where the value of m is to be displayed
function calculateM(cInputId, dInputId, nInputId, mSpanId) {
    const c = parseInt(document.getElementById(cInputId).value);
    const d = parseInt(document.getElementById(dInputId).value);
    const n = parseInt(document.getElementById(nInputId).value);
    if (isNaN(c) || isNaN(d) || isNaN(n)) {
        document.getElementById(mSpanId).innerHTML = "";
    }
    else {
        const m = powmod(c, d, n);
        document.getElementById(mSpanId).innerHTML = m;
    }
}

// Check whether the value of m matches a correct answer
//    mInputId (string): id of input element containing the proposed value of m
//    mResultSpanId (string): id of span element where the result is to be displayed
//    correctAnswer (number): the true value of m
function checkM(mInputId, mResultSpanId, correctAnswer) {
    const m = parseInt(document.getElementById(mInputId).value);
    if (m === correctAnswer) {
        document.getElementById(mResultSpanId).innerHTML = "Correct!";
        document.getElementById(mResultSpanId).style.color = "green";
        document.getElementById(mInputId).style.backgroundColor = rightColor;
    } else {
        document.getElementById(mResultSpanId).innerHTML = "Incorrect. Try again.";
        document.getElementById(mResultSpanId).style.color = "red";
        document.getElementById(mInputId).style.backgroundColor = wrongColor;
    }
}
