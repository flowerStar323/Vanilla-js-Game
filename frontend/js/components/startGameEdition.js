import g from '../state';
import $, {fadeOut} from '../helpers/domHelpers';
import butcherAnimation from '../components/butcherAnimation';
import initScreensaverOverlay from '../components/screensaverOverlay';
import {startTypeButtonShake} from '../components/lunchBoxShake';
import setChristmasEdition from '../components/setChristmasEdition';
import {bsDebugEnabled} from '../constants';

export default function startGameEdition(){
  if(g.get('isChristmasEdition')) setChristmasEdition('christmas');
  else setChristmasEdition(null);
  console.log("Christmas edition set");
  if (!bsDebugEnabled) {
    butcherAnimation();
    startTypeButtonShake(true);
    initScreensaverOverlay();
  }
  g.set('status', 'STANDBY');

}
