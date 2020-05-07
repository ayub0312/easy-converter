//Defining elements

var input = document.getElementById("input");
var result = document.getElementById("result");
var goButton = document.getElementById("go");

//Core functions

function getMyText() {
	return input.value;
}

function printResult(){
	result.innerText = "`" + getMyText() + " = " + eval(getMyText()) + "`";
}

function printInput(){
	result.innerText = "`"+ getMyText()+"`";
}

//Event Listeners
input.addEventListener("input", printInput);
goButton.addEventListener("click", printResult);

input.onkeyup = function(e){
    if(e.keyCode == 13){
       printResult();
    }
}