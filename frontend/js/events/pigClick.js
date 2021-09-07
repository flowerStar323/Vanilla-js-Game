import s from '../state';
import sound from '../components/sound';

let animtionEnded = true;

export default function handler ($pig) {
  console.log('sound.isIntroPlaying(intro):  ', sound.isIntroPlaying());
  console.log('animtionEnded:  ', animtionEnded);
  if (animtionEnded === true && !sound.isIntroPlaying() && (['STANDBY', 'FINISHED', 'STATS'].indexOf(s.get('status')) >= 0)) {
    animtionEnded = false;
    sound.play('pig');
    $pig.setAttribute('src', './assets/img/butcher-anim/Pig_animate.gif');
    window.setTimeout(() => {
      $pig.setAttribute('src', './assets/img/butcher-anim/Pig.png');
      animtionEnded = true;
    }, 450)
  }    
}