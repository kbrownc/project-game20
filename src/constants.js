import { hasRepeatingdigits, isAscening, isExactSquareRoot, isEvenOrOddDigits } from './utils';

export const clues = [
	{
		id: '1',
		clue: 'Divisible by one of (2,3,5)',
		needsInput: false,
		validInput: ['', '2', '3', '5'],
		errCheck: function (numberToGuess, clueInput) {
			return numberToGuess % clueInput !== 0;
		},
		verifyCheck: function (workNumberList, clueInput) {
			return workNumberList % clueInput !== 0;
		},
	},
	{
		id: '2',
		clue: '1 or 2 digit number',
		needsInput: false,
		clueInput: 0,
		validInput: [0, 1, 2],
		errCheck: function (numberToGuess, clueInput) {
			return (numberToGuess < 10 && clueInput === '2') || (numberToGuess > 9 && clueInput === '1');
		},
		verifyCheck: function (workNumberList, clueInput) {
			return (
				(clueInput === '1' && workNumberList > 9) || (clueInput === '2' && workNumberList < 10)
			);
		},
	},
	{
		id: '3',
		clue: 'higher than 50',
		needsInput: false,
		validInput: ['', 'true', 'false'],
		errCheck: function (numberToGuess, clueInput) {
			return  (numberToGuess < 51 && clueInput === 'true') || (numberToGuess > 50 && clueInput === 'false');
		},
		verifyCheck: function (workNumberList, clueInput) {
			return (clueInput === 'false' && workNumberList < 51) || (clueInput === 'true' && workNumberList > 50)
		},
	},
	{
		id: '4',
		clue: 'within 10  plus or minus of player supplied number',
		needsInput: true,
		errCheck: function (numberToGuess, clueInput) {
			return numberToGuess < parseInt(clueInput) - 10 || numberToGuess > parseInt(clueInput) + 10;
		},
		verifyCheck: function (workNumberList, clueInput) {
			return workNumberList < parseInt(clueInput) - 10 || workNumberList > parseInt(clueInput) + 10;
		},
	},
	{
		id: '5',
		clue: 'Contains a repeating digit',
		needsInput: false,
		validInput: ['', 'has dup', 'no dup'],
		errCheck: function (numberToGuess, clueInput) {
			return (hasRepeatingdigits(numberToGuess) && clueInput === 'no dup') ||
         			(!hasRepeatingdigits(numberToGuess) && clueInput === 'has dup');
		},
		verifyCheck: function (workNumberList, clueInput) {
			return (!hasRepeatingdigits(workNumberList) && clueInput === 'has dup') ||
         			(hasRepeatingdigits(workNumberList) && clueInput === 'no dup');
		},
	},
	{
		id: '6',
		clue: 'Has all digirs ascending or descending?',
		needsInput: false,
		validInput: ['', 'ascending', 'descending'],
		errCheck: function (numberToGuess, clueInput) {
			return (isAscening(numberToGuess) && clueInput !== 'ascending') ||
         			(!isAscening(numberToGuess) && clueInput === 'ascending');
		},
		verifyCheck: function (workNumberList, clueInput) {
			return (isAscening(workNumberList) && clueInput === 'descending') ||
         			(!isAscening(workNumberList) && clueInput === 'ascending');
		},
	},
	{
		id: '7',
		clue: 'Is a square root',
		needsInput: false,
		validInput: ['', 'is', 'is not'],
		errCheck: function (numberToGuess, clueInput) {
			return (isExactSquareRoot(numberToGuess) && clueInput !== 'is') ||
         			(!isExactSquareRoot(numberToGuess) && clueInput === 'is');
		},
		verifyCheck: function (workNumberList, clueInput) {
			return (isExactSquareRoot(workNumberList) && clueInput === 'is not') ||
         			(!isExactSquareRoot(workNumberList) && clueInput === 'is');
		},
	},
	{
		id: '8',
		clue: 'All digits are even or odd',
		needsInput: false,
		validInput: ['', 'evenOdd', 'mixed'],
		errCheck: function (numberToGuess, clueInput) {
			return (isEvenOrOddDigits(numberToGuess) && clueInput !== 'mixed') ||
      			   (!isEvenOrOddDigits(numberToGuess) && clueInput === 'evenOdd');
		},
		verifyCheck: function (workNumberList, clueInput) {
			return (isEvenOrOddDigits(workNumberList) && clueInput === 'mixed') ||
          			 (!isEvenOrOddDigits(workNumberList) && clueInput === 'evenOdd');
		},
	},
];

export const errorMessages = [
	'Number not divisible by chosen number',
	'Number has a different number of digits than that selected',
	'Number is lower-higher than 50 and you guessed wrong',
	'Number is not within 10 pf the number you guessed',
	'Number has-has not got dup digits',
	'Number is ascending vs descending guess was wrong',
	'Number is or is not a square root',
	'Number is all even - odd or mixed',
];
