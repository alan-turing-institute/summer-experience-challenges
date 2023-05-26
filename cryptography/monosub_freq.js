function cleanText() {
    const input = document.getElementById("text_analysis").value;
    const cleaned = input.toUpperCase().replace(/[^A-Z]/g, "");
    document.getElementById("text_analysis").value = cleaned;
}
function getCounts(words) {
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
    // Sort by prevalence
    let sortedCounts = [...counts.entries()].sort((a, b) => b[1] - a[1]);
    // Construct data in the form Plotly wants
    let data = { 'x': [], 'y': [], 'type': 'bar' };
    for (const item of sortedCounts) {
        data.x.push(item[0]);
        data.y.push(item[1]);
    }
    return data;
}

const encPlotDiv = document.getElementById("plot");
const decPlotDiv = document.getElementById("decplot");
const layout = { 'margin': { 'b': 30, 'l': 40, 'r': 30, 't': 30 } };

function plotUpdate(textElementId = "text_analysis", targetDivId = "plot") {
    const targetDiv = document.getElementById(targetDivId);
    const words = document.getElementById(textElementId).value;
    Plotly.react(targetDiv, [getCounts(words)], layout);
    if (words.length > 0) {
        targetDiv.style.display = "block";
    } else {
        targetDiv.style.display = "none";
    }
}

document.getElementById("text_analysis").addEventListener("input", cleanText);
document.getElementById("text_analysis").addEventListener("input", plotUpdate);
Plotly.newPlot(encPlotDiv, [{ 'x': [], 'y': [], 'type': 'bar' }], layout);
plotUpdate("text_analysis", "plot");


function fillWith(text, elementId) {
    document.getElementById(elementId).value = text;
    cleanText();
    plotUpdate();
}
document.getElementById("fillpnp").addEventListener("click", _ => fillWith(pnp_text, "text_analysis"));
document.getElementById("fillbm").addEventListener("click", _ => fillWith(bm_text, "text_analysis"));
document.getElementById("filludhr").addEventListener("click", _ => fillWith(udhr_text, "text_analysis"));
fillWith(enc_text, "input-decode");

Plotly.newPlot(decPlotDiv, [{ 'x': [], 'y': [], 'type': 'bar' }], layout);
plotUpdate("input-decode", "decplot");
