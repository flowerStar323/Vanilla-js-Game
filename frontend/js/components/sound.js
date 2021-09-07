import s from '../state';
import getEl from '../helpers/getEl';
import debug from './debug';
const soundIntro_da = './assets/sounds/introSound_da.wav';
const soundIntro_en = './assets/sounds/introSound_en.wav';
const soundsIntro = {
  en: soundIntro_en,
  da: soundIntro_da
}
const soundGame_da = './assets/sounds/gamesound_da_1970.wav';
const soundGame_en = './assets/sounds/gamesound_en_1970.wav';

const soundGame = {
  en: soundGame_en,
  da: soundGame_da
}

const soundSec10_en = './assets/sounds/finishedBeforeTime_en.wav';
const soundSec10_da = './assets/sounds/finishedBeforeTime_da.wav';

const soundSec10 = {
  en: soundSec10_en,
  da: soundSec10_da
}

const soundTimeOut_en = './assets/sounds/8._ENGELSK_VERSION_AFSLUTNING_TIDEN_LØB_UD_færdig_master_normaliseret_2107_2021.wav';
const soundTimeOut_da = './assets/sounds/8._DANSK_VERSION_AFSLUTNING_TIDEN_LØBER_UD_færdig_master_normaliseret_2107_2021.wav';

const soundTimeOut = {
  en: soundTimeOut_en,
  da: soundTimeOut_da
}

const soundPig = './assets/sounds/pig.wav';
const videoClockSounds = {
  en:'./assets/sounds/pause_en_soundOnly.mp3',
  da:'./assets/sounds/pause_da_soundOnly.mp3'
}
const videoClock = {
  en:'./assets/video/pause_en.mp4',
  da:'./assets/video/pause_da.mp4'
}

// const videoClock = 
// const videoClock = '
let isIntroPlaying = false;

let sounds = {
  intro: {
    src: soundsIntro[s.get('language')],
    stopCallback: () => {
      let mouthTimeouts = s.get('mouthTimeouts');
      for (var i = 0; i < mouthTimeouts.length; i++) {
        window.clearTimeout(mouthTimeouts[i]);
      }
      getEl('butcherMouth').classList.remove('move');
      isIntroPlaying = false;
    },
    getDuration: () => {
      try {
        return s.get('json').language[s.get('language')].introSound.duration
      } catch (err) {
        return 21000
      }
    },
    nonStop: true
  },
  game: {
    src: soundGame[s.get('language')],
    repeat: true,
    getDuration: () => 30000
  },
  sec10: {
    src: soundSec10[s.get('language')],
  },
  timeout: {
    src: soundTimeOut[s.get('language')],
  },
  pig: {
    src: soundPig,
  },
  video: {
    src: videoClock[s.get('language')],
  }
}

function stopAllSounds(forceStopAll) {
  const sound = getEl('sound');
  const video = getEl('videoBlock');
  debug.add('stopping sounds');
  try {
    if (sound.currentTime) {
      sound.pause();
      sound.currentTime = 0;
    }
  } catch(err) {}
  if(video){
    video.pause()
  }
  
  
  const keysArr = Object.keys(sounds);
  for (var i = 0; i < keysArr.length; i++) {
    const soundData = sounds[keysArr[i]];
    if (soundData.timeout) {
      window.clearTimeout(soundData.timeout);
    }
    if (soundData.stopCallback) {
      soundData.stopCallback()
    }
  }
  debug.add('sound stopped');
}

const soundFunc = {
  play: (name, forceStopAll) => {
    
    stopAllSounds(forceStopAll);
    debug.add('playing ' + name);
    const soundData = sounds[name];
    let sound = getEl('sound');
    sound.muted = false;
    sound.loop = false;
    
    
    if (name === 'video') {
      
      sound = getEl('videoBlock');
      sound.src = videoClock[s.get('language')];
      sound.muted = true;
      let videoSound = getEl('sound');
      videoSound.src = videoClockSounds[s.get('language')];
      videoSound.loop = true;
      videoSound.play()
      
    } else {
      debug.add('--- ' + soundData.src);
      sound.src = soundData.src;
    }
    if (name === 'intro') {
      sound.src = soundsIntro[s.get('language')];
 
      isIntroPlaying = true;
    }
    if(name === 'game'){
     
      const gameInfo = DB.getGameInfo(s.get('gameType'));
      if(gameInfo.gameSound && gameInfo.gameSound[s.get('language')]){
        sound.src = gameInfo.gameSound[s.get('language')];
      }
      else{
        sound.src = soundGame[s.get('language')];
      }

    }
    if(name === 'sec10'){
      sound.src = soundSec10[s.get('language')];
    }
    if(name === 'timeout'){
      sound.src = soundTimeOut[s.get('language')];
    }
    
    if (sound.currentTime && sound.currentTime > 0) {
      sound.currentTime = 0;
    }
    sound.play();
    if (soundData.repeat || soundData.stopCallback) {
      soundData.timeout = window.setTimeout(() => {
        if (soundData.repeat) {
          soundFunc.play(name, forceStopAll);
        } else if (soundData.stopCallback) {
          soundData.stopCallback()
        }
      }, soundData.getDuration())
    }
    debug.add('playing ' + name + ' done');
  },
  stopAll: (forceStopAll) => stopAllSounds(forceStopAll),
  isIntroPlaying: () => {
    return isIntroPlaying;
  }
}

const sound = soundFunc;

export default sound;