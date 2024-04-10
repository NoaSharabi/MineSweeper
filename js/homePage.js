document.getElementById("button1").addEventListener("click",addUser)
document.getElementById("start").addEventListener("click", function () {
    localStorage.setItem("ifNew", 0);
})
document.getElementById("continue").addEventListener("click", function () {
    localStorage.setItem("ifNew", 1);
})
function addUser() {
    if (document.getElementById('input_name').value == ""||
    document.getElementById('input_password').value == "") {
        document.getElementById("f1").style.display = "none";
        document.getElementById("alert1").style.display = "block";

    }
    else {
        document.getElementById("f1").style.display = "block";
        document.getElementById("frame").style.display = "none";
        localStorage.setItem("name1",document.getElementById("input_name").value)

    } 
}