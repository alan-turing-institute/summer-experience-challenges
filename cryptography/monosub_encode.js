const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function cleanText() {
    const input = document.getElementById("input-encode").value;
    const cleaned = input.toUpperCase().replace(/[^A-Z]/g, "");
    document.getElementById("input-encode").value = cleaned;
}

function getMappings(excluding, prefix="encode-") {
    let mappings = new Map();
    for (const c of alphabet) {
        if (excluding.includes(c)) {
            continue;
        }
        const id = prefix + c.toLowerCase();
        let mapped_to = document.getElementById(id).value.toUpperCase();
        if (mapped_to.length > 0) {
            mappings.set(c, mapped_to);
        }
    }
    return mappings;
}

function alreadyMappedTo(char, excluding, prefix="encode-") {
    for (const m of getMappings(excluding, prefix)) {
        if (m[1] == char.toUpperCase()) {
            return true;
        }
    }
    return false;
}

function validate(char, prefix="encode-") {
    const id = prefix + char.toLowerCase();
    const val = document.getElementById(id).value;
    // First, remove extra characters
    if (val.length > 1) {
        document.getElementById(id).value = val[0].toUpperCase()
    }

    // Then check if it's already been mapped
    if (val.length == 1) {
        const valUp = val.toUpperCase();
        if (alreadyMappedTo(valUp, [char], prefix)) {
            // Already found somewhere else
            document.getElementById(id).value = "";
        }
        else if (valUp.charCodeAt(0) < 65 || valUp.charCodeAt(0) > 90) {
            // Not A to Z
            document.getElementById(id).value = "";
        }
        else {
            document.getElementById(id).value = valUp;
        }
    }
    showRemainingChars();
}

function encrypt() {
    const input = document.getElementById("input-encode").value;
    const mappings = getMappings([]);
    if (mappings.size < 26) return;
    let output = "";
    for (const c of input) {

        output += mappings.get(c);
    }
    document.getElementById("output-encode").value = output;
}

function decrypt() {
    const input = document.getElementById("input-decode").value;
    const mappings = getMappings([], "decode-");
    let output = "";
    for (const c of input) {
	if (mappings.get(c)) output += mappings.get(c);
	else output += "?";
    }
    document.getElementById("output-decode").value = output;
}

function randomise() {
    const shuffledChars = [...alphabet]
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    shuffledChars.map((m, i) => {
        const id = "encode-" + alphabet[i].toLowerCase();
        document.getElementById(id).value = m.toUpperCase();
    });
    showRemainingChars();
    encrypt();
}

function showRemainingChars() {
    for (const prefix of ["encode-", "decode-"]) {
        const remaining = [...alphabet].filter(c => !alreadyMappedTo(c, [], prefix)).join("");
        if (remaining.length == 0) {
            document.getElementById(prefix + "remaining").innerHTML = "";
        }
        else {
            document.getElementById(prefix + "remaining").innerHTML = `Remaining characters: ${remaining}`;
        }
    }
}

for (const c of alphabet) {
    // encoding
    var id = "encode-" + c.toLowerCase();
    document.getElementById(id).addEventListener("input", (_ => validate(c.toUpperCase())));
    document.getElementById(id).addEventListener("input", encrypt);
    // decoding
    var prefix = "decode-"
    var id = prefix + c.toLowerCase();
    document.getElementById(id).addEventListener("input", (_ => validate(c.toUpperCase(), prefix)));
    document.getElementById(id).addEventListener("input", decrypt);
}
document.getElementById("random-encode").addEventListener("click", randomise);
document.getElementById("input-encode").addEventListener("input", cleanText);
document.getElementById("input-encode").addEventListener("input", encrypt);

showRemainingChars();
decrypt();
