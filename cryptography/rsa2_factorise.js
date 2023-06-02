// General functions

function timeIt(callback, n = 1) {
    const start = performance.now();
    let result;
    for (let i = 0; i < n; i++) {
        result = callback();
    }
    const end = performance.now();
    return [result, (end - start) / n];
}

// Base-10 logarithm on bigint
function log10(n) {
  const s = n.toString();
  return s.length + Math.log10("0." + s.substring(0, 15))
}

// TODO improve behaviour on large primes
function factorise(n) {
    let factors = [];
    let d = 2n;
    while (n > 1) {
        while (n % d === 0n) {
            factors.push(d);
            n /= d;
        }
        d = d + 1n;
    }
    return factors;
}


// Section 9.2 calculator box

function makeHtmlFromFactors(factors) {
    // Group factors that are the same
    let groupedFactors = new Map();
    for (const factor of factors) {
        if (groupedFactors.has(factor)) {
            groupedFactors.set(factor, groupedFactors.get(factor) + 1);
        } else {
            groupedFactors.set(factor, 1);
        }
    }
    // Construct HTML
    return [...groupedFactors
        .entries()]
        .map(([factor, exponent]) => exponent === 1 ? factor.toString() : `${factor}<sup>${exponent}</sup>`)
        .join(" &times; ");
}


document.getElementById("factorise-input").addEventListener("input", function() {
    enforcePosNumberInput("factorise-input");
});
document.getElementById("factorise-button").addEventListener("click", function() {
    let n = BigInt(document.getElementById("factorise-input").value);
    if (n < 2) {
        document.getElementById("factorise-result").innerHTML = "";
        return;
    }
    document.getElementById("factorise-time").innerHTML = "";
    document.getElementById("factorise-result").innerHTML = "Calculating...";
    setTimeout(() => {
        let [factors, time] = timeIt(() => factorise(n), 5);
        if (factors.length === 1) {
            document.getElementById("factorise-result").innerHTML = `prime!`;
        } else {
            document.getElementById("factorise-result").innerHTML = makeHtmlFromFactors(factors);
        }
        document.getElementById("factorise-time").innerHTML = `(Took: ${time.toFixed(1)} ms)`;
    }, 10);
});


// Section 9.2 bullet points

function factoriseThis(n) {
    document.getElementById("factorise-input").scrollIntoView({ behavior: "smooth" });
    document.getElementById("factorise-input").value = n;
    document.getElementById("factorise-button").click();
}
const examples = [1822862989n, 18791071561n, 168317527121n, 1711588692607n,
    12305793468907n, 196249257362329n, 1658760184264121n, 19626387663901583n]
examples.forEach((n, i) => {
    document.getElementById(`example${i + 1}`).innerHTML = n;
    document.getElementById(`factoriseThis${i + 1}`).addEventListener("click", () => factoriseThis(n))
});


// Section 9.3 table
for (let i = 1; i <= 8; i++) {
    document.getElementById(`in${i}`).addEventListener("input", function() {
        enforcePosNumberInput(`in${i}`);
    });
    document.getElementById(`fact${i}`).addEventListener("click", function() {
        let n = BigInt(document.getElementById(`in${i}`).value);
        if (n < 2) {
            return;
        }
        document.getElementById(`time${i}`).value = "";
        document.getElementById(`fact${i}`).value = "Calculating...";
        setTimeout(() => {
            let [_, time] = timeIt(() => factorise(n), 5);
            document.getElementById(`time${i}`).value = time.toFixed(1);
            document.getElementById(`fact${i}`).value = "Factorise...";
        }, 10);
    });
}

// Section 9.3 plot
// Prefill from examples
for (let i = 1; i <= 8; i++) {
    document.getElementById(`in${i}`).value = examples[i - 1];
}

function getValidValuesFromTable() {
    let numbers = [];
    let times = [];
    for (let i = 1; i <= 8; i++) {
        let n = BigInt(document.getElementById(`in${i}`).value);
        let time = parseFloat(document.getElementById(`time${i}`).value);
        if (n >= 2 && time > 0) {
            numbers.push(log10(n));
            times.push(Math.log10(time));
        }
    }
    return [numbers, times];
}

let chart = new Chart("rsa-plot-canvas", {
    type: "scatter",
    data: {
        labels: [],
        datasets: [{
            data: [],
        }],
    },
    options: {
        plugins: {
            legend: {
                display: false,
            },
            title: {
                text: "",
                font: {
                    size: 14,
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "log10(n)",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "log10(time / ms)",
                },
            },
        },
    },
});

function drawChart() {
    document.getElementById("plot-feedback").innerHTML = "";
    let [numbers, times] = getValidValuesFromTable();
    // perform linear regression
    const xbar = numbers.reduce((a, b) => a + b, 0) / numbers.length;
    const ybar = times.reduce((a, b) => a + b, 0) / times.length;
    const sxy = numbers.map((n, i) => (n - xbar) * (times[i] - ybar)).reduce((a, b) => a + b, 0);
    const sxx = numbers.map(n => (n - xbar) ** 2).reduce((a, b) => a + b, 0);
    const m = sxy / sxx;
    const c = ybar - (m * xbar);

    if (numbers.length < 2) {
        document.getElementById("plot-feedback").innerHTML = "Need at least 2 valid values";
    } else {
        chart.data.labels = numbers;
        chart.data.datasets[0].data = times;
        chart.data.datasets[1] = {
            label: "Linear regression",
            type: "line",
            data: numbers.map(x => m * x + c),
            pointRadius: 0,
        }
        chart.options.plugins.title.display = true;
        let titleText = c > 0 
            ? `log10(time/ms) = ${m.toFixed(2)} * log10(n) + ${c.toFixed(2)}`
            : `log10(time/ms) = ${m.toFixed(2)} * log10(n) - ${Math.abs(c).toFixed(2)}`;
        chart.options.plugins.title.text = titleText;
        chart.update();
    }
}

document.getElementById("plot").addEventListener("click", drawChart);
