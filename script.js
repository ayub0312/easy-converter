function getMyText() {
	return document.getElementById("input").value;
}
function printResult(){
	document.getElementById("result").innerText = eval(getMyText());
}
document.getElementById("go").addEventListener("click", printResult);

document.getElementById("input").onkeyup = function(e){
    if(e.keyCode == 13){
       printResult();
    }
}