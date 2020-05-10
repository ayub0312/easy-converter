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
	[exp,prettyExp] = parseInput();
/*		if (exp.indexOf("=")==-1){
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
			equationRaw = exp.split(/(\s*\=\s*)/);
			leftSide = algebra.parse(equationRaw[0]);
			rightSide = algebra.parse(equationRaw[1]);
			console.log("leftSide" + leftSide);
			console.log("rightSide" + rightSide);
			var equation = new Equation(leftSide,rightSide);
			console.log(equation.toString());
			var answer = equation.solveFor("x").toString();
			result.innerText = "`" + "x = " + answer + "`";
	}
*/
	result.innerText = "`" + prettyExp+ " = " + eval(exp).toPrecision(4) + "`" ;
	MathJax.typeset();
}

function printInput(){
	console.clear();
	[exp,prettyExp] = parseInput();
	result.innerText = "`"+ prettyExp +"`";
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

function parseInput (){
	exp = input.value;
	prettyExp = input.value;
	exp = exp.split(" ").join(""); //remove spaces

	var units = exp.split(/[\dx=*+()\[\]/^-]|pi/);
	units = units.filter(function (el){
		return el!="";
	});
	//exp.split(/(?<!\^|[a-z])\d/).join("").split(/[x=*+()\[\]/]/); //extract units
	console.log("UNITS: " + units);
	unitExp = exp.split(/((\d+|pi|x)(\^\d+)?\*?)+(\/((\d+|pi|x)(\^\d+)?\*?)+)?\s*/);
	unitExp = unitExp.filter(function (el){
		return /([A-Za-z]+([*.-](?!\d))?(\^\d+)?)+(\/([A-Za-z]+([*.-](?!\d))?(\^\d+)?)+)?/.test(el);
	});
	unitExp = unitExp.filter(function (el){
	return el!=undefined;
	});
	console.log("unit groups filtered: " + unitExp);
	exp = exp.replace(/(((\d+|pi|x)(\^\d+)?\*?)+(\/((\d+|pi|x)(\^\d+)?\*?)+)?\s*(([A-Za-z]+([*.-](?!\d))?(\^\d+)?)+(\/([A-Za-z]+([*.-](?!\d))?(\^\d+)?)+)?))/g, "($1)"); //capture in bracket
	prettyExp = exp;
	exp = exp.replace(/(((\d+|pi|x)(\^\d+)?\*?)+(\/((\d+|pi|x)(\^\d+)?\*?)+)?)\s*(([A-Za-z]+[*.-]?(\^\d+)?)+(\/([A-Za-z]+[*.-]?(\^\d+)?)+)?)/g, "$1*$9"); //Add * b/w digits and units
	exp = exp.replace(/(([A-Za-z.-]+[*.-]?(\^\d+)?)+)\/(([A-Za-z]+[*.-]?(\^\d+)?)+)/g,"($1)/($4)"); //Add brackets for fraction units
	exp.replace("**","*"); //correcting for two stars

	prettyExp = prettyExp.replace(/(([A-Za-z.-]+[*.-]?(\^\d+)?)+)\/(([A-Za-z]+[*.-]?(\^\d+)?)+)/g,"($1)/($4)"); //Add brackets for fraction units

	

	console.log("Parsed expression (pre-unit): " + exp);
	console	.log("Parsed pretty expression (pre-unit: "+prettyExp)

	for (var key of units){
		if (unitTable.hasOwnProperty(key)){
			console.log(key + " found");
			var detectedUnitRaw = new RegExp(key,"g");
			var detectedUnitWithoutOperator = new RegExp("(?<![*/])"+key,"g");
			var detectedUnitWithTimes    = new RegExp("(?<=[*])"+key,"g");
			var detectedUnitWithSlash = new RegExp("(?<=[/])"+key,"g");		
			prettyExp = prettyExp.replace(detectedUnitRaw,"\\color{green}{"+unitTable[key].disp+"}");
			exp = exp.replace(detectedUnitRaw,unitTable[key].val);
		}
	}
	console.log("numerical expression: " + exp);
	console.log("pretty expression: " + prettyExp);
	return [exp,prettyExp];
}

//Table of all Units

var	unitTable = expand ({
		"kPa, kpa, kilopascal, kiloPascal"		: {val: "10^3", disp: "kPa", dimension: "M*L^(-1)*T^(-2)" },
		//length
		"in"									: {val: "0.0254", disp: "i n", dimension: "L"},
		"in^2, in2, inch^2,inch2, sq.in"		: {val: "0.0254^2", disp: "i n^2", dimension: "L"},
		"km, kilometer, KM"						: {val: "1000", disp: "km", dimension: "L"},
		"m, meter"								: {val: "1", disp: "m", dimension: "L"}, 
		"N, Newton"								: {val: "1", disp: "N", dimension: "M*L*T^-2"}, 
		"kph,kmph"								: {val: "0.27777777", disp: "kph", dimension: "L*T^-1"},
		"hr, hour, hrs"							: {val: "3600", disp: "hr", dimension: "T"},
		"s, sec, second, seconds"				: {val: "3600", disp: "s", dimension: "T"},
	});

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