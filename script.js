//algebra objects
var Fraction = algebra.Fraction;
var Expression = algebra.Expression;
var Equation = algebra.Equation;

//Defining variables
var leftSide;
var rightSide;
var unitValues;

//Defining elements

var input = document.getElementById("input");
var result = document.getElementById("result");
var goButton = document.getElementById("go");

//Core functions

function printResult(){
	[exp,prettyExp] = evalUnits();
		if (exp.indexOf("=")==-1){
			console.log("equal sign not present");
			leftSide = algebra.parse(exp);
			rightSide = algebra.parse("x");
			console.log("leftSide: "+leftSide.toString());
			console.log("rightSide: "+rightSide.toString());	
			var equation = new Equation(leftSide,rightSide);
			console.log(equation.toString());
			var answer = equation.solveFor("x").toString();
			result.innerText = "`" + prettyExp + " = " + answer + "`";
			
	} else {
			console.log("equal sign detected");
			equationRaw = exp.split(/\s*\=\s*/);
			leftSide = algebra.parse(equationRaw[0]);
			rightSide = algebra.parse(equationRaw[1]);
			console.log("leftSide" + leftSide);
			console.log("rightSide" + rightSide);
			var equation = new Equation(leftSide,rightSide);
			console.log(equation.toString());
			var answer = equation.solveFor("x").toString();
			result.innerText = "`" + "x = " + answer + "`";
	}

	MathJax.typeset();
}

function printInput(){
	console.clear();
	[exp,prettyExp] = evalUnits();
	result.innerText = "`"+ prettyExp +"`";
	evalUnits();
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

//Evaluate units

function evalUnits (){
	exp = input.value;
	prettyExp = input.value;
	//Remove spaces
	exp = exp.split(" ").join("");
	console.log("REMOVING SPACES: " + exp);
	//Extracting units/constants
	var units = exp.split(/(?<!\^|[a-z])\d/).join("").split(/[x=/*+()\[\]]/);
	console.log("UNITS: " + units);
	for (var key in unitTable){
		if (units.indexOf(key)!==-1){
			console.log(key + " found");
			val = unitTable[key].val;
			disp = unitTable[key].disp;
			console.log("Replacing " + key +" with "+ val + " and "+ disp);
			prettyExp = prettyExp.replace(key,"\\color{green}{"+disp+"}");
			exp = exp.replace(key,val);
		}
	}
	console.log("unitless expression: " + exp);
	console.log("pretty expression: " + prettyExp);
	return [exp,prettyExp];
}

function expand(obj) {
    var keys = Object.keys(obj);
    //TODO make this for loop shorter
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i],
            subkeys = key.split(/,\s?/),
            target = obj[key];
        delete obj[key];
        subkeys.forEach(function(key) { obj[key] = target; })
    }
    return obj;
}


var	unitTable = expand ({
		"kPa, kilopascal, kiloPascal"			: {val: "10^3", disp: "kPa", dimension: "M*L^(-1)*T^(-2)" }, 
		"in^2, in2, inch^2,inch2, sq.in"		: {val: "0.0254", disp: "i n^2", dimension: "L"}, 
		"N, Newton"								: {val: "1", disp: "N", dimension: "M*L*T^-2"}, 
	});

console.log(unitTable);