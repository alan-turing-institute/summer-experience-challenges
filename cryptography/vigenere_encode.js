function cleanKey(keyElementId="key-encode") {

    const input = document.getElementById(keyElementId).value;
    console.log("in cleankey cleaning "+input);
    const cleaned = input.toUpperCase().replace(/[^A-Z]/g, "");
    document.getElementById(keyElementId).value = cleaned;
   // splitByKeyLength();
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

function encrypt() {
    const key = document.getElementById("key-encode").value;
    if (key.length == 0) return;
    const input = document.getElementById("input-encode").value;
    // Remove the spaces before encoding, otherwise it's a bit awkward
    const cleaned = input.toUpperCase().replace(/[^A-Z]/g, "");

    let result = [];
    for (let i = 0; i < cleaned.length; i++) {
        const c = cleaned[i];
//        console.log(key[i % key.length]);
        const o = caesarWith(c, key[i % key.length]);
        result.push(o);
    }
    document.getElementById("output-encode").value = result.join("");
    splitByKeyLength();
}

function decrypt() {
    const key = document.getElementById("key-decode").value;
    if (key.length == 0) return;
    const input = document.getElementById("input-decode-vig").value;
    let result = [];
    for (let i = 0; i < input.length; i++) {
        const c = input[i];
//        console.log(key[i % key.length]);
        const o = caesarWith(c, key[i % key.length], -1);
        result.push(o);
    }
    document.getElementById("output-decode").value = result.join("");

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

//document.getElementById("key-encode").addEventListener("input", cleanKey);
document.getElementById("key-decode").addEventListener("input",  e => cleanKey("key-decode"));
//document.getElementById("input-encode").addEventListener("input", splitByKeyLength);
//document.getElementById("key-encode").addEventListener("input", encrypt);
//document.getElementById("input-encode").addEventListener("input", encrypt);
document.getElementById("key-decode").addEventListener("input",  decrypt);
