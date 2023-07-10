// Exercise 1
for (const inputId of ["c1", "d1", "n1"]) {
    document.getElementById(inputId).addEventListener("input", () => {
        enforcePosNumberInput(inputId);
        calculateM("c1", "d1", "n1", "m1-calc");
    });
}
document.getElementById("check-m1").addEventListener("click",
    () => checkM("m1-answer", "m1-result", 50));
document.getElementById("m1-answer").addEventListener("input", function(){
    enforcePosNumberInput("m1-answer");
    document.getElementById("m1-answer").style.backgroundColor = "white";
    document.getElementById("m1-result").innerHTML = "";
});


// Exercise 2
for (const inputId of ["c2", "d2", "n2"]) {
    document.getElementById(inputId).addEventListener("input", () => {
        enforcePosNumberInput(inputId);
        calculateM("c2", "d2", "n2", "m2-calc");
    });
}
document.getElementById("check-m2").addEventListener("click",
    () => checkM("m2-answer", "m2-result", 500));
document.getElementById("m2-answer").addEventListener("input", function(){
    enforcePosNumberInput("m2-answer");
    document.getElementById("m2-answer").style.backgroundColor = "white";
    document.getElementById("m2-result").innerHTML = "";
});
