import g from '../state';
import $, {fadeOut} from '../helpers/domHelpers';
import butcherAnimation from '../components/butcherAnimation';
import initScreensaverOverlay from '../components/screensaverOverlay';
import {startTypeButtonShake} from '../components/lunchBoxShake';
import setChristmasEdition from '../components/setChristmasEdition';
import {bsDebugEnabled} from '../constants';

export default function handler (e, type) {
  fadeOut($("#game-loader-screen"));
  setChristmasEdition(type);
  if (!bsDebugEnabled) {
    butcherAnimation();
    startTypeButtonShake(true);
    initScreensaverOverlay();
  }
  g.set('status', 'STANDBY');
};
