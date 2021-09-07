import $, {fadeIn} from '../helpers/domHelpers';
import getEl from '../helpers/getEl';
import randomInt from '../helpers/randomInt';
import s from '../state';

export default function handler () {
  let fynFactTextsArray = $('#fun-facts-display').getAttribute("data-texts").split(',,');
  const randomfunFact = fynFactTextsArray[randomInt(0, fynFactTextsArray.length - 1)];
  $('#fun-facts-display > div').innerHTML = randomfunFact;
  fadeIn(getEl('resultPopup'));
  s.set('status', 'STATS');
}