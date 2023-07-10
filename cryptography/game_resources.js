// Produce quotient and remainder of n = qd + r
// nInputId (string): id of input element containing n
// dInputId (string): id of input element containing d
// qSpanId (string): id of span element where q is to be displayed
// rSpanId (string): id of span element where r is to be displayed
function quotient_remainder(nInputId, dInputId, qSpanId, rSpanId) {
    const n = parseInt(document.getElementById(nInputId).value);
    const d = parseInt(document.getElementById(dInputId).value);
    // console.log("is this going to this function?");
    if (isNaN(n) || isNaN(d)) {
        // console.log("and how about this place?");
        document.getElementById(qSpanId).innerHTML = "";
        document.getElementById(rSpanId).innerHTML = "";
    }
    else {
        const q = Math.floor(n / d);
        const r = n % d;
        // console.log("if it is going down here I want a print out of q and r");
        // console.log(q)
        // console.log(r)
        document.getElementById(qSpanId).innerHTML = q;
        document.getElementById(rSpanId).innerHTML = r;
    }
}

function calc_m() {
    for (const inputId of ["c1", "d1", "n1"]) {
        document.getElementById(inputId).addEventListener("input", () => {
            enforcePosNumberInput(inputId);
            calculateM("c1", "d1", "n1", "m1-calc");
        })
    }
}

function calc_c() {
    for (const inputId of ["c2", "d2", "n2"]) {
        document.getElementById(inputId).addEventListener("input", () => {
            enforcePosNumberInput(inputId);
            calculateM("c2", "d2", "n2", "m2-calc");
        })
    }
}

function calc_qr() {
    for (const inputId of ["nh", "dh"]) {
        // console.log("here I am");
        document.getElementById(inputId).addEventListener("input", () => {
            // enforcePosNumberInput(inputId);
            quotient_remainder("nh", "dh", "qh-calc", "rh-calc");
        });
        // console.log("and here");
    };
};


calc_m();
calc_c();
calc_qr();
