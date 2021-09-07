import {languages} from '../constants';
import getEl from '../helpers/getEl';
import butcherAnimation from '../components/butcherAnimation';

export default function handler(currentLang) {
  for (const language of languages) {
    if (getEl('lang_' + language)) {
      getEl('lang_' + language).classList.remove('game-lang--active');
    }
  }
  getEl('lang_' + currentLang).classList.add('game-lang--active');
  window.GAME_API.setLanguage(currentLang);
  butcherAnimation();
}