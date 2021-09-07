import $ from './domHelpers';

const els = {
  game: '#game',
  butcherMouth: '.butcher__mouth',
  boardElemClon: '.board__elements-clon',
  lunchbox: '.lunchbox__elements',
  mainBatcher: '.intro__butcher',
  mainPage: '.main',
  resultPopup: '.overlay__container',
  closeResult: '.close__result',
  introScreen: '#intro-screen',
  resultBtn: '.overlay__btn',
  closeMain: '.close__main',
  resultPage: '.result',
  videoBlock: '#video_default',
  pill: '.pill',
  lang_da: '.game-lang--da',
  lang_en: '.game-lang--en',
  clock: '#clock-rotator',
  pig1: '#intro-pig',
  pig2: '#result-pig',
  resCorrectText: '#res_correct_text',
  resCorrect: '#res_correct',
  resWrongText: '#res_wrong_text',
  resWrong: '#res_wrong',
  sbGameName: '#scoreboard_gamename',
  sbCorrectText: '#scoreboard_correct_text',
  sbCorrect: '#scoreboard_correct',
  sbWrongText: '#scoreboard_wrong_text',
  sbWrong: '#scoreboard_wrong',
  screensaverWrapper: '.pause__wrapper',
  startButton1: '#start_screen_btn_1',
  startButton2: '#start_screen_btn_2',
  resultPopUp: '.main__winning',
  soundGame: '#sound_game',
  soundSec10: '#sound_10sekund',
  soundPig: '#sound_pig',
  soundShake: '#sound_shake',
  sound: '#soundAll'
}

let $els = {};

export default function getEl(name, force = false) {
  if ($els[name] && !force) {
    return $els[name];
  }
  $els[name] = $(els[name]);
  return $els[name];
}