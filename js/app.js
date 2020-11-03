// Gather DOM elements
const startBtn = document.querySelector('.btn__reset');
const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const lives = document.querySelectorAll('.tries');

// Declare/Initialize variables
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
		}, 700);
	}
});

/*
 * initializeGame function
 * Prepares all elements on the game for a
 * new round to be played.
 */
function initializeGame() {
	missed = 0;
	initializePhrase();
	initializeKeyboard();
	initializeLives();
}

/*
 * initializePhrase function
 * Initializes the phrase element for a new round.
 */
function initializePhrase() {
	while (phrase.firstElementChild) {
		phrase.removeChild(phrase.firstElementChild);
	}
}

/*
 * initializeKeyboard function
 * Initializes the keyboard for new round.
 */
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

/*
 * initializeLives function
 * Initializes the life images for a new round.
 */
function initializeLives() {
	for (let life of lives) {
		life.firstElementChild.src = 'images/liveHeart.png';
	}
}

/*
 * checkWin function
 * Checks to see if all lives have been used, or if
 * the phrase has been solved.
 */
function checkWin() {
	if (missed >= 5) displayOverlay('lose');
	else {
		const shownLetters = document.querySelectorAll('.show');
		const totalLetters = document.querySelectorAll('.letter');

		if (shownLetters.length === totalLetters.length) displayOverlay('win');
	}
}

/*
 * displayOverlay function
 * Takes a classname as an input then displays the correct
 * overlay by applying the classname.
 */
function displayOverlay(className) {
	const overlay = startBtn.parentNode;
	overlay.classList.add(className);
	overlay.style.display = '';
}

/*
 * updateLives function
 * Updates the liveHeart image to the lostHeart image
 * when there's a wrong guess.
 */
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

/*
 * addPhraseToDisplay function
 * Takes the characterArr as input and then calls the append
 * method with each individual character.
 */
function addPhraseToDisplay(characterArr) {
	for (let character of characterArr) {
		appendCharacterLi(character);
	}
}

/*
 * checkLetter function
 * Checks to see if guessed letter is in the phrase or not.
 */
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

/*
 * appendCharacterLi function
 * Takes a character in as a parameter and calls the li
 * creation method, then appends the li to the phrase element.
 */
function appendCharacterLi(character) {
	const li = createCharacterLi(character);
	phrase.appendChild(li);
}

/*
 * createCharacterLi function
 * Takes a character as input and builds a li element with
 * the character as textContent. It applies the correct class
 * to the li based on if the character is a letter or space.
 */
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
