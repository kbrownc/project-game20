export const clues = [
	{ id: '1', clue: "Divisible by one of (2,3,5)", used: false, needsInput: false, clueInput: '', validInput: ['','2','3','5']},
	{ id: '2', clue: '1 or 2 digit number', used: false, needsInput: false, clueInput: 0, validInput: [0,1,2]},
	{ id: '3', clue: 'higher than 50', used: false, needsInput: false, clueInput: '', validInput: ['', 'true', 'false']},
	{ id: '4', clue: 'within 10  plus or minus of player supplied number', used: false, needsInput: true, clueInput: ''},
	{ id: '5', clue: 'Contains a repeating digit', used: false, needsInput: false, clueInput: '', validInput: ['','has dup', 'no dup']},
	{ id: '6', clue: 'Has all digirs ascending or descending?', used: false, needsInput: false, clueInput: '', validInput: ['','ascending','descending']},
	{ id: '7', clue: 'Is a square root', used: false, needsInput: false, clueInput: '', validInput: ['','is', 'is not']},
	{ id: '8', clue: 'All digits are even or odd', used: false, needsInput: false, clueInput: '', validInput: ['','evenOdd','mixed']},
	]

export const errorMessages = [
	'Number not divisible by chosen number',
	'Number has a different number of digits than that selected',
	'Number is lower-higher than 50 and you guessed wrong',
	'Number is not within 10 pf the number you guessed',
	'Number has-has not got dup digits',
	'Number is ascending vs descending guess was wrong',
	'Number is or is not a square root',
	'Number is all even - odd or mixed'
	]
