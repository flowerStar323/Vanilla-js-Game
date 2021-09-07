import '../scss/styles.scss';

import $, {$$} from './helpers/domHelpers';
import getEl from './helpers/getEl';
import g from './state';
import initApiWindowObjects from './api';
import {dataFilePath, languages} from './constants';

import startScreenBtnClick from './events/startScreenBtnClick';
import gameTypeBtnsClick from './events/gameTypeBtnsClick';
import closeMainClick from './events/closeMainClick';
import closeResultClick from './events/closeResultClick';
import resultBtnClick from './events/resultBtnClick';
import resultPopupClick from './events/resultPopupClick';
import langSelectClick from './events/langSelectClick';
import pigClick from './events/pigClick';
import soundCheckInit from './components/soundCheck';

import debug from './components/debug';

initApiWindowObjects();
window.dataFilePath = dataFilePath;

function start() {
  debug.init();
  GAME_API.setLanguage('da');
  const $gameTypeButtons = $$('.game-type-button');
  $gameTypeButtons.forEach($gameTypeButton => $gameTypeButton.addEventListener("click", () => gameTypeBtnsClick($gameTypeButton)));

  console.log("Is christmas edition?:"+g.get('isChristmasEdition'));
  getEl('pig1').addEventListener('click', () => pigClick(getEl('pig1')));
  getEl('pig2').addEventListener('click', () => pigClick(getEl('pig2')));
  getEl('closeMain').addEventListener('click', closeMainClick)
	getEl('closeResult').addEventListener('click', closeResultClick)
	getEl('resultBtn').addEventListener('click', resultBtnClick);
	getEl('resultPopup').addEventListener('click', resultPopupClick);
  for (const language of languages) {
    const $l = getEl('lang_' + language);
    if ($l) {
      $l.addEventListener('click', () => langSelectClick(language))
    }
  }
  soundCheckInit();

};

window.addEventListener("DOMContentLoaded", start);
