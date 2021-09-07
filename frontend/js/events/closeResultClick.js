import g from '../state';
import {fadeIn, fadeOut} from '../helpers/domHelpers';
import getEl from '../helpers/getEl';
import butcherAnimation from '../components/butcherAnimation';
import {startTypeButtonShake} from '../components/lunchBoxShake';

export default function handler () {
  fadeOut(getEl('resultPage'));
  fadeIn(getEl('introScreen'))
  butcherAnimation();
  getEl('mainPage').classList.remove('gametype-' + g.get('gameType'));
  startTypeButtonShake(true);
  g.set('status', 'STANDBY');
}