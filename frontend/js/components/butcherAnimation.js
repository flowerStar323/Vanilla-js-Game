import sound from '../components/sound';
import s from '../state';
import getEl from '../helpers/getEl';

function mouthAnimationStart() {
  getEl('butcherMouth').classList.add('move');
}

function mouthAnimationStop() {
  getEl('butcherMouth').classList.remove('move');
}

export default function butcherAnimation () {
  sound.play('intro', true);
  const $el = getEl('mainBatcher');
  const lang = s.get('language');
  const settings = s.get('json').language[lang].introSound;
  if (!settings || !settings.duration) return;
  const duration = settings.duration;
  $el.classList.add('butcher__anim');
  const sync = settings.mouthSync;
  let mouthTimeouts = [];

  // adding timeout for starting mouth animation
  if (sync[0] > 0) {
    mouthTimeouts.push(
      window.setTimeout(() => {
        mouthAnimationStart();
      }, sync[0])
    )
  } else {
    mouthAnimationStart();
  }

  // adding timeouts for pauses
  for (var i = 1; i < sync.length - 1; i++) {
    mouthTimeouts.push(
      window.setTimeout(() => {
        mouthAnimationStop();
      }, sync[i][0])
    );
    mouthTimeouts.push(
      window.setTimeout(() => {
        mouthAnimationStart();
      }, sync[i][0] + sync[i][1])
    );
  }

  // adding timeout for stopping mouth animation in the end
  if (sync[sync.length - 1] > 0) {
    mouthTimeouts.push(
      window.setTimeout(() => {
        mouthAnimationStop();
      }, duration - sync[sync.length - 1])
    )
  }

  s.set('mouthTimeouts', mouthTimeouts);
 }
