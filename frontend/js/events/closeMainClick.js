import g from '../state';
import {fadeIn, fadeOut} from '../helpers/domHelpers';
import getEl from '../helpers/getEl';
import {startTypeButtonShake} from '../components/lunchBoxShake';
import sound from '../components/sound';

export default function handler() {
  g.set('deg', g.get('currentDeg'));
  fadeIn(getEl('introScreen'));
  getEl('mainPage').classList.add('main--hidden');
  getEl('mainPage').classList.remove('gametype-' + g.get('gameType'));
  window.GAME_API.stopGame();
  fadeOut(getEl('resultPage'));
  sound.stopAll(true);
  startTypeButtonShake(true);
  g.set('status', 'STANDBY');
}