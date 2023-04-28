function cleanText(id) {
    // Capitalise all letters and remove all non-letters
    const input = document.getElementById(id).value;
    const cleaned = input.toUpperCase().replace(/[^A-Z]/g, "");
    document.getElementById(id).value = cleaned;
}
