const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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

function generatePlainAndCipher() {
    const input = document.getElementById("input-decode").value;
    const mappings = getMappings([], "decode-");
    const flexbox = document.getElementById("plain-and-cipher");
    flexbox.innerHTML = "";
    let n = 0;
    for (const c of input) {
        n += 1;
        const cOut = mappings.get(c);
        const node = document.createElement("span");
        if (cOut === undefined) {
            node.innerHTML = `${c}<br /><span style="color: #aaa">?</span>`;
        }
        else {
            node.innerHTML = `<span class="text-${c}">${c}</span><br /><span class="text-${c}"><b>${cOut}</b></span>`;
        }
        flexbox.appendChild(node);
        if (n > 800) break;
    }
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
        const remaining = [...alphabet].filter(c => !alreadyMappedTo(c, [], prefix)).join(" ");
        let html = `<span class="is_code">` +
            [...alphabet].map(c => {
                if (remaining.includes(c)) {
                    return `<b>${c}</b>`;
                }
                else {
                    return `<span style="color: #aaa">${c}</span>`;
                }
            }).join(" ") + "</span><br />Remaining characters";
        document.getElementById(prefix + "remaining").innerHTML = html;
    }
}

let checked = [];
function addToChecked() {
    for (const c of alphabet) {
        const id = "decode-" + c.toLowerCase();
        if (document.getElementById(id).value !== "" && !checked.includes(c)) {
            checked.push(c);
        }
    }
    check();
}
function check() {
    const answers = new Map([
        ["A", "O"], ["B", "B"], ["C", "S"], ["D", "G"], ["E", "P"],
        ["F", "I"], ["G", "M"], ["H", "C"], ["I", "E"], ["J", "F"],
        ["K", "Q"], ["L", "K"], ["M", "V"], ["N", "X"], ["O", "R"],
        ["P", "T"], ["Q", "W"], ["R", "N"], ["S", "Z"], ["T", "D"],
        ["U", "L"], ["V", "H"], ["W", "J"], ["X", "Y"], ["Y", "A"],
        ["Z", "U"]]);
    for (const c of checked) {
        const div = document.getElementById("d" + c.toLowerCase());
        const input = document.getElementById("decode-" + c.toLowerCase());
        const wrongColor = "#fad9d7";  // light red
        const rightColor = "#d7fae9";  // light green
        const wrongTextColor = "#bf0a31";  // dark red
        const rightTextColor = "#0f9111";  // dark green
        if (input.value === "") {
            div.style.backgroundColor = "";
            input.style.backgroundColor = "";
        }
        else if (input.value === answers.get(c)) {
            div.style.backgroundColor = rightColor;
            input.style.backgroundColor = rightColor;
            document.querySelectorAll(".text-" + c).forEach(e => {e.style.color = rightTextColor;});
        }
        else {
            div.style.backgroundColor = wrongColor;
            input.style.backgroundColor = wrongColor;
            document.querySelectorAll(".text-" + c).forEach(e => {e.style.color = wrongTextColor;});
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
    document.getElementById(id).addEventListener("input", generatePlainAndCipher);
    document.getElementById(id).addEventListener("input", check);
}
document.getElementById("random-encode").addEventListener("click", randomise);
document.getElementById("input-encode").addEventListener("input", () => cleanText("input-encode"));
document.getElementById("input-encode").addEventListener("input", encrypt);
document.getElementById("check").addEventListener("click", addToChecked);

showRemainingChars();
generatePlainAndCipher();
