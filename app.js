// Initialize variables
const startOverlay = document.getElementById('overlay');
const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;

startOverlay.addEventListener('click', (evt) => {
	const { target } = evt;
	if (target.tagName === 'A') {
		startOverlay.style.display = 'none';
	}
});
