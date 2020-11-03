// Gather DOM elements
const startBtn = document.querySelector('.btn__reset');
const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');

// Initialize variables
let missed = 0;
const phrases = [
	'Accidentally on purpose',
	'A friend in need is a friend indeed',
	'Third time is the charm',
	'A bitter pill to swallow',
	'After hours',
	'Once in a blue moon',
	'Raining cats and dogs',
	'It costs an arm and a leg'
];

// Event Listeners
startBtn.addEventListener('click', (evt) => {
	const overlay = startBtn.parentNode;
	overlay.style.display = 'none';
	const phraseArray = getRandomPhraseAsArray(phrases);
	addPhraseToDisplay(phraseArray);
});

/*
 * getRandomPhraseAsArray function
 * This functions randomly selects a phrase from the phrases
 * array. It then splits and returns a new character array.
 */
function getRandomPhraseAsArray(arr) {
	let index = Math.floor(Math.random() * arr.length);
	const characters = arr[index].split('');
	return characters;
}

function addPhraseToDisplay(characterArr) {
	for (let character of characterArr) {
		appendCharacterLi(character);
	}
}

function checkLetter(selectedLetter) {
	const letters = document.querySelectorAll('.letter');
	for (let letter of letters) {
		if (letter.textContent.toLowerCase() === selectedLetter) {
			console.log(letter);
		}
	}
}

function appendCharacterLi(character) {
	const li = createCharacterLi(character);
	phrase.appendChild(li);
}

function createCharacterLi(character) {
	const li = document.createElement('li');
	li.textContent = character;
	if (!(character === ' ')) {
		li.classList.add('letter');
	}
	return li;
}
