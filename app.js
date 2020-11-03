// Gather DOM elements
const startBtn = document.querySelector('.btn__reset');
const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const lives = document.querySelectorAll('.tries');

// Initialize variables
let missed;
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
	initializeGame();
	const overlay = startBtn.parentNode;
	overlay.style.display = 'none';
	const phraseArray = getRandomPhraseAsArray(phrases);
	addPhraseToDisplay(phraseArray);
});

keyboard.addEventListener('click', (evt) => {
	const { target } = evt;
	if (target.tagName === 'BUTTON') {
		target.classList.add('chosen');
		target.disabled = true;
		const selectedLetter = target.textContent;
		const letterFound = checkLetter(selectedLetter);
		if (!letterFound) updateLives();
		setTimeout(() => {
			checkWin();
		}, 500);
	}
});

function initializeGame() {
	missed = 0;
	initializePhrase();
	initializeKeyboard();
	initializeLives();
}

function initializePhrase() {
	while (phrase.firstElementChild) {
		phrase.removeChild(phrase.firstElementChild);
	}
}

function initializeKeyboard() {
	const keyrows = keyboard.children;
	for (let keyrow of keyrows) {
		const letters = keyrow.children;
		for (let letter of letters) {
			letter.classList.remove('chosen');
			letter.disabled = false;
		}
	}
}

function initializeLives() {
	for (let life of lives) {
		life.firstElementChild.src = 'images/liveHeart.png';
	}
}

function checkWin() {
	if (missed >= 5) displayOverlay('lose');
	else {
		const shownLetters = document.querySelectorAll('.show');
		const totalLetters = document.querySelectorAll('.letter');

		if (shownLetters.length === totalLetters.length) displayOverlay('win');
	}
}

function displayOverlay(className) {
	const overlay = startBtn.parentNode;
	overlay.classList.add(className);
	overlay.style.display = '';
}

function updateLives() {
	const lifeImage = lives[missed].firstElementChild;
	lifeImage.src = 'images/lostHeart.png';
	missed++;
}

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
	let matchingLetter = null;
	for (let letter of letters) {
		if (letter.textContent.toLowerCase() === selectedLetter) {
			matchingLetter = selectedLetter;
			letter.classList.add('show');
		}
	}
	return matchingLetter;
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
	} else {
		li.classList.add('space');
	}
	return li;
}
