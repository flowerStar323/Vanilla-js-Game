import getEl from '../helpers/getEl';
import {fadeIn, fadeOut} from '../helpers/domHelpers';
import sound from '../components/sound';
import butcherAnimation from './butcherAnimation';
import g from '../state';
import {screensaverTimeoutMs} from '../constants';

let isActive = false;
let screensaverTimeout;
let throttled = false;
let throttledTimeout;

function screensaverStart () {
  isActive = true;
  g.set('screensaverActive', isActive);
  fadeIn(getEl('screensaverWrapper'));
  sound.play('video', true);
};

function screensaverStop () {
  isActive = false;
  window.setTimeout(() => {
    g.set('screensaverActive', isActive);
  }, 500);
  fadeOut(getEl('screensaverWrapper'));
  if (g.get('status') === 'STANDBY') {
    butcherAnimation();
  } else {
    sound.stopAll();
  }
};

function screensaverHandler () {
  if (throttled) {
    return;
  }
  throttled = true;
  throttledTimeout = window.setTimeout(() => {
    throttled = false;
  }, 500);
  if (isActive) {
    screensaverStop();
  } else {
    clearTimeout(screensaverTimeout);
  }
  screensaverTimeout = window.setTimeout(() => {
    if (['STANDBY', 'FINISHED', 'STATS'].indexOf(g.get('status')) >= 0) {
      screensaverStart();
    }
  }, screensaverTimeoutMs);
};

export default function screensaverInit() {

  getEl('videoBlock').setAttribute('hwz', 'off');
  getEl('videoBlock').setAttribute('loop', null);

  getEl('game').addEventListener('mousemove', () => {
    setTimeout(screensaverHandler, 100);
  });
  getEl('game').addEventListener('click', () => {
    setTimeout(screensaverHandler, 200);
  });
  getEl('game').addEventListener('touchstart', () => {
    screensaverHandler()
  });
};
