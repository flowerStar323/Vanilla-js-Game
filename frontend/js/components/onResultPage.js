import $, {fadeIn, fadeOut} from '../helpers/domHelpers';
import getEl from '../helpers/getEl';
import randomInt from '../helpers/randomInt';
import {positSmall} from '../constants';
import s from '../state';
import getGameName from '../helpers/getGameName';
import {inactivityTimeoutResults} from '../constants';
import sound from '../components/sound';

let inactivityTimeout;

export default function onResultPage (right, wrong, weight) {
	const $mainPage = getEl('mainPage');
  const resultLunchbox = $('.result__lunchbox');
	const vaegtBowlLeft = $('.vaegt__bowl__left');
	const $lunchbox = getEl('lunchbox');
	const pill = getEl('pill');


	// Start inactivity clock
	resetInactivityClock();
	getEl('resultPage').addEventListener('click', () => {
		resetInactivityClock();
  });

  resultLunchbox.appendChild($lunchbox);

	const parentElem = resultLunchbox.querySelector('.lunchbox__elements');

	for (var i = 0; i < parentElem.children.length; i++) {
		let randPosit = randomInt(0, 6);
		parentElem.children[i].setAttribute('style',`${positSmall[randPosit]}`);
	}

  fadeIn(getEl('resultPage'));
	$mainPage.classList.toggle('main--hidden');
  getEl('resCorrect').textContent = right;
  getEl('resWrong').textContent = wrong;
  const $button = $(`.game-type-buttons [data-id="${s.get('gameType')}"]`);
  if ($button) {
    $('.chain__board_game_name').textContent = getGameName();
  }
  const pillRotate = (weight * 1000) / 77;

	pill.classList.add('pill__animate');
	vaegtBowlLeft.classList.add('bowl__anim-left');
	resultLunchbox.classList.add('bowl__anim-right');

	window.setTimeout(() => {
		pill.classList.remove('pill__animate');
		vaegtBowlLeft.classList.remove('bowl__anim-left');
		resultLunchbox.classList.remove('bowl__anim-right');
    pill.style.transform = 'rotate(0deg)';
    window.setTimeout(() => pill.style.transform = `rotate(${pillRotate}deg)`, 50);
    vaegtBowlLeft.style.transform = 'translateY(-15%)';
    resultLunchbox.style = `
      transform: translateY(20%);
      transition: all 2s;
    `;
  }, 5100);

  s.set('status', 'FINISHED');
};

function resetInactivityClock(){
	clearTimeout(inactivityTimeout);
	inactivityTimeout =  setTimeout(inactivityHandler, inactivityTimeoutResults);
}

function inactivityHandler(){
	window.setTimeout(() => {
		s.set('screensaverActive', false);
	}, 500);
	fadeOut(getEl('screensaverWrapper'));
	fadeOut(getEl('resultPage'));
	fadeIn(getEl('introScreen'));
	if (s.get('status') === 'STANDBY') {
		butcherAnimation();
	} else {
		sound.stopAll();
	}
}
