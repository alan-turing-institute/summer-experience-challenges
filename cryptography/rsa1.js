function isPrime(num) {
    if (num < 2 || isNaN(num)) return false;

    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i == 0) return false;
    }
    return true;
}

// using Euclid's algorithm
function gcd(n1, n2) {
    if (n1 <= 0 || n2 <= 0 || isNaN(n1) || isNaN(n2)) return false;

    const x = Math.max(n1, n2);
    const y = Math.min(n1, n2);

    const r = x % y;
    if (r == 0) return y;
    else return gcd(y, r);
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
        const factor = gcd(e, phi);
        if (factor == 1) {
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

    if (isNaN(m) || m < 0) {
        outdiv.style.color = "red";
        outdiv.innerHTML = "m cannot be negative";
        // Should never reach here as the input is sanitised
        return;
    }
    else if (m > n) {
        outdiv.style.color = "red";
        outdiv.innerHTML = "m cannot be larger than n";
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
    // make sure all inputs are positive numbers
    for (const id of ["rsa-p", "rsa-q", "rsa-e", "rsa-d", "rsa-m"]) {
        enforcePosNumberInput(id);
    }
    // clear all outputs
    for (const id of ["rsa-pq-out", "rsa-e-out", "rsa-d-out", "rsa-m-out"]) {
        document.getElementById(id).innerHTML = "";
    }
    // recalculate outputs
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

function factorise(n, existing_factors) {
    if (n == 1) return existing_factors;

    for (let i = 2; i <= Math.ceil(Math.sqrt(n)); i++) {
        if (n % i == 0) {
            n = n / i;
            existing_factors.push(i);
            return factorise(n, existing_factors);
        }
    }
    // No factors found -- n is prime
    return existing_factors.concat([n]);
}

// calculate gcd(a,b) but with b already factorised. Much faster if b is a constant.
function gcd2(a, prime_factors_of_b) {
    for (const f of prime_factors_of_b) {
        if (a % f == 0) {
            return f;
        }
    }
    return 1;
}

// calculates a value for e based on p and q
function generateE() {
    const result1 = recalcNPhi();
    if (result1 !== null) {
        const [_, phi] = result1;
        // Tabulate all possible values of e
        let possibleEs = [];
        const factorisedPhi = factorise(phi, []);
        for (let e = 2; e < phi; e++) {
            if (gcd2(e, factorisedPhi) === 1) {
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
