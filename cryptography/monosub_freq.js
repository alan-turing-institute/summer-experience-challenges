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
    let data = {'x': [], 'y': [], 'type': 'bar'};
    for (const item of sortedCounts) {
        data.x.push(item[0]);
        data.y.push(item[1]);
    }
    return data;
}

const plotDiv = document.getElementById("plot");
const layout = {'margin' : {'b': 30, 'l': 40, 'r': 30, 't': 30}};
function plotUpdate() {
    const words = document.getElementById("text_analysis").value;
    Plotly.react( plotDiv, [getCounts(words)], layout );
    if (words.length > 0) {
        plotDiv.style.display = "block";
    } else {
        plotDiv.style.display = "none";
    }
}

document.getElementById("text_analysis").addEventListener("input", cleanText);
document.getElementById("text_analysis").addEventListener("input", plotUpdate);
Plotly.newPlot( plotDiv, [{'x': [], 'y': [], 'type': 'bar'}], layout);
plotUpdate();


function fillWith(text) {
    document.getElementById("text_analysis").value = text;
    cleanText();
    plotUpdate();
}
document.getElementById("fillpnp").addEventListener("click", e => fillWith(pnp_text));
document.getElementById("fillbm").addEventListener("click", e => fillWith(bm_text));
document.getElementById("filludhr").addEventListener("click", e => fillWith(udhr_text));
