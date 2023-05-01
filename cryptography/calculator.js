function validateModulus() {
    const modulus = document.getElementById("modulus").value;
    const fixed = modulus.replace(/[^0-9]/g, "");
    if (fixed == "0") {
        document.getElementById("modulus").value = "";
    } else {
        document.getElementById("modulus").value = fixed;
    }
}

function getResult() {
    // Check for an empty expression
    let expr = document.getElementById("expr").value;
    if (expr == "") {
        document.getElementById("answer").innerHTML = "";
        return;
    }
    // Attempt to evaluate the expression
    let val;
    try {
        val = math.evaluate(document.getElementById("expr").value);
    } catch (e) {
        document.getElementById("answer").innerHTML = "";
        return;
    }
    // Check for overly large number
    if (val > 1e64) {
        document.getElementById("answer").innerHTML = "Too large!";
        return;
    }
    // Take the modulus if needed, and display the result
    const modulus = document.getElementById("modulus").value;
    if (modulus == "") {
        document.getElementById("answer").innerHTML = val.toString();
    }
    else {
        const modulusInt = parseInt(modulus);
        document.getElementById("answer").innerHTML = math.evaluate(`(${expr}) mod ${modulusInt}`).toString();
    }
}

document.getElementById("modulus").addEventListener("input", validateModulus);
document.getElementById("expr").addEventListener("input", getResult);
document.getElementById("modulus").addEventListener("input", getResult);
