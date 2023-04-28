function cleanText() {
    const input = document.getElementById("text_analysis").value;
    const cleaned = input.toUpperCase().replace(/[^A-Z]/g, "");
    document.getElementById("text_analysis").value = cleaned;
}

function getRawCounts(words) {
    // Gather letter counts into a Map
    const counts = new Map();
    for (let i = 0; i < words.length; i++) {
        const letter = words[i];
        // Ignore anything that's not A-Z
        const c = letter.charCodeAt();
        if (c < 65 || c > 90) continue;
        let n = counts.get(letter);
        if (n === undefined) {
            counts.set(letter, 1);
        } else {
            counts.set(letter, n + 1);
        }
    }
    return counts;
}

function getCounts(words) {
    // Sort by prevalence
    let sortedCounts = [...getRawCounts(words).entries()].sort((a, b) => b[1] - a[1]);
    // Construct data in the form Plotly wants
    let data = {'x': [], 'y': [], 'type': 'bar'};
    for (const item of sortedCounts) {
        data.x.push(item[0]);
        data.y.push(item[1]);
    }
    return data;
}

function ioc(text) {
    let counts = getRawCounts(text);
    let sum = 0;
    for (const c of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
        const n = counts.get(c);
        if (n === undefined) continue;
        else sum += n * (n - 1);
    }
    let l = text.length;
    return 26 * sum / (l * (l - 1));
}

const plotDiv = document.getElementById("plot");
function makeLayout() {
    const text = document.getElementById("text_analysis").value;
    return {
    'margin' : {'b': 30, 'l': 40, 'r': 30, 't': 30},
    'title' : `Index of coincidence: ${ioc(text).toFixed(2)}`
}};
function plotUpdate() {
    const words = document.getElementById("text_analysis").value;
    Plotly.react( plotDiv, [getCounts(words)], makeLayout() );
    if (words.length > 0) {
        plotDiv.style.display = "block";
    } else {
        plotDiv.style.display = "none";
    }
}

document.getElementById("text_analysis").addEventListener("input", cleanText);
document.getElementById("text_analysis").addEventListener("input", plotUpdate);
Plotly.newPlot( plotDiv, [{'x': [], 'y': [], 'type': 'bar'}], makeLayout());
plotUpdate();

function fillWith(text) {
    document.getElementById("text_analysis").value = text;
    cleanText();
    plotUpdate();
}
document.getElementById("fillpnp").addEventListener("click", e => fillWith(pnp_text));
document.getElementById("fillbm").addEventListener("click", e => fillWith(bm_text));
document.getElementById("filludhr").addEventListener("click", e => fillWith(udhr_text));
