// import sound from '../components/sound';
import randomInt from '../helpers/randomInt';
import $ from '../helpers/domHelpers';
import {bsDebugEnabled, shakeMaxTimeout} from '../constants';

let doShake = false;

function calculateShake() {
	const buttonNo = randomInt(1, 4); // Only 3 buttons on non-christmas edition
	shakeButton(buttonNo);
};

export function startTypeButtonShake(isStart) {
  if (bsDebugEnabled) return;
  doShake = false;
	if (isStart) {
		doShake = true;
  }

  function loop() {
		const randomNumber = randomInt(500, shakeMaxTimeout);
		setTimeout(() => {
			if (doShake){
				calculateShake();
				loop();
			}
		}, randomNumber);
  }
  loop();
}

function shakeButton(buttonNo) {
  // sound.play('shake');
  const $button = $(".game-type-buttons [data-game='" + buttonNo + "']");
	if(!$button) return; // Add null check if button doesn't exist 
	$button.classList.add('game-type-button_shake');

	setTimeout(() => {
    $button.classList.remove('game-type-button_shake');
    // stopSound($sound);
	 }, 1000);
}
