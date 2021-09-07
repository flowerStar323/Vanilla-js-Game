import s from '../state';
import $ from '../helpers/domHelpers';
import startGameEdition from '../components/startGameEdition'

function onJsonLoaded (json) {
  s.set('json', json);
  s.set('isChristmasEdition',json["isChristmasEdition"]);
  for (const num in json.gameTypes) {
    const gameType = json.gameTypes[num];
    const $button = ($(`#game-type-button-${parseInt(num) + 1}`) || {}).parentNode;
    if ($button) {
      $button.setAttribute('data-id', gameType.id);
    }
  }

  startGameEdition();
}


export default function init() {
  window.onJsonLoaded = onJsonLoaded;
};
