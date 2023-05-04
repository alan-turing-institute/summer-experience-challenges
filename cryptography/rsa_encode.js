function isPrime(num) {
    if (num < 2 || isNaN(num)) return false;

    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i == 0) return false;
    }
    return true;
}

function validate(id) {
    const val = document.getElementById(id).value;
    const fixed = val.replace(/[^0-9]/g, "");
    if (fixed == "0") {
        document.getElementById(id).value = "";
    } else {
        document.getElementById(id).value = fixed;
    }
}

// Returns the smallest shared prime factor of n1 and n2, or null if none exists
function primeFactor(n1, n2) {
    if (n1 < 2 || n2 < 2 || isNaN(n1) || isNaN(n2)) return false;

    for (let i = 2; i <= Math.min(n1, n2); i++) {
        if (n1 % i == 0 && n2 % i == 0) return i;
    }
    return null;
}

function recalcNPhi() {
    const p = parseInt(document.getElementById("rsa-p").value);
    const q = parseInt(document.getElementById("rsa-q").value);

    if (isNaN(p) || isNaN(q) || p < 2 || q < 2) {
        return null;
    }

    // make sure both are valid primes
    const p_prime = isPrime(p);
    const q_prime = isPrime(q);
    const outdiv = document.getElementById("rsa-pq-out");
    if (p_prime && q_prime) {
        const n = p * q;
        const phi = (p - 1) * (q - 1);
        const space = "&nbsp;".repeat(4);
        outdiv.style.color = "green";
        outdiv.innerHTML = `⇒   OK! n = ${n}; ${space} φ = ${p - 1} × ${q - 1} = ${phi}`;
        return [n, phi];
    }
    else if (!p_prime) {
        outdiv.style.color = "red";
        outdiv.innerHTML = "p is not prime";
        return null;
    }
    else {
        outdiv.style.color = "red";
        outdiv.innerHTML = "q is not prime";
        return null;
    }
}

function recalcE(phi) {
    const e = parseInt(document.getElementById("rsa-e").value);
    const outdiv = document.getElementById("rsa-e-out");
    if (isNaN(e) || e < 2) {
        return null;
    }
    else if (e > phi) {
        outdiv.style.color = "red";
        outdiv.innerHTML = `⇒   e cannot be larger than φ`;
        return null;
    }
    else {
        const factor = primeFactor(e, phi);
        if (factor === null) {
            outdiv.style.color = "green";
            outdiv.innerHTML = "⇒   OK!";
            return e;
        } else {
            outdiv.style.color = "red";
            outdiv.innerHTML = `⇒   e and φ share a factor of ${factor}`;
            return null;
        }
    }
}

function recalcD(e, phi) {
    const d = parseInt(document.getElementById("rsa-d").value);
    const outdiv = document.getElementById("rsa-d-out");

    if (isNaN(d) || d < 2) {
        outdiv.innerHTML = "";
        return null;
    }
    else {
        const emodphi = e % phi;
        const dmodphi = d % phi;
        const edmodphi = (emodphi * dmodphi) % phi;
        if (edmodphi == 1) {
            outdiv.style.color = "green";
            outdiv.innerHTML = `⇒ OK! d × e = ${e * d} ≡ ${edmodphi} mod ${phi}`;
            return d;
        }
        else {
            outdiv.style.color = "red";
            outdiv.innerHTML = `⇒ d × e = ${e * d} ≡ ${edmodphi} mod ${phi}`;
            return null;
        }
    }
}

function recalcM(e, d, n) {
    const m = parseInt(document.getElementById("rsa-m").value);
    const outdiv = document.getElementById("rsa-m-out");

    if (isNaN(m) || m < 0 || m >= n) {
        outdiv.innerHTML = "";
        return;
    }
    else {
        const c = powmod(m, e, n);
        const m2 = powmod(c, d, n);
        outdiv.innerHTML = `⇒ [Encode] c = ${m}^${e} mod ${n} = ${c}<br>⇒ [Decode] m = ${c}^${d} mod ${n} = ${m2}`;
        if (m == m2) {
            outdiv.style.color = "green";
        }
        else {
            outdiv.style.color = "red";   // Shouldn't happen, but yeah.
        }
    }
}

function recalc() {
    validate("rsa-p");
    validate("rsa-q");
    validate("rsa-e");
    validate("rsa-d");
    validate("rsa-m");

    document.getElementById("rsa-pq-out").innerHTML = "";
    document.getElementById("rsa-e-out").innerHTML = "";
    document.getElementById("rsa-d-out").innerHTML = "";
    document.getElementById("rsa-m-out").innerHTML = "";

    const result1 = recalcNPhi();
    if (result1 !== null) {
        const [n, phi] = result1;
        const e = recalcE(phi);
        if (e !== null) {
            const d = recalcD(e, phi);
            if (d !== null) {
                recalcM(e, d, n);
            }
        }
    }
}

// calculates (base ^ exp) % mod while avoiding overflow/rounding errors
function powmod(base, exp, mod) {
    let result = 1;
    for (let i = 0; i < exp; i++) {
        result = (result * base) % mod;
    }
    return result;
}

// calculates a value for e based on p and q
function generateE() {
    const result1 = recalcNPhi();
    if (result1 !== null) {
        const [_, phi] = result1;
        // Tabulate all possible values of e
        let possibleEs = [];
        for (let e = 2; e < phi; e++) {
            if (primeFactor(e, phi) === null) {
                possibleEs.push(e);
            }
        }
        // Choose a random one
        console.log(possibleEs);
        const chosen = possibleEs[Math.floor(Math.random() * possibleEs.length)];
        document.getElementById("rsa-e").value = chosen;
        recalc();
        return;
    }
}

// calculates modular inverse -- not with Bezout's identity, but by brute force
function modinv(e, phi) {
    for (let d = 2; d < phi; d++) {
        if ((e * d) % phi == 1) {
            return d;
        }
    }
    return null;
}

function generateD() {
    const result1 = recalcNPhi();
    if (result1 !== null) {
        const [_, phi] = result1;
        const e = recalcE(phi);
        if (e !== null) {
            const d = modinv(e, phi);
            if (d !== null) {
                document.getElementById("rsa-d").value = d;
                recalc();
                return;
            }
        }
    }
}

function generatePQ() {
    const primes = [2, 3, 5, 7, 11, 13, 17,
        19, 23, 29, 31, 37, 41, 43, 47, 53,
        59, 61, 67, 71, 73, 79, 83, 89, 97,
        101, 103, 107, 109, 113, 127, 131,
        137, 139, 149];
    // Sample without replacement
    const p = primes[Math.floor(Math.random() * primes.length)];
    const primes2 = primes.filter(x => x != p);
    const q = primes2[Math.floor(Math.random() * primes2.length)];
    document.getElementById("rsa-p").value = p;
    document.getElementById("rsa-q").value = q;
    recalc();
}

document.getElementById("rsa-p").addEventListener("input", recalc);
document.getElementById("rsa-q").addEventListener("input", recalc);
document.getElementById("rsa-e").addEventListener("input", recalc);
document.getElementById("rsa-d").addEventListener("input", recalc);
document.getElementById("rsa-m").addEventListener("input", recalc);
document.getElementById("rsa-e-hint").addEventListener("click", generateE);
document.getElementById("rsa-d-hint").addEventListener("click", generateD);
document.getElementById("rsa-pq-hint").addEventListener("click", generatePQ);
recalc();
