function cleanText(id) {
    // Capitalise all letters and remove all non-letters
    const input = document.getElementById(id).value;
    const cleaned = input.toUpperCase().replace(/[^A-Z]/g, "");
    document.getElementById(id).value = cleaned;
}

function caseInsensitiveEq(s1, s2) {
    return typeof s1 === 'string' && typeof s2 === 'string'
        ? s1.localeCompare(s2, undefined, { sensitivity: 'base' }) === 0
        : s1 === s2;
}

function checkPassword(password) {
    // Checks the password field against a specified password, and displays the
    // rest of the page's contents if it is correct
    const guess = document.forms["page-password-check"]["page-password"].value;
    if (caseInsensitiveEq(guess, password)) {
        document.forms["page-password-check"]["page-password"].style.backgroundColor = "#d7fae9";
        setTimeout(() => {
            document.getElementById("page-content").style.display = "block";
            document.getElementById("page-password-form").style.display = "none";
        }, 300);
    }
    else {
        document.forms["page-password-check"]["page-password"].style.backgroundColor = "#fad9d7";
        setTimeout(() => {
            document.forms["page-password-check"]["page-password"].style.backgroundColor = "";
        }, 300);
    }
}
