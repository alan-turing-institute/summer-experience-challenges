function cleanText() {
    // Capitalise all letters and remove all non-letters
    const input = document.getElementById("input").value;
    const cleaned = input.toUpperCase().replace(/[^A-Z]/g, "");
    document.getElementById("input").value = cleaned;
}

function encrypt(n) {
    // Encrypt the text
    const input = document.getElementById("input").value;
    let output = [];
    for (let i = 0; i < input.length; i++) {
        const c = input.charCodeAt(i);
        const c_new = (c - 65 + n) % 26 + 65;  // 65 = 'A'
        output.push(String.fromCharCode(c_new));
    }
    document.getElementById("output").value = output.join("");
}

function en_or_decrypt() {
    const n = parseInt(document.getElementById("shift").value);
    if (document.getElementById("encrypt").checked) {
        document.getElementById("input").placeholder = "Enter plain text here..."
        document.getElementById("output").placeholder = "Cipher text will be displayed here..."
        encrypt(n);
    } else {
        document.getElementById("input").placeholder = "Enter cipher text here..."
        document.getElementById("output").placeholder = "Plain text will be displayed here..."
        encrypt(26 - n);
    }
}
function swapText() {
    const output = document.getElementById("output").value;
    document.getElementById("input").value = output;
    en_or_decrypt();
}
document.getElementById("input").addEventListener("input", cleanText);
document.getElementById("input").addEventListener("input", en_or_decrypt);
document.getElementById("shift").addEventListener("change", en_or_decrypt);
document.getElementById("encrypt").addEventListener("change", swapText);
document.getElementById("decrypt").addEventListener("change", swapText);
en_or_decrypt()
