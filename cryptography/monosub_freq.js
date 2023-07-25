function cleanText(textareaId = "text_analysis") {
    const input = document.getElementById(textareaId).value;
    const cleaned = input.toUpperCase().replace(/[^A-Z]/g, "");
    document.getElementById(textareaId).value = cleaned;
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
    // Construct data in the form Chart.js wants
    return {
        labels: [...sortedCounts.map(x => x[0])],
        datasets: [{
            data: [...sortedCounts.map(x => x[1])],
        }],
    };
}

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

let encPlot = new Chart("plot-canvas", {
    type: 'bar',
    data: getCounts(document.getElementById("text_analysis").value),
    options: chartOptions,
});
let decPlot = new Chart("decplot-canvas", {
    type: 'bar',
    data: getCounts(document.getElementById("input-decode").value),
    options: chartOptions,
});
function plotUpdate(textElementId = "text_analysis", targetChart = encPlot) {
    const words = document.getElementById(textElementId).value;
    targetChart.data = getCounts(words);
    targetChart.update('none');

    if (words.length == 0) {
        targetChart.clear();
    }
}

document.getElementById("text_analysis").addEventListener("input", () => cleanText("text_analysis"));
document.getElementById("text_analysis").addEventListener("input", () => plotUpdate("text_analysis", encPlot));
document.getElementById("input-decode").addEventListener("input", () => plotUpdate("input-decode", decPlot));
plotUpdate("text_analysis", encPlot);
plotUpdate("input-decode", decPlot);

function fillWith(text, textareaId) {
    document.getElementById(textareaId).value = text;
    cleanText(textareaId);
    plotUpdate(textareaId, textareaId == "text_analysis" ? encPlot : decPlot);
}
document.getElementById("fillpnp").addEventListener("click", _ => fillWith(pnp_text, "text_analysis"));
document.getElementById("fillbm").addEventListener("click", _ => fillWith(bm_text, "text_analysis"));
document.getElementById("filludhr").addEventListener("click", _ => fillWith(udhr_text, "text_analysis"));
fillWith(enc_text, "input-decode");
