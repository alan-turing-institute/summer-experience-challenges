function cleanText(textareaId) {
    const input = document.getElementById(textareaId).value;
    const cleaned = input.toUpperCase().replace(/[^A-Z]/g, "");
    document.getElementById(textareaId).value = cleaned;
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
    // Construct data in the form Chart.js wants
    return {
        labels: [...sortedCounts.map(x => x[0])],
        datasets: [{
            data: [...sortedCounts.map(x => x[1])],
        }],
    };
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
function makeLayout(textElementId = "text_analysis") {
    const text = document.getElementById(textElementId).value;
    return {
        'margin': { 'b': 30, 'l': 40, 'r': 30, 't': 30 },
        'title': `Index of coincidence: ${ioc(text).toFixed(2)}`
    }
};

const chartOptions = {
    scales: {
        x: {
            ticks: {
                maxRotation: 0,
                minRotation: 0,
            },
        },
    },
    plugins: {
        legend: {
            display: false,
        },
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
};

let iocPlot = new Chart('ioc-canvas', {
    type: 'bar',
    data: getCounts(document.getElementById("text_analysis").value),
    options: chartOptions,
});

function plotUpdate(textElementId = "text_analysis", targetChart = iocPlot) {
    const words = document.getElementById(textElementId).value;
    targetChart.data = getCounts(words);
    targetChart.options.plugins.title = {
        display: true,
        text: `Index of coincidence: ${ioc(words).toFixed(2)}`,
        font: { size: 14 },
    };
    targetChart.update('none');
    if (words.length == 0) {
        targetChart.clear();
    }
}


document.getElementById("text_analysis").addEventListener("input", () => cleanText("text_analysis"));
document.getElementById("text_analysis").addEventListener("input", () => plotUpdate("text_analysis", iocPlot));
plotUpdate("text_analysis", iocPlot);



/* 4.2.2 Cracking the Vigenere cipher */

let iocPlots = [];
// Initialise chart objects for 1 through 4
for (let i = 1; i < 5; i++) {
    const plotCanvasId = `vigplot-${i}-canvas`;
    const textareaId = `ct-vig-${i}`;
    let chart = new Chart(plotCanvasId, {
        type: 'bar',
        data: getCounts(document.getElementById(textareaId).value),
        options: chartOptions,
    });
    iocPlots.push(chart);
}

function vigAnalysis(keyLength) {
    console.log("In vigAnalysis with keyLength " + keyLength);
    const origText = vig_txt;
    for (let i = 1; i < 5; i++) {
        const leftHalfDiv = document.getElementById(`vigtext-${i}`);
        const rightHalfDiv = document.getElementById(`vigplot-${i}`);
        const textDiv = document.getElementById(`vigtext-${i}-text`);
        const textareaId = `ct-vig-${i}`;

        if (i <= keyLength) {
            const txt = `Letters ${i}, ${i + keyLength}, ${i + 2 * keyLength}, ... of ciphertext`;
            textDiv.innerHTML = txt;
            // get every nth letter from the ciphertext
            let ctext = "";
            for (let j = 0; j < origText.length; j++) {
                if ((j % keyLength) == (i - 1)) {
                    ctext += origText[j];
                }
            }
            document.getElementById(textareaId).value = ctext;
            let plot = iocPlots[i - 1];
            plotUpdate(textareaId, plot);
            leftHalfDiv.style.display = "block";
            rightHalfDiv.style.display = "block";
        } else {
            leftHalfDiv.style.display = "none";
            rightHalfDiv.style.display = "none";
        }
    }
}

function fillWith(text, elementId = "text_analysis", plot = iocPlot) {
    document.getElementById(elementId).value = text;
    cleanText(elementId);
    plotUpdate(elementId, plot);
}
document.getElementById("fillpnp").addEventListener("click", _ => fillWith(pnp_text));
document.getElementById("fillbm").addEventListener("click", _ => fillWith(bm_text));
document.getElementById("filludhr").addEventListener("click", _ => fillWith(udhr_text));
document.getElementById("fillrand").addEventListener("click", _ => fillWith(random_text));
for (let i = 2; i < 5; i++) {
    const keyLengthGuess = i;
    document.getElementById("keylength-" + i).addEventListener("click", _ => vigAnalysis(keyLengthGuess));
}

// Hide the Vigenere analysis divs by setting keyLength to 0 initially
vigAnalysis(0);
