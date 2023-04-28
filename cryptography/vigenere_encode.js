function cleanKey() {
    const input = document.getElementById("key-encode").value;
    const cleaned = input.toUpperCase().replace(/[^A-Z]/g, "");
    document.getElementById("key-encode").value = cleaned;
    splitByKeyLength();
}

function caesarWith(plain, key) {
    const shift = key.charCodeAt(0) - 65;
    const resultCode = plain.charCodeAt(0) + shift;
    if (resultCode > 90) {
        return String.fromCharCode(resultCode - 26);
    }
    else {
        return String.fromCharCode(resultCode);
    }
}

function encrypt() {
    const key = document.getElementById("key-encode").value;
    if (key.length == 0) return;
    const input = document.getElementById("input-encode").value;
    // Remove the spaces before encoding, otherwise it's a bit awkward
    const cleaned = input.toUpperCase().replace(/[^A-Z]/g, "");

    let result = [];
    for (let i = 0; i < cleaned.length; i++) {
        const c = cleaned[i];
        console.log(key[i % key.length]);
        const o = caesarWith(c, key[i % key.length]);
        result.push(o);
    }
    document.getElementById("output-encode").value = result.join("");
    splitByKeyLength();
}

function splitByKeyLength() {
    const addSpaces = function (string, len) {
        let noSpaces = string.toUpperCase().replace(/ /g, "");
        if (len <= 1) {
            return noSpaces;
        };
        let result = [];
        for (let i = 0; i < noSpaces.length; i += len) {
            result.push(noSpaces.slice(i, i + len));
        }
        return result.join(" ");
    };
    const keyLength = document.getElementById("key-encode").value.length;
    const input = document.getElementById("input-encode").value;
    const output = document.getElementById("output-encode").value;
    document.getElementById("input-encode").value = addSpaces(input, keyLength);
    if (keyLength == 0) {
        document.getElementById("output-encode").value = "";
    } else {
        document.getElementById("output-encode").value = addSpaces(output, keyLength);
    }
}

document.getElementById("key-encode").addEventListener("input", cleanKey);
document.getElementById("input-encode").addEventListener("input", splitByKeyLength);
document.getElementById("key-encode").addEventListener("input", encrypt);
document.getElementById("input-encode").addEventListener("input", encrypt);
