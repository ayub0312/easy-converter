//algebra objects
var algebra = require('./libraries/algebra.js');
var math = require('math.js');
console.log(math.round(math.e,3));

var Fraction = algebra.Fraction;
var Expression = algebra.Expression;
var Equation = algebra.Equation;
leftSide = algebra.parse("M*L*L*T^-2");
rightSide = algebra.parse("x");
equation = new Equation(leftSide,rightSide);
console.log(equation.toString());