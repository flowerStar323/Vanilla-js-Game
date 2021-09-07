import '../../scss/debug.scss';
import $, {$$} from '../helpers/domHelpers';
import {bsDebugEnabled} from '../constants';
import sound from './sound';
import {version} from '../constants';


export default function soundCheckInit() {
  if (!bsDebugEnabled) return;
  $('#soundcheck').classList.add('show');
  $('#version').textContent = 'Debug version: ' + version;
  $('.pause__wrapper').classList.add('show', 'test');
  const $debugButtons = $$('#soundcheck button');
  $debugButtons.forEach($button => $button.addEventListener("click", () => {
    const $clicked = $button.parentNode.querySelector('span');
    let clicked = parseInt($clicked.textContent);
    $clicked.textContent = clicked + 1;
    const elName = $button.getAttribute('data-play');
    // sound.stopAll(true);
    sound.play(elName);
  }));
}