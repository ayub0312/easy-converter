function getMyText() {
	return document.getElementById("input").value;
}
function printResult(){
	document.getElementById("result").innerText = eval(getMyText());
}
function printInput(){
	document.getElementById("result").innerText = getMyText();
}


document.getElementById("input").addEventListener("change",printInput);
document.getElementById("go").addEventListener("click", printResult);

document.getElementById("input").onkeyup = function(e){
    if(e.keyCode == 13){
       printResult();
    }
}