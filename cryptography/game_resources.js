// Produce quotient and remainder of n = qd + r
// nInputId (string): id of input element containing n
// dInputId (string): id of input element containing d
// qSpanId (string): id of span element where q is to be displayed
// rSpanId (string): id of span element where r is to be displayed
function quotient_remainder(nInputId, dInputId, qSpanId, rSpanId) {
    const n = parseInt(document.getElementById(nInputId).value);
    const d = parseInt(document.getElementById(dInputId).value);
    // console.log("is this going to this function?");
    if (isNaN(n) || isNaN(d)) {
        // console.log("and how about this place?");
        document.getElementById(qSpanId).innerHTML = "";
        document.getElementById(rSpanId).innerHTML = "";
    }
    else {
        const q = Math.floor(n / d);
        const r = n % d;
        // console.log("if it is going down here I want a print out of q and r");
        // console.log(q)
        // console.log(r)
        document.getElementById(qSpanId).innerHTML = q;
        document.getElementById(rSpanId).innerHTML = r;
    }
}

function calc_m() {
    for (const inputId of ["c1", "d1", "n1"]) {
        document.getElementById(inputId).addEventListener("input", () => {
            enforcePosNumberInput(inputId);
            calculateM("c1", "d1", "n1", "m1-calc");
        })
    }
}

function calc_c() {
    for (const inputId of ["c2", "d2", "n2"]) {
        document.getElementById(inputId).addEventListener("input", () => {
            enforcePosNumberInput(inputId);
            calculateM("c2", "d2", "n2", "m2-calc");
        })
    }
}

function calc_qr() {
    for (const inputId of ["nh", "dh"]) {
        // console.log("here I am");
        document.getElementById(inputId).addEventListener("input", () => {
            // enforcePosNumberInput(inputId);
            quotient_remainder("nh", "dh", "qh-calc", "rh-calc");
        });
        // console.log("and here");
    };
};


calc_m();
calc_c();
calc_qr();



// VIGENERE

function cleanText(id) {
    // Capitalise all letters and remove all non-letters
    const input = document.getElementById(id).value;
    const cleaned = input.toUpperCase().replace(/[^A-Z]/g, "");
    document.getElementById(id).value = cleaned;
}

function caesarWith(plain, key, direction=1) {
    // optional "direction" argument lets us decode, by shifting the opposite way
    const shift = key.charCodeAt(0) - 65;
    const resultCode = plain.charCodeAt(0) + direction*shift;
    if (resultCode > 90) {
        return String.fromCharCode(resultCode - 26);
    } else if (resultCode < 65) {
	return String.fromCharCode(resultCode + 26);
    } else {
        return String.fromCharCode(resultCode);
    }
}

function encrypt(input, key) {
    if (key.length == 0) return "";
    const cleaned = input.toUpperCase().replace(/[^A-Z]/g, "");
    let result = [];
    for (let i = 0; i < cleaned.length; i++) {
        const c = cleaned[i];
        const o = caesarWith(c, key[i % key.length]);
        result.push(o);
    }
    return result.join("");
}

function decrypt(cipher, key) {
    if (key.length == 0) return "";
    let result = [];
    for (let i = 0; i < cipher.length; i++) {
        const c = cipher[i];
        const o = caesarWith(c, key[i % key.length], -1);
        result.push(o);
    }
    return result.join("");
}

function vigenereSwap() {
    // swap the input and output boxes
    const inText = document.getElementById("vig-text").value;
    const outText = document.getElementById("vig-result").value;
    document.getElementById("vig-text").value = outText;
    document.getElementById("vig-result").value = inText;
}

function vigenereEnDecode() {
    const encode = document.getElementById("vig-enc").checked;
    document.getElementById("vig-text").placeholder = encode ? "Plain text" : "Cipher text";
    document.getElementById("vig-result").placeholder = encode ? "Encoded message will be displayed here" : "Decoded message will be displayed here";
    cleanText("vig-text");
    cleanText("vig-key");
    if (encode) {
        const result = encrypt(document.getElementById("vig-text").value,
            document.getElementById("vig-key").value);
        document.getElementById("vig-result").value = result;
    }
    else {
        const result = decrypt(document.getElementById("vig-text").value,
            document.getElementById("vig-key").value);
        document.getElementById("vig-result").value = result;
    }
}
document.getElementById("vig-text").addEventListener("input", vigenereEnDecode);
document.getElementById("vig-key").addEventListener("input", vigenereEnDecode);
document.getElementById("vig-enc").addEventListener("change", vigenereSwap);
document.getElementById("vig-dec").addEventListener("change", vigenereSwap);
document.getElementById("vig-enc").addEventListener("change", vigenereEnDecode);
document.getElementById("vig-dec").addEventListener("change", vigenereEnDecode);
vigenereEnDecode();
