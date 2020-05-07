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
	MathJax.typeset();
}

function printInput(){
	result.innerText = "`"+ getMyText()+"`";
		MathJax.typeset();
}

//Event Listeners
input.addEventListener("input", printInput);
goButton.addEventListener("click", printResult);

input.onkeyup = function(e){
    if(e.keyCode == 13){
       printResult();
    }
}