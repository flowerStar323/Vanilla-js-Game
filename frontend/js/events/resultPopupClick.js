import g from '../state';
import {fadeIn, fadeOut} from '../helpers/domHelpers';
import getEl from '../helpers/getEl';
import butcherAnimation from '../components/butcherAnimation';
import {startTypeButtonShake} from '../components/lunchBoxShake';

export default function handler() {
  fadeOut(getEl('resultPage'));
  fadeIn(getEl('introScreen'));
  butcherAnimation();
  startTypeButtonShake(true);
  getEl('mainPage').classList.remove('gametype-' + g.get('gameType'));
  g.set('status', 'STANDBY');
  fadeOut(getEl('resultPopup'));
}