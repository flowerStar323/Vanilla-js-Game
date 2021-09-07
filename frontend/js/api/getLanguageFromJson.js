import g from '../state';
import {languages} from '../constants';
import getEl from '../helpers/getEl';
import $ from '../helpers/domHelpers';

function getLanguageFromJson(dataJson){
  let currentLang = window.GAME_API.getLanguage();
  if (languages.indexOf(currentLang) < 0) {
    //console.warn(`Language "${currentLang}" is not supported`);
    currentLang = languages[0];
  }
  g.set('landDynamicElements', dataJson[currentLang]);
  g.set('language', currentLang);

  getEl('introScreen').style.backgroundImage = 'url("./assets/img/background-image_' + currentLang + '.png")';
  for (const num in g.get('json').gameTypes) {
    const $button = $(`#game-type-button-${parseInt(num) + 1}`);
    if ($button) {
      $button.setAttribute('src', `./assets/img/lunchbox${parseInt(num) + 1}_${currentLang}.png`);
    }
  }

  if (typeof g.get('landDynamicElements') === 'undefined') {
    return false;
  }

  $('.main__winning-block div').innerHTML = g.get('landDynamicElements')["gameEndedBeforeTime"];
  $('.result__overlay').textContent = g.get('landDynamicElements')["resultOverlay"];
  $('.result__message').innerHTML = g.get('landDynamicElements')["resultMessage"];
  $('#fun-facts-display').setAttribute("data-texts", g.get('landDynamicElements')["funfactArray"].join(',,'));
  getEl('resCorrectText').textContent =  g.get('landDynamicElements').correct;
  getEl('resWrongText').textContent =  g.get('landDynamicElements').wrong;
  getEl('sbCorrectText').textContent =  g.get('landDynamicElements').correct;
  getEl('sbWrongText').textContent =  g.get('landDynamicElements').wrong;
}


export default function init() {
  window.apiGetLanguageJSON = getLanguageFromJson;
};
